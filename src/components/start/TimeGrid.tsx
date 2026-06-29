import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { TIME } from '@/data/time';
import { supabase } from '@/integrations/supabase/client';
import type { Pessoa } from '@/types';

const GRUPOS = [
  { label: 'Sócio Fundador',         match: (c: string) => c.toLowerCase().includes('sócio') || c.toLowerCase().includes('socio') },
  { label: 'Coordenação',            match: (c: string) => c.toLowerCase().includes('coordenador') },
  { label: 'Liderança',              match: (c: string) => c.toLowerCase().includes('liderança') || c.toLowerCase().includes('lideranca') || c.toLowerCase().includes('supervisor') || c.toLowerCase().includes('supervisora') },
  { label: 'Analistas & Assessores', match: (c: string) => c.toLowerCase().includes('analista') || c.toLowerCase().includes('assessor') },
  { label: 'Closers',                match: (c: string) => c.toLowerCase().includes('closer') },
  { label: 'SDRs',                   match: (c: string) => c.toLowerCase().includes('sdr') },
];

function getGrupo(cargo: string) {
  for (const g of GRUPOS) { if (g.match(cargo)) return g.label; }
  return 'Time';
}

export function TimeGrid() {
  const [myEmail, setMyEmail] = useState('');
  const [myAvatar, setMyAvatar] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (u) {
        setMyEmail(u.email ?? '');
        setMyAvatar(u.user_metadata?.avatar_url ?? null);
      }
    });
  }, []);

  const items: Pessoa[] = TIME;

  const grupos: { label: string; pessoas: { p: Pessoa; idx: number }[] }[] = [];
  items.forEach((p, idx) => {
    const label = getGrupo(p.cargo);
    let g = grupos.find(x => x.label === label);
    if (!g) {
      const ordem = GRUPOS.findIndex(x => x.label === label);
      let pos = grupos.findIndex(x => GRUPOS.findIndex(y => y.label === x.label) > ordem);
      if (pos === -1) pos = grupos.length;
      grupos.splice(pos, 0, { label, pessoas: [] });
      g = grupos[pos];
    }
    g.pessoas.push({ p, idx });
  });

  return (
    <section className="cw-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-cw-purple/10 flex items-center justify-center">
          <Users className="h-4 w-4 text-cw-purple" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cw-text">Quem é quem no time</h2>
          <p className="text-xs text-cw-muted">As pessoas que fazem a Cardápio Web acontecer todos os dias</p>
        </div>
      </div>

      <div className="space-y-8">
        {grupos.map(({ label, pessoas }) => (
          <div key={label}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-cw-purple">{label}</span>
              <div className="flex-1 h-px bg-cw-border" />
              <span className="text-[11px] text-cw-muted">{pessoas.length}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {pessoas.map(({ p }) => {
                const initials = p.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
                const isMe = !!myEmail && (
                  p.email === myEmail ||
                  p.slack?.toLowerCase().includes(myEmail.split('@')[0].toLowerCase()) === true
                );

                return (
                  <div key={p.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-cw-elevated border border-cw-border hover:border-cw-purple/40 hover:bg-white hover:shadow-sm transition-all duration-150">
                    {isMe && myAvatar ? (
                      <img src={myAvatar} alt={p.nome} className="h-9 w-9 rounded-full object-cover shrink-0 border-2 border-cw-purple/40" referrerPolicy="no-referrer" />
                    ) : p.foto ? (
                      <img src={p.foto} alt={p.nome} className="h-9 w-9 rounded-full object-cover shrink-0 border border-cw-border" />
                    ) : (
                      <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs text-cw-text leading-snug truncate">{p.nome}</p>
                      <p className="text-[11px] text-cw-muted truncate">{p.cargo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
