/** Onboarding de Partner Success Manager (PSM) — transcrição fiel da planilha
 *  "[ONB][PAR] Onboarding de Partner Success Manager (PSM) - Gabrielly Oliveira".
 *  Inclui nomes reais de colegas e o status de conclusão (TRUE/FALSE) original,
 *  conforme aprovado para uso interno neste portal. */

export interface OnboardingItem {
  atividade: string;
  acao: string;
  status: boolean;
}

export interface OnboardingBloco {
  macrotopico: string;
  descricao: string;
  itens: OnboardingItem[];
}

export interface OnboardingDia {
  dia: string;
  blocos: OnboardingBloco[];
}

export const ONBOARDING_PSM: OnboardingDia[] = [
  {
    dia: 'Dia 1 e Dia 2',
    blocos: [
      {
        macrotopico: 'Imersão Organizacional',
        descricao: 'Checklist de primeiros passos',
        itens: [
          { atividade: 'Criei conta no Sandbox', acao: 'Falar com o Hyorranes para criar conta\nAcesso Sandbox', status: true },
          { atividade: 'Fiz o Profile da Sólides', acao: 'Teste Profile Sólides', status: false },
          { atividade: 'Enviar o teste PROFILE para o líder direto', acao: 'Enviar para o Hyorranes', status: false },
        ],
      },
      {
        macrotopico: 'Compra de livro e primeiro 1:1',
        descricao: 'Realizar a compra do livro e marcar o primeiro 1:1 com a liderança',
        itens: [
          { atividade: 'Comprar o livro Ecossistema de Parceiros e iniciar a leitura para fazer uma breve apresentação para sua liderança após 30 dias', acao: 'Livro Ecossistema de Parceiros', status: false },
          { atividade: 'Solicitar o reembolso da compra do livro Ecossistema de Parceiros', acao: 'Solicitar reembolso', status: true },
          { atividade: 'Receber o feedback sobre o meu processo seletivo', acao: 'Reunião com Hyorranes', status: false },
          { atividade: 'Marquei o meu primeiro 1:1 com a liderança', acao: 'Preencher a Aba 1° Reunião de 1:1', status: false },
        ],
      },
      {
        macrotopico: 'Conhecendo a jornada do cliente',
        descricao: 'Conversar com as lideranças para entender como funciona, o que o time faz e como o time de representantes pode ter relação com o setor',
        itens: [
          { atividade: 'Conversar com a liderança de Content', acao: 'Joice Rocha', status: false },
          { atividade: 'Conversar com a liderança de Growth', acao: 'Gerardo Magalhães', status: false },
          { atividade: 'Conversar com a liderança de Channel', acao: 'Beatriz Magalhães e Vanessa Alencar', status: false },
          { atividade: 'Conversar com a liderança de Pré-vendas (SDR)', acao: 'Anderson Castro, Joelma Vieira, Pedro Ferreira ou Vithoria Rodrigues', status: false },
          { atividade: 'Conversar com a liderança de Vendas (Closers)', acao: 'Whenna Oliveira, Gregory Lavor', status: false },
          { atividade: 'Conversar com a liderança de Expansão', acao: 'Clara Melo', status: false },
          { atividade: 'Conversar com a liderança de Implementação', acao: 'Samuel Morais, Lara Ferreira', status: false },
          { atividade: 'Conversar com a liderança de Suporte', acao: 'Gabriel Barbosa, Leiliane Furtado, Thais Portela, Karen Lethycia', status: false },
          { atividade: 'Conversar com o diretor de Inovação e Parcerias Estratégicas', acao: 'Rafael Barbosa', status: false },
        ],
      },
      {
        macrotopico: 'Ponto de contato com a liderança',
        descricao: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta',
        itens: [
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 3',
    blocos: [
      {
        macrotopico: 'Métricas',
        descricao: 'Desenvolver o senso analítico e acompanhamento de métricas',
        itens: [
          { atividade: 'Gestão de canais e parcerias: práticas, KPIs e frameworks', acao: 'Gestão de canais e parcerias: práticas, KPIs e frameworks', status: true },
        ],
      },
      {
        macrotopico: 'Cultura da Cardápio Web',
        descricao: 'Entender como funciona a cultura da Cardápio Web',
        itens: [
          { atividade: 'Ler artigo sobre cultura de um empresa', acao: 'Cultura de uma empresa: exemplos para se inspirar', status: false },
          { atividade: 'Ler memorando da Cardápio Web', acao: 'Memorando da Cardápio Web', status: false },
          { atividade: 'Conversar com a liderança sobre o que entendeu da nossa cultura', acao: 'Falar com Hyorranes', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 4 e Dia 5',
    blocos: [
      {
        macrotopico: 'Imersão técnica (Parte 1)',
        descricao: 'Desenvolver habilidades técnicas',
        itens: [
          { atividade: 'Escutar 5 episódios do Partner Cast e realizar um resumo de cada episódio', acao: 'Partner Cast', status: false },
          { atividade: 'Ler sobre o CW Club e verificar quais pontos que podem ser aproveitados e quais pontos podem ser alterados para o programa de representantes', acao: 'CW Club', status: false },
          { atividade: 'Modelo de Canais: Tudo o que você precisa saber', acao: 'Plural Sales - [Guia] Modelos de Canais: Tudo o que você precisa saber', status: false },
          { atividade: 'Como Estruturar Parcerias e Canais em 2026: Guia Prático', acao: 'Como Estruturar Parceiras e Canais', status: false },
          { atividade: 'Partner Manager: Funções, Habilidades e Impacto no Canal', acao: 'Partner Manager', status: false },
          { atividade: 'Metodologia para o seu programa de canal', acao: '9 passos da nova metodologia para rodar o seu programa de canal - Plural Sales', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 6 e Dia 7',
    blocos: [
      {
        macrotopico: 'Imersão técnica (Parte 2)',
        descricao: 'Desenvolver habilidades técnicas',
        itens: [
          { atividade: 'Acesse o Playbook de Representante e estude o setor', acao: '[REP] Playbook de Representantes', status: false },
          { atividade: 'O que é Onboarding: Como fazer e quais os seus benefícios', acao: 'O que é Onboarding: Como fazer e quais os seus benefícios', status: false },
          { atividade: 'Definição de Onboarding', acao: 'Onboarding - Cursos para Product Manager', status: false },
          { atividade: 'Checklist do onboarding de parceiros: passos para os primeiros 90 dias', acao: 'Checklist do onboarding de parceiros: passos para os primeiros 90 dias', status: false },
          { atividade: 'Como personalização e experimentação podem fortalecer seu onboarding', acao: 'Como personalização e experimentação podem fortalecer seu onboarding', status: false },
          { atividade: 'Como é um excelente processo de integração de parceiros (com exemplos!)', acao: 'What Great Partner Onboarding Looks Like (With Examples!)', status: false },
          { atividade: 'Seu guia para uma estratégia eficaz de capacitação de parceiros.', acao: 'What is Partner Enablement? | Salesforce', status: false },
          { atividade: 'Ler esse artigo no Linkedin', acao: 'Estratégia de Partner Enablement - Como elevar o nível do seu programa e gerar resultados reais', status: false },
          { atividade: 'How to plan and build a #partner enablement #training program | Taunya MacDonald', acao: 'How to plan and build a #partner enablement #training program | Taunya MacDonald', status: false },
          { atividade: 'The Ultimate Guide to Partner Success Programs', acao: 'The Ultimate Guide to Partner Success Programs - YouTube', status: false },
          { atividade: 'How do I scale my partner enablement training program? | Taunya MacDonald', acao: 'How do I scale my partner enablement training program? | Taunya MacDonald', status: false },
          { atividade: 'Capacitação de parceiros: Um guia prático', acao: "Partner enablement: A practitioner's complete guide", status: false },
          { atividade: 'Ler o artigo sobre SPIN e entender como utilizar', acao: 'O que é o SPIN Selling?', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 8',
    blocos: [
      {
        macrotopico: 'Conhecimento de Modelo de Parcerias no mercado',
        descricao: 'Estudo sobre o modelo de parcerias no mercado',
        itens: [
          { atividade: 'Pesquise e analise 3 empresas que utilizem tipos diferentes de parceria entre si (não repita o mesmo modelo).', acao: 'Entender como diferentes tipos de parceria funcionam na prática, para embasar decisões sobre o modelo de parcerias do PSM.', status: false },
          { atividade: 'Faça um documento explicando como você acredita que a vaga de PSM pode contribuir no setor de representantes', acao: 'Crie um documento explicando como a função do Partner Success Manager pode contribuir no programa de representantes.', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
      {
        macrotopico: 'Conhecendo o nosso produto',
        descricao: 'Domínio do sistema',
        itens: [
          { atividade: 'Ler todas as abas na nossa Central de Ajuda', acao: 'Central de Ajuda', status: false },
          { atividade: 'Realizar teste prático sobre a Central de Ajuda', acao: 'https://forms.gle/u64BLAm5Rrsr2iwi9', status: false },
          { atividade: 'Assista o vídeo', acao: 'Cardápio Digital, Sistema de Gestão e Food Marketing: Conheça o E-commerce dos Restaurantes', status: false },
          { atividade: 'Assista o vídeo', acao: 'SAIBA COMO GERENCIAR O SEU NEGÓCIO COM A CARDÁPIO WEB', status: false },
          { atividade: 'Assista o vídeo', acao: 'CONHEÇA O CARDÁPIO DIGITAL DA CARDÁPIO WEB', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 9',
    blocos: [
      {
        macrotopico: 'Teste prático do sistema',
        descricao: 'Teste realizado para avaliar o conhecimento prático adquirido do sistema',
        itens: [
          { atividade: 'Acessar o Sandbox e realizar os exercícios de fixação abaixo', acao: 'Sandbox', status: false },
          { atividade: 'Faça a montagem de um cardápio', acao: 'Cardápio #1 - Simples | Exercício', status: false },
          { atividade: 'Lançar 3 cupons de descontos', acao: 'Criando cupons e descontos', status: false },
          { atividade: 'Lance 3 produtos no programa de fidelização e resgate a bonificação', acao: 'Programa fidelidade', status: false },
          { atividade: 'Simular um disparo de mensagens', acao: 'Disparador via Whatsapp', status: false },
          { atividade: 'Cadastrar 3 áreas de entregas, e ver como funciona as configurações', acao: 'Cadastrando áreas de entrega', status: false },
          { atividade: 'Roleplay sobre funcionalidades do sistema', acao: 'Reunião com Hyorranes', status: false },
          { atividade: 'Conversar no final do expediente sobre os aprendizados do dia com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 10',
    blocos: [
      {
        macrotopico: 'Plataformas Utilizadas',
        descricao: 'Conhecendo as plataformas de uso diário',
        itens: [
          { atividade: 'Assistir os vídeos de suporte do pipedrive e entender como a ferramenta funciona', acao: 'Vídeos de instrução - Uma bela visão geral do Pipedrive - Knowledge Base', status: false },
          { atividade: 'Vídeo sobre o acompanhamento do representante após cadastro no programa', acao: '[REP] Acompanhamento de representante após cadastro.mp4', status: false },
          { atividade: 'Vídeo sobre o envio de cliente de representante para implementação', acao: '[REP] Envio de clientes de representantes para implementação.mp4', status: false },
          { atividade: 'Acesso ao portal do representante', acao: 'Portal do Representante', status: false },
          { atividade: 'Vídeo explicativo sobre o portal do representante', acao: '[REP] Explicação do Portal do Representante.mp4', status: false },
          { atividade: 'Assistir o vídeo da gravação de como utilizar a Kommo', acao: 'Videos Kommo', status: false },
          { atividade: 'Acompanhar o Leandro Santos ou Gustavo Duarte em reunião de cliente', acao: 'Acompanhar closer', status: false },
          { atividade: 'Acompanhar a Layza Batista em reunião de parceiro', acao: 'Acompanhar channel acquisition', status: false },
          { atividade: 'Acompanhar a Letícia Rocha por um dia', acao: 'Acompanhar partner success manager', status: false },
          { atividade: 'Acompanhar a Mariana Rodrigues durante o atendimento', acao: 'Acompanhar consultor de implementação', status: false },
          { atividade: 'Acompanhar o Gustavo Barbosa durante o atendimento', acao: 'Acompanhar especialista de helpdesk', status: false },
          { atividade: 'Conversar sobre os aprendizados com a liderança direta', acao: 'Reunião com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 11 e Dia 12',
    blocos: [
      {
        macrotopico: 'Apresentação',
        descricao: 'Habilidades e conhecimentos específicos que adquiriu',
        itens: [
          {
            atividade: 'Conversar com sua liderança e realizar uma breve apresentação sobre o Onboarding.',
            acao: 'Os critérios de avaliação estão na aba Avaliação Apresentação, faça uma apresentação de acordo com os tópicos:\n1° Explique o que é o E-commerce dos restaurantes\n2° Explicação dos Três Pilares\n3º Jornada do Representante\n4° Aplicando técnicas de vendas (SPIN)\n5° Métricas do Time do time de PSM\n6° Planos\n7º Módulos\n8º O que você considera um onboarding de sucesso?\n\nCopiar o modelo de apresentação',
            status: false,
          },
        ],
      },
    ],
  },
  {
    dia: 'Dia 13',
    blocos: [
      {
        macrotopico: 'Treinamento de atendimento',
        descricao: 'Treinamento acompanhado pela liderança direta dos atendimentos feitos pelo PSM',
        itens: [
          { atividade: 'Fazer treinamento com a liderança', acao: 'Falar com Hyorranes', status: false },
        ],
      },
    ],
  },
  {
    dia: 'Dia 30',
    blocos: [
      {
        macrotopico: 'Apresentação livro Ecossistema de Parceiros',
        descricao: 'Executar uma apresentação sobre o livro Ecossistema de Parceiros',
        itens: [
          { atividade: '', acao: 'Falar com Hyorranes', status: false },
        ],
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// 1ª Reunião de 1:1 — template de perguntas para a primeira reunião com o líder
// ────────────────────────────────────────────────────────────────────────────
export const REUNIAO_1_1_PERGUNTAS: string[] = [
  'Quem é o BDR?',
  'Como entrou na CW?',
  'Hobbies?',
  'Rotina?',
  'Como ele está se sentindo com a saída?',
  'Como você se sente em relação às suas metas?',
  'Quais são seus planos a longo a prazo?',
  'Quais os planos a curto prazo?',
  'Qual vai ser a prova da monitoria? Materiais de Construção I e II',
  'Como você se sente em relação ao time?',
  'Você tem alguma sugestão de melhoria que ainda não tentamos?',
  'Na sua opinião, qual o maior desafio que enfrentamos como time?',
  'O que tu acha do teu Perfil Solides?',
  'O que acha que vai ser o futuro da CW?',
];

// ────────────────────────────────────────────────────────────────────────────
// Avaliação da Apresentação de Onboarding — rubrica de 8 tópicos
// ────────────────────────────────────────────────────────────────────────────
export interface AvaliacaoCriterio {
  criterio: string;
  descricao: string;
}

export const AVALIACAO_APRESENTACAO: AvaliacaoCriterio[] = [
  { criterio: 'Explique o que é o E-commerce dos restaurantes', descricao: 'O PSM fez uma apresentação breve da empresa, explicando o que fazemos e para quem fazemos.' },
  { criterio: 'Explicação dos Três Pilares', descricao: 'Explicar os três pilares que a empresa oferece solução.' },
  { criterio: 'Jornada do Representante', descricao: 'O PSM explicou de forma sucinta a jornada do representante dentro da Cardápio Web. Mas pontuando cada um dos setores e o que eles fazem.' },
  { criterio: 'Aplicando técnicas de vendas (SPIN)', descricao: 'O PSM explicou como usar as técnicas de vendas (SPIN).' },
  { criterio: 'Métricas do Time do time de PSM', descricao: 'O PSM explicou as principais métricas que um partner success manager precisa analisar.' },
  { criterio: 'Planos', descricao: 'O PSM precisa informar quais os valores dos planos e suas especificações.' },
  { criterio: 'Módulos', descricao: 'O PSM precisa informar quais os valores dos módulos e suas especificações.' },
  { criterio: 'O que você considera um onboarding de sucesso?', descricao: 'O PSM conseguiu explicar o que acredita que pode ser um onboarding de sucesso.' },
  { criterio: 'Tempo de Apresentação', descricao: 'O PSM realizou a apresentação em 20 minutos' },
];
