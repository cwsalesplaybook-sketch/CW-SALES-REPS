import { useMemo, useState } from 'react';
import { BookMarked, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GLOSSARIO } from '@/data/glossario';

export function Glossario() {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return GLOSSARIO.map((t, i) => ({ ...t, _idx: i }));
    const lc = q.toLowerCase();
    return GLOSSARIO
      .map((t, i) => ({ ...t, _idx: i }))
      .filter((t) => t.termo.toLowerCase().includes(lc) || t.definicao.toLowerCase().includes(lc));
  }, [q]);

  return (
    <section className="cw-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-cw-purple-light" />
          <h2 className="text-xl font-bold">Glossário CW</h2>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cw-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar termo..."
            className="pl-9 bg-cw-bg border-cw-border h-9"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((t) => (
          <div key={`${t.termo}-${t._idx}`} className="p-3 rounded-lg bg-cw-bg border border-cw-border">
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <p className="font-bold text-cw-purple-light">{t.termo}</p>
              {t.categoria && (
                <Badge variant="outline" className="border-cw-border text-cw-muted text-[10px]">
                  {t.categoria}
                </Badge>
              )}
            </div>
            <p className="text-xs text-cw-muted leading-relaxed">{t.definicao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
