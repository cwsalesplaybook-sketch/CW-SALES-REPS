/** Pagina top-level "Jornada do Representante" — home page do app (rota "/").
 *  Reune o conteudo de PlaybookJornadaRepresentante (etapas da jornada do
 *  canal) com o antigo conteudo da pagina Estrutura (perfil ideal,
 *  funcionamento do programa, modelo financeiro, niveis e objecoes) — afinal
 *  a estrutura do programa e parte de como a jornada do representante
 *  funciona. Estrutura deixou de ser um destino proprio na sidebar. */
import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { UserCheck, Workflow, Wallet, Layers, MessagesSquare, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ESTRUTURA_REPRESENTANTES } from '@/data/playbookReps';
import { PlaybookJornadaRepresentante } from '@/components/playbook/PlaybookProcessos';

const e = ESTRUTURA_REPRESENTANTES;

type Cor = 'purple' | 'blue' | 'green' | 'orange' | 'red';

const CORES: Record<Cor, { bg: string; text: string }> = {
  purple: { bg: 'bg-cw-purple/15', text: 'text-cw-purple' },
  blue:   { bg: 'bg-blue-100',     text: 'text-blue-600' },
  green:  { bg: 'bg-emerald-100',  text: 'text-emerald-600' },
  orange: { bg: 'bg-orange-100',   text: 'text-orange-600' },
  red:    { bg: 'bg-red-100',      text: 'text-red-600' },
};

const SECOES: { id: string; label: string; icon: LucideIcon; cor: Cor }[] = [
  { id: 'perfil', label: 'Perfil Ideal', icon: UserCheck, cor: 'purple' },
  { id: 'funcionamento', label: 'Funcionamento', icon: Workflow, cor: 'blue' },
  { id: 'financeiro', label: 'Modelo Financeiro', icon: Wallet, cor: 'green' },
  { id: 'niveis', label: 'Níveis', icon: Layers, cor: 'orange' },
  { id: 'objecoes', label: 'Objeções', icon: MessagesSquare, cor: 'red' },
];

function SectionHeading({ icon: Icon, titulo }: { icon: LucideIcon; titulo: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <h2 className="text-lg font-black text-cw-text">{titulo}</h2>
    </div>
  );
}

export default function JornadaRepresentante() {
  const [ativo, setAtivo] = useState(SECOES[0].id);

  useEffect(() => {
    const secoes = SECOES.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    secoes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-10">
      <div className="p-6 md:p-8 pb-0">
        <PlaybookJornadaRepresentante />
      </div>

      <nav className="sticky top-0 z-10 mt-8 bg-cw-bg/95 backdrop-blur border-y border-cw-border px-6 md:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-cw">
        {SECOES.map((s) => {
          const Icon = s.icon;
          const isAtivo = ativo === s.id;
          const cor = CORES[s.cor];
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                'relative shrink-0 inline-flex items-center gap-2 rounded-full transition-all duration-200',
                isAtivo
                  ? 'gradient-primary pl-2 pr-4 py-1.5 shadow-[0_4px_16px_rgba(124,0,63,0.25)]'
                  : 'pl-2 pr-3.5 py-1.5 bg-cw-surface border border-cw-border hover:border-cw-purple/40',
              )}
            >
              <span className={cn(
                'flex items-center justify-center rounded-full h-6 w-6 shrink-0 transition-colors',
                isAtivo ? 'bg-white/25' : cor.bg,
              )}>
                <Icon className={cn('h-3.5 w-3.5', isAtivo ? 'text-white' : cor.text)} />
              </span>
              <span className={cn('text-xs font-bold whitespace-nowrap', isAtivo ? 'text-white' : 'text-cw-text/80')}>
                {s.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="p-6 md:p-8 space-y-10">
        {/* Perfil Ideal */}
        <section id="perfil" className="scroll-mt-16">
          <SectionHeading icon={UserCheck} titulo="Perfil Ideal de Representante (IPP)" />
          <div className="cw-card p-5">
            <p className="text-sm text-cw-text/85 leading-relaxed mb-4">{e.ipp.perfil}</p>
            <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Características esperadas</p>
            <ul className="space-y-1 mb-4">
              {e.ipp.caracteristicas.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
                  <Check className="h-3.5 w-3.5 text-cw-purple-light shrink-0 mt-0.5" />{c}
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Diferenciais desejáveis</p>
            <ul className="space-y-1">
              {e.ipp.diferenciais.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
                  <Check className="h-3.5 w-3.5 text-cw-purple-light shrink-0 mt-0.5" />{c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Funcionamento */}
        <section id="funcionamento" className="scroll-mt-16">
          <SectionHeading icon={Workflow} titulo="Estrutura e Funcionamento do Programa" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {e.funcionamento.map((f) => (
              <div key={f.titulo} className="cw-card cw-card-hover p-5">
                <h3 className="font-bold text-cw-text mb-1.5">{f.titulo}</h3>
                <p className="text-xs text-cw-muted mb-2">{f.texto}</p>
                <ul className="space-y-1">
                  {f.criterios.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-cw-text/80">
                      <span className="h-1 w-1 rounded-full bg-cw-purple mt-1.5 shrink-0" />{c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Financeiro */}
        <section id="financeiro" className="scroll-mt-16">
          <SectionHeading icon={Wallet} titulo="Modelo Financeiro" />
          <div className="cw-card p-5">
            <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line mb-4">{e.financeiro.texto}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {e.financeiro.comissoes.map((c) => (
                <div key={c.pct} className="flex items-start gap-2 bg-cw-purple/5 border border-cw-purple/15 rounded-xl px-3 py-2.5">
                  <span className="text-sm font-black text-cw-purple shrink-0">{c.pct}</span>
                  <p className="text-xs text-cw-text/85">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Preços de venda ao cliente final</p>
                <ul className="space-y-1">
                  {e.financeiro.precosVendaFinal.map((p) => (
                    <li key={p.plano} className="flex justify-between text-sm text-cw-text/85">
                      <span>{p.plano}</span><span className="font-bold">{p.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Módulos</p>
                <ul className="space-y-1">
                  {e.financeiro.modulosVendaFinal.map((m) => (
                    <li key={m.modulo} className="flex justify-between text-sm text-cw-text/85">
                      <span>{m.modulo}</span><span className="font-bold">{m.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Serviços extras permitidos (valor livre)</p>
            <div className="flex flex-wrap gap-1.5">
              {e.financeiro.servicosExtras.map((s) => (
                <span key={s} className="text-xs bg-cw-elevated border border-cw-border px-2.5 py-1 rounded-full text-cw-text/80">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Níveis */}
        <section id="niveis" className="scroll-mt-16">
          <SectionHeading icon={Layers} titulo="Níveis e Benefícios" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {e.niveis.map((n) => (
              <div key={n} className="cw-card p-5 text-center">
                <p className="text-sm font-bold text-cw-text">{n}</p>
                <p className="text-[11px] text-cw-muted mt-1">Benefícios ainda não detalhados pela liderança</p>
              </div>
            ))}
          </div>
        </section>

        {/* Objeções */}
        <section id="objecoes" className="scroll-mt-16">
          <SectionHeading icon={MessagesSquare} titulo="Principais Objeções e Respostas" />
          <div className="space-y-3">
            {e.objecoes.map((o) => (
              <div key={o.pergunta} className="cw-card cw-card-hover p-5">
                <h3 className="font-bold text-cw-text mb-2 text-sm">{o.pergunta}</h3>
                <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line">{o.resposta}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
