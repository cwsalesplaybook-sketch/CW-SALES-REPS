import { ExternalLink, Briefcase } from 'lucide-react';

export default function Pipeline() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Pipeline</h1>
        <p className="text-sm text-cw-muted mt-0.5">Acompanhe suas oportunidades em andamento e o status de cada negocio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-cw-border p-10 flex flex-col items-center text-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-cw-purple/10 flex items-center justify-center">
          <Briefcase className="h-7 w-7 text-cw-purple" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-cw-text mb-2">Pipeline em construcao</h2>
          <p className="text-sm text-cw-muted max-w-sm">
            A visualizacao de pipeline sera integrada ao Pipedrive. Em breve voce podera
            acompanhar suas oportunidades diretamente aqui.
          </p>
        </div>
        <a
          href="https://www.pipedrive.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-cw-purple text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-cw-purple/80 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Acessar Pipedrive
        </a>
      </div>
    </div>
  );
}
