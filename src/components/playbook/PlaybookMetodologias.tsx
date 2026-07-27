/** Abas de metodologia de vendas do time de Representantes: SPIN Selling e AIDA,
 *  adaptadas ao programa de representantes conforme a planilha oficial. */
import { useState } from 'react';
import { ChevronDown, Crosshair, Radar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SPIN_REP, AIDA_REP, type SpinItemRep } from '@/data/playbookReps';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

const SPIN_CAMPOS: { key: keyof SpinItemRep; label: string; cor: string }[] = [
  { key: 'situacao', label: 'Situação (S)', cor: 'text-cw-purple-light' },
  { key: 'problema', label: 'Problema (P)', cor: 'text-cw-red' },
  { key: 'implicacao', label: 'Implicação (I)', cor: 'text-amber-500' },
  { key: 'necessidade', label: 'Necessidade de Solução (N)', cor: 'text-green-600' },
  { key: 'apresentacao', label: 'Desenvolvimento de produto', cor: 'text-blue-600' },
];

function SpinFuncionalidadeCard({ nome, itens }: { nome: string; itens: SpinItemRep[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cw-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-cw-elevated transition-colors"
      >
        <p className="text-sm font-bold text-cw-text">{nome}</p>
        <ChevronDown className={cn('h-4 w-4 text-cw-muted shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-cw-border space-y-4">
          {itens.map((item, i) => (
            <div key={i} className={cn('pt-3', i > 0 && 'border-t border-cw-border/60')}>
              {itens.length > 1 && (
                <p className="text-[10px] font-black text-cw-muted uppercase tracking-widest mb-2">Variação {i + 1}</p>
              )}
              <div className="space-y-2">
                {SPIN_CAMPOS.map(({ key, label, cor }) => {
                  const val = item[key];
                  if (!val) return null;
                  return (
                    <div key={key} className="border-l-2 border-cw-border pl-3">
                      <p className={cn('text-[10px] font-bold uppercase tracking-wider mb-0.5', cor)}>{label}</p>
                      <p className="text-xs text-cw-muted leading-relaxed whitespace-pre-line">{val}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PlaybookSpin() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Crosshair className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">SPIN Selling</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          O SPIN Selling é uma metodologia de vendas criada por Neil Rackham nos anos 1980, que foca utilizar boas perguntas para estruturar uma venda, baseadas em quatro pilares: Situação, Problema, Implicação, Necessidade.
        </p>
      </SectionCard>
      <div className="space-y-2 max-w-3xl">
        {SPIN_REP.map((f) => <SpinFuncionalidadeCard key={f.nome} nome={f.nome} itens={f.itens} />)}
      </div>
    </div>
  );
}

export function PlaybookAida() {
  return (
    <div className="space-y-4">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Radar className="h-5 w-5 text-cw-red" />
          <h3 className="text-lg font-bold">AIDA</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          O modelo AIDA é um modelo dentro da classe conhecida como modelos de hierarquia de efeitos ou modelos hierárquicos, todos os quais implicam que os consumidores passam por uma série de etapas ou estágios quando tomam decisões de compra.
        </p>
        <p className="text-sm text-cw-muted leading-relaxed mt-2">
          Na prospecção o AIDA é muito poderoso, pois permite que o lead progrida na jornada de compra dentro de uma ligação. Nessa documentação é possível encontrar a forma correta de aplicar uma Cold Call aplicando esse modelo.
        </p>
      </SectionCard>
      <div className="space-y-4 max-w-3xl">
        {AIDA_REP.map((etapa) => (
          <div key={etapa.letra + etapa.nome} className="cw-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center text-white font-black shrink-0">
                {etapa.letra}
              </span>
              <h4 className="font-bold text-cw-text">{etapa.nome}</h4>
            </div>
            <ol className="space-y-3 border-l-2 border-cw-border ml-4 pl-4">
              {etapa.itens.map((item, i) => (
                <li key={i}>
                  <p className="text-xs font-bold text-cw-purple-light uppercase tracking-wider mb-1">{item.estrutura}</p>
                  <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line">{item.roteiro}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
