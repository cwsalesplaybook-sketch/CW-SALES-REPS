import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ClipboardCheck, BookOpen, Users2, BarChart2, Target, Video, MessageSquare, UserCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ETAPAS = [
  {
    dia: 'Dia 1',
    cor: 'text-cw-purple',
    bg: 'bg-cw-purple/10',
    passos: [
      { id: 'boas-vindas',  Icon: Video,        label: 'Assista ao vídeo de boas-vindas no Comece Aqui',    to: '/start'      },
      { id: 'comunidade',   Icon: Users2,        label: 'Apresente-se na Comunidade com uma mensagem',       to: '/comunidade' },
      { id: 'time',         Icon: UserCheck,     label: 'Conheça o time: Glauton, Rafael, Hyorranes e Gabi', to: '/start'      },
    ],
  },
  {
    dia: 'Dia 2 – 3',
    cor: 'text-blue-600',
    bg: 'bg-blue-50',
    passos: [
      { id: 'playbook',    Icon: BookOpen,   label: 'Leia os 4 artigos do Playbook de representantes', to: '/playbook'  },
      { id: 'pipeline',    Icon: BarChart2,  label: 'Configure seu acesso ao Pipedrive e explore o Pipeline', to: '/pipeline' },
      { id: 'meta',        Icon: Target,     label: 'Entenda como funciona a Meta do Mês',             to: '/meta'      },
    ],
  },
  {
    dia: 'Semana 1',
    cor: 'text-green-600',
    bg: 'bg-green-50',
    passos: [
      { id: 'primeira-venda', Icon: ClipboardCheck, label: 'Registre sua primeira oportunidade no Pipeline', to: '/pipeline'  },
      { id: 'duvidas',        Icon: MessageSquare,  label: 'Tire dúvidas com seu líder na Comunidade',       to: '/comunidade' },
    ],
  },
];

const STORAGE_KEY = 'cw-rep-onboarding-checks';

function loadChecks(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
}

export default function Onboarding() {
  const [checks, setChecks] = useState<Record<string, boolean>>(loadChecks);

  const toggle = (id: string) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const total  = ETAPAS.flatMap(e => e.passos).length;
  const feitos = Object.values(checks).filter(Boolean).length;
  const pct    = Math.round((feitos / total) * 100);

  return (
    <div className="p-8 max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-cw-text">Onboarding</h1>
        <p className="text-sm text-cw-muted mt-0.5">Seu guia de primeiros passos como representante de canal.</p>
      </div>

      {/* Barra de progresso */}
      <div className="cw-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-cw-text">Progresso geral</span>
          <span className="text-sm font-black text-cw-purple">{feitos}/{total} concluídos</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-cw-elevated overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="mt-3 text-sm font-bold text-green-600 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Onboarding concluído! Bora vender.
          </p>
        )}
      </div>

      {/* Etapas */}
      <div className="space-y-6">
        {ETAPAS.map(etapa => (
          <div key={etapa.dia} className="cw-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={cn('text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg', etapa.cor, etapa.bg)}>
                {etapa.dia}
              </span>
            </div>
            <ul className="space-y-2.5">
              {etapa.passos.map(({ id, Icon, label, to }) => {
                const done = !!checks[id];
                return (
                  <li key={id} className="flex items-center gap-3">
                    <button
                      onClick={() => toggle(id)}
                      className="shrink-0 transition-colors"
                      aria-label={done ? 'Desmarcar' : 'Marcar como feito'}
                    >
                      {done
                        ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                        : <Circle className="h-5 w-5 text-cw-border hover:text-cw-purple transition-colors" />
                      }
                    </button>
                    <Icon className={cn('h-4 w-4 shrink-0', done ? 'text-cw-muted' : 'text-cw-purple')} />
                    <NavLink
                      to={to}
                      className={cn(
                        'text-sm flex-1 transition-colors',
                        done
                          ? 'line-through text-cw-muted'
                          : 'text-cw-text hover:text-cw-purple'
                      )}
                    >
                      {label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
