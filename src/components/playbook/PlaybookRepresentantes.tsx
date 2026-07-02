/** Playbook de Representantes — mesma estrutura visual do Playbook de SDR
 *  (abas com Tabs/TabsList), com conteudo real onde ja existe material
 *  generico (Cultura, Produto, Planos, Concorrentes, Cargos, ICP, Hacks,
 *  Objecoes, Motivos de Perda) e "Em construcao" onde falta conteudo
 *  especifico de representantes (Territorio, Abordagem, Negociacao, Fechamento). */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase, Target, Lightbulb, Swords, XCircle, ExternalLink,
  Compass, Box, Rocket, FolderKanban, Bot, TrendingUp, Puzzle, Headphones,
  DollarSign, Flag, Megaphone, Repeat, Handshake, HelpCircle, BookOpen,
  Presentation, ChevronRight, type LucideIcon,
} from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CARGOS, HACKS, OBJECOES, MOTIVOS_PERDA, PLAYBOOK_URL } from '@/data/playbook';
import { ARTIGOS, ArtigoCard } from '@/pages/Playbook';
import CulturaEstrategia from './CulturaEstrategia';
import { PlaybookProduto } from './PlaybookProduto';
import { PlaybookPlanos } from './PlaybookPlanos';
import { PlaybookConcorrentes } from './PlaybookConcorrentes';
import PlaybookFaq from './PlaybookFaq';
import {
  PlaybookPrimeirosPassos, PlaybookGestaoCW, PlaybookAutomacaoCW,
  PlaybookAumentoVendasCW, PlaybookModulosCW, PlaybookSuporteCW,
} from './PlaybookSistemaTopicos';

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
  { id: 'planos',           label: 'Planos & Preços',      icon: DollarSign,  cor: 'green' },
  { id: 'concorrentes',     label: 'Concorrentes',         icon: Swords,      cor: 'orange' },
  { id: 'territorio',       label: 'Território',           icon: Flag,        cor: 'red' },
  { id: 'cargos',           label: 'Cargos',               icon: Briefcase,   cor: 'purple' },
  { id: 'icp',              label: 'ICP',                  icon: Target,      cor: 'red' },
  { id: 'abordagem',        label: 'Abordagem',            icon: Megaphone,   cor: 'purple' },
  { id: 'negociacao',       label: 'Negociação',           icon: Repeat,      cor: 'pink' },
  { id: 'hacks',            label: 'Hacks',                icon: Lightbulb,   cor: 'yellow' },
  { id: 'objecoes',         label: 'Objeções',             icon: Swords,      cor: 'red' },
  { id: 'fechamento',       label: 'Fechamento',           icon: Handshake,   cor: 'pink' },
  { id: 'perda',            label: 'Motivos de Perda',     icon: XCircle,     cor: 'red' },
  { id: 'faq',              label: 'FAQ',                  icon: HelpCircle,  cor: 'blue' },
  { id: 'materiais',        label: 'Materiais',            icon: BookOpen,    cor: 'purple' },
  { id: 'materiais-internos', label: 'Materiais Internos', icon: Presentation, cor: 'blue' },
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CARGOS.map((c) => (
        <SectionCard key={c.sigla}>
          <div className="flex items-start gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-cw-text">{c.sigla}</h4>
              <p className="text-xs text-cw-muted">{c.nome}</p>
            </div>
          </div>
          <p className="text-sm text-cw-muted leading-relaxed">{c.descricao}</p>
        </SectionCard>
      ))}
    </div>
  );
}

function Icp() {
  return (
    <div className="space-y-4 max-w-3xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">O que é o ICP</h3>
        </div>
        <p className="text-cw-muted leading-relaxed">
          O ICP (Ideal Customer Profile) define o perfil do lead com maior probabilidade de fechar e se tornar um cliente de sucesso. Conhecer o ICP é fundamental para priorizar esforços de indicação e qualificação.
        </p>
      </SectionCard>
      <div className="cw-card cw-card-hover p-5 border-l-4 border-l-cw-purple">
        <p className="text-sm text-cw-muted">Acesse o ICP completo na planilha oficial.</p>
        <SheetLink label="Ver ICP completo" />
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
      <div className="space-y-4 max-w-3xl">
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
          Mapeia as principais resistências dos leads e os melhores argumentos para cada uma.
        </p>
      </SectionCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {OBJECOES.map((o, i) => (
          <div key={o.objecao + i} className="cw-card cw-card-hover p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {o.tipo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cw-red/10 text-cw-red border border-cw-red/25">
                  {o.tipo}
                </span>
              )}
              {o.momento && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cw-elevated border border-cw-border text-cw-muted">
                  {o.momento}
                </span>
              )}
            </div>
            <h4 className="font-bold text-cw-text mb-3 text-sm">"{o.objecao}"</h4>
            <div className="border-l-2 border-cw-purple pl-3">
              <p className="text-xs text-cw-purple font-semibold uppercase mb-1 tracking-wider">Como responder</p>
              <p className="text-sm text-cw-muted leading-relaxed">{o.argumento}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cw-card p-4">
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
          Entender por que perdemos um lead é tão importante quanto entender por que fechamos.
        </p>
      </SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOTIVOS_PERDA.map((m) => (
          <div key={m.motivo} className="cw-card cw-card-hover p-5 border-l-4 border-l-cw-red/70">
            <h4 className="font-bold text-cw-text mb-2">{m.motivo}</h4>
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

function Materiais() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold text-cw-muted tracking-wide mb-4">
          Leitura recomendada — Canalize PRM
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {ARTIGOS.map((a) => (
            <ArtigoCard key={a.url} artigo={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

const APRESENTACAO_ITENS = [
  'Apresentação institucional Cardápio Web',
  'Pitch deck para parceiros e indicações',
  'Vídeo institucional da marca',
];

const PLANEJAMENTO_ITENS = [
  'Calendário de metas do trimestre',
  'Roadmap de produto',
  'Plano de expansão do canal de representantes',
];

function ListaMateriais({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold text-cw-muted tracking-wide mb-4">{titulo}</p>
      <div className="cw-card divide-y divide-cw-border">
        {itens.map((item) => (
          <div key={item} className="flex items-center gap-3 px-5 py-3.5">
            <div className="h-1.5 w-1.5 rounded-full bg-cw-purple shrink-0" />
            <span className="text-sm text-cw-text flex-1">{item}</span>
            <span className="text-[10px] font-medium text-cw-muted bg-cw-elevated rounded-full px-2.5 py-0.5">
              Em breve
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MateriaisInternos() {
  return (
    <div className="space-y-8">
      <ListaMateriais titulo="Apresentação" itens={APRESENTACAO_ITENS} />
      <ListaMateriais titulo="Planejamento" itens={PLANEJAMENTO_ITENS} />
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
  planos: PlaybookPlanos,
  concorrentes: PlaybookConcorrentes,
  cargos: Cargos,
  icp: Icp,
  hacks: Hacks,
  objecoes: Objecoes,
  perda: MotivosPerda,
  faq: PlaybookFaq,
  materiais: Materiais,
  'materiais-internos': MateriaisInternos,
};

export default function PlaybookRepresentantes() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') ?? 'cultura';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setActiveTab(tabFromUrl); }, [tabFromUrl]);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-cw-text">Playbook de Representantes</h1>
        <p className="text-sm text-cw-muted mt-1">Conteúdo exclusivo para o time de Representantes da Cardápio Web.</p>
      </div>
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
