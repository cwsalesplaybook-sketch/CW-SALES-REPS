/** Comunidade — feed estilo LinkedIn com reações, comentários e upload de imagem */
import { useEffect, useRef, useState } from 'react';
import { Trash2, Send, Loader2, ImageIcon, Trophy, MessageSquare, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type ReactionType = 'like' | 'love' | 'celebrate' | 'fire';

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'like',      emoji: '👍', label: 'Curtir'   },
  { type: 'love',      emoji: '❤️',  label: 'Amei'    },
  { type: 'celebrate', emoji: '🎉', label: 'Show'     },
  { type: 'fire',      emoji: '🔥', label: 'Incrível' },
];

interface Post {
  id: string;
  user_id: string;
  author_name: string;
  author_email: string;
  author_cargo: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  reactions: Record<ReactionType, number>;
  myReaction: ReactionType | null;
  commentCount: number;
}

interface Comment {
  id: string;
  user_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
}

interface Me {
  id: string;
  name: string;
  email: string;
  cargo: string;
  avatar: string | null;
}

const COLORS = ['bg-violet-600','bg-blue-600','bg-emerald-600','bg-rose-600','bg-amber-600','bg-cyan-600'];
function avatarColor(email: string) {
  let h = 0; for (const c of email) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return COLORS[h % COLORS.length];
}
function initials(name: string) {
  return name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}
function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (d < 60) return 'agora';
  if (d < 3600) return `${Math.floor(d / 60)}min`;
  if (d < 86400) return `${Math.floor(d / 3600)}h`;
  return `${Math.floor(d / 86400)}d`;
}

