/** Meta — dashboard pessoal de OKRs do canal de Representantes.
 *  Objetivos e KRs seguem exatamente o ciclo atual. O progresso ("atual") é
 *  salvo no localStorage do navegador — não depende de login nem de backend,
 *  então funciona offline e não é compartilhado com outros usuários do app. */
import { useEffect, useState } from 'react';
import { Target, Check, X, Calendar, ChevronDown, Layers, CheckCircle2, Clock, BarChart2, Settings, Trash2, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KR {
  codigo: string;
  descricao: string;
  meta: number;
  unidade: string;
}

interface Objetivo {
  tag: string;
  titulo: string;
  krs: KR[];
}

const DEFAULT_OKRS: Objetivo[] = [
  {
    tag: '[CHN][REP]',
    titulo: 'Construir e engajar um novo GTM da Cardápio Web',
    krs: [
      { codigo: '8.8.1.1', descricao: 'Ativar 55 representantes no programa.', meta: 55, unidade: 'representantes' },
      { codigo: '8.8.1.2', descricao: 'Ter 73 respostas no NPS da certificação com nota maior que 70.', meta: 73, unidade: 'respostas' },
      { codigo: '8.8.1.3', descricao: 'Realizar 9 mentorias coletivas com os Reps.', meta: 9, unidade: 'mentorias' },
    ],
  },
  {
    tag: '[CHN][REP]',
    titulo: 'Impulsionar a receita do canal de representantes e garantir maior representatividade da base em cidades com mais de 30 clientes.',
    krs: [
      { codigo: '8.8.2.1', descricao: 'Fazer com que o canal de Representantes alcance 376 novos clientes para a base da CW.', meta: 376, unidade: 'novos clientes' },
      { codigo: '8.8.2.2', descricao: 'Atingir 112 novos clientes no total, considerando apenas cidades com base superior a 30 clientes.', meta: 112, unidade: 'novos clientes (cidades > 30)' },
    ],
  },
];

const STORAGE_KEY = 'aurora-okr-progresso';
const ESTRUTURA_KEY = 'aurora-okr-estrutura';

function carregarEstrutura(): Objetivo[] {
  try {
    const raw = localStorage.getItem(ESTRUTURA_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_OKRS;
  } catch { return DEFAULT_OKRS; }
}

interface Estado { valores: Record<string, number>; atualizadoEm: string | null }

function carregarEstado(): Estado {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { valores: {}, atualizadoEm: null };
    const parsed = JSON.parse(raw);
    return { valores: parsed.valores ?? {}, atualizadoEm: parsed.atualizadoEm ?? null };
  } catch { return { valores: {}, atualizadoEm: null }; }
}

function pct(atual: number, meta: number) {
  return meta > 0 ? Math.min(100, Math.max(0, (atual / meta) * 100)) : 0;
}

function formatarData(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

function ProgressRing({ pct: valor }: { pct: number }) {
  const size = 132, stroke = 11, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, valor)) / 100) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EFE4F4" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#FF2D8A" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-cw-text">{valor.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cw-border bg-cw-elevated px-3.5 py-3 flex items-center gap-2.5">
      <div className="h-9 w-9 rounded-xl bg-white border border-cw-border flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-cw-purple" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-cw-muted mb-0.5 truncate">{label}</p>
        <p className="text-base font-bold text-cw-text truncate">{value}</p>
      </div>
    </div>
  );
}

