/** Meta — dashboard pessoal de OKRs do canal de Representantes.
 *  Objetivos e KRs seguem exatamente o ciclo atual. O progresso ("atual") é
 *  salvo no localStorage do navegador — não depende de login nem de backend,
 *  então funciona offline e não é compartilhado com outros usuários do app. */
import { useEffect, useState } from 'react';
import { Target, Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KR {
  codigo: string;
  descricao: string;
  meta: number;
  unidade: string;
}

interface Objetivo {
  titulo: string;
  krs: KR[];
}

const OKRS: Objetivo[] = [
  {
    titulo: '[CHN][REP] Construir e engajar um novo GTM da Cardápio Web',
    krs: [
      { codigo: '8.8.1.1', descricao: 'Ativar 55 representantes no programa.', meta: 55, unidade: 'representantes' },
      { codigo: '8.8.1.2', descricao: 'Ter 73 respostas no NPS da certificação com nota maior que 70.', meta: 73, unidade: 'respostas' },
      { codigo: '8.8.1.3', descricao: 'Realizar 9 mentorias coletivas com os Reps.', meta: 9, unidade: 'mentorias' },
    ],
  },
  {
    titulo: '[CHN][REP] Impulsionar a receita do canal de representantes e garantir maior representatividade da base em cidades com mais de 30 clientes.',
    krs: [
      { codigo: '8.8.2.1', descricao: 'Fazer com que o canal de Representantes alcance 376 novos clientes para a base da CW.', meta: 376, unidade: 'novos clientes' },
      { codigo: '8.8.2.2', descricao: 'Atingir 112 novos clientes no total, considerando apenas cidades com base superior a 30 clientes.', meta: 112, unidade: 'novos clientes (cidades > 30)' },
    ],
  },
];

const STORAGE_KEY = 'aurora-okr-progresso';

function carregarProgresso(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function pct(atual: number, meta: number) {
  return meta > 0 ? Math.min(100, Math.max(0, (atual / meta) * 100)) : 0;
}

export default function Meta() {
  const [progresso, setProgresso] = useState<Record<string, number>>({});
  const [editando, setEditando] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  useEffect(() => { setProgresso(carregarProgresso()); }, []);

  const salvar = (codigo: string, valor: number) => {
    const next = { ...progresso, [codigo]: valor };
    setProgresso(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setEditando(null);
  };

  const todosKRs = OKRS.flatMap((o) => o.krs);
  const progressoGeral = todosKRs.length > 0
    ? todosKRs.reduce((s, k) => s + pct(progresso[k.codigo] ?? 0, k.meta), 0) / todosKRs.length
    : 0;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="cw-card p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-cw-purple uppercase tracking-widest mb-3">
          <Target className="h-4 w-4" /> OKRs · Canal de Representantes
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black text-cw-purple">{progressoGeral.toFixed(0)}%</span>
          <span className="text-sm text-cw-muted font-bold">da meta geral do ciclo</span>
        </div>
        <div className="mt-3 w-full h-1.5 bg-cw-border rounded-full overflow-hidden">
          <div className="h-full bg-cw-purple rounded-full transition-all duration-700" style={{ width: `${progressoGeral}%` }} />
        </div>
      </div>

      <div className="space-y-5">
        {OKRS.map((obj) => (
          <div key={obj.titulo} className="cw-card p-5">
            <div className="rounded-xl border border-cw-purple/20 bg-cw-purple/10 px-3.5 py-3 mb-4 flex items-start gap-2">
              <Target className="h-4 w-4 text-cw-purple shrink-0 mt-0.5" />
              <h2 className="text-sm font-black text-cw-purple leading-snug">{obj.titulo}</h2>
            </div>

            <div className="space-y-2">
              {obj.krs.map((kr) => {
                const atual = progresso[kr.codigo] ?? 0;
                const p = pct(atual, kr.meta);
                const batida = atual >= kr.meta;
                const emEdicao = editando === kr.codigo;
                return (
                  <div key={kr.codigo} className="flex items-center gap-3 rounded-xl border border-cw-border bg-cw-elevated px-3.5 py-3">
                    <div className="shrink-0 text-[10px] font-bold text-cw-purple bg-cw-purple/10 border border-cw-purple/20 rounded-md px-2 py-1">
                      KR {kr.codigo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cw-text leading-snug">{kr.descricao}</p>
                      <div className="mt-1.5 h-1.5 w-full max-w-[260px] bg-cw-border rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full transition-all duration-700', batida ? 'bg-green-500' : 'bg-cw-purple')} style={{ width: `${p}%` }} />
                      </div>
                    </div>
                    {emEdicao ? (
                      <div className="flex items-center gap-1 shrink-0">
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
                          className="w-20 bg-white border border-cw-purple rounded-lg px-2 py-1 text-sm text-cw-text text-right focus:outline-none"
                        />
                        <button onClick={() => salvar(kr.codigo, Number(draft) || 0)} title="Salvar" className="h-7 w-7 rounded-lg border border-green-300 bg-white text-green-600 hover:bg-green-50 flex items-center justify-center">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setEditando(null)} title="Cancelar" className="h-7 w-7 rounded-lg border border-cw-border bg-white text-cw-muted hover:text-cw-text flex items-center justify-center">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right shrink-0">
                          <p className="text-base font-black text-cw-text leading-none">
                            {atual}<span className="text-xs text-cw-muted font-normal"> / {kr.meta}</span>
                          </p>
                          <p className="text-[10px] text-cw-muted mt-0.5">{kr.unidade}</p>
                        </div>
                        <button
                          onClick={() => { setEditando(kr.codigo); setDraft(String(atual)); }}
                          title="Atualizar progresso"
                          className="h-7 w-7 rounded-lg border border-cw-border bg-white text-cw-muted hover:text-cw-purple flex items-center justify-center shrink-0"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </>
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
