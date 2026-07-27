/** Dados da Matriz de Concorrentes — transcrição fiel da planilha
 *  "[REP] Playbook de Representantes - Concorrentes". Gerado a partir do CSV
 *  oficial para garantir fidelidade célula a célula. */

export type FeatureStatus = "check" | "warn" | "cross";

function s(sym: string): FeatureStatus {
  if (sym === "✅") return "check";
  if (sym === "⚠️") return "warn";
  return "cross";
}

export const CONCORRENTES_NOMES: string[] = ["Cardápio Web","Anota ai","Brendi","Saipos","Instadelivery","Consumer (Menu Dino)","Goomer","Yooga","OlaClick","WhatsMenu","Multipedidos","Delivery Direto","Linx","Neemo","Alloy","Accon","Takeat","EasyAssist","BigDim","Ecta","Suitable","BeeFood","Cardápio Ai","Omie","GrandChef","Jotajá","Sischef","Deli"];

export interface FeatureRow {
  categoria: string | null;
  nome: string;
  status: FeatureStatus[];
}

export const CONCORRENTES_FEATURES: FeatureRow[] = [
  { categoria: "Automação de Atendimento", nome: "Cardápio digital para delivery", status: [s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("⚠️"), s("✅")] },
  { categoria: null, nome: "Cardápio digital para mesas", status: [s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("⚠️"), s("✅"), s("✅"), s("⚠️"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("⚠️")] },
  { categoria: null, nome: "ChatBot de WhatsApp", status: [s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("⚠️"), s("⚠️"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("⚠️")] },
  { categoria: null, nome: "Pagamento Online", status: [s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("⚠️"), s("✅")] },
  { categoria: "Aumento de Vendas", nome: "Disparador de WhatsApp", status: [s("✅"), s("⚠️"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("❌"), s("⚠️"), s("❌"), s("✅"), s("⚠️"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("⚠️"), s("❌"), s("✅"), s("⚠️"), s("✅"), s("✅"), s("❌"), s("❌"), s("❌"), s("✅"), s("❌"), s("❌")] },
  { categoria: null, nome: "Programa de fidelidade", status: [s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("❌"), s("✅"), s("❌"), s("❌"), s("❌")] },
  { categoria: "Gestão do Negócio", nome: "Fluxo de caixa", status: [s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("⚠️"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅")] },
  { categoria: null, nome: "Módulo Fiscal", status: [s("✅"), s("⚠️"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("⚠️"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("⚠️")] },
  { categoria: null, nome: "Gestão de estoque de produtos", status: [s("✅"), s("⚠️"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("✅"), s("⚠️"), s("❌"), s("✅"), s("❌"), s("✅"), s("✅"), s("⚠️"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅")] },
  { categoria: null, nome: "Gestão de estoque de insumos", status: [s("✅"), s("❌"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("⚠️"), s("⚠️"), s("⚠️"), s("❌"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("❌"), s("❌"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("⚠️")] },
  { categoria: null, nome: "Gestão financeira", status: [s("✅"), s("⚠️"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("❌"), s("❌"), s("✅"), s("❌"), s("❌"), s("❌"), s("⚠️"), s("❌"), s("❌"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅"), s("❌"), s("✅"), s("✅")] },
  { categoria: null, nome: "Gestão de rotas de entrega", status: [s("✅"), s("❌"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("❌"), s("✅"), s("⚠️"), s("❌"), s("⚠️"), s("✅"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("✅"), s("❌"), s("❌"), s("✅"), s("✅"), s("⚠️"), s("❌")] },
  { categoria: null, nome: "Integração com totem", status: [s("❌"), s("❌"), s("❌"), s("❌"), s("✅"), s("✅"), s("✅"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("✅"), s("❌"), s("❌"), s("❌"), s("✅"), s("⚠️"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌"), s("❌")] },
];

export interface CompetidorMeta {
  nome: string;
  observacoes: string;
  precos: string;
  site: string;
}

export const CONCORRENTES_META: CompetidorMeta[] = [
  {
    "nome": "Cardápio Web",
    "observacoes": "- Ferramenta completa\n\n- Foco em gestão, automação e aumento de vendas \n\n- Tem se destacado por parcerias com agências e gestores de marketing e ferramentas que auxiliam esse público (integração com pixel, cardápio com alta conversão, programa de fidelidade)\n\n- Suporte humanizado e que funciona todos os dias da semana",
    "precos": "Plano mesas: 139,99 á 169,99\nPlano delivery: 179,99 á 209,99\nPlano premium: 239,99 á 269,99",
    "site": "https://cardapioweb.com/"
  },
  {
    "nome": "Anota ai",
    "observacoes": "- Cardápio digital comprado pelo iFood. \n\n- Chatbot que opera em diversas redes sociais (WhatsApp, Facebook e Instagram)\n\n- Não foca tanto na parte de gestão \n\n- Cresceu por conta das promoções agressivas do próprio Ifood. \n\n- O crescimento trouxe alguns problemas pro suporte (serviço terceirizado)",
    "precos": "Tem um período promocional de 59,90 nos primeiros meses:\n\nMensal\nPlano Start: 279,99\nPlano Gestão avançada: 399,99\n\nAnual\nPlano start: 12x 246,99\nPlano Gestão avançada: 12x 339,99",
    "site": "https://anota.ai/"
  },
  {
    "nome": "Brendi",
    "observacoes": "- Sistema com proposta voltada para a parte de automação de atendimento de delivery (não foca em mesas)\n\n- Não tem foco na parte de gestão\n\n- Possui um valor elevado pelo o que oferece",
    "precos": "Até R$1.500,00 faturado nos últimos 30 dias - R$60,00/mês.\n \nDe R$1.500,01 até R$7.500,00, fica 4% do que faturar.\n \nAcima de R$7.500,00 - R$300,00/mês.",
    "site": "https://brendi.com.br/"
  },
  {
    "nome": "Saipos",
    "observacoes": "- Sistema de gestão muito usado por empresas grandes (franquias)\n\n- Traz uma visão muito focada em gestão. \n\n- Temos integração com eles.",
    "precos": "Mensalidade: \nR$ 219 (para faturamentos de até R$ 40 mil)\n\n\nImplantação: R$ 600 oferecem 75% de desconto como gatilho de urgência",
    "site": "https://saipos.com/"
  },
  {
    "nome": "Instadelivery",
    "observacoes": "- Ferramenta barata e bastante completa.\n\n- Apresenta uma usabilidade ruim e que passa uma visão pouco profissional \n\n- Cresceu muito por causa do programa de indicações, que é bastante agressivo\n\n- Foca mais no preço baixo que na qualidade",
    "precos": "Se faturar menos de 2.000 no mês - plano grátis\nSe faturar mais de 2.000 no mês - R$ 69,90/ mês \nSe faturar mais de 5.000 no mês - R$ 129,90/ mês",
    "site": "https://instadelivery.com.br/"
  },
  {
    "nome": "Consumer (Menu Dino)",
    "observacoes": "- O Consumer é um sistema de gestão\n\n- O Menu Dino é o cardápio digital do Consumer. \n\n- Precisa instalar um software para atualizar o cardápio o que acaba sendo uma limitação pois não da pra usar no celular.\n \n- Sistema dificil de usar e pouco intuitivo. \n\n- Cardápio do Menu Dino apresenta muitos bugs, principlamente pra quem faz tráfego pago.",
    "precos": "Plano grátis: Até 200 pedidos é gratuito\nConsumer 1 pc: R$ 64,90 por mês, mas roda em apenas 1 computador\nConsumer rede: R$ 84,90, roda em vários computadores\n\n*Cobram valores a mais por diversas funcionalidades, dentre elas, o próprio menu dino;",
    "site": "https://consumer.com.br/"
  },
  {
    "nome": "Goomer",
    "observacoes": "- Ferramenta muito conhecida, no entanto, foca muito em totens de mesa. \n\n- Cardápio digital que não tem um fluxo tão fácil pro cliente finalizar o pedido. \n\n- Falta ferramentas para a parte de marketing.\n\n- Tem plano gratuito até um quantidade de pedido bem baixo. (30 pedidos)",
    "precos": "Plano grátis: Até 30 pedidos por mês via WhatsApp. Ultrapassando o limite, R$ 1,39 por pedido adicional.\nPlano básico: R$ 99,90 e, por ano, 12x de R$ 59,94\nPlano automatizar: R$ 184,90/mês ou 12x de R$ 138,68 no plano anual.\nPlano integrar: R$ 299,90/mês ou 12x de R$ 224,93 no plano anual. Além de R$ 99,90 mensais para a implementação QR code e delivery.",
    "site": "https://goomer.com.br/"
  },
  {
    "nome": "Yooga",
    "observacoes": "- Sistema mais focado na parte de gestão do que de automação. \n\n- É um sistema bem feito e completinho, mas não tem tanta relevância no mercado. \n\n- Algumas funcionalidades não estão disponíveis no plano básico, precisando contratar um plano acima para ter tudo.",
    "precos": "Anual:\nPlano básico: 12 x por R$ 211,65\nPlano essencial: 12 x por R$ 228,65\nPlano completo:12 x por R$ 296,65\nPremium: consultar com especialista\n\nMensal: \nPlano básico: 249,00\nPlano essencial: 269,00\nPlano completo: 349,00\nPremium: consultar com especialista",
    "site": "https://yooga.com.br/"
  },
  {
    "nome": "OlaClick",
    "observacoes": "- Sistema com preço acessível\n\n- Parece realmente ter muitas coisas, mas muitas coisas incompletas.\n\n- As funcionalidades vai depender do plano contratado.",
    "precos": "Plano advanced: R$ 64,00/ mês, normalmente 400 pedidos por mês\nPlano premium:R$ 160,00/ mês,normalmente 4000 pedidos por mês\nPlano elite: R$ 374,00/ mês, pedidos ilimitados.\nPlano infinity: R$928,00/ mês, pedidos ilimitados.",
    "site": "https://olaclick.com/"
  },
  {
    "nome": "WhatsMenu",
    "observacoes": "- Ferramenta barata, esse é o grande diferencial dela. \n\n- Não apresenta grandes ameaças.",
    "precos": "O valor padrão é R$ 97,00 \n\nImplementação: Utilizam a montagem do cardápio gratuito com o cadastro de 100 itens como gatilho de urgência.",
    "site": "https://whatsmenu.com.br/"
  },
  {
    "nome": "Multipedidos",
    "observacoes": "- Ferramenta relativamente completa e promissora. \n\n- O custo fica um pouco elevado levando em conta os adicionais de módulo a parte em serviços que já oferecemos no plano como o chatbot.",
    "precos": "Plano iniciante: R$ 169,90 por mês\nPlano profissional: R$ 259,90 por mês\n\n\nImplementação: R$150,00 reais",
    "site": "https://multipedidos.com.br/"
  },
  {
    "nome": "Delivery Direto",
    "observacoes": "- Possivelmente o cardápio digital mais antigo da lista.\n\n- Empresa grande e antiga que vem perdendo mercado para concorrentes mais modernos,",
    "precos": "Plano Iniciante: 10% de comissão sobre as vendas (com limite de cobrança até R$ 699,00/mês).\nPlano Profissional: 5% de comissão sobre as vendas (com limite de cobrança até R$ 899,00/mês).\n\n*Possui módulos a parte:",
    "site": "https://site.deliverydireto.com.br/"
  },
  {
    "nome": "Linx",
    "observacoes": "- Sistema focado em grandes empresas, como franquias. \n\n- Possui um cardápio digital chamado Neemo, que foi comprado pela empresa, mas na prática, seu posicionamento é sistema de gestão.\n\n- Se torna um plano caro caso precise da parte de atendimento, tendo em vista que vai pagar a Neemo fora a parte.",
    "precos": "Plano Essencial: R$349/mês\nPlano Plus: R$529/mês\nPlano Max: R$779/mês",
    "site": "https://www.linx.com.br/"
  },
  {
    "nome": "Neemo",
    "observacoes": "- Cardápio digital comprado pela Linx.\n\n- A Neemo sempre foi um cardápio digital com interface ruim.\n\n- Focam bastante em franquias, principalmente das que precisam de um ERP já que associa com a Linx.",
    "precos": "Plano start: A partir de R$ 189,00 por mês\nPlano pro: A partir de R$ 289,00 por mês\nPlano franquia: Necessário consultar para negociação",
    "site": "https://www.neemo.com.br/"
  },
  {
    "nome": "Alloy",
    "observacoes": "- Atualmente não tem uma relevância muito grande no mercado.\n \n- A ferramenta é muito completa e bem feita.",
    "precos": "Plano começar: R$ 164,93 até 30 mil de faturamento\nPlano crescer: R$ 224,93 até 70 mil de faturamento\nPlano avançar: R$ 284,93 até 110 mil de faturamento\nPlano evoluir: R$ 359,93 acima de 110 mil de faturamento",
    "site": "https://www.alloy.al/"
  },
  {
    "nome": "Accon",
    "observacoes": "- Ferramenta voltada principalmente para atendimento\n\n- Oferece um plano completo, mas que foca muito mais no delivery e na automação do atendimento\n\n- Deixa de lado a parte de gestão, focando somente nas integrações com outros PDV.",
    "precos": "Mensal completo: R$349,00/mês\nTrimestral completo: R$299,00/mês",
    "site": "https://accon.com.br/"
  },
  {
    "nome": "Takeat",
    "observacoes": "- Ferramenta com bom custo benefício\n\n- Cardápio digital de usabilidade ruim. \n\n- Parece um sistema relativamente completo.",
    "precos": "Plano básico: R$ 199,00 por mês\nPlano inovação:: R$ 279,00 por mês\nPlano profissional: R$ 499,00 por mês\nPlano enterprise: consultar valores",
    "site": "https://www.takeat.app/"
  },
  {
    "nome": "EasyAssist",
    "observacoes": "- Sistema de gestão simples focado apenas na parte de mesas \n\n- Controles básicos internos, como gestão de estoque e pedidos das mesas.",
    "precos": "-",
    "site": "https://easyassist.com.br/"
  },
  {
    "nome": "BigDim",
    "observacoes": "- Sistema com preço acessível\n\n- Não é um sistema grande. \n\n- É relativamente completo, parece realmente ter muitas coisas, mas muitas coisas incompletas.",
    "precos": "Plano flex: R$ 59,90 por mês até 150 pedidos\nPlano basic: R$ 89,90 por mês\nPlano pro: R$ 159,90 por mês\nPlano prime: R$ 189,90 por mês",
    "site": "https://www.bigdim.com.br/"
  },
  {
    "nome": "Ecta",
    "observacoes": "- Ferramenta voltada mais para o atendimento e possui um custo benefício não tão bom\n\n- Parecem estar evoluindo as funcionalidades pois há pouco tempo não tinham funcionalidades básicas como o chatbot.\n\n- O disparador de mensagem não funciona pelo Whatsapp e sim SMS, sendo um pouco arcaico.",
    "precos": "1º mês no boleto: R$350,00\ndemais meses: R$200,00\n\nPagamento no cartão: 6 parcelas de R$189,00",
    "site": "https://ecta.com.br/"
  },
  {
    "nome": "Suitable",
    "observacoes": "- Sistema razoavelmente completo e que bate de frente com os concorrentes fazendo comparações no site deles\n\n- Não tem um layout tão atrativo no cardápio",
    "precos": "Plano starter: R$287/mês\nPlano advanced: R$386/mês\nPlano premium: R$479/mês\nPlano ultra: disponivel para consulta",
    "site": "https://suitable.com.br/"
  },
  {
    "nome": "BeeFood",
    "observacoes": "- Ferramenta bastante completa, porém não tem um cardápio intuitivo\n\n- Não têm preços muito competiitivos, mas oferecem um cardápio gratuito sem limite de pedidos \n\n- No plano gratuito o histórico só fica salvo por 7 dias.",
    "precos": "Plano grátis: cardápio digital sem limite de pedidos, mas com histórico de 7 dias\nPlano zangão: R$ 200/mês\nPlano rainha: R$ 300/mês\nPlano BeeFood: R$ 400/mês",
    "site": "https://beefood.com.br/"
  },
  {
    "nome": "Cardápio Ai",
    "observacoes": "- Cardápio Digital com custo bem baixo, porém muito focado na parte da automatização do atendimento\n\n- Deixa de lado boa parte da gestão e da parte de marketing do estabelecimento.",
    "precos": "PDV Básico: R$ 49,90 por mês\nPDV + Robô: R$ 64,90 por mês\nPDV Integrado: R$ 99,90 por mês",
    "site": "https://cardapio.ai/"
  },
  {
    "nome": "Omie",
    "observacoes": "- O objetivo principal da Omie é oferecer um sistema de gestão online para vários segmentos\n\n- Eles possuem cardápio digital porém não é o foco.",
    "precos": "Omie ERP: R$ 99,00 por mês\nOmie Multivarejo: R$ 209,00 por mês",
    "site": "https://www.omie.com.br/"
  },
  {
    "nome": "GrandChef",
    "observacoes": "- Sistema relativamente completo e bem feito\n\n- Eles possuem um bom posicionamento de marca para a área de gestão, mas não muito forte para cardápio digital.\n\n- O cardápio digital do GrandChef não é muito bem feito, não passando muita segurança.",
    "precos": "Starter:12 x de R$ 29,94\nLite: 12 x R$ 67,43 ou R$ 89,90 por mês (plano mensal)\nPro: 12 x de R$ 97,43 ou R$ 129,90 por mês (fidelidade mensal)",
    "site": "https://www.grandchef.com.br/"
  },
  {
    "nome": "Jotajá",
    "observacoes": "- Cardápio digital simples sem muito investimento por trás e que se destaca pelo grande evento que realizam anualmente chamado Jotajá Summit. \n\n- Não são tão relevantes atualmente.",
    "precos": "Plano start: R$ 249,00 por mês + taxa de implantação por R$ 300,00\nPlano advanced: R$ 329,00 por mês + taxa de implantação por R$ 300,00\nPlano Franquias:Disponível com consulta",
    "site": "https://www.site.jotaja.com/"
  },
  {
    "nome": "Sischef",
    "observacoes": "- Ferramenta focada em gestão, não concorre diretamente com o nosso posicionamento de cardápio digital\n\n- Tem um reconhecimento forte na área de sistemas de gestão para restaurantes. \n\n- Parece atender bem o público de franquias. \n\n- Temos integração com eles.",
    "precos": "Planos a partir de R$99,99. \n\nCom módulos a parte de acordo com a necessidade.",
    "site": "https://sischef.com/"
  },
  {
    "nome": "Deli",
    "observacoes": "- Ferramenta relativamente completa e promissora. \n\n- O custo fica um pouco elevado levando em conta os adicionais de módulo a parte em serviços que já oferecemos no plano como o chatbot.",
    "precos": "Plano Inicial: R$83,90/mês\nPlano Avançado: 125,90/mês\nPlano Pro: 178,90/mês\n\nCom módulos a parte de acordo com a necessidade.",
    "site": "https://deli.com.br/pt-br/"
  }
];
