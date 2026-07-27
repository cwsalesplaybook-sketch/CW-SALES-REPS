/** Página Funil de Prospecção — promovida do Playbook de Representantes
 *  (antes a aba `funil-prospeccao`). Reaproveita PlaybookFunilProspeccao
 *  sem alterações. */
import { PlaybookFunilProspeccao } from '@/components/playbook/PlaybookFunis';

export default function FunilProspeccao() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <PlaybookFunilProspeccao />
    </div>
  );
}
