/** Definição das etapas dos três funis do time de Representantes: prospecção,
 *  ativação (acompanhamento de representantes) e clientes de representantes. */
import { ClipboardList, Copy, Filter, Activity, Users } from 'lucide-react';
import {
  FUNIL_PROSPECCAO, FUNIL_ATIVACAO, FUNIL_CLIENTES,
  CADASTRO_CLIENTE_CAMPOS, CADASTRO_CLIENTE_TEXTO, type FunilEtapa,
} from '@/data/playbookReps';
import { toast } from '@/hooks/use-toast';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

function CadastroClienteCard() {
  const copiar = () => {
    navigator.clipboard?.writeText(CADASTRO_CLIENTE_TEXTO)
      .then(() => toast({ title: 'Modelo copiado!' }))
      .catch(() => toast({ title: 'Não foi possível copiar', variant: 'destructive' }));
  };

  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-bold text-cw-text">Modelo de dados do cliente</h3>
        </div>
        <button
          onClick={copiar}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cw-elevated border border-cw-border px-2.5 py-1.5 text-[11px] font-bold text-cw-muted hover:text-cw-purple hover:border-cw-purple/40 transition-colors shrink-0"
        >
          <Copy className="h-3 w-3" /> Copiar
        </button>
      </div>
      <p className="text-xs text-cw-muted leading-relaxed mb-3">
        É o que o representante envia na etapa "Dados recebidos" para um cliente pronto pra implementação.
      </p>
      <div className="bg-cw-elevated border border-cw-border rounded-xl divide-y divide-cw-border">
        {CADASTRO_CLIENTE_CAMPOS.map((c) => (
          <div key={c.campo} className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span className="text-base shrink-0">{c.icone}</span>
            <span className="text-sm text-cw-text/85">{c.campo}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function FunilEtapas({ etapas }: { etapas: FunilEtapa[] }) {
  return (
    <div className="space-y-3">
      {etapas.map((e, i) => (
        <div key={e.etapa + i} className="cw-card cw-card-hover p-5 flex items-start gap-3.5">
          <span className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-black shrink-0">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-cw-text mb-1">{e.etapa}</p>
            <p className="text-xs text-cw-muted leading-relaxed whitespace-pre-line">{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
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
      <CadastroClienteCard />
    </div>
  );
}
