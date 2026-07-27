/** Abas de processo do time de Representantes: Jornada do Representante,
 *  Mensagem de Confirmação de Apresentação, Passagem de Bastão e Rotina de
 *  Aquisição (protegida na planilha oficial). */
import { useState } from 'react';
import { Copy, MessageCircleMore, Milestone, Shuffle, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  JORNADA_REPRESENTANTE_COLUNAS, MENSAGENS_CONFIRMACAO, PASSAGEM_BASTAO_PERGUNTAS,
} from '@/data/playbookReps';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

function TemplatePendenteNota() {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mt-3">
      <span className="text-amber-500 text-sm shrink-0">⚠️</span>
      <p className="text-xs text-amber-700">
        Estrutura de template definida pela planilha oficial, mas ainda não preenchida pela liderança. As colunas abaixo aparecerão preenchidas assim que a liderança concluir a documentação.
      </p>
    </div>
  );
}

export function PlaybookJornadaRepresentante() {
  return (
    <div className="space-y-4 max-w-3xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-3">
          <Milestone className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">Jornada do Representante</h3>
        </div>
        <p className="text-cw-muted leading-relaxed text-sm">
          A Jornada do Representante na Cardápio Web é composta pelas etapas descritas nessa documentação.
        </p>
        <TemplatePendenteNota />
      </SectionCard>
      <div className="cw-card p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-cw">
          <table className="text-xs w-full min-w-[600px]">
            <thead>
              <tr className="bg-cw-elevated">
                {JORNADA_REPRESENTANTE_COLUNAS.map((c) => (
                  <th key={c} className="px-3 py-2.5 text-left font-bold text-cw-text border-b border-cw-border">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {JORNADA_REPRESENTANTE_COLUNAS.map((c) => (
                  <td key={c} className="px-3 py-3 text-cw-muted italic border-b border-cw-border/60">—</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MensagemCard({ etapa, texto }: { etapa: string; texto: string }) {
  const copiar = () => {
    navigator.clipboard?.writeText(texto)
      .then(() => toast({ title: 'Mensagem copiada!' }))
      .catch(() => toast({ title: 'Não foi possível copiar', variant: 'destructive' }));
  };
  return (
    <div className="cw-card p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-sm font-bold text-cw-text">{etapa}</p>
        <button
          onClick={copiar}
          className="shrink-0 h-8 w-8 rounded-lg border border-cw-border bg-cw-elevated text-cw-muted hover:text-cw-purple hover:border-cw-purple/40 flex items-center justify-center transition-colors"
          title="Copiar mensagem"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="bg-[#dcf8c6] dark:bg-[#0b3d1f] rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-[13px] text-cw-text/90 leading-relaxed whitespace-pre-line">{texto}</p>
      </div>
    </div>
  );
}

export function PlaybookMensagemConfirmacao() {
  return (
    <div className="space-y-4 max-w-2xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <MessageCircleMore className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-bold">Mensagem de Confirmação de Apresentação</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          A mensagem de confirmação de apresentação é uma etapa essencial no processo, pois reforça o compromisso assumido pelo lead e garante que ambos os lados estejam alinhados quanto ao dia, horário e formato do encontro. Além de demonstrar profissionalismo, essa mensagem reduz o risco de no-show, aumenta a taxa de comparecimento e transmite seriedade e organização por parte da empresa.
        </p>
      </SectionCard>
      {MENSAGENS_CONFIRMACAO.map((m) => (
        <MensagemCard key={m.etapa} etapa={m.etapa} texto={m.texto} />
      ))}
    </div>
  );
}

export function PlaybookPassagemBastao() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-4 max-w-2xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Shuffle className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-bold">Passagem de Bastão</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          O momento de passagem de bastão é muito importante e crucial para a empresa. Esse momento será para o time ter mais conexão com as informações que são passadas entre os setores na marcação da apresentação.
        </p>
        <TemplatePendenteNota />
      </SectionCard>
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-muted uppercase tracking-widest mb-3">Roteiro de perguntas (template — respostas em branco na planilha)</p>
        <ul className="space-y-2">
          {PASSAGEM_BASTAO_PERGUNTAS.map((p, i) => (
            <li key={p} className="flex items-center gap-3">
              <button
                onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                className={`h-4 w-4 shrink-0 rounded border transition-colors ${checked[i] ? 'bg-cw-purple border-cw-purple' : 'border-cw-border'}`}
                aria-label="Marcar pergunta"
              />
              <span className="text-sm text-cw-text/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PlaybookRotinaAquisicao() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center max-w-lg mx-auto">
      <div className="h-16 w-16 rounded-2xl bg-cw-purple/10 border border-cw-purple/20 flex items-center justify-center">
        <Lock className="h-7 w-7 text-cw-purple" />
      </div>
      <h3 className="text-lg font-bold text-cw-text">Rotina Aquisição (Definir)</h3>
      <p className="text-sm text-cw-muted leading-relaxed">
        Esta aba está protegida na planilha oficial do Playbook de Representantes e ainda não teve seu conteúdo liberado para transcrição. Assim que a liderança destravar o acesso e finalizar a documentação, o conteúdo será publicado aqui.
      </p>
    </div>
  );
}
