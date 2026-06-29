/** Página /start — Comece por Aqui (dashboard de Representantes). */
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeHero } from '@/components/start/WelcomeHero';
import { NextTasks } from '@/components/start/NextTasks';
import { TimeGrid } from '@/components/start/TimeGrid';
import { Glossario } from '@/components/start/Glossario';
import { TimelineEmpresa } from '@/components/start/TimelineEmpresa';
import { FaqNovato } from '@/components/start/FaqNovato';
import { Valores } from '@/components/start/Valores';
import { CulturaComercial } from '@/components/start/CulturaComercial';
import { useSidebarContext } from '@/context/SidebarContext';
import type { Papel } from '@/context/SidebarContext';

/** Admins viram Liderança automaticamente; demais viram Representante. */
const ADMIN_EMAILS: Record<string, Papel> = {
  'gabrielly.oliveira@cardapioweb.com': 'Liderança',
  'hyorranes.souza@cardapioweb.com':   'Liderança',
  'rafael.barbosa@cardapioweb.com':    'Liderança',
};

const TABS_INFO = [
  { label: 'Comece Aqui',    desc: 'Seu ponto de partida com informacoes gerais sobre a plataforma e a Cardapio Web.' },
  { label: 'Comunidade',     desc: 'Espaco para trocar experiencias, compartilhar conquistas e se conectar com outros representantes.' },
  { label: 'Playbook',       desc: 'Materiais de treinamento, metodologias e guias para representantes de canal.' },
  { label: 'Pipeline',       desc: 'Acompanhe as oportunidades em andamento e o status de cada negocio.' },
  { label: 'Meta do Mes',    desc: 'Visualize e acompanhe sua meta mensal em tempo real.' },
  { label: 'Central de Ajuda', desc: 'Respostas sobre produto, planos e processos da Cardapio Web.' },
];

function RepWelcomeBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="cw-card p-6 border border-cw-purple/30 bg-cw-purple/5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-black text-cw-text">Bem-vindo ao Playbook de Representantes</h2>
          <p className="text-sm text-cw-muted mt-0.5">Veja o que cada area da plataforma oferece para voce.</p>
        </div>
        <button onClick={onDismiss} className="text-cw-muted hover:text-cw-text transition-colors ml-4 shrink-0">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TABS_INFO.map(({ label, desc }) => (
          <div key={label} className="p-3 rounded-xl bg-cw-elevated border border-cw-border">
            <p className="text-[13px] font-bold text-cw-text mb-0.5">{label}</p>
            <p className="text-[12px] text-cw-muted leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Start() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { setPapel } = useSidebarContext();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) { setReady(true); return; }

      const email = (user.email ?? '').toLowerCase();
      const targetPapel: Papel = ADMIN_EMAILS[email] ?? 'Representante';
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
    <div className="p-8 space-y-6">
      {showBanner && <RepWelcomeBanner onDismiss={dismissBanner} />}
      <WelcomeHero />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><TimelineEmpresa /></div>
        <NextTasks />
      </div>
      <Valores />
      <TimeGrid />
      <CulturaComercial />
      <Glossario />
      <FaqNovato />
    </div>
  );
}
