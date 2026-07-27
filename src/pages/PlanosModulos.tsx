/** Pagina top-level "Planos e Modulos" — promovida para fora do Playbook de
 *  Representantes. Reaproveita o conteudo de PlaybookPlanos (planos por
 *  periodo de contratacao + tabela de modulos extras). */
import { PlaybookPlanos } from '@/components/playbook/PlaybookPlanos';

export default function PlanosModulos() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-cw-text">Planos e Módulos</h1>
        <p className="text-sm text-cw-muted mt-1">
          Planos por período de contratação e módulos extras da Cardápio Web.
        </p>
      </div>
      <PlaybookPlanos />
    </div>
  );
}
