/** Comunidade de Representantes — feed de posts estilo LinkedIn. */
import { useEffect, useRef, useState } from 'react';
import { Heart, Trash2, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  user_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  liked: boolean;
  likes: number;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)   return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function initials(name: string) {
  return name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const COLORS = [
  'bg-violet-600', 'bg-blue-600', 'bg-emerald-600',
  'bg-rose-600', 'bg-amber-600', 'bg-cyan-600',
];
function avatarColor(email: string) {
  let hash = 0;
  for (const c of email) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return COLORS[hash % COLORS.length];
}

export default function Comunidade() {
  const [posts, setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText]     = useState('');
  const [sending, setSending] = useState(false);
  const [me, setMe]         = useState<{ id: string; name: string; email: string } | null>(null);
  const textRef             = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setMe({
        id: u.id,
        name: u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? 'Representante',
        email: u.email ?? '',
      });
    });
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { data: postsData } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    const { data: likesData } = user
      ? await supabase.from('community_likes').select('post_id').eq('user_id', user.id)
      : { data: [] };

    const likedSet = new Set((likesData ?? []).map((l: { post_id: string }) => l.post_id));

    setPosts((postsData ?? []).map((p: Record<string, unknown>) => ({
      id: p.id as string,
      user_id: p.user_id as string,
      author_name: p.author_name as string,
      author_email: p.author_email as string,
      content: p.content as string,
      created_at: p.created_at as string,
      likes: (p.likes as number) ?? 0,
      liked: likedSet.has(p.id as string),
    })));
    setLoading(false);
  }

  async function submitPost() {
    if (!me || !text.trim()) return;
    setSending(true);
    const { error } = await supabase.from('community_posts').insert({
      user_id: me.id,
      author_name: me.name,
      author_email: me.email,
      content: text.trim(),
    });
    if (error) {
      toast({ title: 'Erro ao publicar', description: error.message, variant: 'destructive' });
    } else {
      setText('');
      await loadPosts();
    }
    setSending(false);
  }

  async function toggleLike(post: Post) {
    if (!me) return;
    const optimistic = posts.map(p =>
      p.id === post.id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
    );
    setPosts(optimistic);

    if (post.liked) {
      await supabase.from('community_likes').delete()
        .eq('post_id', post.id).eq('user_id', me.id);
      await supabase.from('community_posts').update({ likes: Math.max(0, post.likes - 1) }).eq('id', post.id);
    } else {
      await supabase.from('community_likes').insert({ post_id: post.id, user_id: me.id });
      await supabase.from('community_posts').update({ likes: post.likes + 1 }).eq('id', post.id);
    }
  }

  async function deletePost(id: string) {
    await supabase.from('community_posts').delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Comunidade</h1>
        <p className="text-sm text-cw-muted mt-0.5">Compartilhe conquistas, aprendizados e novidades com outros representantes.</p>
      </div>

      {/* Compositor de post */}
      {me && (
        <div className="cw-card p-4 space-y-3">
          <div className="flex gap-3 items-start">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColor(me.email)}`}>
              {initials(me.name)}
            </div>
            <textarea
              ref={textRef}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submitPost(); }}
              placeholder="Compartilhe algo com a comunidade..."
              rows={3}
              className="flex-1 bg-cw-elevated border border-cw-border rounded-xl px-3 py-2 text-sm text-cw-text placeholder:text-cw-muted resize-none focus:outline-none focus:border-cw-purple/60 transition-colors"
            />
          </div>
          <div className="flex justify-between items-center pl-12">
            <p className="text-xs text-cw-muted">Ctrl + Enter para publicar</p>
            <button
              onClick={submitPost}
              disabled={!text.trim() || sending}
              className="flex items-center gap-1.5 bg-cw-purple hover:bg-cw-purple/80 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {sending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
              Publicar
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-cw-purple border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="cw-card p-10 text-center">
          <p className="text-cw-muted text-sm">Nenhuma publicacao ainda. Seja o primeiro a compartilhar algo.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="cw-card p-4">
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${avatarColor(post.author_email)}`}>
                  {initials(post.author_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-cw-text">{post.author_name}</span>
                    <span className="text-xs text-cw-muted">{timeAgo(post.created_at)}</span>
                  </div>
                  <p className="text-sm text-cw-muted">{post.author_email}</p>
                  <p className="mt-2 text-sm text-cw-text whitespace-pre-wrap leading-relaxed">{post.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked ? 'text-rose-400' : 'text-cw-muted hover:text-rose-400'}`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${post.liked ? 'fill-rose-400' : ''}`} />
                      {post.likes > 0 && <span>{post.likes}</span>}
                    </button>
                    {me?.id === post.user_id && (
                      <button
                        onClick={() => deletePost(post.id)}
                        className="flex items-center gap-1.5 text-xs text-cw-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
