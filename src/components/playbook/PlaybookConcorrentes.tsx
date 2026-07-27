/** Aba Concorrentes — matriz completa de funcionalidades (13 linhas x 28 players)
 *  e ficha detalhada por concorrente, transcrita fielmente da planilha oficial
 *  "[REP] Playbook de Representantes - Concorrentes". */
import { useState } from 'react';
import { ChevronDown, ShieldCheck, ExternalLink, Check, X, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CONCORRENTES_NOMES, CONCORRENTES_FEATURES, CONCORRENTES_META,
  type FeatureStatus,
} from '@/data/concorrentesReps';

const CW_DIFERENCIAIS = [
  'Ferramenta completa: gestão, automação e aumento de vendas no mesmo plano',
  'Suporte humanizado que funciona todos os dias da semana',
  'Parcerias com agências e gestores de tráfego (integração com pixel, cardápio de alta conversão)',
  'Programa de fidelidade nativo',
  'Disparador de WhatsApp com filtros avançados',
];

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === 'check') return <Check className="h-3.5 w-3.5 text-green-600 mx-auto" />;
  if (status === 'warn') return <TriangleAlert className="h-3.5 w-3.5 text-amber-500 mx-auto" />;
  return <X className="h-3.5 w-3.5 text-red-400 mx-auto" />;
}

function MatrizFuncionalidades() {
  return (
    <div className="cw-card p-0 overflow-hidden">
      <div className="p-4 border-b border-cw-border">
        <p className="text-sm font-bold text-cw-text">Matriz de funcionalidades — Cardápio Web x 27 concorrentes</p>
        <p className="text-xs text-cw-muted mt-0.5">Arraste para o lado para ver todos os players. ✓ tem · ⚠ parcial/limitado · ✗ não tem.</p>
      </div>
      <div className="overflow-x-auto scrollbar-cw">
        <table className="text-xs border-collapse min-w-[1400px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-cw-surface text-left px-3 py-2 font-bold text-cw-text border-b border-cw-border min-w-[220px]">
                Funcionalidade
              </th>
              {CONCORRENTES_NOMES.map((nome) => (
                <th
                  key={nome}
                  className={cn(
                    'px-2 py-2 font-bold border-b border-cw-border text-center min-w-[86px] whitespace-nowrap',
                    nome === 'Cardápio Web' ? 'bg-cw-purple/10 text-cw-purple' : 'text-cw-muted',
                  )}
                >
                  {nome}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONCORRENTES_FEATURES.map((row, i) => (
              <tr key={row.nome} className={i % 2 === 0 ? 'bg-cw-elevated/40' : ''}>
                <td className="sticky left-0 z-10 bg-inherit px-3 py-2 text-cw-text/85 font-medium border-b border-cw-border/60 whitespace-nowrap">
                  {row.categoria && (
                    <span className="block text-[9px] font-black uppercase tracking-wider text-cw-purple-light mb-0.5">
                      {row.categoria}
                    </span>
                  )}
                  {row.nome}
                </td>
                {row.status.map((st, j) => (
                  <td key={j} className={cn('px-2 py-2 text-center border-b border-cw-border/60', CONCORRENTES_NOMES[j] === 'Cardápio Web' && 'bg-cw-purple/5')}>
                    <StatusIcon status={st} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompetidorCard({ c }: { c: typeof CONCORRENTES_META[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cw-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-cw-elevated transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-cw-text">{c.nome}</p>
          {c.site && (
            <a
              href={c.site}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-cw-muted hover:text-cw-purple-light truncate inline-flex items-center gap-1"
            >
              {c.site.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 text-cw-muted shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-cw-border space-y-3">
          <div className="pt-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-cw-purple-light mb-1.5">Observações</p>
            <p className="text-xs text-cw-text/80 leading-relaxed whitespace-pre-line">{c.observacoes}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-cw-purple-light mb-1.5">Preços praticados (referência de mercado)</p>
            <p className="text-xs text-cw-muted leading-relaxed whitespace-pre-line">{c.precos}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function PlaybookConcorrentes() {
  const competidores = CONCORRENTES_META.filter((c) => c.nome !== 'Cardápio Web');
  const cw = CONCORRENTES_META.find((c) => c.nome === 'Cardápio Web');

  return (
    <div className="space-y-6">
      {/* Nossos diferenciais */}
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Nossos diferenciais no mercado</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          {CW_DIFERENCIAIS.map((d) => (
            <div key={d} className="flex items-start gap-2 bg-cw-purple/5 border border-cw-purple/15 rounded-xl px-3 py-2.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cw-purple shrink-0 mt-0.5" />
              <p className="text-xs text-cw-text/85">{d}</p>
            </div>
          ))}
        </div>
        {cw && (
          <p className="text-xs text-cw-muted whitespace-pre-line border-t border-cw-border pt-3">
            <span className="font-bold text-cw-text/80">Preços de referência: </span>{cw.precos}
          </p>
        )}
      </div>

      {/* Matriz completa */}
      <MatrizFuncionalidades />

      {/* Concorrentes individuais */}
      <div>
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">
          Fichas por concorrente ({competidores.length}) — clique para expandir
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {competidores.map((c) => <CompetidorCard key={c.nome} c={c} />)}
        </div>
      </div>

      <p className="text-[11px] text-cw-muted text-center pb-2">
        Lembre: não construímos produto para um nicho restrito. Somos infraestrutura para qualquer food service que venda direto ao consumidor. — Memorando CW
      </p>
    </div>
  );
}
