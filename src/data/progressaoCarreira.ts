/** Progressão de carreira por nível — transcrita fielmente da planilha oficial
 *  enviada pela liderança (aba "Progressão de carreira por nível"), apenas a
 *  Faixa 1 – Base de cada nível (a Faixa 2/Estrela foi descontinuada — não há
 *  mais troca de faixa). Onde a planilha trazia "#REF!" (fórmula quebrada),
 *  o valor foi mantido como está, sem inventar dado. */

export type Tier = 'junior' | 'pleno' | 'senior';

export interface NivelCarreira {
  nivel: string;
  tier: Tier;
  baseSalarial: string;
  meta1Pct: string;
  meta1Valor: string;
  meta1Ote: string;
  meta2Pct: string;
  meta2Valor: string;
  meta2Ote: string;
  meta3Pct: string;
  meta3Valor: string;
  meta3Ote: string;
  metaClientes: string;
  custoPorCliente: string;
  criteriosElegibilidade: string;
}

export const NIVEIS_CARREIRA: NivelCarreira[] = [
  {
    nivel: 'JR 1', tier: 'junior', baseSalarial: 'R$ 1.809,51',
    meta1Pct: '20%', meta1Valor: 'R$ 361,90', meta1Ote: 'R$ 2.171,41',
    meta2Pct: '25%', meta2Valor: 'R$ 452,38', meta2Ote: 'R$ 2.261,89',
    meta3Pct: '30%', meta3Valor: 'R$ 542,85', meta3Ote: 'R$ 2.352,36',
    metaClientes: '70', custoPorCliente: 'R$ 33,61',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'JR 2', tier: 'junior', baseSalarial: 'R$ 1.988,48',
    meta1Pct: '20%', meta1Valor: 'R$ 397,70', meta1Ote: 'R$ 2.386,18',
    meta2Pct: '25%', meta2Valor: 'R$ 497,12', meta2Ote: 'R$ 2.485,60',
    meta3Pct: '30%', meta3Valor: 'R$ 596,54', meta3Ote: 'R$ 2.585,02',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'JR 3', tier: 'junior', baseSalarial: 'R$ 2.185,14',
    meta1Pct: '20%', meta1Valor: 'R$ 437,03', meta1Ote: 'R$ 2.622,17',
    meta2Pct: '25%', meta2Valor: 'R$ 546,29', meta2Ote: 'R$ 2.731,43',
    meta3Pct: '30%', meta3Valor: 'R$ 655,54', meta3Ote: 'R$ 2.840,68',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'PL 1', tier: 'pleno', baseSalarial: 'R$ 2.401,25',
    meta1Pct: '25%', meta1Valor: 'R$ 600,31', meta1Ote: 'R$ 3.001,56',
    meta2Pct: '30%', meta2Valor: 'R$ 720,38', meta2Ote: 'R$ 3.121,63',
    meta3Pct: '45%', meta3Valor: 'R$ 1.080,56', meta3Ote: 'R$ 3.481,81',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'PL 2', tier: 'pleno', baseSalarial: 'R$ 2.617,36',
    meta1Pct: '25%', meta1Valor: 'R$ 654,34', meta1Ote: 'R$ 3.271,70',
    meta2Pct: '30%', meta2Valor: 'R$ 785,21', meta2Ote: 'R$ 3.402,57',
    meta3Pct: '45%', meta3Valor: 'R$ 1.177,81', meta3Ote: 'R$ 3.795,17',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'PL 3', tier: 'pleno', baseSalarial: 'R$ 2.852,93',
    meta1Pct: '25%', meta1Valor: 'R$ 713,23', meta1Ote: 'R$ 3.566,16',
    meta2Pct: '30%', meta2Valor: 'R$ 855,88', meta2Ote: 'R$ 3.708,81',
    meta3Pct: '45%', meta3Valor: 'R$ 1.283,82', meta3Ote: 'R$ 4.136,75',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'SR 1', tier: 'senior', baseSalarial: 'R$ 3.109,69',
    meta1Pct: '25%', meta1Valor: 'R$ 777,42', meta1Ote: 'R$ 3.887,11',
    meta2Pct: '30%', meta2Valor: 'R$ 932,91', meta2Ote: 'R$ 4.042,60',
    meta3Pct: '45%', meta3Valor: 'R$ 1.399,36', meta3Ote: 'R$ 4.509,05',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'SR 2', tier: 'senior', baseSalarial: 'R$ 3.389,56',
    meta1Pct: '25%', meta1Valor: 'R$ 847,39', meta1Ote: 'R$ 4.236,95',
    meta2Pct: '30%', meta2Valor: 'R$ 1.016,87', meta2Ote: 'R$ 4.406,43',
    meta3Pct: '45%', meta3Valor: 'R$ 1.525,30', meta3Ote: 'R$ 4.914,86',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
  {
    nivel: 'SR 3', tier: 'senior', baseSalarial: 'R$ 3.694,62',
    meta1Pct: '25%', meta1Valor: 'R$ 923,66', meta1Ote: 'R$ 4.618,28',
    meta2Pct: '30%', meta2Valor: 'R$ 1.108,39', meta2Ote: 'R$ 4.803,01',
    meta3Pct: '45%', meta3Valor: 'R$ 1.662,58', meta3Ote: 'R$ 5.357,20',
    metaClientes: '#REF!', custoPorCliente: '#REF!',
    criteriosElegibilidade: 'Ramp-up concluído em caso de novato (entrando e rampando); Meta 3 nos últimos 2 meses.',
  },
];

/** Nível atualmente ocupado — usado para destacar "você está aqui" na trilha. */
export const NIVEL_ATUAL = 'JR 3';

/** Extrai o valor numérico de uma string "R$ 2.352,36" para uso em cálculos de layout (ex: largura de barra). */
export function parseReais(valor: string): number {
  const limpo = valor.replace(/[^\d,]/g, '').replace(',', '.');
  const n = Number(limpo);
  return Number.isFinite(n) ? n : 0;
}
