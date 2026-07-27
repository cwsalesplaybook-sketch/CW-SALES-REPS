import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen, BarChart2, Target, HelpCircle, LogOut, ClipboardCheck, KanbanSquare,
  Milestone, MessageSquareText, MessageCircleQuestion, Library, Building2,
  Filter, Users, LineChart, DollarSign, Swords, Sparkles, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
  const primeiroNome = (user?.name ?? '').trim().split(' ')[0];

  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col h-screen sticky top-0 z-30 border-r border-[#2a0016] overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #0d0509 0%, #17020f 55%, #0d0509 100%)' }}
    >
      {/* Logo */}
      <div className="px-4 pt-5 pb-3">
        <div className="bg-white rounded-2xl px-3 py-2.5 flex items-center justify-center">
          <img
            src="/cardapio-web-logotype-fundo-off-rgb-2800px-w-144ppi.jpg"
            alt="Cardapio Web"
            className="h-10 max-w-[150px] object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-cw px-3 pb-2 relative z-10">
        {/* Cartão de boas-vindas */}
        <div className="rounded-2xl border border-[#ff2d8a]/25 bg-gradient-to-br from-[#2a0016] to-[#1a0510] px-4 py-4 mb-3">
          <div className="h-9 w-9 rounded-full flex items-center justify-center mb-3 border border-[#ff2d8a]/40" style={{ background: 'radial-gradient(circle, rgba(255,45,138,0.25) 0%, rgba(255,45,138,0.05) 70%)' }}>
            <Sparkles className="h-4 w-4 text-[#ff5fa8]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff5fa8] mb-1.5">
            {primeiroNome ? `Bem-vinda, ${primeiroNome}!` : 'Bem-vinda!'}
          </p>
          <h2 className="text-[15px] font-black text-white leading-snug">
            Foque, execute<br />e faça acontecer.
          </h2>
          <p className="text-[11px] text-[#c98aa8] mt-1.5">Seu foco move resultados.</p>
        </div>

        {/* Botão principal em destaque */}
        <NavLink
          to={HOME_ITEM.to}
          className={({ isActive }) => cn(
            'flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-[13px] font-bold mb-4 transition-all duration-150 border',
            isActive
              ? 'border-[#ff2d8a] text-white'
              : 'border-[#ff2d8a]/40 text-[#ff8fc0] hover:border-[#ff2d8a] hover:text-white'
          )}
          style={{ boxShadow: '0 0 0 1px rgba(255,45,138,0.15), 0 4px 20px rgba(255,45,138,0.18)' }}
        >
          <HOME_ITEM.Icon className="h-[18px] w-[18px] shrink-0" />
          <span className="flex-1">{HOME_ITEM.label}</span>
          <ChevronRight className="h-4 w-4 opacity-70" />
        </NavLink>

        {/* Nav */}
        <nav className="space-y-4">
          {SECTIONS.map(section => (
            <div key={section.label}>
              <p className="px-1 mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff5fa8]/80">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map(({ to, label, Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => cn(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 border',
                      isActive
                        ? 'bg-[#2a0016] border-[#ff2d8a]/50 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/[0.04] text-[#d9a8c0] hover:text-white hover:border-[#ff2d8a]/30 hover:bg-white/[0.04]'
                    )}
                  >
                    <Icon className="h-[17px] w-[17px] shrink-0" />
                    <span className="truncate">{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 pt-2 space-y-1.5 relative z-10">
        {user && (
          <div className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#2a0016]/70 border border-[#ff2d8a]/15 backdrop-blur-sm">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover shrink-0 border border-white/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0" style={{ background: 'linear-gradient(135deg, #ff2d8a, #7c003f)' }}>
                {initials(user.name)}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-semibold text-white truncate leading-tight">{user.name}</p>
              <p className="text-[10px] text-[#ff8fc0] truncate leading-tight">
                {isInternal ? 'Equipe Cardapio Web' : 'Representante'}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => supabase.auth.signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium border border-[#ff2d8a]/25 text-[#ff5fa8] hover:text-white hover:bg-[#ff2d8a]/10 hover:border-[#ff2d8a]/50 transition-all duration-150 bg-[#0d0509]/60 backdrop-blur-sm"
        >
          <LogOut className="h-[16px] w-[16px] shrink-0" />
          <span>Sair</span>
        </button>
      </div>

      {/* Onça decorativa — fica só atrás do rodapé, nunca sobre os itens do menu */}
      <div className="pointer-events-none select-none absolute bottom-0 left-0 right-0 h-[130px] overflow-hidden z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,5,9,0) 0%, rgba(13,5,9,0.55) 35%, #0d0509 88%)', zIndex: 2 }} />
        <img
          src="/sidebar-onca.png"
          alt=""
          aria-hidden
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] max-w-none object-cover opacity-80"
          style={{ zIndex: 1 }}
        />
      </div>
    </aside>
  );
}
