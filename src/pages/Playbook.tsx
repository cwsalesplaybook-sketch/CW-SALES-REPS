import { ExternalLink, FileText } from 'lucide-react';

const ARTICLES = [
  {
    title: 'Vendas pelo Canal Indireto',
    source: 'Plural Sales',
    url: 'https://www.pluralsales.com.br',
    desc: 'Como estruturar e escalar vendas atraves de canais indiretos e representantes.',
    tag: 'Canal Indireto',
  },
  {
    title: 'Gestao de Parceiros de Canal',
    source: 'Plural Sales',
    url: 'https://www.pluralsales.com.br',
    desc: 'Boas praticas para recrutar, habilitar e manter representantes engajados.',
    tag: 'Gestao',
  },
  {
    title: 'CRM para Representantes',
    source: 'Canalize PRM',
    url: 'https://www.canalizeprm.com.br',
    desc: 'Como usar um PRM para acompanhar resultados e oportunidades de canal.',
    tag: 'CRM',
  },
  {
    title: 'Comissoes e Incentivos de Canal',
    source: 'Canalize PRM',
    url: 'https://www.canalizeprm.com.br',
    desc: 'Modelos de remuneracao para representantes que aumentam a performance de vendas.',
    tag: 'Comissoes',
  },
];

const MATERIAIS = [
  'Apresentacao de produto Cardapio Web',
  'Tabela de planos e precos atualizada',
  'Guia de objecoes mais comuns',
  'Script de abordagem inicial',
  'Manual de onboarding de novos clientes',
];

export default function Playbook() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Playbook</h1>
        <p className="text-sm text-cw-muted mt-0.5">Materiais de treinamento e referencias para representantes de canal.</p>
      </div>

      <div>
        <h2 className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">Leitura recomendada</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {ARTICLES.map((a) => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-cw-border p-5 flex flex-col gap-3 hover:border-cw-purple/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-cw-purple bg-cw-purple/10 rounded-full px-2 py-0.5">
                  {a.tag}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-cw-muted group-hover:text-cw-purple transition-colors shrink-0" />
              </div>
              <div>
                <p className="text-sm font-bold text-cw-text mb-1">{a.title}</p>
                <p className="text-[12px] text-cw-muted leading-snug">{a.desc}</p>
              </div>
              <p className="text-[11px] text-cw-muted/60 mt-auto">{a.source}</p>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold text-cw-muted uppercase tracking-widest mb-4">Materiais internos</h2>
        <div className="bg-white rounded-xl border border-cw-border divide-y divide-cw-border">
          {MATERIAIS.map((m) => (
            <div key={m} className="flex items-center gap-3 px-5 py-3.5">
              <FileText className="h-4 w-4 text-cw-purple shrink-0" />
              <span className="text-sm text-cw-text">{m}</span>
              <span className="ml-auto text-[10px] font-medium text-cw-muted bg-cw-elevated rounded-full px-2 py-0.5">
                Em breve
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
