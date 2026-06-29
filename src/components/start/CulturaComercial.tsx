import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { RITUAIS } from '@/data/rituais';
import { RitualCard } from '@/components/agenda/RitualCard';
import { RitualPanel } from '@/components/agenda/RitualPanel';
import type { Ritual } from '@/types';

export function CulturaComercial() {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  return (
    <>
      <section className="cw-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-cw-yellow" />
          <h2 className="text-xl font-bold">Cultura do Comercial</h2>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Rituais são a espinha dorsal da nossa cultura. Eles criam previsibilidade, aceleram o desenvolvimento individual e fortalecem o time. Conhecer e participar deles não é opcional — é o que diferencia quem pertence de quem está só de passagem.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RITUAIS.map((ritual) => (
            <RitualCard key={ritual.id} ritual={ritual} onClick={() => setSelectedRitual(ritual)} />
          ))}
        </div>
      </section>
      <RitualPanel ritual={selectedRitual} onClose={() => setSelectedRitual(null)} />
    </>
  );
}
