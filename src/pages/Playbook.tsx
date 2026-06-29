import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Artigo {
  titulo: string;
  fonte: string;
  url: string;
  tag: string;
  pontos: string[];
  conclusao: string;
}

const ARTIGOS: Artigo[] = [
  {
    titulo: 'Como usar o PRM do vendor para vender mais',
    fonte: 'Canalize PRM',
    url: 'https://canalizeprm.com.br/blog/como-usar-prm-do-vendor-para-vender-mais/',
    tag: 'Ferramentas',
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

function ArtigoCard({ artigo }: { artigo: Artigo }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="cw-card overflow-hidden">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-cw-elevated transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-bold text-cw-purple bg-cw-purple/10 rounded-full px-2.5 py-0.5">
              {artigo.tag}
            </span>
            <span className="text-[10px] text-cw-muted">{artigo.fonte}</span>
          </div>
          <p className="text-sm font-bold text-cw-text leading-snug">{artigo.titulo}</p>
        </div>
        {aberto
          ? <ChevronUp className="h-4 w-4 text-cw-muted shrink-0 mt-0.5" />
          : <ChevronDown className="h-4 w-4 text-cw-muted shrink-0 mt-0.5" />
        }
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

const MATERIAIS = [
  'Apresentacao de produto Cardapio Web',
  'Tabela de planos e precos atualizada',
  'Guia de objecoes mais comuns',
  'Script de abordagem inicial',
  'Manual de onboarding de novos clientes',
];

export default function Playbook() {
  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Playbook</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Leituras e materiais para representantes de canal da Cardapio Web.
        </p>
      </div>

      {/* Artigos com conteudo real */}
      <div>
        <h2 className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">
          Leitura recomendada — Canalize PRM
        </h2>
        <div className="space-y-3">
          {ARTIGOS.map((a) => (
            <ArtigoCard key={a.url} artigo={a} />
          ))}
        </div>
      </div>

      {/* Materiais internos */}
      <div>
        <h2 className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">Materiais internos</h2>
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
