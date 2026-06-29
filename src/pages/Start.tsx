import { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Valores } from '@/components/start/Valores';
import { TimeGrid } from '@/components/start/TimeGrid';
import { CulturaComercial } from '@/components/start/CulturaComercial';
import { Glossario } from '@/components/start/Glossario';
import { FaqNovato } from '@/components/start/FaqNovato';
import { TIMELINE_EMPRESA } from '@/data/timelineEmpresa';
import { BookOpen, Users2, BarChart2, Target, HelpCircle } from 'lucide-react';

type Papel = 'Representante' | 'Liderança';

const ADMIN_EMAILS: Record<string, Papel> = {
  'gabrielly.oliveira@cardapioweb.com': 'Liderança',
  'hyorranes.souza@cardapioweb.com':   'Liderança',
  'rafael.barbosa@cardapioweb.com':    'Liderança',
};

const PASSOS = [
  { label: 'Leia os materiais no Playbook',       to: '/playbook',   Icon: BookOpen   },
  { label: 'Apresente-se na Comunidade',           to: '/comunidade', Icon: Users2     },
  { label: 'Registre oportunidades no Pipeline',   to: '/pipeline',   Icon: BarChart2  },
  { label: 'Acompanhe sua Meta do Mes',            to: '/meta',       Icon: Target     },
  { label: 'Tire duvidas na Central de Ajuda',     to: '/ajuda',      Icon: HelpCircle },
];

function WelcomeBanner({ nome, onDismiss }: { nome: string; onDismiss: () => void }) {
  return (
    <div className="cw-card p-5 border-l-4 border-cw-purple">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cw-purple shrink-0" />
          <h2 className="text-base font-bold text-cw-text">Bem-vindo ao portal, {nome}!</h2>
        </div>
        <button onClick={onDismiss} className="text-cw-muted hover:text-cw-text ml-4 shrink-0 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-cw-muted leading-relaxed">
        Este e o portal exclusivo dos representantes de canal da Cardapio Web. Use o menu lateral para navegar: Comunidade, Playbook, Pipeline, Meta do Mes e Central de Ajuda.
      </p>
    </div>
  );
}

export default function Start() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [nome, setNome] = useState('Representante');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) { setReady(true); return; }

      const email = (user.email ?? '').toLowerCase();
      const targetPapel: Papel = ADMIN_EMAILS[email] ?? 'Representante';
      const firstName = (user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Representante').split(' ')[0];
      setNome(firstName);

      if (user.user_metadata?.papel !== targetPapel) {
        await supabase.auth.updateUser({ data: { papel: targetPapel, onboarding_done: true } });
        await supabase.from('sdr_profiles').upsert(
          { user_id: user.id, email, papel: targetPapel, onboarding_done: true, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        );
      }

      if (!localStorage.getItem('cw-rep-welcome-dismissed')) setShowBanner(true);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cw-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {showBanner && (
        <WelcomeBanner
          nome={nome}
          onDismiss={() => { localStorage.setItem('cw-rep-welcome-dismissed', '1'); setShowBanner(false); }}
        />
      )}

      {/* Hero — gradient-hot identico ao SDR */}
      <section className="relative rounded-2xl gradient-hot p-6">
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 gradient-glow" />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        </div>
        <div className="relative grid md:grid-cols-2 gap-7 items-center">
          <div className="flex flex-col justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold uppercase tracking-widest border border-white/20 w-fit">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Portal de Representantes
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Voce faz parte do canal que esta expandindo a Cardapio Web pelo Brasil.
            </h1>
            <p className="text-white/85 leading-relaxed text-base md:text-lg">
              Este portal e o seu ponto central de recursos, comunidade, metas e materiais. Aqui voce encontra tudo que precisa para vender mais e crescer junto com a Cardapio Web.
            </p>
            <NavLink
              to="/playbook"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl transition-all w-fit text-sm backdrop-blur"
            >
              Acessar o Playbook <ArrowRight className="h-4 w-4" />
            </NavLink>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden border border-white/20 shadow-xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/At4i9h8-fNI"
              title="Bem-vindo aos Representantes Cardapio Web"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Grid: Timeline + Primeiros Passos */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline da empresa */}
        <div className="lg:col-span-2 cw-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-cw-purple-light" />
            <h2 className="text-xl font-bold text-cw-text">A jornada da CW</h2>
          </div>
          <ol className="relative border-l-2 border-[#D8B8F7] ml-3 space-y-6">
            {TIMELINE_EMPRESA.map((m, idx) => (
              <li key={m.ano} className="ml-6">
                <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border-2 border-white shadow-sm ${
                  idx === TIMELINE_EMPRESA.length - 1
                    ? 'bg-cw-yellow text-cw-purple-dark'
                    : idx === 0
                      ? 'gradient-primary text-white border-white'
                      : 'bg-white border-[#D8B8F7] text-cw-purple'
                }`}>
                  ●
                </span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className={`text-lg font-black ${idx === TIMELINE_EMPRESA.length - 1 ? 'text-cw-yellow' : 'text-cw-purple'}`}>
                    {m.ano}
                  </p>
                  <p className="font-bold text-cw-text">{m.titulo}</p>
                </div>
                <p className="text-sm text-cw-muted mt-1 leading-relaxed">{m.descricao}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Primeiros passos */}
        <div className="cw-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-cw-purple/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-cw-purple" />
            </div>
            <h2 className="text-lg font-bold text-cw-text">Seus primeiros passos</h2>
          </div>
          <ul className="space-y-2.5">
            {PASSOS.map(({ label, to, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-cw-elevated border border-cw-border hover:border-cw-purple/40 hover:bg-white transition-all duration-150 group"
                >
                  <Icon className="h-4 w-4 text-cw-purple shrink-0" />
                  <span className="text-sm text-cw-text leading-snug flex-1">{label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-cw-muted group-hover:text-cw-purple transition-colors" />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Valores />
      <TimeGrid />
      <CulturaComercial />
      <Glossario />
      <FaqNovato />
    </div>
  );
}
