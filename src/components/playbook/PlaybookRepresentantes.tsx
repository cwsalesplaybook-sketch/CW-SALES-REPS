/** Playbook de Representantes — mesma estrutura visual do Playbook de SDR
 *  (abas com Tabs/TabsList), com conteudo real onde ja existe material
 *  generico (Cultura, Produto, Planos, Concorrentes, Cargos, ICP, Hacks,
 *  Objecoes, Motivos de Perda) e "Em construcao" onde falta conteudo
 *  especifico de representantes (Territorio, Abordagem, Negociacao, Fechamento).
 *
 *  Vários grupos de abas que antes viviam aqui (Templates de mensagens, FAQ,
 *  Materiais, Estrutura, Funis, Jornada do Representante e Progressão de
 *  Carreira) foram promovidos para páginas de primeiro nível na sidebar —
 *  ver `src/pages/Templates.tsx`, `FaqPage.tsx`, `Materiais.tsx`,
 *  `Estrutura.tsx`, `FunilProspeccao.tsx`, `FunilClientes.tsx`,
 *  `JornadaRepresentante.tsx` e `ProgressaoCarreira.tsx`. Esta aba mantém
 *  apenas o material de referência principal do time de representantes. */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase, Target, Lightbulb, Swords, XCircle, ExternalLink,
  Compass, Box, Rocket, FolderKanban, Bot, TrendingUp, Puzzle, Headphones,
  Flag, Megaphone, Repeat, Handshake, ChevronRight, Shuffle, Lock,
  Crosshair, Radar,
  type LucideIcon,
} from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { HACKS, PLAYBOOK_URL } from '@/data/playbook';
import {
  IPP, MATRIZ_OBJECOES_REP, FUNCOES_REP, MOTIVOS_PERDA_REP,
} from '@/data/playbookReps';
import CulturaEstrategia from './CulturaEstrategia';
import { PlaybookProduto } from './PlaybookProduto';
import {
  PlaybookPrimeirosPassos, PlaybookGestaoCW, PlaybookAutomacaoCW,
  PlaybookAumentoVendasCW, PlaybookModulosCW, PlaybookSuporteCW,
} from './PlaybookSistemaTopicos';
import { PlaybookPassagemBastao, PlaybookRotinaAquisicao } from './PlaybookProcessos';
import { PlaybookSpin, PlaybookAida } from './PlaybookMetodologias';

type Cor = 'purple' | 'blue' | 'green' | 'orange' | 'teal' | 'red' | 'yellow' | 'pink' | 'gray';

const CORES: Record<Cor, { bg: string; text: string }> = {
  purple: { bg: 'bg-cw-purple/15', text: 'text-cw-purple' },
  blue:   { bg: 'bg-blue-100',     text: 'text-blue-600' },
  green:  { bg: 'bg-emerald-100',  text: 'text-emerald-600' },
  orange: { bg: 'bg-orange-100',   text: 'text-orange-600' },
  teal:   { bg: 'bg-teal-100',     text: 'text-teal-600' },
  red:    { bg: 'bg-red-100',      text: 'text-red-600' },
  yellow: { bg: 'bg-amber-100',    text: 'text-amber-600' },
  pink:   { bg: 'bg-pink-100',     text: 'text-pink-600' },
  gray:   { bg: 'bg-gray-100',     text: 'text-gray-600' },
};

const TABS: { id: string; label: string; icon: LucideIcon; cor: Cor }[] = [
  { id: 'cultura',          label: 'Cultura & Estratégia', icon: Compass,     cor: 'purple' },
  { id: 'produto',          label: 'Produto',              icon: Box,         cor: 'blue' },
  { id: 'primeiros-passos', label: 'Primeiros Passos',     icon: Rocket,      cor: 'green' },
  { id: 'gestao-cw',        label: 'Gestão',                icon: FolderKanban, cor: 'orange' },
  { id: 'automacao-cw',     label: 'Automação',            icon: Bot,         cor: 'teal' },
  { id: 'vendas-cw',        label: 'Aumento de Vendas',    icon: TrendingUp,  cor: 'green' },
  { id: 'modulos-cw',       label: 'Módulos do Sistema',   icon: Puzzle,      cor: 'purple' },
  { id: 'suporte-cw',       label: 'Suporte',              icon: Headphones,  cor: 'gray' },
  { id: 'territorio',       label: 'Território',           icon: Flag,        cor: 'red' },
  { id: 'cargos',           label: 'Funções',              icon: Briefcase,   cor: 'purple' },
  { id: 'icp',              label: 'IPP / Perfil Ideal de Parceiro', icon: Target, cor: 'red' },
  { id: 'passagem-bastao',   label: 'Passagem de Bastão',  icon: Shuffle,     cor: 'orange' },
  { id: 'spin',             label: 'SPIN Selling',         icon: Crosshair,   cor: 'purple' },
  { id: 'aida',             label: 'AIDA',                 icon: Radar,       cor: 'red' },
  { id: 'abordagem',        label: 'Abordagem',            icon: Megaphone,   cor: 'purple' },
  { id: 'negociacao',       label: 'Negociação',           icon: Repeat,      cor: 'pink' },
  { id: 'hacks',            label: 'Hacks',                icon: Lightbulb,   cor: 'yellow' },
  { id: 'objecoes',         label: 'Matriz de Objeções',   icon: Swords,      cor: 'red' },
  { id: 'fechamento',       label: 'Fechamento',           icon: Handshake,   cor: 'pink' },
  { id: 'perda',            label: 'Motivos de Perda',     icon: XCircle,     cor: 'red' },
  { id: 'rotina-aquisicao', label: 'Rotina Aquisição',     icon: Lock,        cor: 'gray' },
];

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

