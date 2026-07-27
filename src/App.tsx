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

function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-cw-bg text-cw-text">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"          element={<Navigate to="/start" replace />} />
          <Route path="/start"     element={<Start />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/playbook"  element={<Playbook />} />
          <Route path="/pipeline"  element={<Pipeline />} />
          <Route path="/meta"      element={<Meta />} />
          <Route path="/ajuda"     element={<Ajuda />} />
          <Route path="/kanban"    element={<KanbanReps />} />
          <Route path="*"          element={<Navigate to="/start" replace />} />
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
