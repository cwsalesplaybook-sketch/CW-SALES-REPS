/** Pagina top-level "Matriz de Concorrentes" — promovida para fora do Playbook
 *  de Representantes. Reaproveita o conteudo de PlaybookConcorrentes (matriz
 *  de funcionalidades e fichas detalhadas dos 28 concorrentes). */
import { PlaybookConcorrentes } from '@/components/playbook/PlaybookConcorrentes';

export default function Concorrentes() {
  return (
    <div className="p-8">
      <PlaybookConcorrentes />
    </div>
  );
}
