/** Playbook de Representantes — mesma estrutura visual do Playbook de SDR
 *  (abas com Tabs/TabsList), com conteudo real onde ja existe material
 *  generico (Cultura, Produto, Planos, Concorrentes, Cargos, ICP, Hacks,
 *  Objecoes, Motivos de Perda) e "Em construcao" onde falta conteudo
 *  especifico de representantes (Territorio, Abordagem, Negociacao, Fechamento). */
import { useSearchParams } from 'react-router-dom';
import { Briefcase, Target, Lightbulb, Swords, XCircle, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CARGOS, HACKS, OBJECOES, MOTIVOS_PERDA, PLAYBOOK_URL } from '@/data/playbook';
import { ARTIGOS, MATERIAIS, ArtigoCard } from '@/pages/Playbook';
import CulturaEstrategia from './CulturaEstrategia';
import { PlaybookProduto } from './PlaybookProduto';
import { PlaybookPlanos } from './PlaybookPlanos';
import { PlaybookConcorrentes } from './PlaybookConcorrentes';
import PlaybookFaq from './PlaybookFaq';
import {
  PlaybookPrimeirosPassos, PlaybookGestaoCW, PlaybookAutomacaoCW,
  PlaybookAumentoVendasCW, PlaybookModulosCW, PlaybookSuporteCW,
} from './PlaybookSistemaTopicos';

const TABS = [
  { id: 'cultura',      label: '🧭 Cultura & Estratégia' },
  { id: 'produto',      label: '🛠️ Produto' },
  { id: 'primeiros-passos', label: '🏁 Primeiros Passos' },
  { id: 'gestao-cw',    label: '🗂️ Gestão' },
  { id: 'automacao-cw', label: '🤖 Automação' },
  { id: 'vendas-cw',    label: '📈 Aumento de Vendas' },
  { id: 'modulos-cw',   label: '🧩 Módulos do Sistema' },
  { id: 'suporte-cw',   label: '🎧 Suporte' },
  { id: 'planos',       label: '💰 Planos & Preços' },
  { id: 'concorrentes', label: '⚔️ Concorrentes' },
  { id: 'territorio',   label: '🗺️ Território' },
  { id: 'cargos',       label: '📋 Cargos' },
  { id: 'icp',          label: '🎯 ICP' },
  { id: 'abordagem',    label: '📣 Abordagem' },
  { id: 'negociacao',   label: '🔄 Negociação' },
  { id: 'hacks',        label: '💡 Hacks' },
  { id: 'objecoes',     label: '⚡ Objeções' },
  { id: 'fechamento',   label: '🤝 Fechamento' },
  { id: 'perda',        label: '❌ Motivos de Perda' },
  { id: 'faq',          label: '❔ FAQ' },
  { id: 'materiais',    label: '📚 Materiais' },
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
        <p className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">
          Leitura recomendada — Canalize PRM
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {ARTIGOS.map((a) => (
            <ArtigoCard key={a.url} artigo={a} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">Materiais internos</p>
        <div className="cw-card divide-y divide-cw-border">
          {MATERIAIS.map((m) => (
            <div key={m} className="flex items-center gap-3 px-5 py-3.5">
              <div className="h-1.5 w-1.5 rounded-full bg-cw-purple shrink-0" />
              <span className="text-sm text-cw-text flex-1">{m}</span>
              <span className="text-[10px] font-medium text-cw-muted bg-cw-elevated rounded-full px-2.5 py-0.5">
                Em breve
              </span>
            </div>
          ))}
        </div>
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
  planos: PlaybookPlanos,
  concorrentes: PlaybookConcorrentes,
  cargos: Cargos,
  icp: Icp,
  hacks: Hacks,
  objecoes: Objecoes,
  perda: MotivosPerda,
  faq: PlaybookFaq,
  materiais: Materiais,
};

export default function PlaybookRepresentantes() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') ?? 'cultura';

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-cw-text">Playbook de Representantes</h1>
        <p className="text-sm text-cw-muted mt-1">Conteúdo exclusivo para o time de Representantes da Cardápio Web.</p>
      </div>
      <Tabs defaultValue={tabFromUrl} key={tabFromUrl} className="w-full">
        <div className="overflow-x-auto scrollbar-cw -mx-1 pb-2">
          <TabsList className="bg-cw-surface border border-cw-border p-1 inline-flex w-max">
            {TABS.map(t => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="data-[state=active]:gradient-primary data-[state=active]:text-white whitespace-nowrap text-xs font-medium"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
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
