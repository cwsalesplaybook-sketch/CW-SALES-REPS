/** Pagina top-level "Matriz de Concorrentes" — promovida para fora do Playbook
 *  de Representantes. Reaproveita o conteudo de PlaybookConcorrentes (matriz
 *  de funcionalidades e fichas detalhadas dos 28 concorrentes). */
import { PlaybookConcorrentes } from '@/components/playbook/PlaybookConcorrentes';

export default function Concorrentes() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-cw-text">Matriz de Concorrentes</h1>
        <p className="text-sm text-cw-muted mt-1">
          Comparativo de funcionalidades da Cardápio Web frente aos principais concorrentes.
        </p>
      </div>
      <PlaybookConcorrentes />
    </div>
  );
}
