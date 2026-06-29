import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Users2, BookOpen, BarChart2, Target, HelpCircle, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const NAV = [
  { to: '/start',      label: 'Comece Aqui',     Icon: Sparkles   },
  { to: '/comunidade', label: 'Comunidade',       Icon: Users2     },
  { to: '/playbook',   label: 'Playbook',         Icon: BookOpen   },
  { to: '/pipeline',   label: 'Pipeline',         Icon: BarChart2  },
  { to: '/meta',       label: 'Meta do Mes',      Icon: Target     },
  { to: '/ajuda',      label: 'Central de Ajuda', Icon: HelpCircle },
];

export function Sidebar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setName(u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? '');
      setEmail(u.email ?? '');
    });
  }, []);

  return (
    <aside className="w-64 shrink-0 bg-sidebar flex flex-col h-screen border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <p className="text-[9px] font-bold tracking-widest text-sidebar-foreground/40 uppercase mb-1">
          REPRESENTANTES
        </p>
        <p className="text-white font-black text-lg leading-none">CW Playbook</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border">
        {name && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">{name}</p>
            <p className="text-[10px] text-sidebar-foreground/40 truncate">{email}</p>
          </div>
        )}
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
