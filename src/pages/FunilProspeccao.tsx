/** Página Funil de Prospecção — promovida do Playbook de Representantes
 *  (antes a aba `funil-prospeccao`). Reaproveita PlaybookFunilProspeccao
 *  sem alterações. */
import { PlaybookFunilProspeccao } from '@/components/playbook/PlaybookFunis';

export default function FunilProspeccao() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Funil de Prospecção</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Definição das etapas do funil de prospecção de representantes.
        </p>
      </div>
      <PlaybookFunilProspeccao />
    </div>
  );
}