function SheetLink({ label }: { label: string }) {
  return (
    <a
      href={PLAYBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-cw-purple-light hover:text-cw-yellow transition-colors mt-2"
    >
      {label} <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function EmBreve() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-cw-purple/10 border border-cw-purple/20 flex items-center justify-center">
        <span className="text-3xl">🚧</span>
      </div>
      <h3 className="text-lg font-bold text-cw-text">Em construção</h3>
      <p className="text-sm text-cw-muted max-w-xs leading-relaxed">
        O conteúdo do <strong>Playbook de Representantes</strong> ainda está sendo preparado pela liderança. Em breve estará disponível!
      </p>
    </div>
  );
}

function Cargos() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">Funções</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Nessa área você vai encontrar as definições de cada profissional do processo.
        </p>
      </SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FUNCOES_REP.map((c) => (
          <SectionCard key={c.nome}>
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-cw-text text-sm">{c.nome}</h4>
            </div>
            {c.descricao ? (
              <p className="text-sm text-cw-muted leading-relaxed">{c.descricao}</p>
            ) : (
              <p className="text-xs text-cw-muted italic">Descrição ainda não preenchida pela liderança na planilha oficial.</p>
            )}
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

function Icp() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">Perfil Ideal de Parceiro (IPP)</h3>
        </div>
        <p className="text-cw-muted leading-relaxed text-sm">
          Esta aba tem como objetivo documentar o perfil ideal de parceiro (representante).
        </p>
      </SectionCard>
      <div className="cw-card p-5">
        <p className="text-sm text-cw-text/85 leading-relaxed mb-4">{IPP.perfil}</p>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Características esperadas</p>
        <ul className="space-y-1.5 mb-4">
          {IPP.caracteristicas.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-cw-purple mt-1.5 shrink-0" />{c}
            </li>
          ))}
        </ul>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Diferenciais desejáveis</p>
        <ul className="space-y-1.5 mb-4">
          {IPP.diferenciaisDesejaveis.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-cw-purple mt-1.5 shrink-0" />{c}
            </li>
          ))}
        </ul>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Diferenciais competitivos (opcional, mas estratégico)</p>
        <ul className="space-y-1.5">
          {IPP.diferenciaisCompetitivos.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-cw-purple mt-1.5 shrink-0" />{c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Hacks() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-cw-yellow" />
          <h3 className="text-lg font-bold">Hacks de Pré-vendas</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Técnicas e scripts práticos para lidar com situações específicas durante indicação e negociação.
        </p>
      </SectionCard>
      <div className="space-y-4">
        {HACKS.map((hack, i) => (
          <div key={i} className="cw-card cw-card-hover p-5 border-l-4 border-l-cw-yellow/70">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cw-yellow/15 text-cw-yellow border border-cw-yellow/40">
                Hack {i + 1}
              </span>
              <h4 className="font-bold text-cw-text text-sm">{hack.titulo}</h4>
            </div>
            <p className="text-xs text-cw-muted mb-3 italic">{hack.contexto}</p>
            <div className="border-l-2 border-cw-purple pl-3">
              <p className="text-xs font-semibold text-cw-purple-light uppercase tracking-wider mb-2">Como conduzir</p>
              <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line">{hack.como_conduzir}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Objecoes() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Swords className="h-5 w-5 text-cw-red" />
          <h3 className="text-lg font-bold">Matriz de Objeções</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Esta aba reúne as principais objeções que surgem no processo de aquisição de parceiros e como contorná-las de forma estratégica, alinhada ao posicionamento do programa de representantes.
        </p>
      </SectionCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MATRIZ_OBJECOES_REP.map((o) => (
          <div key={o.tipo} className="cw-card cw-card-hover p-5">
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cw-red/10 text-cw-red border border-cw-red/25 mb-3">
              {o.tipo}
            </span>
            <p className="text-sm text-cw-text/85 mb-3 leading-relaxed">{o.explicacao}</p>
            <div className="border-l-2 border-cw-purple pl-3">
              <p className="text-xs text-cw-purple font-semibold uppercase mb-1 tracking-wider">Como resolver</p>
              <p className="text-sm text-cw-muted leading-relaxed">{o.comoResolver}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cw-card p-4 space-y-2">
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider">Template para registrar novas objeções (planilha oficial)</p>
        <p className="text-xs text-cw-muted leading-relaxed">
          A planilha reserva uma tabela em branco para registrar objeções não mapeadas ainda, com as colunas: <strong>Descritivo da Objeção</strong> (o que o lead fala), <strong>Momento</strong> (etapa do processo em que apareceu), <strong>Tipo de Objeção</strong> (qual dos tipos acima se aplica) e <strong>Discurso de solução</strong> (o que pode ser falado para transpor a objeção). Nenhuma linha estava preenchida no momento da transcrição.
        </p>
        <SheetLink label="Ver matriz completa" />
      </div>
    </div>
  );
}

function MotivosPerda() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="h-5 w-5 text-cw-red" />
          <h3 className="text-lg font-bold">Motivos de Perda</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Os motivos de perda são as razões pelas quais os leads foram perdidos. São muito importantes para recuperação de oportunidades perdidas e ajustes de estratégias com foco em aumentar as vendas.
        </p>
      </SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOTIVOS_PERDA_REP.map((m) => (
          <div key={m.tipo} className="cw-card cw-card-hover p-5 border-l-4 border-l-cw-red/70">
            <h4 className="font-bold text-cw-text mb-2 text-sm">{m.tipo}</h4>
            <p className="text-sm text-cw-muted leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="cw-card p-4">
        <SheetLink label="Ver lista completa" />
      </div>
    </div>
  );
}

const CONTEUDO: Record<string, React.ComponentType> = {
  cultura: CulturaEstrategia,
  produto: PlaybookProduto,
  'primeiros-passos': PlaybookPrimeirosPassos,
  'gestao-cw': PlaybookGestaoCW,
  'automacao-cw': PlaybookAutomacaoCW,
  'vendas-cw': PlaybookAumentoVendasCW,
  'modulos-cw': PlaybookModulosCW,
  'suporte-cw': PlaybookSuporteCW,
  cargos: Cargos,
  icp: Icp,
  'passagem-bastao': PlaybookPassagemBastao,
  spin: PlaybookSpin,
  aida: PlaybookAida,
  hacks: Hacks,
  objecoes: Objecoes,
  perda: MotivosPerda,
  'rotina-aquisicao': PlaybookRotinaAquisicao,
};

export default function PlaybookRepresentantes() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') ?? 'cultura';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setActiveTab(tabFromUrl); }, [tabFromUrl]);

  return (
    <div className="p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative mb-2">
          <div ref={scrollRef} className="overflow-x-auto scrollbar-cw pb-1">
            <div className="flex items-center gap-2 w-max pr-10">
              {TABS.map((t) => {
                const Icon = t.icon;
                const ativo = activeTab === t.id;
                const cor = CORES[t.cor];
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      'relative flex shrink-0 items-center rounded-2xl transition-all',
                      ativo
                        ? 'gradient-primary gap-2 px-4 py-2.5 shadow-md'
                        : 'flex-col justify-center gap-1.5 bg-cw-surface border border-cw-border px-3.5 py-2.5 min-w-[84px] hover:border-cw-purple/40',
                    )}
                  >
                    <span className={cn('flex items-center justify-center rounded-full shrink-0', ativo ? 'h-7 w-7 bg-white/20' : cn('h-8 w-8', cor.bg))}>
                      <Icon className={cn('h-4 w-4', ativo ? 'text-white' : cor.text)} />
                    </span>
                    <span className={cn('whitespace-nowrap font-bold', ativo ? 'text-xs text-white' : 'text-[11px] text-cw-text/80')}>
                      {t.label}
                    </span>
                    {ativo && (
                      <span className="absolute -bottom-1.5 left-4 right-4 h-1 rounded-full bg-cw-purple-light" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-cw-surface border border-cw-border shadow flex items-center justify-center text-cw-muted hover:text-cw-purple hover:border-cw-purple/40 transition-colors"
            title="Ver mais abas"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {TABS.map(t => {
          const Conteudo = CONTEUDO[t.id];
          return (
            <TabsContent key={t.id} value={t.id} className="mt-6">
              {Conteudo ? <Conteudo /> : <EmBreve />}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
