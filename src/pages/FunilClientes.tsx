/** Página Funil de Clientes e Acompanhamento — une o que antes eram duas
 *  abas separadas do Playbook de Representantes (`funil-clientes` e
 *  `funil-ativacao`) em uma única página com duas sub-seções alternáveis.
 *  Reaproveita PlaybookFunilClientes e PlaybookFunilAtivacao sem alterações
 *  no conteúdo — apenas a navegação entre elas é nova. */
import { useState } from 'react';
import { Users, Activity } from 'lucide-react';
import { PlaybookFunilClientes, PlaybookFunilAtivacao } from '@/components/playbook/PlaybookFunis';

const SUBSECOES = [
  { id: 'clientes', label: 'Funil de Clientes', icon: Users, Componente: PlaybookFunilClientes },
  { id: 'ativacao', label: 'Funil de Acompanhamento', icon: Activity, Componente: PlaybookFunilAtivacao },
] as const;

export default function FunilClientes() {
  const [ativo, setAtivo] = useState<(typeof SUBSECOES)[number]['id']>('clientes');
  const Atual = SUBSECOES.find((s) => s.id === ativo)!.Componente;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="inline-flex items-center gap-1 rounded-2xl border border-cw-border bg-cw-surface p-1">
        {SUBSECOES.map((s) => {
          const Icon = s.icon;
          const isAtivo = ativo === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setAtivo(s.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                isAtivo ? 'gradient-primary text-white' : 'text-cw-muted hover:text-cw-text'
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {s.label}
            </button>
          );
        })}
      </div>

      <Atual />
    </div>
  );
}
