/** Página Progressão de Carreira — promovida do Playbook de Representantes.
 *  Conteúdo real enviado pela liderança (planilha "Progressão de carreira
 *  por nível" + print de referência visual). Mostra apenas a Faixa 1 – Base
 *  de cada nível, por indicação explícita: a Faixa 2/Estrela foi
 *  descontinuada (não há mais troca de faixa). Valores "#REF!" vêm de
 *  fórmulas quebradas na planilha original e foram mantidos como estão. */
import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { NIVEIS_CARREIRA, NIVEL_ATUAL, parseReais, type Tier } from '@/data/progressaoCarreira';

const TIER_STYLE: Record<Tier, { bg: string; text: string; border: string; dot: string; label: string }> = {
  junior: { bg: 'bg-cw-purple/10', text: 'text-cw-purple', border: 'border-cw-purple/30', dot: 'bg-cw-purple', label: 'Junior' },
  pleno: { bg: 'bg-pink-500/10', text: 'text-pink-600', border: 'border-pink-500/30', dot: 'bg-pink-500', label: 'Pleno' },
  senior: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/30', dot: 'bg-amber-500', label: 'Senior' },
};

function TrilhaNiveis({ selecionado, onSelecionar }: { selecionado: string; onSelecionar: (n: string) => void }) {
  return (
    <div className="cw-card p-5">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <p className="text-xs font-black text-cw-muted uppercase tracking-widest">Trilha de Níveis</p>
        <div className="flex items-center gap-3">
          {(Object.keys(TIER_STYLE) as Tier[]).map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-[11px] font-semibold text-cw-muted">
              <span className={`h-2 w-2 rounded-full ${TIER_STYLE[t].dot}`} />{TIER_STYLE[t].label}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-cw-muted mb-4">Clique em qualquer nível para ver os critérios completos.</p>
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-cw pb-2">
        {NIVEIS_CARREIRA.map((n, i) => {
          const style = TIER_STYLE[n.tier];
          const ativo = n.nivel === selecionado;
          const atual = n.nivel === NIVEL_ATUAL;
          return (
            <div key={n.nivel} className="flex items-center shrink-0">
              <button
                onClick={() => onSelecionar(n.nivel)}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-2xl border px-4 py-3 min-w-[92px] transition-all ${
                  ativo ? `${style.bg} ${style.border} border-2 shadow-sm` : 'border-cw-border bg-cw-elevated hover:border-cw-purple/30'
                }`}
              >
                {atual && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-cw-purple text-white text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap">
                    <MapPin className="h-2.5 w-2.5" /> você está aqui
                  </span>
                )}
                <span className={`text-sm font-black ${ativo ? style.text : 'text-cw-text'}`}>{n.nivel}</span>
                <span className="text-[10px] text-cw-muted whitespace-nowrap">{n.baseSalarial}</span>
              </button>
              {i < NIVEIS_CARREIRA.length - 1 && <span className="w-4 h-px bg-cw-border shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EvolucaoOte() {
  const max = Math.max(...NIVEIS_CARREIRA.map((n) => parseReais(n.meta3Ote)));
  return (
    <div className="cw-card p-5">
      <p className="text-sm font-bold text-cw-text mb-0.5">Evolução de OTE (Salário + Comissão na Meta 3)</p>
      <p className="text-xs text-cw-muted mb-4">Comparativo do potencial total mensal por nível, com Meta 3 batida.</p>
      <div className="space-y-2.5">
        {NIVEIS_CARREIRA.map((n) => {
          const style = TIER_STYLE[n.tier];
          const pct = Math.max(8, Math.round((parseReais(n.meta3Ote) / max) * 100));
          return (
            <div key={n.nivel} className="flex items-center gap-3">
              <span className={`text-xs font-black w-9 shrink-0 ${style.text}`}>{n.nivel}</span>
              <div className="flex-1 h-6 rounded-md bg-cw-elevated overflow-hidden relative">
                <div
                  className={`h-full rounded-md ${style.dot} flex items-center justify-end pr-2`}
                  style={{ width: `${pct}%` }}
                >
                  <span className="text-[9px] font-bold text-white/90 whitespace-nowrap">Meta 3</span>
                </div>
              </div>
              <span className="text-xs font-bold text-cw-text w-24 text-right shrink-0">{n.meta3Ote}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetaLinha({ label, pct, valor, ote }: { label: string; pct: string; valor: string; ote: string }) {
  return (
    <tr>
      <td className="px-3 py-2 text-xs font-bold text-cw-text border-b border-cw-border/60">{label}</td>
      <td className="px-3 py-2 text-xs text-cw-muted border-b border-cw-border/60">{pct}</td>
      <td className="px-3 py-2 text-xs text-cw-muted border-b border-cw-border/60">{valor}</td>
      <td className="px-3 py-2 text-xs font-bold text-cw-text border-b border-cw-border/60">{ote}</td>
    </tr>
  );
}

function TabelaComissoes({ selecionado, onSelecionar }: { selecionado: string; onSelecionar: (n: string) => void }) {
  return (
    <div className="cw-card p-5">
      <p className="text-sm font-bold text-cw-text mb-0.5">Tabela completa de comissões e critérios</p>
      <p className="text-xs text-cw-muted mb-4">Faixa 1 – Base de cada nível. A Faixa 2/Estrela foi descontinuada.</p>
      <div className="space-y-2">
        {NIVEIS_CARREIRA.map((n) => {
          const style = TIER_STYLE[n.tier];
          const aberto = n.nivel === selecionado;
          return (
            <div key={n.nivel} className={`rounded-xl border overflow-hidden ${aberto ? style.border : 'border-cw-border'}`}>
              <button
                onClick={() => onSelecionar(aberto ? '' : n.nivel)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${aberto ? style.bg : 'bg-cw-elevated hover:bg-cw-elevated/70'}`}
              >
                <span className={`h-8 w-8 rounded-full ${style.bg} border ${style.border} flex items-center justify-center text-[11px] font-black ${style.text} shrink-0`}>
                  {n.nivel.replace(' ', '')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-cw-text">{n.nivel}</p>
                  <p className="text-[11px] text-cw-muted">
                    Base salarial: <span className="font-semibold">{n.baseSalarial}</span> · OTE em Meta 3: <span className="font-semibold">{n.meta3Ote}</span>
                  </p>
                </div>
                <ChevronDown className={`h-4 w-4 text-cw-muted shrink-0 transition-transform ${aberto ? 'rotate-180' : ''}`} />
              </button>
              {aberto && (
                <div className="px-4 py-4 bg-white border-t border-cw-border/60">
                  <div className="overflow-x-auto scrollbar-cw mb-3">
                    <table className="w-full min-w-[420px]">
                      <thead>
                        <tr className="bg-cw-elevated">
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-cw-text border-b border-cw-border">Meta</th>
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-cw-text border-b border-cw-border">% Comissão</th>
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-cw-text border-b border-cw-border">Valor R$</th>
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-cw-text border-b border-cw-border">OTE Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <MetaLinha label="Meta 1" pct={n.meta1Pct} valor={n.meta1Valor} ote={n.meta1Ote} />
                        <MetaLinha label="Meta 2" pct={n.meta2Pct} valor={n.meta2Valor} ote={n.meta2Ote} />
                        <MetaLinha label="Meta 3" pct={n.meta3Pct} valor={n.meta3Valor} ote={n.meta3Ote} />
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="bg-cw-elevated rounded-lg px-3 py-2.5">
                      <p className="text-[10px] font-bold text-cw-muted uppercase tracking-wider">Meta de Clientes</p>
                      <p className="text-sm font-bold text-cw-text">{n.metaClientes}</p>
                    </div>
                    <div className="bg-cw-elevated rounded-lg px-3 py-2.5">
                      <p className="text-[10px] font-bold text-cw-muted uppercase tracking-wider">Custo por Cliente (OTE)</p>
                      <p className="text-sm font-bold text-cw-text">{n.custoPorCliente}</p>
                    </div>
                  </div>
                  <div className="bg-cw-purple/5 border border-cw-purple/15 rounded-lg px-3 py-2.5">
                    <p className="text-[10px] font-bold text-cw-purple uppercase tracking-wider mb-1">Critérios de Elegibilidade</p>
                    <p className="text-xs text-cw-text/85 leading-relaxed">{n.criteriosElegibilidade}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProgressaoCarreira() {
  const [selecionado, setSelecionado] = useState(NIVEL_ATUAL);

  return (
    <div className="p-6 md:p-8 space-y-5">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Progressão de Carreira</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Evolução de senioridade e comissionamento dentro do canal de Representantes.
        </p>
      </div>
      <TrilhaNiveis selecionado={selecionado} onSelecionar={setSelecionado} />
      <EvolucaoOte />
      <TabelaComissoes selecionado={selecionado} onSelecionar={setSelecionado} />
    </div>
  );
}
