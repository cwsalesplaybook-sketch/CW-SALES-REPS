import type { LucideIcon } from 'lucide-react';
import {
  Target, Clock, GraduationCap, KeyRound, BookOpenCheck, Megaphone,
  Users, Filter, DollarSign, Receipt, Timer,
  Repeat, Wallet, TrendingDown, PieChart, Gem,
} from 'lucide-react';

interface Metrica { label: string; icon: LucideIcon }
interface Categoria { titulo: string; descricao: string; cor: 'purple' | 'green' | 'blue'; metricas: Metrica[] }

const CATEGORIAS: Categoria[] = [
  {
    titulo: 'Ativação e engajamento',
    descricao: 'Como os representantes estão sendo ativados e engajados com o canal.',
    cor: 'purple',
    metricas: [
      { label: 'Tempo médio de onboarding', icon: Clock },
      { label: '% do canal treinado', icon: GraduationCap },
      { label: 'Taxa de acesso ao portal', icon: KeyRound },
      { label: 'Consumo dos materiais de capacitação', icon: BookOpenCheck },
      { label: 'Número de ações de co-marketing realizadas', icon: Megaphone },
    ],
  },
  {
    titulo: 'Performance comercial',
    descricao: 'Volume e qualidade das vendas geradas pelo canal de representantes.',
    cor: 'green',
    metricas: [
      { label: 'Volume de leads indicados', icon: Users },
      { label: 'Taxa de conversão por etapa do funil', icon: Filter },
      { label: 'Valor total de vendas', icon: DollarSign },
      { label: 'Ticket médio das oportunidades', icon: Receipt },
      { label: 'Ciclo de vendas no canal', icon: Timer },
    ],
  },
  {
    titulo: 'Indicadores financeiros e de retenção',
    descricao: 'Receita, rentabilidade e retenção dos clientes trazidos pelo canal.',
    cor: 'blue',
    metricas: [
      { label: 'Geração de receita recorrente', icon: Repeat },
      { label: 'Comissões pagas', icon: Wallet },
      { label: 'Margem gerada por canal', icon: PieChart },
      { label: 'Taxa de churn dos clientes vindos do parceiro', icon: TrendingDown },
      { label: 'CLV (Customer Lifetime Value) por canal', icon: Gem },
    ],
  },
];

const CORES = {
  purple: { bg: 'bg-cw-purple/10', border: 'border-cw-purple/20', text: 'text-cw-purple', icon: 'text-cw-purple' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-600' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
} as const;

export default function Meta() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Meta do Mês</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Estrutura de indicadores do canal de representantes. A integração com dados em tempo real ainda será configurada — por ora, os valores aparecem como "Em breve".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {CATEGORIAS.map((cat) => {
          const cor = CORES[cat.cor];
          return (
            <div key={cat.titulo} className="cw-card p-5">
              <div className={`rounded-xl border ${cor.border} ${cor.bg} px-3.5 py-3 mb-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <Target className={`h-4 w-4 ${cor.icon}`} />
                  <h2 className={`text-sm font-black ${cor.text}`}>{cat.titulo}</h2>
                </div>
                <p className="text-xs text-cw-muted leading-snug">{cat.descricao}</p>
              </div>
              <div className="space-y-2">
                {cat.metricas.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-3 rounded-xl border border-cw-border bg-cw-elevated px-3.5 py-3">
                      <div className={`h-8 w-8 rounded-lg ${cor.bg} border ${cor.border} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${cor.icon}`} />
                      </div>
                      <span className="text-sm text-cw-text flex-1 leading-snug">{m.label}</span>
                      <span className="text-xs font-bold text-cw-muted shrink-0">—</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
