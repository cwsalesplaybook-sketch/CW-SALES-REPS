import { Trophy, Hammer } from 'lucide-react';

export function CulturaComercial() {
  return (
    <section className="cw-card p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-cw-yellow" />
        <h2 className="text-xl font-bold">Cultura dos Representantes</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-cw-muted">
        <Hammer className="h-8 w-8 text-cw-purple/40" />
        <p className="text-sm font-medium">Em construção</p>
        <p className="text-xs text-center max-w-xs">
          Os rituais e a cultura do canal de representantes estão sendo definidos. Em breve tudo estará aqui.
        </p>
      </div>
    </section>
  );
}
