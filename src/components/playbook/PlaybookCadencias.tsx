/** As 5 cadências de prospecção / follow-up do time de Representantes,
 *  transcritas fielmente da planilha oficial (fluxo de dias + roteiro de
 *  ligação, mensagem ou e-mail). */
import type { LucideIcon } from 'lucide-react';
import { PhoneCall, PhoneOutgoing, PhoneIncoming, Phone, PhoneForwarded } from 'lucide-react';
import {
  CADENCIA_PROSPECCAO, CADENCIA_POS_REUNIAO, CADENCIA_ONBOARDING,
  CADENCIA_1_CLIENTE, CADENCIA_2_CLIENTE, type CadenciaData,
} from '@/data/playbookReps';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

function CadenciaView({ data, icon: Icon }: { data: CadenciaData; icon: LucideIcon }) {
  return (
    <div className="space-y-4 max-w-3xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">{data.titulo}</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">{data.definicao}</p>
      </SectionCard>
      <div className="space-y-3">
        {data.passos.map((p, i) => (
          <div key={i} className="cw-card p-4 flex gap-3">
            <span className="shrink-0 h-7 px-2.5 rounded-lg bg-cw-purple/10 border border-cw-purple/25 text-cw-purple-light text-[11px] font-black flex items-center justify-center">
              {p.dia}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1">{p.tipo}</p>
              {p.texto === p.tipo ? (
                <p className="text-xs text-cw-muted italic">Ligação sem roteiro escrito — condução livre pelo representante.</p>
              ) : (
                <div className="bg-[#dcf8c6] dark:bg-[#0b3d1f] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  <p className="text-[13px] text-cw-text/90 leading-relaxed whitespace-pre-line">{p.texto}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaybookCadenciaProspeccao() {
  return <CadenciaView data={CADENCIA_PROSPECCAO} icon={PhoneCall} />;
}
export function PlaybookCadenciaPosReuniao() {
  return <CadenciaView data={CADENCIA_POS_REUNIAO} icon={PhoneOutgoing} />;
}
export function PlaybookCadenciaOnboarding() {
  return <CadenciaView data={CADENCIA_ONBOARDING} icon={PhoneIncoming} />;
}
export function PlaybookCadencia1Cliente() {
  return <CadenciaView data={CADENCIA_1_CLIENTE} icon={Phone} />;
}
export function PlaybookCadencia2Cliente() {
  return <CadenciaView data={CADENCIA_2_CLIENTE} icon={PhoneForwarded} />;
}
