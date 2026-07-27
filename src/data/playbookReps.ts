/** Dados do Playbook de Representantes — transcrição fiel das planilhas oficiais
 *  "[REP] Playbook de Representantes" e "[ONB][PAR] Onboarding de PSM".
 *  Mantido separado de `data/playbook.ts` (que serve o Playbook de SDR/Closer)
 *  para não colidir conteúdo dos dois times. */

// ────────────────────────────────────────────────────────────────────────────
// IPP — Perfil Ideal de Parceiro
// ────────────────────────────────────────────────────────────────────────────
export interface IppData {
  perfil: string;
  caracteristicas: string[];
  diferenciaisDesejaveis: string[];
  diferenciaisCompetitivos: string[];
}

export const IPP: IppData = {
  perfil:
    'Profissionais de vendas com histórico comprovado em comercialização de soluções de software B2B, especialmente nos mercados de tecnologia, SaaS, sistemas de gestão, automação comercial e soluções para o setor de food service.',
  caracteristicas: [
    'Experiência prática em vendas B2B, especialmente de software ou soluções digitais',
    'Capacidade comprovada de prospecção ativa e geração de oportunidades',
    'Conhecimento funcional de funil de vendas e processos comerciais',
    'Relacionamento ativo ou potencial com clientes na região de atuação',
    'Mentalidade empreendedora, orientada à construção de receita recorrente',
    'Organização mínima para gestão de pipeline e carteira de clientes',
  ],
  diferenciaisDesejaveis: [
    'CNPJ ativo (MEI, ME ou superior)',
    'Aceite formal do contrato, regras do programa e diretrizes de uso da marca',
  ],
  diferenciaisCompetitivos: [
    'Capacidade futura de escalar operação (time, parceiros, volume)',
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// Matriz de Objeções (representantes)
// ────────────────────────────────────────────────────────────────────────────
export interface ObjecaoRep {
  tipo: string;
  explicacao: string;
  comoResolver: string;
}

export const MATRIZ_OBJECOES_REP: ObjecaoRep[] = [
  {
    tipo: 'Objeção de entendimento do programa',
    explicacao: 'O potencial parceiro não entendeu o que é o programa ou confunde com revenda de sistema.',
    comoResolver: 'Explicar de forma simples que não é revenda e sim representação de uma empresa de tecnologia.',
  },
  {
    tipo: 'Objeção de prioridade',
    explicacao: 'O parceiro diz que não é o foco dele agora ou que está cheio de demandas.',
    comoResolver: 'Mostrar relevância da parceria e alto potencial de retorno.',
  },
  {
    tipo: 'Objeção de perfil',
    explicacao: 'O parceiro acredita que o público dele não combina com o produto.',
    comoResolver: 'Explorar juntos o ICP e dar exemplos de parceiros parecidos que já indicaram.',
  },
  {
    tipo: 'Objeção de esforço operacional',
    explicacao: 'Acha que vai dar trabalho indicar, vender, acompanhar ou dar suporte.',
    comoResolver: 'Informar que ele vai ganhar uma comissão gradativa de acordo com cada responsabilidade que o parceiro assumir.',
  },
  {
    tipo: 'Objeção de retorno financeiro',
    explicacao: 'O parceiro sente que o ganho é baixo por não ser revenda ou que o esforço não compensa.',
    comoResolver: 'Reforçar progressão da comissão, previsibilidade por volume e rapidez de recebimento.',
  },
  {
    tipo: 'Objeção de confiança',
    explicacao: 'Insegurança sobre reputação, entrega ou suporte.',
    comoResolver: 'Mostrar cases, volume de parceiros ativos e materiais de apoio.',
  },
  {
    tipo: 'Objeção de concorrência',
    explicacao: 'Já indica outro sistema ou tem parceria parecida.',
    comoResolver: 'Mostrar diferenciais do programa e possibilidade de coexistência e não exclusividade.',
  },
  {
    tipo: 'Objeção de compromisso',
    explicacao: 'Acontece quando o parceiro tem medo de assumir obrigações, metas, exclusividade ou mudanças no próprio processo.',
    comoResolver: 'Deixar claro que não há metas obrigatórias nem exclusividade forçada. A parceria é flexível, opcional e acontece no ritmo do parceiro.',
  },
  {
    tipo: 'Objeção de exclusividade',
    explicacao: 'Pergunta se precisa ser exclusivo.',
    comoResolver: 'Deixar claro que não exige exclusividade.',
  },
  {
    tipo: 'Deal breaker',
    explicacao: 'Situação em que realmente não faz sentido parceria.',
    comoResolver: 'Desqualificar e deixar porta aberta para futuro quando fizer sentido.',
  },
  {
    tipo: 'Objeção de dispensa',
    explicacao: 'Uma dispensa é quando seu cliente manda você embora de forma gentil.',
    comoResolver: 'Pedir um tempo para já alinhar a questão para não precisar retornar em outro horário.',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Funções (cargos do time de representantes)
// ────────────────────────────────────────────────────────────────────────────
export interface FuncaoRep {
  nome: string;
  descricao?: string;
}

export const FUNCOES_REP: FuncaoRep[] = [
  { nome: 'Partner Development Representative (PDR)' },
  { nome: 'Partner Account Executive (PAE)' },
  {
    nome: 'Supervisor de parcerias',
    descricao: 'Profissional responsável por garantir que o time siga as rotinas definidas estrategicamente pelo gerente de parcerias.',
  },
  {
    nome: 'Coordenador de parcerias',
    descricao: 'Liderança responsável por acompanhar o trabalho dos supervisores, definindo estratégias e ajudando no desenvolvimento de lideranças e colaboradores.',
  },
  {
    nome: 'Gerente de parcerias',
    descricao: 'Liderança responsável por acompanhar o trabalho dos coordenadores e supervisores de parcerias, com intuito de definir estratégias e desenvolver as lideranças do time.',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Motivos de Perda (representantes)
// ────────────────────────────────────────────────────────────────────────────
export const MOTIVOS_PERDA_REP = [
  { tipo: '[REP] Sem interesse no momento', desc: 'Prospect demonstrou que entendeu a proposta, mas declarou que não tem interesse em participar do programa neste momento.' },
  { tipo: '[REP] Falta de orçamento para taxa de ativação', desc: 'Lead informou que não possui orçamento disponível para investir na taxa de ativação neste momento.' },
  { tipo: '[REP] Já representa software concorrente', desc: 'Prospect informou que já atua como representante de software concorrente, impossibilitando ou limitando sua entrada no programa.' },
  { tipo: '[REP] No-show', desc: 'Prospect confirmou presença, mas não compareceu à reunião agendada.' },
  { tipo: '[REP] Lead não correspondeu as tentativas de contato', desc: 'Prospect não respondeu as tentativas de contato, sem manifestação formal de desistência.' },
  { tipo: '[REP] Lead desqualificado', desc: 'Prospect não atende aos critérios mínimos do programa, sendo desqualificado.' },
  { tipo: '[REP] Lead duplicado', desc: 'Contato já existente na base do CRM, identificado como duplicado.' },
  { tipo: '[REP] Lead é agência de marketing ou gestor de tráfego', desc: 'Prospect é uma agência de marketing ou gestor de tráfego e não se enquadra no perfil de representante.' },
  { tipo: '[REP] Lead quer contratar a plataforma', desc: 'Lead solicitou atendimento para contratar a plataforma.' },
  { tipo: '[REP] Lead já é parceiro', desc: 'Lead solicitou atendimento, mas quer se inscrever no programa de parcerias.' },
  { tipo: '[REP] Perda de teste', desc: 'Motivo para dar perdido em leads de teste.' },
  { tipo: '[REP] Lead quer White Label', desc: 'Lead quer modelo de revenda White Label.' },
  { tipo: '[REP] Lead com contato indisponível', desc: 'Lead sem contato disponível para enviar mensagem ou realizar ligação.' },
];

// ────────────────────────────────────────────────────────────────────────────
// Jornada do Representante — template ainda não preenchido pela liderança
// ────────────────────────────────────────────────────────────────────────────
export const JORNADA_REPRESENTANTE_COLUNAS = [
  'Etapas da Jornada',
  'Leads Antes',
  'Lead Depois',
  'Estágio Correspondente nas Vendas',
];

// ────────────────────────────────────────────────────────────────────────────
// Mensagem de Confirmação de Apresentação
// ────────────────────────────────────────────────────────────────────────────
export interface MensagemConfirmacao {
  etapa: string;
  texto: string;
}

export const MENSAGENS_CONFIRMACAO: MensagemConfirmacao[] = [
  {
    etapa: '1º Mensagem de Confirmação (Dia anterior da apresentação)',
    texto:
      '📅 Confirmação da sua reunião\n\nOlá, [NOME_DO_LEAD]! Tudo certo?\nPassando para lembrar que amanhã você tem uma reunião com o nosso especialista [NOME_DO_CLOSER] às [DIA e HORA_DA_APRESENTAÇÃO] (horário de Brasília).\n\n⚡️ O que você pode esperar:\n•  ⏱️ Duração média de 45 minutos;\n•  👨‍💻 O especialista ficará disponível até 15 minutos após o horário;\n•  🎯 Será o momento ideal para entender os benefícios da parceria com a Cardápio Web\n\nPosso confirmar sua presença? ✅\n\nEstou à disposição para qualquer dúvida, combinado?',
  },
  {
    etapa: '2º Mensagem de Confirmação (Dia da apresentação)',
    texto:
      '🌟 Bom dia, [NOME_DO_LEAD]! Tudo certo?\n\nO *[NOME_DO_CLOSER]* já está preparado para a nossa reunião hoje às [HORA_DA_APRESENTAÇÃO] (horário de Brasília).\nVai ser um momento rápido (45 min) e focado em como podemos ajudar no seu negócio.\n\nConsegue me dar um ok só para confirmar a presença?\n\nEstamos te aguardando! 🚀',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Passagem de Bastão — template de perguntas (respostas em branco na planilha)
// ────────────────────────────────────────────────────────────────────────────
export const PASSAGEM_BASTAO_PERGUNTAS: string[] = [
  'Como conheceu?',
  'SPIN Representante',
  'Situação?',
  'Problema?',
  'Implicação?',
  'Necessidade?',
  'Valores estão dentro do orçamento?',
  'É o tomador de decisão?',
  'Prioridade?',
];

// ────────────────────────────────────────────────────────────────────────────
// SPIN Selling — funcionalidades adaptadas ao programa de representantes
// ────────────────────────────────────────────────────────────────────────────
export interface SpinItemRep {
  situacao?: string;
  problema?: string;
  implicacao?: string;
  necessidade?: string;
  apresentacao?: string;
}

export interface SpinFuncionalidadeRep {
  nome: string;
  itens: SpinItemRep[];
}

export const SPIN_REP: SpinFuncionalidadeRep[] = [
  {
    nome: 'Automatização de pedidos de delivery',
    itens: [{
      situacao: 'Quantos pedidos você recebe por dia? E no WhatsApp?',
      problema: 'E mesmo na hora movimentada do dia, você ainda consegue me garantir que o atendimento é rápido? E que nenhum cliente passa batido?',
      implicacao: 'Entendi, quando seu cliente demora a ser atendido, como você acha que isso impacta nas suas vendas?',
      necessidade: 'Se você tivesse um atendimento rápido e sem a necessidade de um atendente, quais vantagens você acha que isso traria?\n\nPossibilidades:\n- Corte de custo com funcionário\n- Aumento de vendas, já que não tem mais demora no atendimento e nem erro ao anotar pedido.\n- Escala no atendimento, por não precisar de uma pessoa para atender',
      apresentacao: 'Então NOME_DO_LEAD. Com relação à automação dos seus pedidos de delivery, nós temos diversas ferramentas para te auxiliar nesse quesito. Dentre elas:\n\n- Cardápio digital\n- ChatBot com Inteligência Artificial\n- Extensão para o atendente fazer pedidos dentro do próprio WhatsApp Web',
    }],
  },
  {
    nome: 'Disparador de mensagens de WhatsApp',
    itens: [{
      situacao: 'Qual sua estratégia de crescimento para os próximos meses?',
      problema: 'Se sua demanda começasse a cair a partir de hoje, o que você faria?',
      implicacao: 'Você não acha arriscado a sua empresa não ter nenhuma forma previsível de se programar para aumentar seu faturamento?',
      necessidade: 'Se você tivesse o poder de mandar uma mensagem para todos os seus clientes em questão de minutos, qual estratégia você usaria para vender mais?',
      apresentacao: 'Perfeito, NOME_DO_LEAD! Com relação às estratégias de crescimento, a gente também consegue te ajudar.\n\nA nossa ferramenta tem implantado um disparador de mensagens em massa no WhatsApp, que te permite alcançar milhares de clientes em questão de minutos, disparando ofertas, imagens, cupons, pesquisas de satisfação, falando o nome do cliente.. enfim, o que você quiser!\n\nTá me acompanhando?\n\nE além disso, somos a ferramenta mais indicada do mercado para quem faz tráfego pago, temos mais de 200 agências de marketing e gestores de tráfego parceiros que indicam o cardápio web como o melhor cardápio digital para quem faz anúncios, primeiro porque o nosso cardápio é fácil e rápido de fazer pedido, então é mais fácil do cliente comprar, e segundo porque as nossas integrações com as ferramentas de anúncios são as mais completas do mercado atualmente.\n\nVocê entendeu o que eu falei?\n\nE além disso, com o nosso programa de fidelidade, você ainda consegue aumentar a retenção do seu cliente dentro da sua empresa, quanto mais tempo seu cliente fica com você, mais longevidade tem o seu negócio e, obviamente, mais dinheiro no seu bolso!\n\nVocê concorda comigo?',
    }],
  },
  {
    nome: 'Sistema de gestão com notas fiscais e iFood',
    itens: [
      {
        situacao: 'Você já usa alguma ferramenta para gerenciar seus pedidos e emitir notas fiscais?',
        problema: 'E como você faz para garantir que a sua empresa está funcionando corretamente?',
        implicacao: 'Se você viajasse hoje e só voltasse daqui a 1 mês, sua empresa funcionaria normalmente sem você? E como você acompanharia os resultados?',
        necessidade: 'Caso você conseguisse gerenciar a sua operação de forma remota, como isso impactaria sua vida?',
        apresentacao: 'Legal, NOME_DO_LEAD! Então, com relação à essa parte de gestão, a gente também é muito completo!\n\nLogo de cara, posso dizer que a sua operação vai poder ser controlada até de forma remota, porque o sistema é todo online e permite um acompanhamento em tempo real.\n\nIsso é algo que faz sentido para você?\n\nA gente consegue te ajudar na parte de controle de estoque, caixa, gestão de pedido na cozinha por tela, que é o nosso KDS, você tem acesso a controle de fiado, relatórios de vendas.. bastante coisa legal.\n\nVocê entendeu todos esses pontos que eu falei ou teve alguma coisa que te deixou confuso?\n\nBacana, mas não para por aí, nossa ferramenta também têm várias integrações legais que podem te ajudar nesse controle. Dentre elas, para gestão de rota de entrega, integramos com a Foody Delivery e a Pick N Go, para motoboys tercerizados, integramos com iFood Entregas, e para ter um controle financeiro mais complexo, integramos com a F360.\n\nFicou claro tudo que eu falei?',
      },
      { implicacao: 'Então você se sente preso na sua própria operação?' },
      {
        situacao: 'Hoje como estão suas vendas no iFood?',
        problema: 'E como você analisa os resultados gerais da empresa? Somando iFood com ligação WhatsApp, balcão.. como você faz para reunir todos esses dados e ter o controle do negócio?',
        implicacao: 'Você sente que esse controle hoje fica trabalhoso?',
        necessidade: 'Se você tivesse acesso a um controle que te permite analisar seus resultados de forma 100% automática, como você usaria essa ferramenta? Faria uma análise diária, acompanharia as vendas de cada pessoa do time, veria quais produtos tem mais movimentação, o que seria?',
      },
      {
        problema: 'O que você acha que perde ao não conseguir analisar os dados da sua empresa com facilidade?',
        necessidade: 'Se você conseguisse unir todas as ferramentas que precisa num único sistema, quais seriam as vantagens disso? Corte de custos, facilidade de aprendizado, centralização dos dados, quais seriam as vantagens?',
      },
      { problema: 'Você consegue me dizer o quanto você cresceu nos últimos 6 meses? (se não souber, perguntar se ele sabe se realmente cresceu)' },
    ],
  },
  {
    nome: 'Cardápio digital para mesa',
    itens: [
      {
        situacao: 'Hoje como funciona seu atendimento presencial?',
        problema: 'Como você acha que a ausência do cardápio na mesa influencia nos pedidos do cliente? Porque a gente sabe que o cliente não gosta de ficar chamando garçom para trazer o cardápio o tempo todo',
        implicacao: 'Você concorda que não ter a presença do cardápio na mesa impacta diretamente na suas vendas?',
        necessidade: 'Se o cardápio ficasse sempre na mesa, você acha que o seu cliente compraria mais? Por que?\n\nExplicação: Já que ele não precisaria ficar chamando o garçom para ver o cardápio.',
        apresentacao: 'Com relação à sua gestão de mesas, temos muitas ferramentas interessantes.\n\nA primeira é a parte de gestão das suas mesas, por onde você consegue ver quantas pessoas têm no salão, seu garçom consegue abrir e fechar mesas, trocar as pessoas de lugar, tudo que você precisa para essa parte de gestão de mesas.\n\nFicou claro?\n\nJá com relação ao cardápio digital de mesa, seu cliente consegue fazer o pedido direto do celular dele e já enviar para a cozinha de forma automática, sem a necessidade de um garçom.\n\nIsso é algo que faria sentido para você nesse momento?',
      },
      {
        situacao: 'Hoje você tem quantos cardápios para cada mesa no presencial?',
        problema: 'E você sente alguma dificuldade em trabalhar com cardápios físicos?\nAtualização de preço, ficar rotacionando cardápio nas mesas..',
        implicacao: 'Você concorda\n\nE você não sente que os seus clientes ficam irritados quando demoram a\n\nE como você acha que isso impacta na sua operação?\n\nIsso dificulta o teste de novos produtos ou preços?',
        necessidade: 'Se você pudesse atualizar seu cardápio questão de minutos, como você usaria isso a seu favor? Testaria produtos novos, atualizaria os preços mais rápido depois de um aumento de custos, como seria?',
      },
    ],
  },
  {
    nome: 'Gestão de agendamentos',
    itens: [
      {
        situacao: 'Me responde uma coisa, hoje como os clientes fazem para agendar um pedido com vocês?',
        problema: 'Entendi, e quando o cliente quer fazer um pedido e não tem ninguém disponível para falar com ele, como você faz? Porque depois do expediente, imagino que o cliente fique sem resposta.',
        implicacao: 'Você não acha que isso prejudica a experiência do seu cliente e pode te fazer perder, tanto vendas quanto clientes?',
        necessidade: 'E se o seu cliente pudesse agendar um pedido na hora que ele quisesse, independente da sua loja estar aberta ou não, como isso impactaria nas suas vendas? E como isso impactaria a experiência do seu cliente?',
        apresentacao: 'A nossa gestão de agendamentos permite o controle de regras específicas para cada de operação de pedidos, com o intuito de definir os dias e horários que o cliente pode selecionar para receber ou pegar seus pedidos.\n\nQuer que eu te mostre um exemplo?\n\nShow, vamos supor que você, como dono de um delivery, só faz entregas se o cliente fizer um pedido com 2 dias de antecedência e a entrega só pode ser realizar num período entre as 13 e as 17 horas. Através da nossa ferramenta isso é possível, a gente mostra pro cliente apenas os dias e horários que, segunda as suas próprias regras, vão estar disponíveis para ele, o que facilita muito o processo de escolha das datas e horários para recebimento, pois não precisa de ninguém para combinar o agendamento.',
      },
      {
        situacao: 'E como funciona a lógica de agendamento de vocês? Me explica o passo a passo',
        problema: 'Perfeito, como você explica isso para o cliente na hora que ele tá fazendo o pedido? Você envia um áudio, um texto, uma tabela, como seria?',
        implicacao: 'Entendi, e esse processo não te dá trabalho?',
        necessidade: 'E se o cliente já tivesse isso bem claro definido na hora que ele fosse fazer o pedido e não precisasse ficar perguntando para você, como isso impactaria no seu dia a dia?',
      },
    ],
  },
  {
    nome: 'Foco nos anúncios',
    itens: [{
      situacao: 'Por que você está querendo investir em anúncios?',
      problema: 'E se você fizer anúncios para um cardápio digital ruim, quais problemas você enxerga que podem acontecer?\n\nUm cardápio digital ruim é aquele que é complexo pro cliente pedir, é lento, passa insegurança, têm limitações nas integrações com as ferramentas de anúncios, enfim..',
      implicacao: 'Então se você escolher o cardápio digital errado, você concorda comigo que a sua estratégia tem grandes chances de não dar certo, né?\n\nPorque o cliente pode ficar com medo de pedir, pode querer ir só no WhatsApp, pode não saber pedir e acabar desistindo da compra, têm vários motivos para não dar certo..',
      necessidade: 'E se você tivesse acesso a um cardápio digital integrado às principais ferramentas de anúncio, com um fluxo simples de pedido pro cliente, que é bonito e passa segurança, além de ter um carregamento super rápido, você acredita que isso faria os seus anúncios terem o máximo de performance?\n\nVocê concorda comigo que quanto mais performance nos anúncios, mais vendas você tem?',
      apresentacao: 'Ótimo, NOME_DO_LEAD! É justamente essa visão que a gente traz para os seus anúncios, nosso objetivo quando falamos de anúncios é potencializar as campanhas de marketing para a sua empresa, trazendo uma performance de primeiro nível para garantir os melhores resultados para você e para a sua empresa.',
    }],
  },
  {
    nome: 'PDV (focado em quem ainda não está funcionando)',
    itens: [{
      situacao: 'E você já tem uma previsão de quando vai começar sua operação?\n\nShow de bola, e como você pretende controlar seus pedidos?',
      problema: 'E você não acha que isso vai tomar muito seu tempo?',
    }],
  },
  {
    nome: 'PDV (focado em quem já está funcionando)',
    itens: [{
      situacao: 'Show de bola, e como você controla seus pedidos hoje?',
      problema: '### TEM UM SISTEMA ###\n\n- Legal, NOME_DO_LEAD! Isso significa que você já entende a importância de uma ferramenta de gestão pro seu negócio. Mas existem 2 outros pilares muito importantes para quem trabalha no seu ramo, que é a automação e o aumento de vendas, e nisso eu consigo te ajudar.\n\n- Me responde uma coisa, hoje qual a sua estratégia para ter mais vendas?',
    }],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// AIDA — roteiro de Cold Call adaptado
// ────────────────────────────────────────────────────────────────────────────
export interface AidaItemRep {
  estrutura: string;
  roteiro: string;
}

export interface AidaEtapaRep {
  letra: string;
  nome: string;
  itens: AidaItemRep[];
}

export const AIDA_REP: AidaEtapaRep[] = [
  {
    letra: 'A', nome: 'Atenção',
    itens: [
      { estrutura: 'Introdução', roteiro: 'Saudações e introduzir seu nome e perguntar se está tudo bem com o lead.' },
      { estrutura: 'Rapport', roteiro: 'Explique está fazendo um mapeamento nas empresas (fale o nicho) da região (fale a cidade), e percebeu que a empresa do lead é muito bem recomendada, inclusive mencione que tem um amigo (dê um nome para o amigo) que pede lá com frequência e sempre fala bem da comida (mencione o tipo de comida)' },
      { estrutura: 'Pedir 2 minutos', roteiro: 'Peça 2 minutos para conversar' },
    ],
  },
  {
    letra: 'I', nome: 'Interesse',
    itens: [
      { estrutura: 'Benefícios', roteiro: 'Diga que trabalha com uma solução que aumenta de 10 a 30% as vendas de empresas (cite o nicho) que trabalham diretamente com WhatsApp' },
      { estrutura: 'Prova social', roteiro: "Mencione que esse trabalho já foi feito com empresas como Domino's, Cacau Show (pode comentar de outros a depender do nicho e da cidade, como Puro Açaí, Carol Coxinhas, DuckBill, Pizza Crec..)" },
      { estrutura: 'Reforça prova social', roteiro: 'Mencione ao final da prova social, que sempre aumenta de 10 a 30% as vendas' },
      { estrutura: 'Perguntar se há interesse', roteiro: 'Pergunte se o lead teria interesse em ter esse aumento de vendas na sua operação também?' },
    ],
  },
  {
    letra: 'D', nome: 'Desejo',
    itens: [
      { estrutura: 'Contextualizar porque o lead foi escolhido', roteiro: 'Explique para o lead que viu a empresa dele no Instagram e percebeu que eles recebem pedidos no WhatsApp' },
      { estrutura: 'Elogie o Instagram da empresa', roteiro: 'Mencione que gostou bastante do trabalho que o lead tem feito no Instagram' },
      { estrutura: 'Aplicar SPIN', roteiro: 'Nessa parte, siga o SPIN associado ao produto oferecido, nesse caso, automação de atendimento.\n- Quantos pedidos num dia movimentado\n- Você já recebeu alguma reclamação por demora no atendimento ou por anotar pedido errado?\n- Sente que isso tá te fazendo perder vendas?\n- E se a gente conseguisse garantir que todos os seus clientes vão ser atendidos rapidamente e que nenhum pedido vai ser anotado errado de novo, você acredita que isso aumentaria suas vendas?' },
      { estrutura: 'Perguntar se o que foi dito faz sentido para o lead', roteiro: 'Agora pergunte ao lead se o que vocês conversaram até aquele momento faz sentido' },
    ],
  },
  {
    letra: 'A', nome: 'Ação',
    itens: [
      { estrutura: 'Contornar possíveis objeções', roteiro: 'Nessa hora, é possível que o lead traga algumas objeções, como preço ou produto, caso isso aconteça, use a matriz de objeções para contornar' },
      { estrutura: 'Afirmar que o lead tem perfil para ser nosso cliente', roteiro: 'Explique que com base nisso que conversaram, é certeza que o lead é exatamente o tipo de empresa que a gente atende' },
      { estrutura: 'Reforce outras funções', roteiro: 'Comente que além dessa parte de automação, nós temos diversas outras ferramentas de aumento de vendas que fazem com que o lead tenha muito mais resultado, seja fazendo seus clientes pedirem mais, pagarem mais, ou até conseguindo mais clientes' },
      { estrutura: 'Explicar que precisa de uma vídeo chamada para apresentar a solução e dar o próximo passo', roteiro: 'Deixe claro que essa ligação não tem intuito de vender, porque antes precisa apresentar a solução, com base nisso, marque uma vídeo chamada com o lead e se esforce para ser no mesmo dia, mas caso não consiga, deixe para fazer no máximo no dia seguinte.' },
      { estrutura: 'Agendar um horário', roteiro: 'Agende um horário e peça o email do lead' },
      { estrutura: 'Aplicar gatilho de compromisso', roteiro: 'Explique que o consultor tem uma agenda ocupada e é um dos maiores especialistas no assunto (cite o assunto conversado, nesse caso, automação de atendimento no WhatsApp), então pergunte se o lead teria algum motivo para não estar presente no horário e data acordados (mencione o horário e a data), depois diga que vai enviar uma mensagem no WhatsApp para confirmar a reunião e pergunte se o lead confirma. Com base nisso, finaliza a ligação.' },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Definição de etapas de funil
// ────────────────────────────────────────────────────────────────────────────
export interface FunilEtapa {
  etapa: string;
  desc: string;
}

export const FUNIL_PROSPECCAO: FunilEtapa[] = [
  { etapa: 'Abertura', desc: 'Todos os leads que entrarem no fluxo de abertura do funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Follow-up 1', desc: 'Todos os leads que estão há 2 dias no funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Follow-up 2', desc: 'Todos os leads que estão há 3 dias no funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Follow-up 3', desc: 'Todos os leads que estão há 5 dias no funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Follow-up 4', desc: 'Todos os leads que estão há 7 dias no funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Break Up', desc: 'Todos os leads que estão há 9 dias no funil [REP] Funil de Prospecção de Representantes.' },
  { etapa: 'Reunião Marcada', desc: 'Todos os leads que foram agendados para apresentação.' },
  { etapa: 'Remarcação', desc: 'Todos os leads que deram no-show ou que seja necessário remarcar a apresentação.' },
  { etapa: 'Negociação', desc: 'Todos os leads que estão em negociação de valores ou condições para entrada no programa de representantes.' },
  { etapa: 'Proposta enviada', desc: 'Todos os leads que estão comprometidos em realizar o pagamento, já estão com a proposta enviada e que já enviaram os dados para cadastro no programa de representantes.' },
  {
    etapa: 'Finalização',
    desc: 'Todos os leads que já estão com link de pagamento.\n\nPara cadastrar um representante precisamos dos seguintes dados:\nNome completo:\nTelefone:\nE-mail:\nCNPJ:\nChave pix:\nEndereço:\nCEP:',
  },
  {
    etapa: 'Próximo passo',
    desc: 'Com os dados do representante, você deve criar uma conta para o representante nos seguintes sites:\n\n1º portal.cardapioweb.com/login\n2º parceiro.cardapioweb.com/users/sign_in\n3º portal.sandbox.cardapioweb.com/login',
  },
];

export const FUNIL_ATIVACAO: FunilEtapa[] = [
  { etapa: 'Aguardando Onboarding', desc: 'Representante aprovado e cadastrado, aguardando o início ou a conclusão do treinamento de integração para estar apto a iniciar suas atividades.' },
  { etapa: 'Onboarding Agendado', desc: 'Representante com treinamento de integração já agendado com a data e horário definidos para participação no onboarding.' },
  { etapa: 'Onboarding Realizado', desc: 'Representante que concluiu o treinamento de integração e está apto a iniciar suas atividades comerciais junto à Cardápio Web.' },
  { etapa: '1º Follow-up', desc: 'Primeiro contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua primeira venda.' },
  { etapa: '2º Follow-up', desc: 'Segundo contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua primeira venda.' },
  { etapa: '3º Follow-up', desc: 'Terceiro contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua primeira venda.' },
  { etapa: '1º Cliente', desc: 'Representante realizou sua primeira venda e foi ativado.' },
  { etapa: '1º Follow-up (rumo ao 2º cliente)', desc: 'Primeiro contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua segunda venda.' },
  { etapa: '2º Follow-up (rumo ao 2º cliente)', desc: 'Segundo contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua segunda venda.' },
  { etapa: '3º Follow-up (rumo ao 2º cliente)', desc: 'Terceiro contato de acompanhamento após onboarding realizado, com o objetivo de incentivar o representante até a sua segunda venda.' },
  { etapa: '2º Cliente', desc: 'Representante realizou sua segunda venda.' },
];

export const FUNIL_CLIENTES: FunilEtapa[] = [
  {
    etapa: 'Dados recebidos',
    desc: 'Representante enviou os dados do cliente. Apenas clientes que precisam ir para implementação da Cardápio Web.\n\nO modelo de dados dos clientes que precisamos é:\n\n📋 CADASTRO\n🏪 Nome da loja:\n👤 Nome do titular:\n📄 CPF:\n📍 Endereço:\n🗺️ CEP:\n📱 WhatsApp (para implementação):\n📧 E-mail:\n⭐ Plano escolhido:',
  },
  {
    etapa: 'Proposta enviada',
    desc: 'Card do cliente criado, com informações preenchidas, plano e módulo, se houver, adicionado na categoria "Produto" no Pipedrive e modelo de proposta enviado.',
  },
  { etapa: 'Negócio Fechado', desc: 'Cliente com link de pagamento e no aguardo para ser dado ganho para implementação.' },
];

// ────────────────────────────────────────────────────────────────────────────
// Estrutura de Representantes (Definir)
// ────────────────────────────────────────────────────────────────────────────
export const ESTRUTURA_REPRESENTANTES = {
  ipp: {
    perfil: 'Vendedores de software com experiência comprovada em vendas B2B, preferencialmente com atuação no segmento de tecnologia, SaaS, sistemas de gestão, automação comercial ou soluções para food service.',
    caracteristicas: [
      'Experiência prévia na venda de software ou soluções digitais',
      'Carteira ativa ou potencial de clientes na região de atuação',
      'Conhecimento básico de funil de vendas e processos comerciais',
      'Capacidade de prospecção ativa',
      'Perfil empreendedor, com visão de ganho recorrente',
      'Organização mínima para gestão de clientes',
    ],
    diferenciais: ['Time comercial próprio', 'Atuação regional consolidada'],
  },
  funcionamento: [
    {
      titulo: 'Qualificação',
      texto: 'Processo inicial para avaliar se o parceiro faz sentido para o modelo de representantes da Cardápio Web.',
      criterios: [
        'Como conheceu a Cardápio Web',
        'Segmento e perfil dos clientes atendidos',
        'Quantidade de clientes em potencial',
        'Existência de time comercial',
        'Estratégia de venda utilizada',
      ],
    },
    {
      titulo: 'Reunião de Negociação',
      texto: 'Caso haja alinhamento, a proposta formal é apresentada.',
      criterios: [
        'Apresentar a Cardápio Web e seu posicionamento de mercado',
        'Explicar o Programa de Representantes, incluindo jornada, benefícios e canais',
        'Alinhar expectativas de ambas as partes',
        'Apresentar responsabilidades, modelo de ganhos e contrato',
      ],
    },
    {
      titulo: 'Onboarding e Capacitação',
      texto: 'O representante passa por uma jornada estruturada de ativação.',
      criterios: [
        'Treinamento comercial',
        'Conhecimento do sistema',
        'Cultura e ecossistema Cardápio Web',
        'Criação de conta e configuração do sistema',
        'Checklist de partida',
        'Primeiras vendas assistidas',
      ],
    },
    {
      titulo: 'Ativação e Acesso ao Portal',
      texto: 'Após o onboarding, o representante pode estar (ideia em avaliação):',
      criterios: [
        'Habilitado — acesso à conta administrativa, cadastro de conta PIX, personalização de perfil, acesso às contas dos clientes, criação ilimitada de contas, contratação de planos e módulos, autonomia para gestão dos pagamentos',
        'Não habilitado — acesso limitado até a conclusão dos critérios de ativação',
      ],
    },
  ],
  financeiro: {
    texto: 'Comissão crescente de acordo com a responsabilidade do representante.\n\nExiste uma taxa de ativação de R$1.799,99 para entrar no programa. Em caso de negociação, pode ser isentada, mas precisa alinhar uma meta com o representante. (a validar com Vanessa e Rafael)\n\nA comissão é válida enquanto o cliente estiver ativo e pagante. Cancelamentos cessam imediatamente a remuneração recorrente daquele cliente. A comissão é paga até o dia 15 de cada mês, calculada pela vigência do mês anterior e paga no mês seguinte.',
    comissoes: [
      { pct: '10%', desc: 'Representante apenas vende' },
      { pct: '20%', desc: 'Representante vende e faz implementação' },
      { pct: '30%', desc: 'Representante vende, faz implementação e faz suporte ao cliente' },
      { pct: '40%', desc: 'Representante vende, implementa, presta suporte ao cliente e precisa alcançar a condição de 50 clientes ativos na carteira com taxa de cancelamento menor que 8% mensal' },
    ],
    precosVendaFinal: [
      { plano: 'Premium', valor: 'R$ 269,99' },
      { plano: 'Delivery', valor: 'R$ 209,99' },
      { plano: 'Mesas', valor: 'R$ 169,99' },
    ],
    modulosVendaFinal: [
      { modulo: 'Integração com iFood', valor: 'R$ 29,90' },
      { modulo: 'Estoque Avançado', valor: 'R$ 29,90' },
      { modulo: 'Gestão de Entregadores', valor: 'R$ 54,99' },
      { modulo: 'Financeiro', valor: 'R$ 69,99' },
      { modulo: 'Fiscal', valor: 'R$ 69,99' },
      { modulo: 'Totem', valor: 'R$ 99,99' },
    ],
    servicosExtras: ['Visitas técnicas', 'Mentorias', 'Implementação do sistema'],
  },
  niveis: ['Representante Iniciante', 'Representante Prata', 'Representante Ouro'],
  objecoes: [
    {
      pergunta: '"Preciso pagar taxa de ativação"',
      resposta: 'Faz total sentido questionar isso. Ninguém quer começar algo novo sentindo que está assumindo um risco sozinho.\n\nA taxa existe justamente para garantir que quem entra tenha estrutura, autonomia e suporte de verdade. Com o modelo de comissão recorrente, o programa foi desenhado para possibilitar o retorno já no primeiro mês, sem depender de volume absurdo de vendas.',
    },
    {
      pergunta: '"E se eu não vender?"',
      resposta: 'Essa é uma preocupação normal, principalmente quando falamos de um novo produto ou mercado.\n\nPor isso o programa não começa direto na venda. Você passa por treinamento, recebe materiais prontos, acompanhamento inicial e aprende exatamente como outros representantes já estão vendendo. Além disso, cada cliente ativo vira uma fonte de receita recorrente, o que reduz a pressão de recomeçar do zero todo mês.',
    },
    {
      pergunta: '"Por que o programa não é gratuito?"',
      resposta: 'Essa pergunta é justa. Muita gente associa parceria com algo sem custo.\n\nAqui, a taxa funciona como um filtro positivo. Ela garante um ecossistema com representantes comprometidos, o que permite à Cardápio Web investir em suporte, materiais, tecnologia e oportunidades reais de ganho para quem está dentro do programa.',
    },
    {
      pergunta: '"Não conheço o mercado de food"',
      resposta: 'Isso acontece bastante, principalmente com vendedores que vêm de outros segmentos de software.\n\nO treinamento cobre exatamente esse ponto. Você aprende as dores do restaurante, o discurso certo, os argumentos que mais convertem e exemplos práticos de venda. Ou seja, você não precisa ser especialista no segmento para começar a vender bem.',
    },
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// Progressão de carreira por nível — tabela de senioridade/comissão (interna)
// ────────────────────────────────────────────────────────────────────────────
export interface ProgressaoFaixa {
  senioridade: string;
  baseSalarial: string;
  faixa: string;
  meta1Pct: string; meta1Valor: string; meta1Ote: string;
  meta2Pct: string; meta2Valor: string; meta2Ote: string;
  meta3Pct: string; meta3Valor: string; meta3Ote: string;
  metaClientes: string;
  custoPorCliente: string;
  elegibilidade: string;
  desclassificacao: string;
}

export const PROGRESSAO_CARREIRA: ProgressaoFaixa[] = [
  { senioridade: 'JR 1', baseSalarial: 'R$1.809,51', faixa: 'Faixa 1 – Base', meta1Pct: '20,00%', meta1Valor: 'R$ 361,90', meta1Ote: 'R$ 2.171,41', meta2Pct: '25,00%', meta2Valor: 'R$452,38', meta2Ote: 'R$2.261,89', meta3Pct: '30,00%', meta3Valor: 'R$542,85', meta3Ote: 'R$2.352,36', metaClientes: '70', custoPorCliente: 'R$33,61', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 542,85', meta1Ote: 'R$ 2.352,36', meta2Pct: '35,00%', meta2Valor: 'R$633,33', meta2Ote: 'R$2.442,84', meta3Pct: '40,00%', meta3Valor: 'R$723,80', meta3Ote: 'R$2.533,31', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'JR 2', baseSalarial: 'R$1.988,48', faixa: 'Faixa 1 – Base', meta1Pct: '20,00%', meta1Valor: 'R$ 397,70', meta1Ote: 'R$ 2.386,18', meta2Pct: '25,00%', meta2Valor: 'R$497,12', meta2Ote: 'R$2.485,60', meta3Pct: '30,00%', meta3Valor: 'R$596,54', meta3Ote: 'R$2.585,02', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 596,54', meta1Ote: 'R$ 2.585,02', meta2Pct: '35,00%', meta2Valor: 'R$695,97', meta2Ote: 'R$2.684,45', meta3Pct: '40,00%', meta3Valor: 'R$795,39', meta3Ote: 'R$2.783,87', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'JR 3', baseSalarial: 'R$2.185,14', faixa: 'Faixa 1 – Base', meta1Pct: '20,00%', meta1Valor: 'R$ 437,03', meta1Ote: 'R$ 2.622,17', meta2Pct: '25,00%', meta2Valor: 'R$546,29', meta2Ote: 'R$2.731,43', meta3Pct: '30,00%', meta3Valor: 'R$655,54', meta3Ote: 'R$2.840,68', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 655,54', meta1Ote: 'R$ 2.840,68', meta2Pct: '35,00%', meta2Valor: 'R$764,80', meta2Ote: 'R$2.949,94', meta3Pct: '40,00%', meta3Valor: 'R$874,06', meta3Ote: 'R$3.059,20', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'PL 1', baseSalarial: 'R$2.401,25', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 600,31', meta1Ote: 'R$ 3.001,56', meta2Pct: '30,00%', meta2Valor: 'R$720,38', meta2Ote: 'R$3.121,63', meta3Pct: '45,00%', meta3Valor: 'R$1.080,56', meta3Ote: 'R$3.481,81', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 720,38', meta1Ote: 'R$ 3.121,63', meta2Pct: '35,00%', meta2Valor: 'R$840,44', meta2Ote: 'R$3.241,69', meta3Pct: '50,00%', meta3Valor: 'R$1.200,63', meta3Ote: 'R$3.601,88', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'PL 2', baseSalarial: 'R$2.617,36', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 654,34', meta1Ote: 'R$ 3.271,70', meta2Pct: '30,00%', meta2Valor: 'R$785,21', meta2Ote: 'R$3.402,57', meta3Pct: '45,00%', meta3Valor: 'R$1.177,81', meta3Ote: 'R$3.795,17', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 785,21', meta1Ote: 'R$ 3.402,57', meta2Pct: '35,00%', meta2Valor: 'R$916,08', meta2Ote: 'R$3.533,44', meta3Pct: '50,00%', meta3Valor: 'R$1.308,68', meta3Ote: 'R$3.926,04', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'PL 3', baseSalarial: 'R$2.852,93', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 713,23', meta1Ote: 'R$ 3.566,16', meta2Pct: '30,00%', meta2Valor: 'R$855,88', meta2Ote: 'R$3.708,81', meta3Pct: '45,00%', meta3Valor: 'R$1.283,82', meta3Ote: 'R$4.136,75', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 855,88', meta1Ote: 'R$ 3.708,81', meta2Pct: '35,00%', meta2Valor: 'R$998,53', meta2Ote: 'R$3.851,46', meta3Pct: '50,00%', meta3Valor: 'R$1.426,47', meta3Ote: 'R$4.279,40', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'SR 1', baseSalarial: 'R$3.109,69', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 777,42', meta1Ote: 'R$ 3.887,11', meta2Pct: '30,00%', meta2Valor: 'R$932,91', meta2Ote: 'R$4.042,60', meta3Pct: '45,00%', meta3Valor: 'R$1.399,36', meta3Ote: 'R$4.509,05', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 932,91', meta1Ote: 'R$ 4.042,60', meta2Pct: '35,00%', meta2Valor: 'R$1.088,39', meta2Ote: 'R$4.198,08', meta3Pct: '50,00%', meta3Valor: 'R$1.554,85', meta3Ote: 'R$4.664,54', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'SR 2', baseSalarial: 'R$3.389,56', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 847,39', meta1Ote: 'R$ 4.236,95', meta2Pct: '30,00%', meta2Valor: 'R$1.016,87', meta2Ote: 'R$4.406,43', meta3Pct: '45,00%', meta3Valor: 'R$1.525,30', meta3Ote: 'R$4.914,86', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 3 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 1.016,87', meta1Ote: 'R$ 4.406,43', meta2Pct: '35,00%', meta2Valor: 'R$1.186,35', meta2Ote: 'R$4.575,91', meta3Pct: '50,00%', meta3Valor: 'R$1.694,78', meta3Ote: 'R$5.084,34', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
  { senioridade: 'SR 3', baseSalarial: 'R$3.694,62', faixa: 'Faixa 1 – Base', meta1Pct: '25,00%', meta1Valor: 'R$ 923,66', meta1Ote: 'R$ 4.618,28', meta2Pct: '30,00%', meta2Valor: 'R$1.108,39', meta2Ote: 'R$4.803,01', meta3Pct: '45,00%', meta3Valor: 'R$1.662,58', meta3Ote: 'R$5.357,20', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Ramp-up concluído em caso de novato (Entrando e rampando); Meta 3 nos últimos 2 meses', desclassificacao: '' },
  { senioridade: '', baseSalarial: '', faixa: 'Faixa 2 – Estrela', meta1Pct: '30,00%', meta1Valor: 'R$ 1.108,39', meta1Ote: 'R$ 4.803,01', meta2Pct: '35,00%', meta2Valor: 'R$1.293,12', meta2Ote: 'R$4.987,74', meta3Pct: '50,00%', meta3Valor: 'R$1.847,31', meta3Ote: 'R$5.541,93', metaClientes: '#REF!', custoPorCliente: '#REF!', elegibilidade: 'Meta 3 (1 mês, no mês vigente)', desclassificacao: 'No caso de não bater meta 3 na faixa 2, desce pro nível anterior' },
];

// ────────────────────────────────────────────────────────────────────────────
// Cadências de prospecção / follow-up
// ────────────────────────────────────────────────────────────────────────────
export interface CadenciaPasso {
  dia: string;
  tipo: string;
  texto: string;
}

export interface CadenciaData {
  titulo: string;
  definicao: string;
  passos: CadenciaPasso[];
}

export const CADENCIA_PROSPECCAO: CadenciaData = {
  titulo: 'Cadência Prospecção de Novos Representantes (Inbound)',
  definicao: 'Cadência responsável pelo time de representantes oriundos do inbound. O fluxo de ligações, mensagens e e-mails serão registrado aqui para maior controle.',
  passos: [
    { dia: '1º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '1º Dia', tipo: 'Mensagem de abertura', texto: 'Olá, [nome_do_lead]! Tudo certo? Aqui é o [nome_do_especialista], especialista de representantes da Cardápio Web.\n\nVi que você preencheu o formulário e demonstrou interesse em conhecer melhor a oportunidade. Estou entrando em contato para entender melhor seu perfil e te explicar como funciona o modelo de parceria!\n\nMe conta: você hoje já atua com vendas, atendimento ao setor de restaurantes ou possui alguma carteira de clientes?' },
    { dia: '1º Dia', tipo: 'E-mail abertura', texto: 'Olá, [nome_do_lead]! Tudo bem?\n\nSou [nome_do_especialista], da Cardápio Web, e vi que você demonstrou interesse em conhecer nosso Programa de Representantes. Queria aproveitar o contato para te apresentar essa oportunidade de perto.\n\nSabemos que muitas pessoas buscam uma forma de gerar renda, ampliar seu portfólio de soluções ou até construir um negócio próprio e é exatamente isso que nosso programa oferece.\nA Cardápio Web é uma plataforma completa de cardápio digital, gestão do negócio e food marketing para restaurantes e deliveries. São mais de 17.000 negócios ativos no Brasil e nossos representantes ganham comissões recorrentes por cada cliente que indicam.\n\nQue tal agendarmos uma conversa rápida para eu te explicar como funciona? Me responde aqui.\n\n[nome_do_especialista]\nCardápio Web' },
    { dia: '2º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '2º Dia', tipo: 'Follow Up 1', texto: 'Olá, [nome_do_lead]! Tudo certo? Aqui é o [nome_do_especialista], especialista de representantes da Cardápio Web.\n\nComo comentei, estamos lançando oficialmente o Programa de Representantes da Cardápio Web, com uma comissão bastante atrativa e modelo de receita recorrente.\n\nAntes de avançarmos, queria te apresentar o formato e entender seu momento.\nQual melhor horário para conversarmos?' },
    { dia: '4º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '4º Dia', tipo: 'Follow Up 2', texto: 'Olá, [nome_do_lead]! Tudo certo?\n\nO programa de representantes é simples: você vende, oferece serviços adicionais, constrói carteira e recebe comissão recorrente todos os meses.\n\nEstamos abrindo poucas vagas agora porque queremos gente com perfil de execução.\n\nSe fizer sentido pra você gerar uma renda previsível com tecnologia para restaurantes, me diz que eu te explico como você pode começar ainda essa semana.' },
    { dia: '4º Dia', tipo: 'Email follow up', texto: 'Olá, [nome_do_lead]! Tudo bem?\n\nEntrei em contato recentemente e queria compartilhar mais detalhes sobre o nosso Programa de Representantes, porque acredito que você vai se identificar com o que temos a oferecer.\n\nVeja o que você tem acesso ao entrar para o programa:\n✅ Onboarding estruturado;\n✅ Materiais e ativos comerciais;\n✅ Acompanhamento estratégico;\n✅ Modelo validado de vendas;\n✅ Comissão recorrente;\n✅ Mapa de oportunidades;\n✅ Mentorias semanais com especialistas.\n\nSão mais de 17.000 negócios ativos na plataforma e esse mercado ainda tem muito espaço para crescer. Os representantes que entram agora estão saindo na frente.\nPosso te mostrar como tudo isso funciona em uma conversa rápida de 20 minutos. Qual o melhor horário para você?\n\n[nome_do_lead]\nCardápio Web' },
    { dia: '6º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '6º Dia', tipo: 'Follow Up 3', texto: 'Olá, [nome_do_lead]! Tudo certo?\n\nVocê sabia que nossos representantes recebem comissões recorrentes sobre a carteira de clientes que constroem?\n\nA Cardápio Web possui um dos programas de representantes que mais cresce no Brasil, oferecendo suporte, treinamento e oportunidade de crescimento junto com a empresa.\n\nFaz sentido para você conhecer melhor essa oportunidade?' },
    { dia: '8º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '8º Dia', tipo: 'Follow Up 4', texto: 'Fala, [nome_do_lead]! Tudo certo?\n\nPassando para te avisar, que estamos encerrando as vagas do Programa de Representantes da Cardápio Web agora em [mês atual].\n\nAs próximas oportunidades só abrem na turma de [próximo_mês]. Essa é a chance de você já começar a gerar comissão recorrente, criando uma base de clientes que te paga todos os meses, além de ampliar seu portfólio com uma solução validada no mercado.\n\nSe ainda faz sentido para você, me responde agora para garantirmos sua vaga antes do fechamento.' },
    { dia: '9º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '9º Dia', tipo: 'Break Up', texto: 'Fala, [nome_do_lead]! Passando para nossa última mensagem sobre o programa de representantes.\n\nComo não tivemos retorno, vou encerrar seu acompanhamento por aqui para não ficar insistindo 😄\n\nMas deixo as portas abertas caso queira retomar futuramente. Acredito que sua região ainda tem bastante potencial para o projeto 🚀\n\nObrigado pelo tempo e sucesso por aí!' },
    { dia: '9º Dia', tipo: 'Email break up', texto: 'Olá, [nome_do_lead]!\n\nTentei entrar em contato algumas vezes nos últimos dias para te apresentar o Programa de Representantes da Cardápio Web, mas entendo que talvez não seja o momento certo para você.\n\nNão tem problema! Agradecer pelo seu interesse e pelo tempo dispensado já é mais do que suficiente para nós. Fico feliz que você tenha conhecido um pouco mais sobre a Cardápio Web.\n\nQuem sabe em uma outra oportunidade os caminhos se encontram, o programa continua aberto e o mercado de restaurantes só cresce.\nSe em algum momento quiser retomar essa conversa ou tiver alguma dúvida, é só nos chamar pelo WhatsApp de Parcerias: wa.me/558599826536\n\nDesejo muito sucesso na sua jornada. Conte com a Cardápio Web quando precisar!\n\n[nome_do_especialista]\nCardápio Web' },
  ],
};

export const CADENCIA_POS_REUNIAO: CadenciaData = {
  titulo: 'Cadência de Follow-up (Pós-reunião)',
  definicao: 'Cadência responsável pelo time de representantes. O fluxo de ligações e mensagens serão registrado aqui para maior controle.',
  passos: [
    { dia: '1º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '1º Dia', tipo: 'Mensagem de abertura', texto: 'Oi, [nome_do_lead]!\n\nFoi ótimo conversar com você hoje. Fiquei animado com as possibilidades que discutimos e acredito que pode fazer bastante sentido para o seu momento atual.\n\nFico no aguardo do seu retorno para entendermos os próximos passos. Qualquer dúvida que tenha surgido depois da nossa conversa, é só me chamar.' },
    { dia: '3º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '3º Dia', tipo: 'Follow Up 1', texto: 'Olá, [nome_do_lead]!\n\nPassando aqui porque não tive retorno sobre nossa conversa sobre o programa de representante. Sei que a rotina anda corrida, então queria saber se ainda faz sentido para você ou se ficou alguma dúvida que eu possa esclarecer.\n\nFico à disposição para conversarmos novamente, se precisar.' },
    { dia: '5º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '5º Dia', tipo: 'Follow Up 2', texto: '[nome_do_lead], essa é a minha última mensagem para encerrar a condição.\n\nA comissão do programa é *recorrente*. Isso significa que você vende uma vez e continua recebendo todo mês enquanto o cliente ficar ativo. Te ajudamos em toda a jornada do cliente, você trabalha com quem já está na sua região.\n\nSe não for o momento certo, tudo bem também, fica aqui o contato caso mude de ideia. 🤝' },
  ],
};

export const CADENCIA_ONBOARDING: CadenciaData = {
  titulo: 'Cadência de Follow-up (Onboarding)',
  definicao: 'Cadência responsável pelo time de representantes. O fluxo de ligações e mensagens serão registrado aqui para maior controle.',
  passos: [
    { dia: '1º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '1º Dia', tipo: 'Mensagem de abertura', texto: 'Oi, [nome_do_rep]! Seja bem-vindo(a) ao time!🎉\n\nFico muito feliz em ter você no nosso programa de representantes. A partir de agora, você passa a representar a Cardápio Web, sistema que já conta com mais de 17.000 clientes ativos em todo o Brasil.\n\nO próximo passo é simples: fazer seu *onboarding*. É nele que você recebe todo o material, aprende o processo de vendas e já sai pronto(a) para começar a fechar contratos.\n\nQuanto antes a gente agenda, mais rápido você começa a gerar comissão. 📅\n\nQual o melhor dia pra você essa semana?' },
    { dia: '3º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '3º Dia', tipo: 'Follow Up 1', texto: 'Bom dia, [nome_do_rep]!\n\nPassando para saber se ficou alguma dúvida sobre o programa ou os próximos passos. 😊\n\nO onboarding é o momento em que você vai aprender a usar a plataforma na prática, entender como mapear e abordar prospects na sua região, e conhecer as estratégias que os representantes de melhor performance usam no dia a dia.\nSe fizer sentido para você, me avisa que já te passo os horários disponíveis para agendarmos.\n\nFico à disposição para qualquer pergunta antes disso também!' },
  ],
};

export const CADENCIA_1_CLIENTE: CadenciaData = {
  titulo: 'Cadência de Follow-up (1º Cliente)',
  definicao: 'Cadência responsável pelo time de representantes. O fluxo de ligações e mensagens serão registrado aqui para maior controle.',
  passos: [
    { dia: '1º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '1º Dia', tipo: 'Mensagem de abertura', texto: 'Oi, [nome_do_rep]! Onboarding feito, agora começa a parte boa. 🚀\n\nVocê já tem acesso ao sistema de representante. O próximo passo é simples: abre agora o portal do representante, filtra os leads da *sua região* e veja quantos estabelecimentos estão disponíveis pra você abordar.\n\nIsso leva menos de 5 minutos e já te dá uma visão clara do seu potencial de ganho aqui.\n\nMe fala: quantos leads apareceram na sua região? 👇' },
    { dia: '3º Dia', tipo: 'Follow Up 1', texto: 'Bom dia, [nome_do_rep]! 👋\n\nDica de quem já viu muitos representantes fecharem o primeiro cliente rápido:\n\n*Não tente falar com todo mundo ao mesmo tempo.* Escolhe de 5 a 10 leads no sistema, de preferência restaurantes, lanchonetes ou bares que você já conhece ou que ficam perto de você e foca neles primeiro.\n\nFamiliaridade gera confiança, e confiança fecha venda.\n\nVocê já abriu o sistema e deu uma olhada nos leads da sua região? Me conta como tá o cenário por aí.' },
    { dia: '5º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '5º Dia', tipo: 'Follow Up 2', texto: 'Oi, [nome_do_rep]! Hoje vou te passar algo que acelera muito o primeiro contato. 🎯\n\nQuando for abordar um lead, começa assim:\n\n*Oi, [nome do dono]! Trabalho com uma solução de cardápio digital que já é usada por mais de 17 mil estabelecimentos no Brasil. Muita gente aqui da região já usa. Posso te mostrar como funciona em 10 minutos?*\n\nSimples, direto e com prova social logo de cara. Não precisa explicar tudo no primeiro contato, o objetivo é só garantir uma conversa.\n\nVocê já abordou algum lead? Me conta como foi! 💬' },
  ],
};

export const CADENCIA_2_CLIENTE: CadenciaData = {
  titulo: 'Cadência de Follow-up (2º Cliente)',
  definicao: 'Cadência responsável pelo time de representantes. O fluxo de ligações e mensagens serão registrado aqui para maior controle.',
  passos: [
    { dia: '1º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '1º Dia', tipo: 'Mensagem de abertura', texto: 'Parabéns, [nome_do_rep]! 🎉 Primeira venda feita!\n\nSério, isso é maior do que parece. A maioria das pessoas trava antes de fechar o primeiro cliente, e você já passou dessa barreira.\nComo foi todo esse processo pra você? Teve algum momento mais desafiador ou algo que fluiu melhor do que esperava? Fico curioso(a) para saber como foi essa experiência na prática.\n\nQualquer coisa que precisar, é só chamar!' },
    { dia: '3º Dia', tipo: 'Follow Up 1', texto: 'Oi, [nome_do_rep]! Quero falar de uma coisa que derruba muita gente boa no meio do caminho: o *não*. 🚧\n\nDepois do primeiro cliente, a tendência é achar que todo lead vai virar venda. Aí vem uma semana de recusas e o desânimo bate.\n\nEntão deixa eu te dar um novo ângulo:\n\n*Cada não que você recebe te aproxima do próximo sim.*\n\nNão é clichê, é matemática de vendas. Se a sua taxa de conversão é de 1 em 5, então cada *não* é 20% de um cliente fechado.\n\nQuando ouvir um *não* hoje, anota aqui pra mim. Vamos acompanhar juntos quantos *nãos* te custou o segundo cliente. 📊' },
    { dia: '5º Dia', tipo: 'Ligação de diagnóstico', texto: 'Ligação de diagnóstico' },
    { dia: '5º Dia', tipo: 'Follow Up 2', texto: '[nome_do_rep], passando para te falar o que importa de verdade. 🤝\n\nVocê saiu do zero, fez o onboarding, fechou o primeiro cliente e está construindo uma carteira recorrente. Isso não é pouca coisa.\n\nO segundo cliente pode vir hoje, amanhã ou na semana que vem, mas vai vir. Desde que você não pare.\n\nFoco, sistema e consistência.\n\nEstou aqui pra qualquer dúvida, objeção travada ou lead que você queira trabalhar junto. Pode chamar quando quiser. 💪' },
  ],
};
