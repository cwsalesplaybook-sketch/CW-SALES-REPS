/** Definição das etapas dos três funis do time de Representantes: prospecção,
 *  ativação (acompanhamento de representantes) e clientes de representantes. */
import { Filter, Activity, Users } from 'lucide-react';
import { FUNIL_PROSPECCAO, FUNIL_ATIVACAO, FUNIL_CLIENTES, type FunilEtapa } from '@/data/playbookReps';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

function FunilEtapas({ etapas }: { etapas: FunilEtapa[] }) {
  return (
    <ol className="space-y-3 border-l-2 border-cw-border ml-4 pl-5 max-w-3xl">
      {etapas.map((e, i) => (
        <li key={e.etapa + i} className="relative">
          <span className="absolute -left-[27px] top-0.5 h-3 w-3 rounded-full gradient-primary border-2 border-white" />
          <p className="text-sm font-bold text-cw-text mb-0.5">{e.etapa}</p>
          <p className="text-xs text-cw-muted leading-relaxed whitespace-pre-line">{e.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function PlaybookFunilProspeccao() {
  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-bold">Definição etapas do funil de prospecção</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Este documento tem como objetivo padronizar e esclarecer o significado de cada etapa do funil de representantes, garantindo que todo o time tenha o mesmo entendimento sobre o status dos leads ao longo da jornada. Aqui são descritos os critérios que definem quando um lead entra, permanece ou avança em cada etapa.
        </p>
      </SectionCard>
      <FunilEtapas etapas={FUNIL_PROSPECCAO} />
    </div>
  );
}

export function PlaybookFunilAtivacao() {
  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-bold">Definição etapas do funil de acompanhamento</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Este documento tem como objetivo padronizar e esclarecer o significado de cada etapa do funil de acompanhamento de representantes, garantindo que todo o time tenha o mesmo entendimento sobre o status dos representantes ao longo da jornada. Aqui são descritos os critérios que definem quando um representante entra, permanece ou avança em cada etapa.
        </p>
      </SectionCard>
      <FunilEtapas etapas={FUNIL_ATIVACAO} />
    </div>
  );
}

export function PlaybookFunilClientes() {
  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-bold">Definição etapas do funil de clientes de Representantes</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Este documento tem como objetivo padronizar e esclarecer o significado de cada etapa do funil de clientes de representantes, garantindo que todo o time tenha o mesmo entendimento sobre o status dos clientes ao longo da jornada. Aqui são descritos os critérios que definem quando um cliente entra, permanece ou avança em cada etapa.
        </p>
      </SectionCard>
      <FunilEtapas etapas={FUNIL_CLIENTES} />
    </div>
  );
}
