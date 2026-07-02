/** Central de Ajuda da Cardápio Web — guia por setor/tela do sistema, para consulta e estudo.
 *  Gerado a partir do documento de referência PSM (Julho de 2026). */

export interface CentralAjudaBloco {
  tipo: 'texto' | 'subtitulo' | 'lista';
  texto?: string;
  itens?: string[];
}

export interface CentralAjudaSecao {
  numero: number;
  titulo: string;
  categoria: string;
  blocos: CentralAjudaBloco[];
}

export const CENTRAL_AJUDA_INTRO: string[] = [
  "Este documento reúne todas as informações da Central de Ajuda da Cardápio Web, organizado por seções. Material de referência para PSM (Parceiro de Sucesso e Marketing).",
  "Data de compilação: Julho de 2026"
];

/** Agrupa as seções numeradas por aba do Playbook — fonte única usada tanto
 *  para renderizar os accordions quanto para o assistente de busca fazer
 *  o deep-link direto pro artigo certo. */
export const GRUPOS_TOPICO: { tab: string; numeros: number[] }[] = [
  { tab: 'primeiros-passos', numeros: [1, 3, 4] },
  { tab: 'gestao-cw',        numeros: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { tab: 'automacao-cw',     numeros: [21, 22, 23] },
  { tab: 'vendas-cw',        numeros: [24, 25] },
  { tab: 'modulos-cw',       numeros: [26, 27, 28, 29, 30] },
  { tab: 'suporte-cw',       numeros: [31] },
];

export const NUMERO_TAB: Record<number, string> = Object.fromEntries(
  GRUPOS_TOPICO.flatMap((g) => g.numeros.map((n) => [n, g.tab] as const)),
);

export const CENTRAL_AJUDA_SECOES: CentralAjudaSecao[] = [
  {
    "numero": 1,
    "titulo": "Boas-vindas",
    "categoria": "Boas-vindas",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A Central de Ajuda da Cardápio Web é o espaço ideal para esclarecer dúvidas de forma rápida, prática e eficiente. Contém guias, tutoriais e respostas às perguntas mais frequentes."
      },
      {
        "tipo": "subtitulo",
        "texto": "Categorias disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Gestão → pedidos, mesas, comandas, caixa e relatórios.",
          "Automação → disparo via WhatsApp, chatbot, integrações.",
          "Aumento de Vendas → cupons, descontos e fidelidade.",
          "Módulos do Sistema → estoque avançado, financeiro, fiscal e mais.",
          "Suporte → aulas, perguntas frequentes e contatos."
        ]
      }
    ]
  },
  {
    "numero": 2,
    "titulo": "Planos, Funcionalidades e Módulos Adicionais",
    "categoria": "Planos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A Cardápio Web oferece três planos principais que se adaptam ao modelo de operação do seu negócio."
      },
      {
        "tipo": "subtitulo",
        "texto": "Planos Disponíveis:"
      },
      {
        "tipo": "subtitulo",
        "texto": "Plano Mesas"
      },
      {
        "tipo": "texto",
        "texto": "Inclui: Módulo de mesas, módulo de balcão, módulo de caixa, impressão automática, gestão de usuários, gestão de clientes, estoque simples, fiado."
      },
      {
        "tipo": "subtitulo",
        "texto": "Plano Delivery"
      },
      {
        "tipo": "texto",
        "texto": "Inclui: Módulo de delivery, módulo de balcão, módulo de caixa, módulo de entregadores, campos personalizados, impressão automática, gestão de usuários, gestão de clientes, estoque simples, fidelidade, fiado, pagamento online, extensão do WhatsApp."
      },
      {
        "tipo": "subtitulo",
        "texto": "Plano Premium"
      },
      {
        "tipo": "texto",
        "texto": "Inclui todos os recursos dos planos anteriores: Módulo de mesas, módulo de delivery, módulo de balcão, módulo de caixa, módulo de entregadores, campos personalizados, impressão automática, gestão de usuários, gestão de clientes, estoque simples, fidelidade, fiado, pagamento online, extensão do WhatsApp."
      },
      {
        "tipo": "texto",
        "texto": "Observação: Automação do chatbot disponível exclusivamente nos planos Delivery e Premium."
      },
      {
        "tipo": "subtitulo",
        "texto": "Valores por Plano:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Mesas: Mensal R$169,99 | Trimestral R$479,97 | Semestral R$899,94 | Anual R$1.679,88",
          "Delivery: Mensal R$209,99 | Trimestral R$599,97 | Semestral R$1.139,94 | Anual R$2.159,88",
          "Premium: Mensal R$269,99 | Trimestral R$799,97 | Semestral R$1.499,94 | Anual R$2.879,88"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Módulos Adicionais:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Gestão Financeira – R$69,99/mês: Controle financeiro, com entrada, saída, categorias e relatórios.",
          "Fiscal – R$69,99/mês: Emissão de notas fiscais, XML, status de notas e integração com Receita.",
          "Gestão de Entregas – R$54,99/mês: Organize e acompanhe as entregas com controle total sobre os entregadores.",
          "Estoque Avançado – R$29,99/mês: Gestão detalhada de insumos, perdas, movimentações e alertas de estoque.",
          "Módulo de integração com marketplaces – R$29,99/mês: Centralize pedidos conectando marketplaces diretamente ao sistema."
        ]
      },
      {
        "tipo": "texto",
        "texto": "A cobrança dos módulos segue a mesma recorrência do plano principal (mensal, trimestral, semestral ou anual)."
      },
      {
        "tipo": "subtitulo",
        "texto": "FAQ - Planos:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Posso trocar de plano depois da contratação? Sim, é possível trocar de plano após a contratação.",
          "Posso contratar um módulo extra mesmo com o plano mais básico? Sim, módulos extras podem ser contratados com qualquer plano.",
          "Posso contratar um módulo com recorrência diferente do plano? A cobrança do módulo segue a mesma recorrência do plano principal."
        ]
      }
    ]
  },
  {
    "numero": 3,
    "titulo": "Acessando o Sistema pela Primeira Vez",
    "categoria": "Primeiros Passos",
    "blocos": [
      {
        "tipo": "subtitulo",
        "texto": "Primeiro Acesso ao Portal:"
      },
      {
        "tipo": "texto",
        "texto": "Se este é o seu primeiro acesso, você precisará criar uma senha. Acesse: https://portal.cardapioweb.com/login"
      },
      {
        "tipo": "lista",
        "itens": [
          "Na página de login, clique em \"ESQUECI MINHA SENHA\".",
          "Insira o e-mail cadastrado e clique em \"ENVIAR\".",
          "Acesse o e-mail recebido e clique no botão \"Criar nova senha\".",
          "Digite a nova senha nos campos indicados e clique em \"Confirmar\"."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Recomendações de segurança para a senha:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Escolha uma senha fácil de lembrar, mas difícil de ser adivinhada.",
          "Use letras maiúsculas/minúsculas, números e símbolos especiais (@, #, !).",
          "Evite informações pessoais como datas de nascimento ou nomes.",
          "Crie senhas com pelo menos 12 caracteres.",
          "Não reutilize senhas antigas."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como acessar o portal após criar a senha:"
      },
      {
        "tipo": "texto",
        "texto": "Acesse portal.cardapioweb.com, informe seu e-mail e a senha criada. Você receberá um código de autenticação no e-mail. Insira o código no campo indicado para concluir o acesso."
      }
    ]
  },
  {
    "numero": 4,
    "titulo": "Cardápios Demonstrativos",
    "categoria": "Vendas",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A plataforma oferece exemplos reais de cardápios digitais desenvolvidos com a plataforma, mostrando como é simples, prático e moderno criar um cardápio digital profissional."
      },
      {
        "tipo": "subtitulo",
        "texto": "Tipos de cardápios demonstrativos disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Pizzaria",
          "Sushi",
          "Hamburgueria",
          "Confeitaria",
          "Hortifruti",
          "Gelateria",
          "Padaria",
          "Massas",
          "Fit",
          "Restaurante",
          "Adega",
          "Vegana",
          "Açaiteria"
        ]
      }
    ]
  },
  {
    "numero": 5,
    "titulo": "Gestão de Pedidos",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Gestão de Pedidos é o espaço onde você tem controle total sobre o fluxo de pedidos da sua loja — seja para delivery, retirada ou consumo no local."
      },
      {
        "tipo": "subtitulo",
        "texto": "Recursos disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Lançamento manual de pedidos: crie pedidos diretamente no sistema para qualquer tipo de atendimento.",
          "Edição de pedidos lançados: edite dados do cliente, endereço, tipo de pedido e formas de pagamento — inclusive múltiplas formas de pagamento no mesmo pedido.",
          "Personalização do layout: defina a posição de cada status de pedido na tela.",
          "Ajuste rápido de tempos: use atalhos para aumentar ou reduzir o tempo de preparo ou entrega.",
          "Pesquisa por nome ou número do cliente nos status: Em produção, Saiu para entrega, Aguardando retirada ou Cancelado."
        ]
      }
    ]
  },
  {
    "numero": 6,
    "titulo": "Mesas e Comandas",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Mesas e Comandas é onde você realiza todo o atendimento presencial, controlando pedidos e movimentações em mesas físicas ou comandas."
      },
      {
        "tipo": "subtitulo",
        "texto": "Ações disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Abrir mesas ou comandas",
          "Lançar pedidos",
          "Cancelar itens",
          "Transferir itens entre mesas ou comandas",
          "Fechar contas"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Status das mesas por cor:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Verde: mesa aberta",
          "Roxa: em processo de fechamento",
          "Laranja: cliente solicitou o fechamento",
          "Cinza: mesa fechada e disponível para abrir"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como abrir uma mesa:"
      },
      {
        "tipo": "lista",
        "itens": [
          "No menu lateral, clique em Mesas/Comandas.",
          "Clique sobre uma mesa cinza.",
          "Preencha o formulário: quantidade de pessoas (opcional), atendente responsável, identificação (opcional).",
          "Clique em Salvar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como fechar uma mesa:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Selecione uma mesa verde (aberta) e clique em \"Fechar conta\".",
          "Clique em \"Pagamento\".",
          "Opção 1 – Dividir conta: atribua cada produto ao cliente correspondente, selecione a forma de pagamento e confirme.",
          "Opção 2 – Pagamento total: clique em Pagar, selecione a forma de pagamento e confirme."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como cancelar itens:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Clique em \"Mais ações\" (↑) e selecione \"Cancelar itens\".",
          "Marque os itens, clique em \"Cancelar selecionados\", informe o motivo e confirme."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como transferir itens entre mesas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Clique em \"Mais ações\" (↑) e selecione \"Transferir itens\".",
          "Marque os itens, clique em \"Transferir selecionados\", escolha a mesa/comanda de destino e salve."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como editar formas de pagamento em Mesas/Comandas:"
      },
      {
        "tipo": "texto",
        "texto": "Pelo Histórico de Pedidos: acesse o histórico, busque o pedido, clique em REABRIR PEDIDO. Pelo Caixa do Dia: localize o pedido pelo número, clique nos detalhes, clique em REABRIR PEDIDO. Após reabrir, exclua a forma de pagamento incorreta e registre a nova."
      }
    ]
  },
  {
    "numero": 7,
    "titulo": "KDS - Kitchen Display System",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O KDS (Kitchen Display System) é um visualizador digital de pedidos que substitui as comandas impressas ou escritas em papel. Exibe os pedidos em tempo real na cozinha, organizando o fluxo de preparo."
      },
      {
        "tipo": "subtitulo",
        "texto": "Modos de operação:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Modo Preparo: recomendado para a equipe da cozinha. Exibe pedidos pendentes de produção.",
          "Modo Despacho: recomendado para o setor responsável pela entrega dos pedidos prontos."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Configurações do KDS:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Layout: Compacto (mais pedidos na tela) ou Alinhado (pedidos lado a lado, mesmo tamanho).",
          "Tipos de pedido: Delivery, Retirada, Consumo no local, Mesas, Comandas.",
          "Áreas de produção: escolha quais áreas visualizar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Cores de status dos produtos no Modo Preparo:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Azul: produto em preparação.",
          "Cinza claro: produto finalizado e pronto."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Resumo da Produção:"
      },
      {
        "tipo": "texto",
        "texto": "Disponível no Modo Preparo, exibe a quantidade total de cada produto a ser produzido e a qual pedido cada produto está vinculado. Ao clicar em um item, o status muda para \"em produção\" (azul). Clique novamente para marcar como pronto."
      },
      {
        "tipo": "subtitulo",
        "texto": "Modo Despacho:"
      },
      {
        "tipo": "texto",
        "texto": "Exibe pedidos finalizados no preparo, prontos para entrega. Ações disponíveis: marcar como disponível para retirada, saiu para entrega ou entregue ao cliente. É possível retornar pedidos para a cozinha clicando no ícone de seta."
      }
    ]
  },
  {
    "numero": 8,
    "titulo": "Caixa",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "subtitulo",
        "texto": "Informações Gerais:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Um pedido só é lançado no caixa quando é concluído.",
          "Caso o caixa esteja fechado, ele será aberto automaticamente ao concluir um pedido.",
          "É importante fechar o caixa ao final do expediente.",
          "Caixas abertos há mais de 24h sem movimentações nas últimas 2h serão fechados automaticamente pelo sistema."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como abrir o caixa:"
      },
      {
        "tipo": "lista",
        "itens": [
          "No menu lateral, clique em \"Caixa\".",
          "Clique em \"Abrir Caixa\" (botão roxo).",
          "Informe o valor atual em dinheiro disponível no caixa.",
          "Clique em Confirmar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Informações disponíveis após abertura:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Histórico de Movimentações: data/hora, descrição, valor, forma de pagamento, tipo e usuário responsável.",
          "Resumo do Caixa: número do caixa, data/hora de abertura, valores em dinheiro (saldo inicial, suprimentos, sangrias, vendas), resumo por forma de pagamento e por tipo de pedido."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Operações no Caixa:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Suprimento: clique em \"Suprimento\", preencha descrição e valor, clique em \"Salvar\".",
          "Sangria: clique em \"Sangria\", informe descrição e valor, clique em \"Salvar\".",
          "Fechar caixa: clique em \"Fechar Caixa\", confira os valores, informe o valor real encontrado, finalize clicando em \"Fechar Caixa e Imprimir\" ou \"Fechar Caixa\".",
          "Reabrir caixa: acesse \"Caixas Anteriores\", selecione o caixa, clique em \"Reabrir Caixa\" e confirme."
        ]
      }
    ]
  },
  {
    "numero": 9,
    "titulo": "Desempenho",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A Tela de Desempenho é o ponto central para monitorar e analisar os principais indicadores do estabelecimento, auxiliando na tomada de decisões estratégicas."
      },
      {
        "tipo": "subtitulo",
        "texto": "Informações disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Quantidade de pedidos em um período específico",
          "Faturamento total no período",
          "Acessos ao cardápio e número de visitantes",
          "Ticket médio dos pedidos",
          "Taxas de entrega e de serviço (para mesas e comandas)",
          "Taxas da maquineta",
          "Percentuais por método de pagamento (dinheiro, débito, crédito etc.)",
          "Descontos"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Tópicos de análise:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Vendas: volume de vendas, produtos mais vendidos e ticket médio.",
          "Clientes: comportamento dos clientes e padrões de consumo.",
          "Base de Clientes (RFV): análise por Recência, Frequência e Valor monetário.",
          "Catálogo: desempenho dos produtos do cardápio.",
          "Produtos: detalhamento por item.",
          "Entregas: status e eficiência das entregas.",
          "Descontos: impacto dos descontos nas vendas.",
          "Cancelamentos: motivos e frequência.",
          "Visão Geral do Estabelecimento: panorama completo do desempenho."
        ]
      }
    ]
  },
  {
    "numero": 10,
    "titulo": "Histórico de Pedidos",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Histórico de Pedidos permite acompanhar todos os pedidos já realizados, independentemente do status."
      },
      {
        "tipo": "subtitulo",
        "texto": "Colunas disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Número do Pedido",
          "Nome do Cliente",
          "Data e Hora de Criação",
          "Data de Agendamento",
          "Valor Total",
          "Forma de Pagamento",
          "Tipo de Pedido (retirada, delivery, consumo no local, mesa/comanda)",
          "Canal de Venda (Portal, Extensão, Site, Site Balcão, iFood)",
          "Status do Pedido"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Filtros Avançados disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Tipo de Pedido: Delivery, Retirada, Consumo no local, Mesa/Comanda",
          "Tipo de Entrega: Agendado ou Imediato",
          "Canais de Venda: Site, Portal, Extensão, iFood",
          "Status do Pedido: Pendente, Em preparação, Pronto, Saiu para entrega, Concluído, Cancelado, entre outros",
          "Forma de Pagamento: Pix, cartão de crédito, débito, dinheiro, etc.",
          "Entregador Vinculado",
          "Data de Criação e Data de Agendamento"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Exportação:"
      },
      {
        "tipo": "texto",
        "texto": "Clique no botão \"Exportar\" para gerar um arquivo com todos os pedidos exibidos (de acordo com os filtros aplicados)."
      }
    ]
  },
  {
    "numero": 11,
    "titulo": "Minha Empresa",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela Minha Empresa permite configurar informações essenciais do estabelecimento."
      },
      {
        "tipo": "subtitulo",
        "texto": "O que pode ser configurado:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Alterar o nome, logo e banner da empresa. Logo: 500x500 pixels (quadrado). Banner: 1270x460 pixels (horizontal).",
          "Editar o endereço do estabelecimento",
          "Definir o valor de pedido mínimo para delivery",
          "Ajustar os horários de funcionamento",
          "Ativar ou desativar formas de pagamento (online e offline)",
          "Adicionar avisos no cardápio",
          "Criar campos personalizados na tela de finalização de pedido (checkout)"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Abas disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Perfil",
          "Horários",
          "Formas de pagamento",
          "Avisos",
          "Campos personalizados"
        ]
      }
    ]
  },
  {
    "numero": 12,
    "titulo": "Catálogo",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Catálogo é onde você pode criar e gerenciar produtos, complementos e opções."
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Alterar preços dos produtos",
          "Colocar produtos como em falta ou ocultos",
          "Configurar disponibilidade por canal",
          "Ativar preço promocional",
          "Realizar edições em massa"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Seções do Catálogo:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Produtos: criar categorias e produtos, cadastrar complementos e opções, ativar preço promocional, marcar indisponíveis ou ocultos.",
          "Complementos: visualizar, criar e gerenciar complementos vinculados a vários produtos.",
          "Opções: criar e editar opções dentro dos complementos, com imagens e descrições.",
          "Filtros Avançados: selecionar vários produtos para edição em massa."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como exportar o catálogo para planilha:"
      },
      {
        "tipo": "lista",
        "itens": [
          "No Catálogo > Produtos, clique em \"Ações\" > \"Exportar\".",
          "O sistema gera a planilha. Clique no ícone de notificação (sino) para baixar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Peça Também:"
      },
      {
        "tipo": "texto",
        "texto": "Ferramenta que aparece no carrinho para sugerir produtos adicionais. Ativa pelo Catálogo > Produtos > Ações > Configurar \"Peça Também\". Pode ser automática (o sistema sugere) ou personalizada (você escolhe os produtos)."
      }
    ]
  },
  {
    "numero": 13,
    "titulo": "Delivery",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Delivery é composta por duas seções: Área de Entrega e Entregadores."
      },
      {
        "tipo": "subtitulo",
        "texto": "Tipos de configuração de entrega:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Por Região: desenho no mapa (círculo ou polígono)",
          "Por Bairros: lista de bairros atendidos"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar área de entrega por círculo (raio):"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Delivery > Área de Entrega.",
          "Clique na aba Regiões > \"Nova Região\".",
          "Selecione \"Círculo\" no menu lateral.",
          "Localize a loja no mapa, pressione o botão esquerdo do mouse e arraste para definir o raio.",
          "Preencha nome, taxa de entrega e configurações, clique em Salvar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar área de entrega por polígono:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Delivery > Área de Entrega.",
          "Clique em Regiões > \"Nova Região\" > selecione \"Polígono\".",
          "Clique no mapa para adicionar pontos de ancoragem. Para finalizar, clique no ponto inicial.",
          "Preencha as informações e clique em Salvar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar área de entrega por bairro:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Delivery > Área de Entrega.",
          "Selecione a aba Bairros > \"Gerenciar Bairros\".",
          "Adicione as cidades de atuação.",
          "Clique em \"Novo Bairro\", preencha nome, cidade, taxa e tempo de entrega, clique em Salvar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como cadastrar entregadores:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Delivery > Entregadores.",
          "Clique em \"Novo Entregador\", informe nome e telefone, clique em Salvar."
        ]
      }
    ]
  },
  {
    "numero": 14,
    "titulo": "Clientes",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Clientes permite visualizar, filtrar e cadastrar clientes, além de analisar dados como total de pedidos, ticket médio e classificação RFV."
      },
      {
        "tipo": "subtitulo",
        "texto": "Informações disponíveis por cliente:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Nome, total de pedidos, ticket médio, data do último pedido, cliente desde, classificação RFV, total de pontos, gênero, data de nascimento."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como cadastrar um novo cliente:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Clique em \"+ Novo cliente\".",
          "Preencha nome, telefone e anotações.",
          "Para cadastro completo, clique em \"Cadastro Completo\" e adicione e-mail, data de nascimento e gênero."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Outras formas de cadastrar clientes:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Exportar contatos via Chatbot (Cardapinho): acesse o Cardapinho > 3 pontinhos > \"Exportar Contatos\".",
          "Enviar planilha CSV/TSV com nome e telefone (endereço opcional)."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Metodologia RFV:"
      },
      {
        "tipo": "texto",
        "texto": "Avalia três critérios: Recência (tempo desde o último pedido), Frequência (quantidade de pedidos) e Valor Monetário (ticket médio). Cada parâmetro é classificado de 1 a 5, sendo 5 o melhor."
      },
      {
        "tipo": "subtitulo",
        "texto": "Grupos de clientes RFV:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Campeões, Fiéis, Promissores, Novos clientes, Potenciais Fiéis, Precisam de atenção, Quase dormentes, Em risco, Hibernando, Perdidos, Não posso perder."
        ]
      }
    ]
  },
  {
    "numero": 15,
    "titulo": "Avaliações",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "Na aba de avaliações você acompanha a satisfação dos clientes e gerencia o feedback dos pedidos."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como conseguir o link de avaliação:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Clique em \"Compartilhar pedido\" > \"Link de Avaliação\".",
          "O Cardapinho também envia o link automaticamente ao concluir o pedido.",
          "É possível ativar impressão de QR Code de avaliação na via padrão (em Configurações > Impressão)."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como acompanhar as avaliações:"
      },
      {
        "tipo": "texto",
        "texto": "No menu lateral, acesse \"AVALIAÇÕES\". É possível aplicar filtros e selecionar datas. A avaliação é referente ao pedido e somente o dono do estabelecimento tem acesso às informações."
      }
    ]
  },
  {
    "numero": 16,
    "titulo": "Fiado",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O módulo de Fiado é ideal para estabelecimentos que oferecem pagamentos para consumo interno de funcionários. Permite registrar vendas sem pagamento imediato, controlando o saldo devedor."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como ativar o Fiado:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Vá em \"MINHA EMPRESA\" > \"FORMAS DE PAGAMENTO\" e ative a opção \"FIADO\"."
        ]
      },
      {
        "tipo": "texto",
        "texto": "IMPORTANTE: O Fiado é uma forma de pagamento interna, disponível apenas no sistema. Clientes que usam links de pedidos não têm acesso a essa opção."
      },
      {
        "tipo": "subtitulo",
        "texto": "Controle de dívidas:"
      },
      {
        "tipo": "texto",
        "texto": "Em \"FIADO\" > \"CONTROLE DE DÍVIDAS\": administre clientes devedores, registre novos pagamentos, novos débitos manualmente e veja o Extrato de cada cliente."
      },
      {
        "tipo": "subtitulo",
        "texto": "Visão geral das vendas no Fiado:"
      },
      {
        "tipo": "texto",
        "texto": "Em \"FIADO\" > \"VISÃO GERAL\": visualize dívidas pendentes, total de débitos, quantidade de clientes com dívidas, gráfico de vendas e recebimentos (filtrável por data)."
      }
    ]
  },
  {
    "numero": 17,
    "titulo": "Administrativo",
    "categoria": "Gestão",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Administrativo é composta por: Usuários (criar logins para funcionários) e Assinaturas (visualizar lojas vinculadas e acompanhar faturas)."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar login para funcionários:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Administrativo > Usuários.",
          "Clique em \"Adicionar Usuário\".",
          "Informe o e-mail do colaborador e clique em \"Continuar\".",
          "Preencha nome, cargo e permissões de acesso.",
          "Clique em \"Convidar\". O colaborador receberá um e-mail para criar a própria senha."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como acessar faturas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Administrativo > Assinaturas.",
          "Localize a fatura com status \"A vencer\" ou \"Vencida\".",
          "Clique na fatura, escolha a forma de pagamento (PIX ou Cartão de Crédito) e pague."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Link de Multilojas:"
      },
      {
        "tipo": "texto",
        "texto": "Disponível para clientes com duas ou mais lojas ativas. Cria um link unificado para exibir todas as marcas/unidades. Inclui: exibição de todas as lojas em uma página, personalização com logo, banner, domínio próprio, Pixel do Facebook, API de Conversão, Google Tag Manager e Google Analytics."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como ativar Multilojas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Administrativo > \"Link multilojas\".",
          "Clique em \"Habilitar Multi Lojas\".",
          "Preencha nome do grupo e identificador do link, clique em Salvar."
        ]
      }
    ]
  },
  {
    "numero": 18,
    "titulo": "Configurações",
    "categoria": "Configurações",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A tela de Configurações permite ajustar o funcionamento do sistema conforme as necessidades do negócio."
      },
      {
        "tipo": "subtitulo",
        "texto": "Abas disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Configurações Gerais: tipos de pedidos, notificações e comportamentos automáticos.",
          "Personalizar Site: controle sobre o que será exibido para os clientes.",
          "Impressão: configurações de impressoras.",
          "Agendamento: regras e horários para pedidos agendados.",
          "Mesas/Comandas: criação e gerenciamento de mesas/comandas com QR Codes e taxa de serviço.",
          "Integrações: acesso às integrações disponíveis."
        ]
      }
    ]
  },
  {
    "numero": 19,
    "titulo": "Impressora",
    "categoria": "Configurações",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "A impressora é essencial nas operações de delivery. Configure as impressões pelo menu: Configurações > Impressão."
      },
      {
        "tipo": "subtitulo",
        "texto": "O que é possível fazer na tela de impressão:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Vincular a impressora ao sistema",
          "Criar setores de impressão (para estabelecimentos com mais de um setor, como cozinha e bar)",
          "Definir quantidade de vias para cada tipo de pedido",
          "Adicionar mensagens personalizadas ao final da via padrão"
        ]
      }
    ]
  },
  {
    "numero": 20,
    "titulo": "Ver Meus Links",
    "categoria": "Vendas",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "Na Cardápio Web, existem vários links para receber pedidos. Acesse pelo menu lateral em \"VER MEUS LINKS\"."
      },
      {
        "tipo": "subtitulo",
        "texto": "Links disponíveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Catálogo Web: para delivery, onde o cliente faz pedidos para entrega ou retirada.",
          "Catálogo de Visualização: exibido no estabelecimento para visualização do cardápio sem realizar pedidos (pode ser usado em QR Codes nas mesas).",
          "Link para Pedidos Balcão: específico para pedidos feitos no balcão.",
          "Link para Pedidos de Mesa e Comanda: cada mesa tem um link único para QR Code.",
          "Link de Múltiplos Estabelecimentos: para contas com mais de uma loja.",
          "Gerador de QR Codes: permite personalizar QR Codes com textos e cores."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Ícones de ação:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Olho = Abrir link",
          "Dois papéis = Copiar link",
          "Logo do WhatsApp = Enviar pelo WhatsApp",
          "QR Code = Abrir QR Code"
        ]
      }
    ]
  },
  {
    "numero": 21,
    "titulo": "Food Marketing / Campanhas via WhatsApp",
    "categoria": "Automação",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O disparador via WhatsApp/food marketing é uma ferramenta para envio de mensagens em massa de forma prática e eficiente, permitindo alcançar mais clientes e impulsionar vendas."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como acessar:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > \"Food Marketing\".",
          "Campanhas WhatsApp: onde você realiza disparos e campanhas.",
          "Segmentação de clientes: onde você cria filtros personalizados para os disparos."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar uma campanha:"
      },
      {
        "tipo": "lista",
        "itens": [
          "1. Conecte o número do WhatsApp escaneando o QR Code.",
          "2. Clique em \"Disparar mensagens\".",
          "3. Preencha o Título (visível só para o estabelecimento) e a Mensagem (texto e/ou imagem).",
          "4. Use variáveis: Nome do cliente e Descadastrar.",
          "5. Adicione até 3 variações de mensagens para maior segurança contra bloqueio.",
          "6. Defina a data de envio: Agora, em data específica ou recorrente (diária, semanal ou mensal).",
          "7. Selecione os destinatários com filtros: ticket médio, quantidade de pedidos, tempo desde a última compra, aniversariantes, etc.",
          "8. Clique em \"Enviar mensagem\"."
        ]
      }
    ]
  },
  {
    "numero": 22,
    "titulo": "Chatbot - Cardapinho",
    "categoria": "Automação",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Cardapinho é uma extensão para navegador que facilita o atendimento automático aos clientes pelo WhatsApp Web, oferecendo atendimento mais rápido, eficiente e profissional."
      },
      {
        "tipo": "subtitulo",
        "texto": "Requisitos:"
      },
      {
        "tipo": "lista",
        "itens": [
          "WhatsApp Web aberto e conectado enquanto o chatbot estiver ativo.",
          "Computador ligado e com acesso à internet durante o atendimento."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como instalar a extensão:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Configurações > Integrações > Cardapinho.",
          "Clique em \"Instalar Extensão\" e adicione no Chrome.",
          "Acesse o WhatsApp Web, atualize a página e faça login na extensão."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Indicadores de status das conversas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Verde: conversas ativas — o Cardapinho está respondendo automaticamente.",
          "Laranja: conversas aguardando atendimento humano.",
          "Azul: conversas pausadas — bot desativado manualmente."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Atender clientes automaticamente com respostas prontas.",
          "Personalizar mensagens de atendimento.",
          "Ser notificado quando intervenção humana é necessária.",
          "Criar pedidos diretamente pelo WhatsApp (PDV).",
          "Controlar atendimentos com indicadores de status.",
          "Receber notificações sobre o andamento de pedidos."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Criar pedidos pelo WhatsApp (PDV):"
      },
      {
        "tipo": "lista",
        "itens": [
          "No Cardapinho > Atendimento, clique na conversa do cliente > \"+ Novo Pedido\".",
          "Escolha o tipo: Delivery, Retirada ou Consumo no Local.",
          "Adicione produtos, veja o carrinho, selecione a forma de pagamento e finalize.",
          "O cliente recebe automaticamente o resumo do pedido no WhatsApp."
        ]
      }
    ]
  },
  {
    "numero": 23,
    "titulo": "Integrações",
    "categoria": "Automação",
    "blocos": [
      {
        "tipo": "subtitulo",
        "texto": "Integrações de Marketing e Vendas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Domínio Próprio",
          "Facebook Pixel e Token da API",
          "Catálogo do Facebook",
          "Google Analytics",
          "Google Tag Manager",
          "Cardapinho (Chatbot)",
          "Repediu, Retorne.app"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Integrações de Marketplaces:"
      },
      {
        "tipo": "lista",
        "itens": [
          "iFood, 99Food, Keeta, Aiqfome"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Integrações de Pagamentos Online:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Cielo, Mercado Pago"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Integrações de Logística:"
      },
      {
        "tipo": "lista",
        "itens": [
          "iFood sob demanda, Foody Delivery, Pick n Go!, Bee Delivery, MOTTU, Let's Express, Husky, Machine, JAXBus, Entregas Expressas, Moovery, Agilizone"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Integrações de Sistemas de Gestão:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Saipos, Eclética, Sischef, F360 Finanças, Glow, IzzyWay"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "API's para Integrações:"
      },
      {
        "tipo": "lista",
        "itens": [
          "API Aberta, Open Delivery"
        ]
      }
    ]
  },
  {
    "numero": 24,
    "titulo": "Cupons e Descontos",
    "categoria": "Vendas",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "Os cupons de desconto ajudam a incentivar vendas e atrair novos clientes. Acesse pelo menu lateral em \"CUPONS DE DESCONTO\"."
      },
      {
        "tipo": "subtitulo",
        "texto": "Informações exibidas na tela de cupons:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Situação: disponível, expirado ou inativo.",
          "Nome e código do cupom.",
          "Desconto: valor fixo ou percentual.",
          "Data de expiração, quantidade disponível, usos e status ativo/inativo."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar um cupom:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Clique em \"+ Novo cupom\".",
          "Nome do Cupom: destaque a característica principal da oferta.",
          "Código: funciona como senha para o cliente obter o desconto. Deixe em branco para aplicação automática.",
          "Tipo de Desconto: Valor fixo (R$), Percentual (%) ou Entrega grátis."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Limitações configuráveis:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Data inicial e final de validade",
          "Horário específico de disponibilidade",
          "Disponibilidade por dia da semana",
          "Disponibilidade por tipo de pedido (delivery, retirada, consumo no local)",
          "Quantidade máxima de usos",
          "Valor mínimo de compra",
          "Apenas para novos clientes",
          "Permitir múltiplos usos pelo mesmo cliente"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Configurações avançadas:"
      },
      {
        "tipo": "texto",
        "texto": "Associar desconto a itens específicos do cardápio e configurar restrições de formas de pagamento."
      }
    ]
  },
  {
    "numero": 25,
    "titulo": "Fidelidade e Cashback",
    "categoria": "Vendas",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O programa de fidelidade permite oferecer um programa de pontos para os clientes acumularem e trocarem por produtos ou descontos."
      },
      {
        "tipo": "subtitulo",
        "texto": "Regra de pontuação:"
      },
      {
        "tipo": "texto",
        "texto": "Para cada R$1,00 em compras (valor dos produtos após descontos, sem incluir taxa de entrega), o cliente ganha 1 ponto."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como ativar:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > FIDELIDADE > RECOMPENSAS.",
          "Ative o programa de fidelidade clicando no ícone."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Brinde para novos clientes:"
      },
      {
        "tipo": "texto",
        "texto": "É possível conceder pontos extras ao fazer o primeiro pedido. Ative \"BRINDE PARA NOVOS CLIENTES\" e defina a quantidade de pontos."
      },
      {
        "tipo": "subtitulo",
        "texto": "Tipos de recompensas:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Entrega grátis: defina quantos pontos o cliente gasta para cada R$1 de taxa de entrega.",
          "Resgate de descontos fixos (R$10, R$5, etc.): cliente troca pontos por desconto. Exemplo: 100 pontos = R$10 de desconto (proporção de 10%).",
          "Resgate de produtos do catálogo: cliente usa pontos para resgatar produtos. Defina quantos pontos por R$1 do produto."
        ]
      },
      {
        "tipo": "texto",
        "texto": "Proporção recomendada pelo mercado: 5% a 10%."
      },
      {
        "tipo": "subtitulo",
        "texto": "Adicionar ou remover pontos manualmente:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > FIDELIDADE > ATIVIDADES > PONTUADOR.",
          "Escolha Adicionar ou Remover pontos, informe o cliente e a quantidade."
        ]
      }
    ]
  },
  {
    "numero": 26,
    "titulo": "Estoque Avançado",
    "categoria": "Módulos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Módulo de Estoque Avançado (R$29,99/mês) permite controlar o estoque por produtos e opções, gerenciar insumos e criar fichas técnicas."
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Controle preciso dos ingredientes utilizados em cada item do cardápio.",
          "Baixa automática dos insumos a cada venda.",
          "Quando insumo acaba, produtos podem ser automaticamente marcados como indisponíveis.",
          "Opção de estoque negativo (produtos continuam disponíveis mesmo com insumo zerado)."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como criar um insumo:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Estoque > Meu Estoque.",
          "Clique em \"Novo Insumo\".",
          "Preencha: nome, unidade de medida (gramas, litros, unidades) e categoria (opcional).",
          "Clique em Salvar e informe a quantidade disponível."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como montar a ficha técnica:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Estoque > Meu Estoque.",
          "Clique em Produtos ou Opções.",
          "Encontre o item e clique em \"Ficha Técnica\".",
          "Clique em \"Adicionar Insumo\", selecione os ingredientes e informe a quantidade exata."
        ]
      }
    ]
  },
  {
    "numero": 27,
    "titulo": "Módulo Financeiro",
    "categoria": "Módulos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Módulo Financeiro (R$69,99/mês) oferece controle total das finanças: contas a pagar e receber, fluxo de caixa, relatórios completos."
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Lançamentos: receitas, despesas e transferências entre contas.",
          "Fluxo de caixa: análise em Tabela, Gráfico ou Calendário.",
          "Configurações: contas bancárias, categorias financeiras, centros de custos, fornecedores, funcionários e formas de pagamento."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como fazer lançamentos:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Financeiro > Lançamentos > \"Adicionar\".",
          "Selecione o tipo: Despesa, Receita ou Transferência.",
          "Preencha data, valor, categoria, conta bancária, etc. e clique em Salvar."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Como analisar o fluxo de caixa:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Financeiro > Fluxo de Caixa.",
          "Use filtros de data, conta bancária e categorias. Escolha visualização: Tabela, Gráfico ou Calendário."
        ]
      }
    ]
  },
  {
    "numero": 28,
    "titulo": "Módulo de Gestão de Entregadores",
    "categoria": "Módulos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Módulo de Gestão de Entregas (R$54,99/mês) facilita o controle, organização e distribuição das entregas."
      },
      {
        "tipo": "subtitulo",
        "texto": "Inclusões no plano:"
      },
      {
        "tipo": "lista",
        "itens": [
          "500 pedidos de delivery por mês (incluindo cancelados).",
          "Pedidos adicionais até 1.500: R$0,08 por pedido.",
          "Acima de 1.500 pedidos adicionais: R$0,06 por pedido."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Roteirização de pedidos pelo mapa interativo.",
          "Visualização da última localização dos entregadores.",
          "Criação de logins individuais para entregadores.",
          "Desempenho: tempo médio de preparo, tempo médio de entrega, atrasos e tempo total.",
          "Mapa de calor das regiões com mais pedidos."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Formas de atribuir pedidos a entregadores:"
      },
      {
        "tipo": "lista",
        "itens": [
          "1. Atribuição manual pelo mapa (roteirização manual).",
          "2. Atribuição automática (roteirização automática — ideal para alto fluxo).",
          "3. Atribuição pelo próprio entregador: escaneando o QR Code da via padrão ou digitando o número do pedido."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Funcionalidades do login do entregador:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Notificação de novos pedidos.",
          "Histórico de entregas e ganhos.",
          "Acesso ao mapa com redirecionamento para Google Maps ou Waze."
        ]
      }
    ]
  },
  {
    "numero": 29,
    "titulo": "Módulo de Integração com Marketplaces",
    "categoria": "Módulos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Módulo de integração com marketplaces (R$29,99/mês) centraliza pedidos do iFood e outros marketplaces diretamente no sistema."
      },
      {
        "tipo": "subtitulo",
        "texto": "Como fazer a integração com iFood:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Menu lateral > Configurações > Integrações > iFood.",
          "Clique em \"Adicionar loja do iFood\" > \"Gerar código de autorização\".",
          "Clique em \"Autorizar integração\" e autorize no site do iFood.",
          "Copie o código gerado, cole no sistema e clique em Confirmar.",
          "Selecione a loja do iFood e confirme."
        ]
      },
      {
        "tipo": "texto",
        "texto": "IMPORTANTE: Para aceitação e impressão automática funcionarem corretamente, desative essas funções no painel do iFood."
      },
      {
        "tipo": "subtitulo",
        "texto": "Vincular produtos com o iFood (para emissão de notas fiscais):"
      },
      {
        "tipo": "lista",
        "itens": [
          "Configurações > Integrações > iFood > \"Ver códigos dos produtos\".",
          "Copie o código interno do produto e insira no campo \"PDV do produto ou opção\" no painel do iFood."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Widget do iFood:"
      },
      {
        "tipo": "texto",
        "texto": "Pequeno aplicativo incorporado à tela de gestão de pedidos. Funcionalidades: chat com clientes, acompanhamento de entregas, pausa programada da loja. Ative em Configurações > Integrações > iFood > botão Widget. Visível apenas na tela de Gestão de Pedidos, no canto inferior direito, em dispositivos com largura acima de 850 pixels."
      }
    ]
  },
  {
    "numero": 30,
    "titulo": "Módulo Fiscal",
    "categoria": "Módulos",
    "blocos": [
      {
        "tipo": "texto",
        "texto": "O Módulo Fiscal (R$69,99/mês) permite emitir notas fiscais de forma prática. Inclui até 2.500 notas por mês. Notas excedentes: R$0,05 por nota."
      },
      {
        "tipo": "subtitulo",
        "texto": "Emissor fiscal utilizado:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Sistema: eNotas (CNPJ: 57.743.975/0001-27)",
          "Razão Social: Enotas Desenvolvimento de Softwares LTDA",
          "Nome Comercial: eNotas Gateway"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Etapas da configuração:"
      },
      {
        "tipo": "lista",
        "itens": [
          "1. Dados da Empresa: CNPJ, Inscrição Estadual, Razão Social, Código do Regime Tributário.",
          "2. Configurações Gerais: CSC, número e série da nota.",
          "3. Certificado Digital: formato .PFX ou .P12 (modelo A1 apenas).",
          "4. Ambiente de emissão: Homologação (testes) ou Produção (emissão oficial)."
        ]
      },
      {
        "tipo": "texto",
        "texto": "IMPORTANTE: Todas as configurações devem ser realizadas com o apoio do contador."
      },
      {
        "tipo": "subtitulo",
        "texto": "Envio automático de XMLs para contabilidade:"
      },
      {
        "tipo": "texto",
        "texto": "Configure o e-mail do contador em Fiscal > Configurações > Dados da Empresa. No dia 03 de cada mês, o sistema envia automaticamente resumo das notas e link para download dos XMLs."
      },
      {
        "tipo": "subtitulo",
        "texto": "Autorização por estado:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Paraná: emitir Documento de Cadastro de Autorização de Uso na SEFAZ-PR com os dados do eNotas, enviar ao suporte.",
          "Santa Catarina: contatar o suporte para solicitar autorização (prazo: até 2 dias úteis)."
        ]
      }
    ]
  },
  {
    "numero": 31,
    "titulo": "Suporte",
    "categoria": "Suporte",
    "blocos": [
      {
        "tipo": "subtitulo",
        "texto": "Canais de atendimento:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Chat no sistema: clique em \"Falar com o suporte\".",
          "WhatsApp do Suporte: disponível na Central de Ajuda."
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Horários de Atendimento:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Segunda a Sábado: 09:00 às 22:00",
          "Domingo: 14:00 às 22:00",
          "Feriado: 09:00 às 22:00"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Perguntas Frequentes:"
      },
      {
        "tipo": "lista",
        "itens": [
          "É possível imprimir pedidos APENAS pelo celular?",
          "É possível instalar o QZTRAY no celular Android?",
          "Como criar atalho do sistema no computador ou celular?",
          "É possível configurar tablet por acesso remoto para impressão?",
          "Consigo usar o chatbot pelo celular Android ou iOS?",
          "É possível imprimir automaticamente usando apenas o celular?",
          "Consigo receber pedidos do iFood dentro do sistema?",
          "Onde baixar o aplicativo da Cardápio Web?",
          "Tem como receber minha fatura por e-mail?"
        ]
      },
      {
        "tipo": "subtitulo",
        "texto": "Acesso Remoto:"
      },
      {
        "tipo": "texto",
        "texto": "O suporte utiliza AnyDesk para acesso remoto seguro. Baixe em anydesk.com, informe o ID ao técnico e clique em \"Aceitar\" para autorizar. O acesso só é realizado com sua autorização."
      },
      {
        "tipo": "subtitulo",
        "texto": "Quando é necessário acesso remoto:"
      },
      {
        "tipo": "lista",
        "itens": [
          "Falhas na impressão não resolvidas com instruções básicas.",
          "Problemas técnicos complexos no sistema.",
          "Auxílio com configurações avançadas (rede, drivers, impressoras).",
          "Instalação de ferramentas essenciais."
        ]
      }
    ]
  }
];
