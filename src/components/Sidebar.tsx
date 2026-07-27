import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen, BarChart2, Target, HelpCircle, LogOut, ClipboardCheck, KanbanSquare,
  Milestone, MessageSquareText, MessageCircleQuestion, Library, Building2,
  Filter, Users, LineChart, DollarSign, Swords,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const HOME_ITEM = { to: '/jornada-representante', label: 'Jornada do Representante', Icon: Milestone };

/** Seção original de navegação comercial — mantida sem alterações. */
const COMERCIAL_ITEMS = [
  { to: '/onboarding', label: 'Onboarding',        Icon: ClipboardCheck },
  { to: '/playbook',   label: 'Playbook',          Icon: BookOpen       },
  { to: '/pipeline',   label: 'Pipeline',          Icon: BarChart2      },
  { to: '/meta',       label: 'Meta do Mes',       Icon: Target         },
  { to: '/ajuda',      label: 'Central de Ajuda',  Icon: HelpCircle   },
];

/** Grupos de conteúdo que antes eram abas do Playbook de Representantes e
 *  foram promovidos a páginas de primeiro nível — reunidos aqui numa seção
 *  própria para não inchar mais ainda a seção Comercial. */
const PLAYBOOK_REFERENCIA_ITEMS = [
  { to: '/templates',      label: 'Templates',          Icon: MessageSquareText },
  { to: '/faq',            label: 'FAQ',                Icon: MessageCircleQuestion },
  { to: '/materiais',      label: 'Materiais',          Icon: Library },
  { to: '/estrutura',      label: 'Estrutura',          Icon: Building2 },
  { to: '/funil-prospeccao', label: 'Funil de Prospecção', Icon: Filter },
  { to: '/funil-clientes', label: 'Funil de Clientes e Acompanhamento', Icon: Users },
  { to: '/progressao-carreira', label: 'Progressão de Carreira', Icon: LineChart },
  { to: '/planos-modulos', label: 'Planos e Módulos',    Icon: DollarSign },
  { to: '/concorrentes',   label: 'Matriz de Concorrentes', Icon: Swords },
];

const REP_SECTIONS = [
  { label: 'Comercial', items: COMERCIAL_ITEMS },
  { label: 'Playbook & Referência', items: PLAYBOOK_REFERENCIA_ITEMS },
];

const INTERNAL_SECTIONS = [
  {
    label: 'Gestao',
    items: [
      { to: '/kanban', label: 'Kanban Reps', Icon: KanbanSquare },
    ],
  },
  { label: 'Comercial', items: COMERCIAL_ITEMS },
  { label: 'Playbook & Referência', items: PLAYBOOK_REFERENCIA_ITEMS },
];

function initials(name: string) {
  return name.trim().split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('');
}

function RailLink({ to, label, Icon }: { to: string; label: string; Icon: typeof Milestone }) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <NavLink
          to={to}
          className={({ isActive }) => cn(
            'flex flex-col items-center justify-center gap-1 mx-2.5 py-2.5 rounded-xl transition-colors duration-150',
            isActive
              ? 'gradient-primary text-white shadow-[0_4px_16px_rgba(168,85,247,0.35)]'
              : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="text-[9px] font-semibold leading-none tracking-wide truncate max-w-[54px]">
            {label}
          </span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-[#1a0f20] text-white border-white/10">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string | null } | null>(null);
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      const email = u.email ?? '';
      setIsInternal(email.toLowerCase().endsWith('@cardapioweb.com'));
      setUser({
        name: u.user_metadata?.full_name ?? email.split('@')[0] ?? 'Representante',
        email,
        avatar: u.user_metadata?.avatar_url ?? null,
      });
    });
  }, []);

  const SECTIONS = isInternal ? INTERNAL_SECTIONS : REP_SECTIONS;

  return (
    <TooltipProvider>
      <aside className="sidebar-glass w-[76px] shrink-0 flex flex-col h-screen sticky top-0 z-30 border-r border-white/5 overflow-hidden relative">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-cw pt-5 pb-2 relative z-10">
          {/* Botão principal em destaque */}
          <div className="mb-3">
            <RailLink to={HOME_ITEM.to} label={HOME_ITEM.label} Icon={HOME_ITEM.Icon} />
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {SECTIONS.map((section, i) => (
              <div
                key={section.label}
                className={cn(i > 0 && 'pt-3 mt-3 border-t border-white/[0.08]', 'space-y-1')}
              >
                {section.items.map(({ to, label, Icon }) => (
                  <RailLink key={to} to={to} label={label} Icon={Icon} />
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2 pb-4 pt-2 relative z-10">
          {user && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div className="cursor-default">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover shrink-0 border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0 gradient-primary">
                      {initials(user.name)}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a0f20] text-white border-white/10">
                <p className="font-semibold">{user.name}</p>
                <p className="text-white/60 text-xs">{isInternal ? 'Equipe Cardapio Web' : 'Representante'}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <button
                onClick={() => supabase.auth.signOut()}
                className="h-9 w-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1a0f20] text-white border-white/10">
              Sair
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Onça decorativa no rodapé */}
        <div className="pointer-events-none select-none absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(18,10,22,0) 0%, rgba(18,10,22,0.5) 40%, #120A16 92%)', zIndex: 2 }} />
          <img
            src="/sidebar-onca.png"
            alt=""
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] max-w-none object-cover opacity-70"
            style={{ zIndex: 1 }}
          />
        </div>
      </aside>
    </TooltipProvider>
  );
}
