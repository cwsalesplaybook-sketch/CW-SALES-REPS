import { useState } from 'react';
import { CheckCircle2, Circle, ClipboardCheck, MessagesSquare, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ONBOARDING_PSM, REUNIAO_1_1_PERGUNTAS, AVALIACAO_APRESENTACAO,
} from '@/data/onboardingPsm';

const STORAGE_KEY = 'cw-psm-onboarding-checks';

function loadChecks(): Record<string, boolean> {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return saved;
  } catch { return {}; }
}

function defaultChecks(): Record<string, boolean> {
  const defaults: Record<string, boolean> = {};
  ONBOARDING_PSM.forEach((dia, di) => {
    dia.blocos.forEach((bloco, bi) => {
      bloco.itens.forEach((item, ii) => {
        defaults[`${di}-${bi}-${ii}`] = item.status;
      });
    });
  });
  return defaults;
}

type SubTab = 'checklist' | 'reuniao11' | 'avaliacao';

const SUBTABS: { id: SubTab; label: string; icon: typeof ClipboardCheck }[] = [
  { id: 'checklist', label: 'Checklist de Onboarding', icon: ClipboardCheck },
  { id: 'reuniao11', label: '1ª Reunião de 1:1', icon: MessagesSquare },
  { id: 'avaliacao', label: 'Avaliação da Apresentação', icon: ClipboardList },
];

function ChecklistTab() {
  const [checks, setChecks] = useState<Record<string, boolean>>(() => ({ ...defaultChecks(), ...loadChecks() }));

  const toggle = (id: string) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const allIds = ONBOARDING_PSM.flatMap((dia, di) =>
    dia.blocos.flatMap((bloco, bi) => bloco.itens.map((_, ii) => `${di}-${bi}-${ii}`)),
  );
  const total = allIds.length;
  const feitos = allIds.filter((id) => checks[id]).length;
  const pct = total ? Math.round((feitos / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="cw-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-cw-text">Progresso geral</span>
          <span className="text-sm font-black text-cw-purple">{feitos}/{total} concluídos</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-cw-elevated overflow-hidden">
          <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        {pct === 100 && (
          <p className="mt-3 text-sm font-bold text-green-600 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Onboarding concluído!
          </p>
        )}
      </div>

      <div className="space-y-6">
        {ONBOARDING_PSM.map((dia, di) => (
          <div key={dia.dia} className="cw-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg text-cw-purple bg-cw-purple/10">
                {dia.dia}
              </span>
            </div>
            <div className="space-y-5">
              {dia.blocos.map((bloco, bi) => (
                <div key={bloco.macrotopico + bi}>
                  <p className="text-sm font-bold text-cw-text">{bloco.macrotopico}</p>
                  {bloco.descricao && bloco.descricao !== bloco.macrotopico && (
                    <p className="text-xs text-cw-muted mb-2.5">{bloco.descricao}</p>
                  )}
                  <ul className="space-y-2.5 mt-2">
                    {bloco.itens.map((item, ii) => {
                      const id = `${di}-${bi}-${ii}`;
                      const done = !!checks[id];
                      return (
                        <li key={id} className="flex items-start gap-3">
                          <button
                            onClick={() => toggle(id)}
                            className="shrink-0 transition-colors mt-0.5"
                            aria-label={done ? 'Desmarcar' : 'Marcar como feito'}
                          >
                            {done
                              ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                              : <Circle className="h-5 w-5 text-cw-border hover:text-cw-purple transition-colors" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            {item.atividade && (
                              <p className={cn('text-sm', done ? 'line-through text-cw-muted' : 'text-cw-text')}>
                                {item.atividade}
                              </p>
                            )}
                            <p className={cn('text-xs whitespace-pre-line', done ? 'text-cw-muted/70' : 'text-cw-muted')}>
                              {item.acao}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reuniao11Tab() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="cw-card p-5">
        <h3 className="text-lg font-bold text-cw-text mb-2">1ª Reunião de 1:1</h3>
        <p className="text-sm text-cw-muted leading-relaxed">
          Use essa documentação para organizar a primeira reunião de 1:1 que você terá com seu líder.
        </p>
      </div>
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-muted uppercase tracking-widest mb-3">Perguntas gerais</p>
        <ol className="space-y-2.5 list-decimal list-inside">
          {REUNIAO_1_1_PERGUNTAS.map((p, i) => (
            <li key={i} className="text-sm text-cw-text/85 leading-relaxed">{p}</li>
          ))}
        </ol>
      </div>
      <div className="cw-card p-4">
        <p className="text-xs text-cw-muted">
          Campos <strong>Respostas</strong>, <strong>Profile</strong> e <strong>Pontos de atenção ao Profile da pessoa</strong> ficam em branco na planilha original, para preenchimento durante a reunião.
        </p>
      </div>
    </div>
  );
}

function AvaliacaoTab() {
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="cw-card p-5">
        <h3 className="text-lg font-bold text-cw-text mb-2">Avaliação da Apresentação de Onboarding</h3>
        <p className="text-sm text-cw-muted leading-relaxed">
          Aqui estão os critérios que serão cobrados durante a sua apresentação de onboarding para a liderança. A apresentação tem 8 tópicos principais para ser apresentada:
        </p>
        <ol className="mt-2 space-y-1 text-sm text-cw-text/85 list-decimal list-inside">
          <li>Explique o que é o E-commerce dos restaurantes</li>
          <li>Explicação dos Três Pilares</li>
          <li>Jornada do Representante</li>
          <li>Aplicando técnicas de vendas (SPIN)</li>
          <li>Métricas do Time do time de PSM</li>
          <li>Planos</li>
          <li>Módulos</li>
          <li>O que você considera um onboarding de sucesso?</li>
        </ol>
      </div>
      <div className="cw-card p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-cw">
          <table className="text-sm w-full min-w-[640px]">
            <thead>
              <tr className="bg-cw-elevated">
                <th className="px-4 py-2.5 text-left font-bold text-cw-text border-b border-cw-border">Critérios</th>
                <th className="px-4 py-2.5 text-left font-bold text-cw-text border-b border-cw-border">Descrição</th>
                <th className="px-4 py-2.5 text-left font-bold text-cw-text border-b border-cw-border">Nota</th>
                <th className="px-4 py-2.5 text-left font-bold text-cw-text border-b border-cw-border">Observações</th>
              </tr>
            </thead>
            <tbody>
              {AVALIACAO_APRESENTACAO.map((c, i) => (
                <tr key={c.criterio} className={i % 2 === 0 ? 'bg-cw-elevated/40' : ''}>
                  <td className="px-4 py-3 border-b border-cw-border/60 font-semibold text-cw-text align-top">{c.criterio}</td>
                  <td className="px-4 py-3 border-b border-cw-border/60 text-cw-muted align-top">{c.descricao}</td>
                  <td className="px-4 py-3 border-b border-cw-border/60 text-cw-muted italic align-top">—</td>
                  <td className="px-4 py-3 border-b border-cw-border/60 text-cw-muted italic align-top">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const [tab, setTab] = useState<SubTab>('checklist');

  return (
    <div className="p-8 space-y-6">
      <div className="inline-flex bg-cw-surface border border-cw-border rounded-xl p-1 flex-wrap gap-1">
        {SUBTABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5',
              tab === id ? 'gradient-primary text-white shadow' : 'text-cw-muted hover:text-cw-text',
            )}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {tab === 'checklist' && <ChecklistTab />}
      {tab === 'reuniao11' && <Reuniao11Tab />}
      {tab === 'avaliacao' && <AvaliacaoTab />}
    </div>
  );
}
