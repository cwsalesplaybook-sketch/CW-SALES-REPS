const FAQ = [
  {
    q: 'Como funciona a comissao de representantes?',
    a: 'A comissao e calculada sobre o valor dos planos comercializados. Entre em contato com sua lideranca para obter a tabela de comissoes atualizada.',
  },
  {
    q: 'Onde registro novos clientes?',
    a: 'Novos clientes devem ser cadastrados no Pipedrive. Acesse a aba Pipeline para mais informacoes.',
  },
  {
    q: 'Como acesso os materiais de treinamento?',
    a: 'Todos os materiais de treinamento estao disponiveis na aba Playbook. Novos conteudos sao adicionados regularmente.',
  },
  {
    q: 'Qual e o suporte disponivel para representantes?',
    a: 'Voce pode usar a aba Comunidade para interagir com outros representantes ou entrar em contato com a lideranca pelos canais oficiais.',
  },
  {
    q: 'Como acompanho minha meta do mes?',
    a: 'Acesse a aba Meta do Mes para visualizar seu progresso em tempo real. Os dados serao atualizados automaticamente apos a integracao com o Pipedrive.',
  },
  {
    q: 'Como me apresento para a comunidade?',
    a: 'Acesse a aba Comunidade e publique uma mensagem de apresentacao. Voce pode curtir e interagir com publicacoes de outros representantes.',
  },
];

export default function Ajuda() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Central de Ajuda</h1>
        <p className="text-sm text-cw-muted mt-0.5">Duvidas frequentes sobre o programa de representantes da Cardapio Web.</p>
      </div>

      <div className="space-y-3">
        {FAQ.map(({ q, a }) => (
          <div key={q} className="bg-white rounded-xl border border-cw-border p-5">
            <p className="text-sm font-bold text-cw-text mb-2">{q}</p>
            <p className="text-sm text-cw-muted leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, #2d1760 0%, #1a0f2e 100%)' }}
      >
        <h2 className="text-base font-bold text-white mb-2">Nao encontrou o que precisava?</h2>
        <p className="text-sm text-purple-200/70 max-w-sm mx-auto">
          Use a aba Comunidade para perguntar a outros representantes, ou entre em contato com
          sua lideranca diretamente.
        </p>
      </div>
    </div>
  );
}
