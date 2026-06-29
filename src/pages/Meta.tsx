import { Target } from 'lucide-react';

export default function Meta() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Meta do Mes</h1>
        <p className="text-sm text-cw-muted mt-0.5">Visualize e acompanhe sua meta mensal em tempo real.</p>
      </div>

      <div className="bg-white rounded-2xl border border-cw-border p-10 flex flex-col items-center text-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-cw-purple/10 flex items-center justify-center">
          <Target className="h-7 w-7 text-cw-purple" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-cw-text mb-2">Metas em construcao</h2>
          <p className="text-sm text-cw-muted max-w-sm">
            A visualizacao de metas mensais sera configurada em breve para os representantes.
            Voce podera acompanhar seu progresso diretamente aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
