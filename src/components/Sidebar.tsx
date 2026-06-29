import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Users2, BookOpen, BarChart2, Target, HelpCircle, ChevronRight, LogOut, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const SECTIONS = [
  {
    label: 'Comunidade',
    items: [
      { to: '/comunidade', label: 'Comunidade', Icon: Users2 },
    ],
  },
  {
    label: 'Comercial',
    items: [
      { to: '/onboarding', label: 'Onboarding',       Icon: ClipboardCheck },
      { to: '/playbook', label: 'Playbook',         Icon: BookOpen   },
      { to: '/pipeline', label: 'Pipeline',          Icon: BarChart2  },
      { to: '/meta',     label: 'Meta do Mes',       Icon: Target     },
      { to: '/ajuda',    label: 'Central de Ajuda',  Icon: HelpCircle },
    ],
  },
];

function initials(name: string) {
  return name.trim().split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('');
}

export function Sidebar() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string | null } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setUser({
        name: u.user_metadata?.full_name ?? u.email?.split('@')[0] ?? 'Representante',
        email: u.email ?? '',
        avatar: u.user_metadata?.avatar_url ?? null,
      });
    });
  }, []);

  return (
    <aside
      className="w-[220px] shrink-0 flex flex-col h-screen sticky top-0 z-30 border-r border-[#ffffff08] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0f2e 0%, #130a22 100%)' }}
    >
      {/* Logo */}
      <div className="px-4 pt-5 pb-2">
        <div className="bg-white rounded-2xl px-3 py-2.5 flex items-center justify-center mb-3">
          <img
            src="/cardapio-web-logotype-fundo-off-rgb-2800px-w-144ppi.jpg"
            alt="Cardapio Web"
            className="h-12 max-w-[160px] object-contain"
          />
        </div>
        <p className="text-center text-[10px] text-[#7c5aa8] uppercase tracking-[0.2em] font-bold">
          Representantes
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-cw space-y-4">
        {/* Comece Aqui — destaque amarelo */}
        <NavLink
          to="/start"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-bold text-[13px] text-[#1a0020] transition-all duration-150 hover:brightness-110 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #f5a623 0%, #f7b440 100%)',
            boxShadow: '0 4px 14px rgba(245,166,35,0.30)',
          }}
        >
          <Sparkles className="h-[18px] w-[18px] shrink-0" />
          <span className="flex-1">Comece Aqui</span>
          <ChevronRight className="h-4 w-4 opacity-60" />
        </NavLink>

        {/* Secoes */}
        {SECTIONS.map(section => (
          <div key={section.label}>
            <p className="px-1 mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c5aa8]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[#2d1760] text-white font-semibold'
                      : 'text-[#b89fd4] hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1.5">
        {user && (
          <div className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#1e1040] border border-[#ffffff08]">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover shrink-0 border border-white/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[#4a0080] flex items-center justify-center text-[11px] font-black text-white shrink-0">
                {initials(user.name)}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-semibold text-white truncate leading-tight">{user.name}</p>
              <p className="text-[10px] text-[#7c5aa8] truncate leading-tight">Representante</p>
            </div>
          </div>
        )}

        <button
          onClick={() => supabase.auth.signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut className="h-[16px] w-[16px] shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
