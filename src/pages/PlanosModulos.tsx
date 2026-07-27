/** Pagina top-level "Planos e Modulos" — promovida para fora do Playbook de
 *  Representantes. Reaproveita o conteudo de PlaybookPlanos (planos por
 *  periodo de contratacao + tabela de modulos extras). */
import { PlaybookPlanos } from '@/components/playbook/PlaybookPlanos';

export default function PlanosModulos() {
  return (
    <div className="p-8">
      <PlaybookPlanos />
    </div>
  );
}
