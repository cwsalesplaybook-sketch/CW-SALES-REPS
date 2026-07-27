import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/Sidebar';
import { RepAssistant } from '@/components/RepAssistant';
import Start from '@/pages/Start';
import Onboarding from '@/pages/Onboarding';
import Playbook from '@/components/playbook/PlaybookRepresentantes';
import Pipeline from '@/pages/Pipeline';
import Meta from '@/pages/Meta';
import Ajuda from '@/pages/Ajuda';
import KanbanReps from '@/pages/KanbanReps';
import PlanosModulos from '@/pages/PlanosModulos';
import Concorrentes from '@/pages/Concorrentes';
import JornadaRepresentante from '@/pages/JornadaRepresentante';
import Templates from '@/pages/Templates';
import FaqPage from '@/pages/FaqPage';
import Materiais from '@/pages/Materiais';
import Estrutura from '@/pages/Estrutura';
import FunilProspeccao from '@/pages/FunilProspeccao';
import FunilClientes from '@/pages/FunilClientes';
import ProgressaoCarreira from '@/pages/ProgressaoCarreira';

function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-cw-bg text-cw-text">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"          element={<Navigate to="/jornada-representante" replace />} />
          <Route path="/start"     element={<Start />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/playbook"  element={<Playbook />} />
          <Route path="/pipeline"  element={<Pipeline />} />
          <Route path="/meta"      element={<Meta />} />
          <Route path="/ajuda"     element={<Ajuda />} />
          <Route path="/kanban"    element={<KanbanReps />} />
          <Route path="/planos-modulos" element={<PlanosModulos />} />
          <Route path="/concorrentes"   element={<Concorrentes />} />
          <Route path="/jornada-representante" element={<JornadaRepresentante />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/faq"       element={<FaqPage />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/funil-prospeccao" element={<FunilProspeccao />} />
          <Route path="/funil-clientes"   element={<FunilClientes />} />
          <Route path="/progressao-carreira" element={<ProgressaoCarreira />} />
          <Route path="*"          element={<Navigate to="/jornada-representante" replace />} />
        </Routes>
      </main>
      <RepAssistant />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
}
