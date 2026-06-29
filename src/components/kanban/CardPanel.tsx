import { useEffect, useState, useRef } from 'react';
import { X, Phone, Mail, Building2, MessageSquare, PhoneCall, MessageCircle, Video, Send, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Rep } from '@/pages/KanbanReps';

const ACTIVITY_TYPES = [
  { id: 'comment',  label: 'Nota',      Icon: MessageSquare },
  { id: 'ligacao',  label: 'Ligacao',   Icon: PhoneCall     },
  { id: 'whatsapp', label: 'WhatsApp',  Icon: MessageCircle },
  { id: 'email',    label: 'E-mail',    Icon: Mail          },
  { id: 'reuniao',  label: 'Reuniao',   Icon: Video         },
] as const;

interface Activity {
  id: string;
  card_id: string;
  type: string;
  content: string;
  author_name: string;
  author_email: string;
  created_at: string;
}

interface Props {
  rep: Rep | null;
  stages: string[];
  onClose: () => void;
  onUpdate: (rep: Rep) => void;
  onDelete: (id: string) => void;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return 'agora';
  if (diff < 3600)  return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function CardPanel({ rep, stages, onClose, onUpdate, onDelete }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [me, setMe]   = useState<{ name: string; email: string } | null>(null);
  const [actType, setActType]       = useState('comment');
  const [actContent, setActContent] = useState('');
  const [sending, setSending]       = useState(false);
  const [fields, setFields]         = useState<Partial<Rep>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const open = !!rep;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setMe({ name: u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? 'Equipe CW', email: u.email ?? '' });
    });
  }, []);

  useEffect(() => {
    if (!rep) return;
    setFields({ nome: rep.nome, email: rep.email, telefone: rep.telefone, empresa: rep.empresa });
    loadActivities(rep.id);
  }, [rep?.id]);

  async function loadActivities(cardId: string) {
    const { data } = await supabase
      .from('reps_pipeline_activities')
      .select('*')
      .eq('card_id', cardId)
      .order('created_at', { ascending: true });
    setActivities(data ?? []);
  }

  async function saveField(field: keyof Rep, value: string) {
    if (!rep) return;
    await supabase
      .from('reps_pipeline')
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq('id', rep.id);
    onUpdate({ ...rep, [field]: value });
  }

  async function changeStage(stage: string) {
    if (!rep || !me) return;
    const updated = { ...rep, stage };
    onUpdate(updated);
    await supabase.from('reps_pipeline').update({ stage, updated_at: new Date().toISOString() }).eq('id', rep.id);
    const { data } = await supabase.from('reps_pipeline_activities').insert({
      card_id: rep.id, type: 'comment',
      content: `Movido para "${stage}"`,
      author_name: me.name, author_email: me.email,
    }).select().single();
    if (data) {
      setActivities(prev => [...prev, data as Activity]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  async function addActivity() {
    if (!rep || !me || !actContent.trim()) return;
    setSending(true);
    const { data } = await supabase.from('reps_pipeline_activities').insert({
      card_id: rep.id,
      type: actType,
      content: actContent.trim(),
      author_name: me.name,
      author_email: me.email,
    }).select().single();
    if (data) {
      setActivities(prev => [...prev, data as Activity]);
      setActContent('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    setSending(false);
  }

  async function deleteRep() {
    if (!rep || !window.confirm(`Excluir ${rep.nome}?`)) return;
    await supabase.from('reps_pipeline').delete().eq('id', rep.id);
    onDelete(rep.id);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-[480px] max-w-[95vw] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {rep && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-cw-border flex-shrink-0">
              <input
                className="text-lg font-black text-cw-text flex-1 bg-transparent border-0 focus:outline-none"
                value={fields.nome ?? ''}
                onChange={e => setFields(p => ({ ...p, nome: e.target.value }))}
                onBlur={() => fields.nome?.trim() && saveField('nome', fields.nome.trim())}
              />
              <button
                onClick={deleteRep}
                className="p-1.5 rounded-lg text-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Excluir"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-cw-muted hover:text-cw-text hover:bg-cw-elevated transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Stage */}
              <div className="px-5 py-4 border-b border-cw-border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cw-muted mb-2">Etapa</p>
                <div className="flex flex-wrap gap-1.5">
                  {stages.map(s => (
                    <button
                      key={s}
                      onClick={() => changeStage(s)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                        rep.stage === s
                          ? 'bg-cw-purple text-white'
                          : 'bg-cw-elevated text-cw-muted hover:bg-cw-border hover:text-cw-text'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info fields */}
              <div className="px-5 py-4 border-b border-cw-border space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cw-muted">Informacoes</p>
                {(
                  [
                    { field: 'email',    Icon: Mail,      placeholder: 'E-mail'   },
                    { field: 'telefone', Icon: Phone,     placeholder: 'Telefone' },
                    { field: 'empresa',  Icon: Building2, placeholder: 'Empresa'  },
                  ] as { field: keyof Rep; Icon: React.ComponentType<{ className?: string }>; placeholder: string }[]
                ).map(({ field, Icon, placeholder }) => (
                  <div key={field} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-cw-muted shrink-0" />
                    <input
                      className="flex-1 text-sm text-cw-text bg-transparent border-b border-transparent focus:border-cw-purple/40 focus:outline-none py-0.5 transition-colors placeholder:text-cw-muted/40"
                      placeholder={placeholder}
                      value={(fields[field] as string) ?? ''}
                      onChange={e => setFields(p => ({ ...p, [field]: e.target.value }))}
                      onBlur={() => saveField(field, (fields[field] as string) ?? '')}
                    />
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cw-muted mb-3">Atividade</p>
                {activities.length === 0 ? (
                  <p className="text-sm text-cw-muted/50 text-center py-6">Nenhuma atividade ainda.</p>
                ) : (
                  <div className="space-y-4">
                    {activities.map(act => {
                      const TypeDef = ACTIVITY_TYPES.find(t => t.id === act.type) ?? ACTIVITY_TYPES[0];
                      const Icon = TypeDef.Icon;
                      return (
                        <div key={act.id} className="flex gap-3">
                          <div className="h-7 w-7 rounded-full bg-cw-elevated border border-cw-border flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="h-3.5 w-3.5 text-cw-purple" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                              <span className="text-xs font-semibold text-cw-text">{act.author_name}</span>
                              <span className="text-[10px] text-cw-muted">{TypeDef.label}</span>
                              <span className="text-[10px] text-cw-muted/60">{timeAgo(act.created_at)}</span>
                            </div>
                            <p className="text-sm text-cw-muted leading-relaxed">{act.content}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>
            </div>

            {/* Add activity */}
            <div className="px-5 py-4 border-t border-cw-border bg-cw-elevated flex-shrink-0">
              {/* Type tabs */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {ACTIVITY_TYPES.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActType(id)}
                    className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                      actType === id
                        ? 'bg-cw-purple text-white'
                        : 'bg-white border border-cw-border text-cw-muted hover:text-cw-text hover:border-cw-purple/30'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <div className="flex gap-2">
                <input
                  value={actContent}
                  onChange={e => setActContent(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addActivity(); }}
                  placeholder="Registrar atividade ou ponto de contato..."
                  className="flex-1 text-sm px-3 py-2 bg-white border border-cw-border rounded-xl focus:outline-none focus:border-cw-purple/60 transition-colors"
                />
                <button
                  onClick={addActivity}
                  disabled={!actContent.trim() || sending}
                  className="p-2.5 bg-cw-purple text-white rounded-xl hover:bg-cw-purple/80 disabled:opacity-40 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
