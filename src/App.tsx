import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/Sidebar';
import Login from '@/pages/Login';
import Start from '@/pages/Start';
import Comunidade from '@/pages/Comunidade';
import Playbook from '@/pages/Playbook';
import Pipeline from '@/pages/Pipeline';
import Meta from '@/pages/Meta';
import Ajuda from '@/pages/Ajuda';

function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-cw-bg text-cw-text">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/start" replace />} />
          <Route path="/start" element={<Start />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="*" element={<Navigate to="/start" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s ?? null));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-cw-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cw-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <BrowserRouter>
        {session ? <AppLayout /> : <Login />}
      </BrowserRouter>
    </>
  );
}