function Avatar({ email, name, avatar, size = 'md' }: { email: string; name: string; avatar?: string | null; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs';
  if (avatar) return <img src={avatar} referrerPolicy="no-referrer" className={`${cls} rounded-full object-cover shrink-0`} />;
  return (
    <div className={`${cls} ${avatarColor(email)} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
      {initials(name)}
    </div>
  );
}

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from('community-images').upload(path, file, { contentType: file.type });
  if (error) return null;
  return supabase.storage.from('community-images').getPublicUrl(data.path).data.publicUrl;
}

function PostCard({ post, me, onReact, onDelete }: {
  post: Post;
  me: Me | null;
  onReact: (postId: string, type: ReactionType) => void;
  onDelete: (postId: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [loaded, setLoaded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sending, setSending] = useState(false);

  const totalReactions = REACTIONS.reduce((s, r) => s + post.reactions[r.type], 0);
  const activeReactions = REACTIONS.filter(r => post.reactions[r.type] > 0);

  async function openComments() {
    if (!loaded) {
      const { data } = await supabase.from('community_comments').select('*').eq('post_id', post.id).order('created_at');
      setComments(data ?? []);
      setLoaded(true);
    }
    setShowComments(v => !v);
  }

  async function addComment() {
    if (!me || !commentText.trim()) return;
    setSending(true);
    const { data } = await supabase.from('community_comments').insert({
      post_id: post.id, user_id: me.id,
      author_name: me.name, author_email: me.email,
      content: commentText.trim(),
    }).select().single();
    if (data) {
      setComments(p => [...p, data as Comment]);
      setCommentCount(c => c + 1);
      setCommentText('');
      if (!showComments) setShowComments(true);
    }
    setSending(false);
  }

  return (
    <div className="cw-card overflow-hidden">
      {/* Author */}
      <div className="p-4 pb-0 flex items-start gap-3">
        <Avatar email={post.author_email} name={post.author_name} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-cw-text leading-snug">{post.author_name}</p>
          {post.author_cargo && <p className="text-xs text-cw-muted leading-snug">{post.author_cargo}</p>}
          <p className="text-[11px] text-cw-muted/60">{timeAgo(post.created_at)}</p>
        </div>
        {me?.id === post.user_id && (
          <button onClick={() => onDelete(post.id)} className="text-cw-muted/40 hover:text-red-400 transition-colors p-1">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <p className="px-4 pt-3 text-sm text-cw-text whitespace-pre-wrap leading-relaxed">{post.content}</p>

      {/* Image */}
      {post.image_url && (
        <div className="mt-3 px-4">
          <img src={post.image_url} alt="" className="w-full rounded-xl object-cover max-h-80" />
        </div>
      )}

      {/* Reaction summary */}
      {(totalReactions > 0 || commentCount > 0) && (
        <div className="mx-4 mt-3 flex items-center justify-between text-xs text-cw-muted border-b border-cw-border pb-2">
          <div className="flex items-center gap-1">
            {activeReactions.map(r => <span key={r.type}>{r.emoji}</span>)}
            {totalReactions > 0 && <span className="ml-1">{totalReactions}</span>}
          </div>
          {commentCount > 0 && (
            <button onClick={openComments} className="hover:underline">
              {commentCount} comentário{commentCount !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="px-2 py-1 flex items-center">
        {REACTIONS.map(r => (
          <button
            key={r.type}
            onClick={() => onReact(post.id, r.type)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              post.myReaction === r.type
                ? 'text-cw-purple bg-cw-purple/10'
                : 'text-cw-muted hover:bg-cw-elevated hover:text-cw-text'
            }`}
          >
            <span className="text-base leading-none">{r.emoji}</span>
            <span className="hidden sm:inline">{r.label}</span>
            {post.reactions[r.type] > 0 && (
              <span className={`font-black text-[11px] ${post.myReaction === r.type ? 'text-cw-purple' : ''}`}>
                {post.reactions[r.type]}
              </span>
            )}
          </button>
        ))}
        <button
          onClick={openComments}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold text-cw-muted hover:bg-cw-elevated hover:text-cw-text transition-all"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Comentar</span>
          {commentCount > 0 && <span className="font-black text-[11px]">{commentCount}</span>}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-cw-border px-4 py-3 space-y-3 bg-cw-elevated/50">
          {comments.map(c => (
            <div key={c.id} className="flex gap-2.5">
              <Avatar email={c.author_email} name={c.author_name} size="sm" />
              <div className="flex-1 bg-white rounded-2xl px-3 py-2 border border-cw-border">
                <p className="text-xs font-semibold text-cw-text">{c.author_name}</p>
                <p className="text-sm text-cw-muted leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))}
          {me && (
            <div className="flex gap-2.5">
              <Avatar email={me.email} name={me.name} avatar={me.avatar} size="sm" />
              <div className="flex-1 flex gap-2">
                <input
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment(); }}}
                  placeholder="Adicionar comentário..."
                  className="flex-1 text-sm bg-white border border-cw-border rounded-2xl px-3 py-2 focus:outline-none focus:border-cw-purple/50 transition-colors"
                />
                <button
                  onClick={addComment}
                  disabled={!commentText.trim() || sending}
                  className="p-2 bg-cw-purple text-white rounded-xl disabled:opacity-40 hover:bg-cw-purple/80 transition-colors"
                >
                  {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Comunidade() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe]           = useState<Me | null>(null);
  const [text, setText]       = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setMe({
        id: u.id,
        name: u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? 'Representante',
        email: u.email ?? '',
        cargo: u.user_metadata?.papel ?? 'Representante',
        avatar: u.user_metadata?.avatar_url ?? null,
      });
    });
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const [{ data: postsData }, { data: reactionsData }, { data: myReactionsData }, { data: commentCounts }] =
      await Promise.all([
        supabase.from('community_posts').select('*').order('created_at', { ascending: false }).limit(60),
        supabase.from('community_reactions').select('post_id, type, user_id'),
        user ? supabase.from('community_reactions').select('post_id, type').eq('user_id', user.id) : { data: [] },
        supabase.from('community_comments').select('post_id'),
      ]);

    const reactionMap: Record<string, Record<ReactionType, number>> = {};
    for (const r of reactionsData ?? []) {
      if (!reactionMap[r.post_id]) reactionMap[r.post_id] = { like: 0, love: 0, celebrate: 0, fire: 0 };
      reactionMap[r.post_id][r.type as ReactionType]++;
    }

    const myReactionMap: Record<string, ReactionType> = {};
    for (const r of myReactionsData ?? []) myReactionMap[r.post_id] = r.type as ReactionType;

    const commentCountMap: Record<string, number> = {};
    for (const c of commentCounts ?? []) commentCountMap[(c as { post_id: string }).post_id] = (commentCountMap[(c as { post_id: string }).post_id] ?? 0) + 1;

    setPosts((postsData ?? []).map((p: Record<string, unknown>) => ({
      id: p.id as string,
      user_id: p.user_id as string,
      author_name: p.author_name as string,
      author_email: p.author_email as string,
      author_cargo: p.author_cargo as string | null,
      content: p.content as string,
      image_url: p.image_url as string | null,
      created_at: p.created_at as string,
      reactions: reactionMap[p.id as string] ?? { like: 0, love: 0, celebrate: 0, fire: 0 },
      myReaction: myReactionMap[p.id as string] ?? null,
      commentCount: commentCountMap[p.id as string] ?? 0,
    })));

    setLoading(false);
  }

  function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function submitPost() {
    if (!me || !text.trim()) return;
    setSending(true);

    let image_url: string | null = null;
    if (imageFile) {
      image_url = await uploadImage(imageFile);
      if (!image_url) {
        toast({ title: 'Erro ao enviar imagem', variant: 'destructive' });
        setSending(false);
        return;
      }
    }

    const { error } = await supabase.from('community_posts').insert({
      user_id: me.id,
      author_name: me.name,
      author_email: me.email,
      author_cargo: me.cargo,
      content: text.trim(),
      image_url,
    });

    if (error) {
      toast({ title: 'Erro ao publicar', description: error.message, variant: 'destructive' });
    } else {
      setText('');
      removeImage();
      await loadPosts();
    }
    setSending(false);
  }

  async function toggleReaction(postId: string, type: ReactionType) {
    if (!me) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const current = post.myReaction;

    if (current === type) {
      await supabase.from('community_reactions').delete().eq('post_id', postId).eq('user_id', me.id);
      setPosts(prev => prev.map(p => p.id !== postId ? p : {
        ...p, myReaction: null,
        reactions: { ...p.reactions, [type]: Math.max(0, p.reactions[type] - 1) },
      }));
    } else {
      await supabase.from('community_reactions')
        .upsert({ post_id: postId, user_id: me.id, type }, { onConflict: 'post_id,user_id' });
      setPosts(prev => prev.map(p => p.id !== postId ? p : {
        ...p, myReaction: type,
        reactions: {
          ...p.reactions,
          [type]: p.reactions[type] + 1,
          ...(current ? { [current]: Math.max(0, p.reactions[current] - 1) } : {}),
        },
      }));
    }
  }

  async function deletePost(id: string) {
    await supabase.from('community_posts').delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="p-6 md:p-8 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Comunidade</h1>
        <p className="text-sm text-cw-muted mt-0.5">Compartilhe conquistas, aprendizados e novidades com outros representantes.</p>
      </div>

      {/* Composer */}
      {me && (
        <div className="cw-card p-4 space-y-3">
          <div className="flex gap-3">
            <Avatar email={me.email} name={me.name} avatar={me.avatar} />
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submitPost(); }}
              placeholder="Compartilhe algo com a comunidade..."
              rows={3}
              className="flex-1 bg-cw-elevated border border-cw-border rounded-2xl px-4 py-3 text-sm text-cw-text placeholder:text-cw-muted resize-none focus:outline-none focus:border-cw-purple/60 transition-colors"
            />
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="relative ml-12 inline-block">
              <img src={imagePreview} className="h-32 rounded-xl object-cover" />
              <button onClick={removeImage} className="absolute -top-2 -right-2 h-6 w-6 bg-cw-text text-white rounded-full flex items-center justify-center">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between pl-12">
            <div className="flex items-center gap-1">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 text-xs font-semibold text-cw-muted hover:text-cw-purple px-2.5 py-1.5 rounded-lg hover:bg-cw-elevated transition-colors"
              >
                <ImageIcon className="h-4 w-4" /> Foto
              </button>
              <button
                onClick={() => setText('🏆 Conquista desbloqueada!\n\n')}
                className="flex items-center gap-1.5 text-xs font-semibold text-cw-muted hover:text-cw-yellow px-2.5 py-1.5 rounded-lg hover:bg-cw-elevated transition-colors"
              >
                <Trophy className="h-4 w-4" /> Conquista
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pickImage} />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-cw-muted">Ctrl + Enter</p>
              <button
                onClick={submitPost}
                disabled={!text.trim() || sending}
                className="flex items-center gap-1.5 bg-cw-purple hover:bg-cw-purple/80 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                {sending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                Publicar
              </button>
            </div>
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
          <p className="text-cw-muted text-sm">Nenhuma publicacao ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              me={me}
              onReact={toggleReaction}
              onDelete={deletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
