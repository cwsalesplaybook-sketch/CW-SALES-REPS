/** Pagina top-level "Jornada do Representante" — agora tambem a home page do
 *  app (rota "/"), substituindo a antiga tela "Comece Aqui". Reaproveita o
 *  conteudo de PlaybookJornadaRepresentante (etapas da jornada do canal de
 *  representantes). */
import { PlaybookJornadaRepresentante } from '@/components/playbook/PlaybookProcessos';

export default function JornadaRepresentante() {
  return (
    <div className="p-8">
      <PlaybookJornadaRepresentante />
    </div>
  );
}
