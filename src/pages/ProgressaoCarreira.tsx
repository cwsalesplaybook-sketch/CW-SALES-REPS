/** Página Progressão de Carreira — STUB. Promovida do Playbook de
 *  Representantes (antes a aba `progressao-carreira`), mas deliberadamente
 *  NÃO reaproveita a tabela antiga de PlaybookProgressaoCarreira (níveis
 *  Channel Hunter / Channel Account Manager) porque ela não reflete mais a
 *  estrutura de níveis real — a liderança vai enviar o conteúdo atualizado
 *  em um próximo momento. Mesmo padrão visual de "Em construção" usado em
 *  EmBreve() (src/components/playbook/PlaybookRepresentantes.tsx). */
export default function ProgressaoCarreira() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Progressão de Carreira</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Evolução de senioridade e comissionamento dentro do canal de Representantes.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-cw-purple/10 border border-cw-purple/20 flex items-center justify-center">
          <span className="text-3xl">🚧</span>
        </div>
        <h3 className="text-lg font-bold text-cw-text">Conteúdo em atualização</h3>
        <p className="text-sm text-cw-muted max-w-xs leading-relaxed">
          A estrutura de níveis está sendo revisada pela liderança. Em breve esta página será atualizada com o conteúdo definitivo.
        </p>
      </div>
    </div>
  );
}
