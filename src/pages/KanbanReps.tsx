import { useEffect, useState, useRef } from 'react';
import { Plus, User, Building2, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { CardPanel } from '@/components/kanban/CardPanel';

export const STAGES = [
  { id: 'Prospectado',       dot: 'bg-slate-400',   text: 'text-slate-700'  },
  { id: 'Preskit Enviado',   dot: 'bg-blue-400',    text: 'text-blue-700'   },
  { id: 'Em Negociacao',     dot: 'bg-amber-400',   text: 'text-amber-700'  },
  { id: 'Contrato Assinado', dot: 'bg-violet-400',  text: 'text-violet-700' },
  { id: 'Em Onboarding',     dot: 'bg-orange-400',  text: 'text-orange-700' },
  { id: 'Ativo',             dot: 'bg-green-400',   text: 'text-green-700'  },
];

export interface Rep {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  stage: string;
  posicao: number;
  created_at: string;
}

export default function KanbanReps() {
  const [reps, setReps]       = useState<Rep[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Rep | null>(null);
  const [addingIn, setAddingIn] = useState<string | null>(null);
  const [newNome, setNewNome]   = useState('');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('reps_pipeline')
      .select('*')
      .order('posicao', { ascending: true });
    setReps(data ?? []);
    setLoading(false);
  }

  async function addRep(stage: string) {
    if (!newNome.trim()) return;
    const posicao = reps.filter(r => r.stage === stage).length;
    const { data } = await supabase
      .from('reps_pipeline')
      .insert({ nome: newNome.trim(), stage, posicao })
      .select()
      .single();
    if (data) setReps(prev => [...prev, data as Rep]);
    setNewNome('');
    setAddingIn(null);
  }

  async function moveCard(cardId: string, toStage: string) {
    setReps(prev => prev.map(r => r.id === cardId ? { ...r, stage: toStage } : r));
    await supabase
      .from('reps_pipeline')
      .update({ stage: toStage, updated_at: new Date().toISOString() })
      .eq('id', cardId);
  }

  const byStage = (stage: string) => reps.filter(r => r.stage === stage);

  if (loading) return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-cw-purple border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col p-8" style={{ minHeight: '100%' }}>
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-black text-cw-text">Kanban de Representantes</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Gerencie o funil de captacao de novos representantes.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 mb-6 flex-shrink-0 flex-wrap">
        {STAGES.map(s => {
          const count = byStage(s.id).length;
          return (
            <div key={s.id} className="cw-card px-3 py-2 flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              <span className="text-cw-muted">{s.id}</span>
              <span className={`font-black ${s.text}`}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const cards = byStage(stage.id);
          const isOver = dragOver === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-[260px] flex flex-col rounded-2xl border transition-colors ${
                isOver ? 'border-cw-purple/50 bg-cw-purple/5' : 'bg-cw-elevated border-cw-border'
              }`}
              style={{ maxHeight: 'calc(100vh - 240px)' }}
              onDragOver={e => { e.preventDefault(); setDragOver(stage.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => {
                e.preventDefault();
                setDragOver(null);
                if (dragId.current && dragId.current !== stage.id) {
                  moveCard(dragId.current, stage.id);
                }
              }}
            >
              {/* Column header */}
              <div className="px-3 py-3 border-b border-cw-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${stage.dot}`} />
                  <span className={`text-xs font-bold ${stage.text}`}>{stage.id}</span>
                </div>
                <span className="text-[11px] text-cw-muted font-medium bg-white border border-cw-border rounded-full px-2 py-0.5">
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {cards.map(rep => (
                  <div
                    key={rep.id}
                    draggable
                    onDragStart={() => { dragId.current = rep.id; }}
                    onDragEnd={() => { dragId.current = null; setDragOver(null); }}
                    onClick={() => setSelected(rep)}
                    className="bg-white border border-cw-border rounded-xl p-3 cursor-pointer hover:border-cw-purple/40 hover:shadow-sm transition-all active:opacity-70 select-none"
                  >
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="h-7 w-7 rounded-lg bg-cw-purple/10 flex items-center justify-center shrink-0">
                        <User className="h-3.5 w-3.5 text-cw-purple" />
                      </div>
                      <p className="text-sm font-semibold text-cw-text leading-snug">{rep.nome}</p>
                    </div>
                    {rep.empresa && (
                      <div className="flex items-center gap-1.5 text-xs text-cw-muted pl-9">
                        <Building2 className="h-3 w-3 shrink-0" />
                        <span className="truncate">{rep.empresa}</span>
                      </div>
                    )}
                    {rep.email && (
                      <div className="flex items-center gap-1.5 text-xs text-cw-muted pl-9">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{rep.email}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add card */}
              <div className="p-2 border-t border-cw-border flex-shrink-0">
                {addingIn === stage.id ? (
                  <div className="space-y-1.5">
                    <input
                      autoFocus
                      value={newNome}
                      onChange={e => setNewNome(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') addRep(stage.id);
                        if (e.key === 'Escape') { setAddingIn(null); setNewNome(''); }
                      }}
                      placeholder="Nome do representante"
                      className="w-full text-sm px-2.5 py-2 border border-cw-purple/40 rounded-lg focus:outline-none focus:border-cw-purple bg-white"
                    />
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => addRep(stage.id)}
                        className="flex-1 text-xs font-semibold bg-cw-purple text-white rounded-lg py-1.5 hover:bg-cw-purple/80 transition-colors"
                      >
                        Adicionar
                      </button>
                      <button
                        onClick={() => { setAddingIn(null); setNewNome(''); }}
                        className="px-3 text-xs text-cw-muted hover:text-cw-text rounded-lg py-1.5 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingIn(stage.id)}
                    className="w-full flex items-center gap-1.5 text-xs text-cw-muted hover:text-cw-purple transition-colors px-2 py-1.5 rounded-lg hover:bg-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Adicionar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card detail panel */}
      <CardPanel
        rep={selected}
        stages={STAGES.map(s => s.id)}
        onClose={() => setSelected(null)}
        onUpdate={updated => {
          setReps(prev => prev.map(r => r.id === updated.id ? updated : r));
          setSelected(updated);
        }}
        onDelete={id => {
          setReps(prev => prev.filter(r => r.id !== id));
          setSelected(null);
        }}
      />
    </div>
  );
}
