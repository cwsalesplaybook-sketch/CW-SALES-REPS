/** Página inicial do Dashboard de Representantes — independente do SDR. */
import { useEffect, useState } from 'react';
import { X, BookOpen, Users2, BarChart2, Target, HelpCircle, Rocket, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSidebarContext, type Papel } from '@/context/SidebarContext';

const ADMIN_EMAILS: Record<string, Papel> = {
  'gabrielly.oliveira@cardapioweb.com': 'Liderança',
  'hyorranes.souza@cardapioweb.com':   'Liderança',
  'rafael.barbosa@cardapioweb.com':    'Liderança',
};

const TABS = [
  { icon: Users2,    label: 'Comunidade',      desc: 'Troque experiencias, compartilhe conquistas e interaja com outros representantes de canal.' },
  { icon: BookOpen,  label: 'Playbook',         desc: 'Materiais de treinamento, metodologias e guias para representantes de canal da Cardapio Web.' },
  { icon: BarChart2, label: 'Pipeline',         desc: 'Acompanhe suas oportunidades em andamento e o status de cada negocio.' },
  { icon: Target,    label: 'Meta do Mes',      desc: 'Visualize e acompanhe sua meta mensal em tempo real com dados do Pipedrive.' },
  { icon: HelpCircle,label: 'Central de Ajuda', desc: 'Tire duvidas sobre produto, planos, comissoes e processos da Cardapio Web.' },
];

const PROXIMOS_PASSOS = [
  'Acesse o Playbook e leia os materiais de canal indireto',
  'Apresente-se na Comunidade para os outros representantes',
  'Configure sua meta do mes na aba Meta do Mes',
  'Registre suas oportunidades no Pipeline',
  'Em caso de duvidas, acesse a Central de Ajuda',
];

function WelcomeBanner({ nome, onDismiss }: { nome: string; onDismiss: () => void }) {
  return (
    <div className="cw-card p-6 border border-cw-purple/30 bg-cw-purple/5">
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-xl font-black text-cw-text">
          Bem-vindo, {nome}
        </h2>
        <button onClick={onDismiss} className="text-cw-muted hover:text-cw-text transition-colors ml-4 shrink-0">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-cw-muted mb-5">
        Aqui esta o que cada area deste dashboard oferece para voce.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TABS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="p-4 rounded-xl bg-cw-elevated border border-cw-border flex gap-3">
            <div className="shrink-0 mt-0.5">
              <Icon className="h-4 w-4 text-cw-purple" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-cw-text mb-0.5">{label}</p>
              <p className="text-[12px] text-cw-muted leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StartRep() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [nome, setNome] = useState('Representante');
  const { setPapel } = useSidebarContext();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) { setReady(true); return; }

      const email = (user.email ?? '').toLowerCase();
      const targetPapel: Papel = ADMIN_EMAILS[email] ?? 'Representante';
      const firstName = (user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Representante')
        .split(' ')[0];
      setNome(firstName);

      const already = user.user_metadata?.onboarding_done === true
        && user.user_metadata?.papel === targetPapel;

      if (!already) {
        await supabase.auth.updateUser({
          data: { papel: targetPapel, onboarding_done: true },
        });
        await supabase.from('sdr_profiles').upsert({
          user_id: user.id,
          email,
          papel: targetPapel,
          onboarding_done: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
      }

      setPapel(targetPapel);

      const dismissed = localStorage.getItem('cw-rep-welcome-dismissed');
      if (!dismissed) setShowBanner(true);
      setReady(true);
    });
  }, [setPapel]);

  const dismissBanner = () => {
    localStorage.setItem('cw-rep-welcome-dismissed', '1');
    setShowBanner(false);
  };

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cw-purple border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">

      {showBanner && <WelcomeBanner nome={nome} onDismiss={dismissBanner} />}

      {/* Hero */}
      <div
        className="rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'linear-gradient(135deg, #2d1760 0%, #1a0f2e 100%)' }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="h-5 w-5 text-cw-yellow" />
            <span className="text-xs font-bold uppercase tracking-widest text-cw-yellow">Dashboard de Representantes</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Seu espaco na Cardapio Web
          </h1>
          <p className="text-[#b89fd4] text-sm leading-relaxed max-w-lg">
            Este e o portal dos representantes de canal da Cardapio Web. Aqui voce
            encontra materiais de treinamento, acompanha sua performance e se conecta
            com a comunidade de representantes.
          </p>
        </div>
        <div className="shrink-0 hidden md:block">
          <img
            src="https://cardapioweb.com/wp-content/uploads/2024/01/Logo-Cardapio-Web.png"
            alt="Cardapio Web"
            className="h-12 w-auto object-contain brightness-0 invert opacity-80"
          />
        </div>
      </div>

      {/* O que fazer agora */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="cw-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-cw-yellow fill-cw-yellow" />
            <h2 className="text-sm font-bold text-cw-text uppercase tracking-wide">Por onde comecar</h2>
          </div>
          <ul className="space-y-3">
            {PROXIMOS_PASSOS.map((passo, i) => (
              <li key={i} className="flex gap-3 text-sm text-cw-muted">
                <CheckCircle2 className="h-4 w-4 text-cw-purple shrink-0 mt-0.5" />
                <span>{passo}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cw-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-cw-purple" />
            <h2 className="text-sm font-bold text-cw-text uppercase tracking-wide">Sobre o Programa de Representantes</h2>
          </div>
          <div className="space-y-3 text-sm text-cw-muted leading-relaxed">
            <p>
              O programa de representantes da Cardapio Web e um canal indireto de vendas onde parceiros externos
              comercializam os planos da plataforma em suas regioes.
            </p>
            <p>
              Como representante, voce tem acesso a materiais de treinamento, suporte comercial
              e ferramentas para acompanhar seus resultados.
            </p>
            <p>
              Em caso de duvidas sobre comissoes, processos ou produto, use a <strong className="text-cw-text">Central de Ajuda</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Explorar abas */}
      <div>
        <h2 className="text-sm font-bold text-cw-muted uppercase tracking-widest mb-3">Explore o dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TABS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="cw-card p-4 flex gap-3 hover:border-cw-purple/40 transition-colors cursor-default">
              <div className="h-8 w-8 rounded-lg bg-cw-purple/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-cw-purple" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-cw-text mb-0.5">{label}</p>
                <p className="text-[12px] text-cw-muted leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
