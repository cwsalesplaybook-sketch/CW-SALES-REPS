import { ExternalLink, ChevronDown, ChevronUp, BookOpen, Wrench, FileText, DollarSign, Handshake } from 'lucide-react';
import { useState } from 'react';
import {
  PlaybookPrimeirosPassos, PlaybookGestaoCW, PlaybookAutomacaoCW,
  PlaybookAumentoVendasCW, PlaybookModulosCW, PlaybookSuporteCW,
} from '@/components/playbook/PlaybookSistemaTopicos';

interface Artigo {
  titulo: string;
  fonte: string;
  url: string;
  tag: string;
  tagColor: string;
  Icon: React.ComponentType<{ className?: string }>;
  preview: string;
  pontos: string[];
  conclusao: string;
}

const ARTIGOS: Artigo[] = [
  {
    titulo: 'Como usar o PRM do vendor para vender mais',
    fonte: 'Canalize PRM',
    url: 'https://canalizeprm.com.br/blog/como-usar-prm-do-vendor-para-vender-mais/',
    tag: 'Ferramentas',
    tagColor: 'bg-cw-purple/10 text-cw-purple border-cw-purple/20',
    Icon: Wrench,
    preview: 'O PRM é a central que organiza operações comerciais, acompanha resultados e fortalece o relacionamento com a empresa parceira.',
    pontos: [
      'O PRM e uma central para organizar operacoes comerciais, acompanhar resultados e fortalecer relacionamentos com a empresa parceira.',
      'Estruturar e monitorar o proprio funil de vendas no PRM melhora a taxa de conversao, mantendo visibilidade de indicacoes, qualificacao, negociacao e fechamento.',
      'Acompanhar indicadores de desempenho permite tomar decisoes baseadas em dados, identificando gargalos no processo comercial.',
      'A plataforma centraliza materiais atualizados, treinamentos e kits de vendas que melhoram a qualidade das apresentacoes.',
      'Registrar oportunidades regularmente, participar de treinamentos e manter comunicacao ativa via PRM sao praticas que aumentam vendas.',
    ],
    conclusao: 'Parceiros que integram o PRM a sua rotina diaria conseguem resultados superiores. O diferencial esta em enxergar a plataforma nao como obrigacao, mas como aliado que acelera processos e gera previsibilidade comercial.',
  },
  {
    titulo: 'Direitos e deveres do parceiro: o que analisar no contrato',
    fonte: 'Canalize PRM',
    url: 'https://canalizeprm.com.br/blog/direitos-e-deveres-do-parceiro/',
    tag: 'Contrato',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    Icon: FileText,
    preview: 'O contrato define obrigações, prazos, remuneração e condições de encerramento — a base de qualquer parceria sólida.',
    pontos: [
      'O contrato estabelece obrigacoes, prazos, remuneracao, treinamentos e condicoes de encerramento, dando previsibilidade para a atuacao conjunta.',
      'Direitos essenciais do parceiro: acesso a materiais de apoio, remuneracao transparente, suporte tecnico e participacao em campanhas.',
      'Deveres indispensaveis: veracidade de informacoes, cumprimento de metas, sigilo sobre dados estrategicos e prestacao de contas.',
      'Clausulas criticas: exclusividade (com justificativa clara), territorialidade bem definida, comissionamento transparente e condicoes de rescisao.',
      'Diferenciar praticas razoaveis de abusivas reduz riscos — atencao a metas alinhadas ao mercado e multas proporcionais.',
    ],
    conclusao: 'Analisar rigorosamente o contrato antes de assinar — buscando equilibrio, transparencia e termos objetivos — reduz riscos e estabelece bases solidas para uma parceria duradoura.',
  },
  {
    titulo: 'Revenue share, margem ou comissao: qual modelo escolher',
    fonte: 'Canalize PRM',
    url: 'https://canalizeprm.com.br/blog/revenue-share-vs-comissao-parceiros/',
    tag: 'Remuneracao',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    Icon: DollarSign,
    preview: 'Comissão, margem ou revenue share — cada modelo tem o seu perfil ideal de parceiro. Entenda qual combina com você.',
    pontos: [
      'Comissao: modelo simples onde o parceiro recebe valor fixo ou percentual por venda. Ideal para indicacoes, mas pode limitar ganhos de canais maiores.',
      'Margem: o parceiro compra com desconto e revende, obtendo autonomia na precificacao. Excelente para revendedores, mas demanda mais estrutura.',
      'Revenue share: divisao proporcional da receita recorrente. Alinha interesses a longo prazo, especialmente em SaaS e modelos de assinatura.',
      'Cada perfil de parceiro responde melhor a um modelo conforme suas capacidades e objetivos comerciais.',
      'Modelos hibridos combinam formatos em diferentes fases do ciclo do cliente, potencializando resultados com clareza contratual.',
    ],
    conclusao: 'O modelo ideal depende do perfil do parceiro, do produto e da estrategia. Programas que equilibram simplicidade, autonomia e recorrencia constroem relacoes duradouras. A flexibilidade para ajustar conforme o crescimento e essencial.',
  },
  {
    titulo: 'O erro de tratar parceiro como cliente',
    fonte: 'Canalize PRM',
    url: 'https://canalizeprm.com.br/blog/o-erro-de-tratar-parceiro-como-cliente/',
    tag: 'Relacionamento',
    tagColor: 'bg-green-50 text-green-700 border-green-200',
    Icon: Handshake,
    preview: 'Parceiros são agentes estratégicos de crescimento mútuo, não consumidores finais. Essa diferença muda tudo.',
    pontos: [
      'Parceiros sao agentes estrategicos de crescimento mutuo, nao consumidores finais. Essa diferenca muda tudo na forma de se relacionar.',
      'Erros comuns: onboarding generico, suporte apenas reativo, cobranca constante por vendas e pouco estimulo ao engajamento.',
      'Falta de reconhecimento causa alta rotatividade, baixa ativacao e perda de oportunidades de inovacao conjunta.',
      'A mudanca necessaria e de "venda para mim" para "construa comigo", com personalizacao, capacitacao continua e valorizacao do feedback.',
      'Quando tratados corretamente, parceiros se tornam multiplicadores genuinos: mais engajamento, mais retencao e inovacao bilateral.',
    ],
    conclusao: 'Empresas que abandonam a padronizacao "tipo cliente" e reconhecem parceiros como cocriadores transformam relacionamentos superficiais em aliancas estrategicas que beneficiam todos os envolvidos.',
  },
];

