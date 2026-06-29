import { BookMarked, Hammer } from 'lucide-react';

export function Glossario() {
  return (
    <section className="cw-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookMarked className="h-5 w-5 text-cw-purple-light" />
        <h2 className="text-xl font-bold">Glossário Reps</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-cw-muted">
        <Hammer className="h-8 w-8 text-cw-purple/40" />
        <p className="text-sm font-medium">Em construção</p>
        <p className="text-xs text-center max-w-xs">
          O glossário específico do canal de representantes está sendo montado. Em breve estará disponível.
        </p>
      </div>
    </section>
  );
}