function EditorOKRs({ okrs, onSave, onClose }: { okrs: Objetivo[]; onSave: (o: Objetivo[]) => void; onClose: () => void }) {
  const [form, setForm] = useState<Objetivo[]>(() => okrs.map((o) => ({ ...o, krs: o.krs.map((k) => ({ ...k })) })));

  const updateObjetivo = (i: number, patch: Partial<Objetivo>) =>
    setForm((f) => f.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));

  const updateKR = (i: number, j: number, patch: Partial<KR>) =>
    setForm((f) => f.map((o, idx) => (idx !== i ? o : { ...o, krs: o.krs.map((k, kj) => (kj === j ? { ...k, ...patch } : k)) })));

  const addKR = (i: number) =>
    setForm((f) => f.map((o, idx) => (idx !== i ? o : { ...o, krs: [...o.krs, { codigo: '', descricao: 'Novo KR', meta: 0, unidade: '' }] })));

  const removeKR = (i: number, j: number) =>
    setForm((f) => f.map((o, idx) => (idx !== i ? o : { ...o, krs: o.krs.filter((_, kj) => kj !== j) })));

  const addObjetivo = () =>
    setForm((f) => [...f, { tag: '[CHN][REP]', titulo: 'Novo objetivo', krs: [] }]);

  const removeObjetivo = (i: number) =>
    setForm((f) => f.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="shrink-0 border-b border-cw-border px-6 py-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-cw-text">Editar OKRs</h3>
          <button onClick={onClose} title="Fechar" className="h-8 w-8 rounded-full border border-cw-border text-cw-muted hover:text-cw-text flex items-center justify-center transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {form.map((obj, i) => (
            <div key={i} className="rounded-2xl border border-cw-border p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <input
                  value={obj.tag}
                  onChange={(e) => updateObjetivo(i, { tag: e.target.value })}
                  placeholder="Tag"
                  className="w-32 text-xs font-semibold text-cw-purple bg-cw-purple/10 rounded-full px-2.5 py-1.5 focus:outline-none"
                />
                <button onClick={() => removeObjetivo(i)} className="text-xs font-semibold text-cw-red hover:underline shrink-0 flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Remover objetivo
                </button>
              </div>
              <textarea
                value={obj.titulo}
                onChange={(e) => updateObjetivo(i, { titulo: e.target.value })}
                placeholder="Título do objetivo"
                className="w-full min-h-[50px] bg-cw-elevated border border-cw-border rounded-xl px-3 py-2 text-sm text-cw-text focus:outline-none focus:border-cw-purple"
              />

              <div className="space-y-2">
                {obj.krs.map((kr, j) => (
                  <div key={j} className="grid grid-cols-[70px_1fr_60px_1fr_28px] gap-1.5 items-center">
                    <input
                      value={kr.codigo}
                      onChange={(e) => updateKR(i, j, { codigo: e.target.value })}
                      placeholder="Código"
                      className="bg-cw-elevated border border-cw-border rounded-lg px-2 py-1.5 text-xs text-cw-text focus:outline-none focus:border-cw-purple min-w-0"
                    />
                    <input
                      value={kr.descricao}
                      onChange={(e) => updateKR(i, j, { descricao: e.target.value })}
                      placeholder="Descrição"
                      className="bg-cw-elevated border border-cw-border rounded-lg px-2 py-1.5 text-xs text-cw-text focus:outline-none focus:border-cw-purple min-w-0"
                    />
                    <input
                      type="number"
                      min={0}
                      value={kr.meta}
                      onChange={(e) => updateKR(i, j, { meta: Number(e.target.value) || 0 })}
                      placeholder="Meta"
                      className="bg-cw-elevated border border-cw-border rounded-lg px-2 py-1.5 text-xs text-cw-text focus:outline-none focus:border-cw-purple min-w-0"
                    />
                    <input
                      value={kr.unidade}
                      onChange={(e) => updateKR(i, j, { unidade: e.target.value })}
                      placeholder="Unidade"
                      className="bg-cw-elevated border border-cw-border rounded-lg px-2 py-1.5 text-xs text-cw-text focus:outline-none focus:border-cw-purple min-w-0"
                    />
                    <button onClick={() => removeKR(i, j)} title="Remover KR" className="h-7 w-7 rounded-lg border border-cw-red/30 text-cw-red hover:bg-cw-red/10 flex items-center justify-center shrink-0">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addKR(i)} className="text-xs font-semibold text-cw-purple hover:underline flex items-center gap-1">
                <Plus className="h-3 w-3" /> Adicionar KR
              </button>
            </div>
          ))}

          <button onClick={addObjetivo} className="w-full py-2.5 rounded-xl border border-dashed border-cw-purple/40 text-xs font-semibold text-cw-purple hover:bg-cw-purple/5 flex items-center justify-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Adicionar objetivo
          </button>
        </div>

        <div className="shrink-0 border-t border-cw-border px-6 py-4">
          <button onClick={() => onSave(form)} className="w-full py-3 rounded-xl font-bold text-sm text-white bg-cw-purple hover:opacity-90 transition-opacity">
            Salvar OKRs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Meta() {
  const [estado, setEstado] = useState<Estado>({ valores: {}, atualizadoEm: null });
  const [okrs, setOkrs] = useState<Objetivo[]>(DEFAULT_OKRS);
  const [editando, setEditando] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [editandoOKRs, setEditandoOKRs] = useState(false);

  useEffect(() => {
    setEstado(carregarEstado());
    setOkrs(carregarEstrutura());
  }, []);

  const salvar = (codigo: string, valor: number) => {
    const next: Estado = {
      valores: { ...estado.valores, [codigo]: valor },
      atualizadoEm: new Date().toISOString(),
    };
    setEstado(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setEditando(null);
  };

  const salvarEstrutura = (next: Objetivo[]) => {
    setOkrs(next);
    localStorage.setItem(ESTRUTURA_KEY, JSON.stringify(next));
    setEditandoOKRs(false);
  };

  const todosKRs = okrs.flatMap((o) => o.krs);
  const progressoGeral = todosKRs.length > 0
    ? todosKRs.reduce((s, k) => s + pct(estado.valores[k.codigo] ?? 0, k.meta), 0) / todosKRs.length
    : 0;
  const concluidos = todosKRs.filter((k) => (estado.valores[k.codigo] ?? 0) >= k.meta).length;

  return (
    <div className="p-8 lg:p-10 space-y-8 w-full">
      {editandoOKRs && (
        <EditorOKRs okrs={okrs} onSave={salvarEstrutura} onClose={() => setEditandoOKRs(false)} />
      )}

      {/* Resumo executivo */}
      <div className="relative overflow-hidden rounded-[20px] border border-cw-border bg-white shadow-[0_1px_2px_rgba(26,10,46,0.04)] p-8 lg:p-10">
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-cw-text">Meta Geral</h2>
            <button
              onClick={() => setEditandoOKRs(true)}
              title="Editar OKRs"
              className="h-7 w-7 rounded-lg border border-cw-border text-cw-muted hover:text-cw-purple hover:border-cw-purple/30 flex items-center justify-center transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-cw-text bg-white border border-cw-border rounded-full px-4 py-2 shadow-[0_1px_2px_rgba(26,10,46,0.04)]">
            <Calendar className="h-3.5 w-3.5 text-cw-purple" />
            Ciclo atual
            <ChevronDown className="h-3.5 w-3.5 text-cw-muted" />
          </span>
        </div>

        <div className="relative z-10 flex flex-nowrap items-center gap-8 overflow-hidden">
          <ProgressRing pct={progressoGeral} />

          <div className="max-w-[230px] shrink-0">
            <p className="text-6xl font-bold text-cw-purple leading-none">{progressoGeral.toFixed(0)}%</p>
            <p className="text-sm font-medium text-cw-text mt-2.5">da meta geral do ciclo</p>
            <p className="text-sm text-cw-muted mt-1 whitespace-nowrap">Foco total para atingirmos nossa meta.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 shrink-0">
            <MiniStat icon={Target} label="Objetivos" value={String(okrs.length)} />
            <MiniStat icon={Layers} label="KRs no ciclo" value={String(todosKRs.length)} />
            <MiniStat icon={CheckCircle2} label="KRs concluídos" value={`${concluidos} / ${todosKRs.length}`} />
            <MiniStat icon={Clock} label="Última atualização" value={formatarData(estado.atualizadoEm)} />
          </div>

          <img
            src="/onca-metas.png"
            alt=""
            aria-hidden
            className="hidden lg:block ml-auto shrink-0 h-[200px] w-auto object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Objetivos */}
      <div className="space-y-6">
        {okrs.map((obj, objIdx) => (
          <div
            key={objIdx}
            className="rounded-[20px] border border-cw-border bg-white shadow-[0_1px_2px_rgba(26,10,46,0.04)] p-8 hover:shadow-[0_4px_16px_rgba(26,10,46,0.06)] transition-shadow duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="h-10 w-10 rounded-2xl bg-cw-purple/10 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-cw-purple" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block text-[11px] font-semibold text-cw-purple bg-cw-purple/10 rounded-full px-2.5 py-1 mb-1">
                    {obj.tag}
                  </span>
                  <h3 className="text-base font-semibold text-cw-text leading-snug">{obj.titulo}</h3>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-cw-muted bg-cw-elevated border border-cw-border rounded-full px-3.5 py-1.5">
                {obj.krs.length} métricas
              </span>
            </div>

            <div className="divide-y divide-cw-border/70 -mx-2">
              {obj.krs.map((kr, krIdx) => {
                const atual = estado.valores[kr.codigo] ?? 0;
                const p = pct(atual, kr.meta);
                const batida = atual >= kr.meta;
                const emEdicao = editando === kr.codigo;
                return (
                  <div
                    key={`${objIdx}-${krIdx}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 px-2 rounded-2xl hover:bg-cw-elevated/60 transition-colors duration-150"
                  >
                    <span className="shrink-0 self-start sm:self-center text-[11px] font-semibold text-cw-purple bg-cw-purple/10 rounded-full px-2.5 py-1">
                      KR {kr.codigo}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cw-text leading-snug mb-2.5">{kr.descricao}</p>
                      <div className="h-1.5 w-full bg-cw-border/70 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-700 ease-out', batida ? 'bg-green-500' : 'bg-cw-purple')}
                          style={{ width: `${p}%` }}
                        />
                      </div>
                    </div>

                    <span className="hidden sm:block text-xl font-bold text-cw-purple shrink-0 tabular-nums w-16 text-right">
                      {p.toFixed(0)}%
                    </span>

                    {emEdicao ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          min={0}
                          autoFocus
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') salvar(kr.codigo, Number(draft) || 0);
                            if (e.key === 'Escape') setEditando(null);
                          }}
                          className="w-20 bg-white border border-cw-purple rounded-[14px] px-2.5 py-1.5 text-sm text-cw-text text-right focus:outline-none"
                        />
                        <button onClick={() => salvar(kr.codigo, Number(draft) || 0)} title="Salvar" className="h-8 w-8 rounded-[14px] border border-green-200 bg-white text-green-600 hover:bg-green-50 flex items-center justify-center transition-colors">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setEditando(null)} title="Cancelar" className="h-8 w-8 rounded-[14px] border border-cw-border bg-white text-cw-muted hover:text-cw-text flex items-center justify-center transition-colors">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="text-lg font-bold text-cw-text leading-none">
                            {atual}<span className="text-cw-muted font-medium"> / {kr.meta}</span>
                          </p>
                          <p className="text-xs text-cw-muted mt-1">{kr.unidade}</p>
                        </div>
                        <button
                          onClick={() => { setEditando(kr.codigo); setDraft(String(atual)); }}
                          title="Atualizar progresso"
                          className="h-8 w-8 rounded-[14px] border border-cw-border bg-white text-cw-muted hover:text-cw-purple hover:border-cw-purple/30 flex items-center justify-center transition-colors shrink-0"
                        >
                          <BarChart2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-cw-muted/70">
        O progresso é salvo neste navegador (não sincroniza entre dispositivos).
      </p>
    </div>
  );
}