const MATERIAIS = [
  'Apresentacao de produto Cardapio Web',
  'Tabela de planos e precos atualizada',
  'Guia de objecoes mais comuns',
  'Script de abordagem inicial',
  'Manual de onboarding de novos clientes',
];

function ArtigoCard({ artigo }: { artigo: Artigo }) {
  const [aberto, setAberto] = useState(false);
  const Icon = artigo.Icon;

  return (
    <div className="cw-card overflow-hidden flex flex-col">
      <button
        onClick={() => setAberto(!aberto)}
        className="text-left p-5 hover:bg-cw-elevated transition-colors"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[10px] font-bold rounded-md px-2 py-0.5 border ${artigo.tagColor}`}>
                {artigo.tag}
              </span>
              <span className="text-[10px] text-cw-muted">{artigo.fonte}</span>
            </div>
            <p className="text-sm font-bold text-cw-text leading-snug">{artigo.titulo}</p>
          </div>
          <div className="shrink-0 mt-0.5 text-cw-muted">
            {aberto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
        {!aberto && (
          <p className="text-xs text-cw-muted leading-relaxed line-clamp-2 pl-12">{artigo.preview}</p>
        )}
      </button>

      {aberto && (
        <div className="px-5 pb-5 border-t border-cw-border">
          <ul className="mt-4 space-y-2.5 mb-4">
            {artigo.pontos.map((p, i) => (
              <li key={i} className="flex gap-3 text-sm text-cw-muted leading-relaxed">
                <span className="text-cw-purple font-black shrink-0 mt-0.5">{i + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-xl bg-cw-purple/5 border border-cw-purple/15 mb-4">
            <p className="text-[11px] font-bold text-cw-purple uppercase tracking-widest mb-1">Conclusao pratica</p>
            <p className="text-sm text-cw-muted leading-relaxed">{artigo.conclusao}</p>
          </div>
          <a
            href={artigo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cw-purple hover:text-cw-purple/70 transition-colors"
          >
            Ler artigo completo <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Playbook() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-cw-text">Playbook</h1>
          <p className="text-sm text-cw-muted mt-0.5">
            Leituras e materiais para representantes de canal da Cardapio Web.
          </p>
        </div>
        <div className="flex gap-3">
          {[
            { n: ARTIGOS.length, label: 'artigos' },
            { n: MATERIAIS.length, label: 'materiais' },
          ].map(({ n, label }) => (
            <div key={label} className="cw-card px-4 py-2.5 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cw-purple" />
              <span className="text-sm font-black text-cw-text">{n}</span>
              <span className="text-xs text-cw-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

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

      <div className="space-y-6">
        <p className="text-xs font-bold text-cw-muted uppercase tracking-widest">
          Central de Ajuda — Sistema Cardápio Web
        </p>
        {[
          { titulo: '🏁 Primeiros Passos', Componente: PlaybookPrimeirosPassos },
          { titulo: '🗂️ Gestão', Componente: PlaybookGestaoCW },
          { titulo: '🤖 Automação', Componente: PlaybookAutomacaoCW },
          { titulo: '📈 Aumento de Vendas', Componente: PlaybookAumentoVendasCW },
          { titulo: '🧩 Módulos do Sistema', Componente: PlaybookModulosCW },
          { titulo: '🎧 Suporte', Componente: PlaybookSuporteCW },
        ].map(({ titulo, Componente }) => (
          <div key={titulo}>
            <p className="text-sm font-bold text-cw-text mb-3">{titulo}</p>
            <Componente />
          </div>
        ))}
      </div>
    </div>
  );
}
