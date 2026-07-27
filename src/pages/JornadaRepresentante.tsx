/** Pagina top-level "Jornada do Representante" — agora tambem a home page do
 *  app (rota "/"), substituindo a antiga tela "Comece Aqui". Reaproveita o
 *  conteudo de PlaybookJornadaRepresentante (etapas da jornada do canal de
 *  representantes). */
import { PlaybookJornadaRepresentante } from '@/components/playbook/PlaybookProcessos';

export default function JornadaRepresentante() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-cw-text">Jornada do Representante</h1>
        <p className="text-sm text-cw-muted mt-1">
          Etapas da jornada do canal de representantes na Cardápio Web.
        </p>
      </div>
      <PlaybookJornadaRepresentante />
    </div>
  );
}
