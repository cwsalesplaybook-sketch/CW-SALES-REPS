/** Estrutura do Canal de Representantes (perfil, funcionamento, modelo financeiro,
 *  níveis e objeções) e Progressão de carreira por nível (tabela de senioridade). */
import { Building2, LineChart, Check } from 'lucide-react';
import { ESTRUTURA_REPRESENTANTES, PROGRESSAO_CARREIRA } from '@/data/playbookReps';

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`cw-card cw-card-hover p-5 ${className ?? ''}`}>{children}</div>;
}

export function PlaybookEstruturaRepresentantes() {
  const e = ESTRUTURA_REPRESENTANTES;
  return (
    <div className="space-y-5 max-w-4xl">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-5 w-5 text-cw-purple-light" />
          <h3 className="text-lg font-bold">Estrutura de Canal de Representantes</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          Esta aba tem como objetivo documentar a nova estrutura do programa de representantes da Cardápio Web, definindo o perfil ideal de representantes (IPP), os benefícios do programa, o modelo de funcionamento e as principais objeções, com suas respectivas respostas.
        </p>
      </SectionCard>

      {/* IPP */}
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Perfil Ideal de Representante (IPP)</p>
        <p className="text-sm text-cw-text/85 leading-relaxed mb-3">{e.ipp.perfil}</p>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Características esperadas</p>
        <ul className="space-y-1 mb-3">
          {e.ipp.caracteristicas.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
              <Check className="h-3.5 w-3.5 text-cw-purple-light shrink-0 mt-0.5" />{c}
            </li>
          ))}
        </ul>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Diferenciais desejáveis</p>
        <ul className="space-y-1">
          {e.ipp.diferenciais.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-cw-muted">
              <Check className="h-3.5 w-3.5 text-cw-purple-light shrink-0 mt-0.5" />{c}
            </li>
          ))}
        </ul>
      </div>

      {/* Funcionamento */}
      <div>
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Estrutura e Funcionamento do Programa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {e.funcionamento.map((f) => (
            <div key={f.titulo} className="cw-card p-5">
              <h4 className="font-bold text-cw-text mb-1.5">{f.titulo}</h4>
              <p className="text-xs text-cw-muted mb-2">{f.texto}</p>
              <ul className="space-y-1">
                {f.criterios.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-cw-text/80">
                    <span className="h-1 w-1 rounded-full bg-cw-purple mt-1.5 shrink-0" />{c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Financeiro */}
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Modelo Financeiro</p>
        <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line mb-4">{e.financeiro.texto}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {e.financeiro.comissoes.map((c) => (
            <div key={c.pct} className="flex items-start gap-2 bg-cw-purple/5 border border-cw-purple/15 rounded-xl px-3 py-2.5">
              <span className="text-sm font-black text-cw-purple shrink-0">{c.pct}</span>
              <p className="text-xs text-cw-text/85">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Preços de venda ao cliente final</p>
            <ul className="space-y-1">
              {e.financeiro.precosVendaFinal.map((p) => (
                <li key={p.plano} className="flex justify-between text-sm text-cw-text/85">
                  <span>{p.plano}</span><span className="font-bold">{p.valor}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Módulos</p>
            <ul className="space-y-1">
              {e.financeiro.modulosVendaFinal.map((m) => (
                <li key={m.modulo} className="flex justify-between text-sm text-cw-text/85">
                  <span>{m.modulo}</span><span className="font-bold">{m.valor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs font-bold text-cw-muted uppercase tracking-wider mb-1.5">Serviços extras permitidos (valor livre)</p>
        <div className="flex flex-wrap gap-1.5">
          {e.financeiro.servicosExtras.map((s) => (
            <span key={s} className="text-xs bg-cw-elevated border border-cw-border px-2.5 py-1 rounded-full text-cw-text/80">{s}</span>
          ))}
        </div>
      </div>

      {/* Níveis */}
      <div className="cw-card p-5">
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Níveis e Benefícios</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {e.niveis.map((n) => (
            <div key={n} className="rounded-xl border border-cw-border bg-cw-elevated px-4 py-4 text-center">
              <p className="text-sm font-bold text-cw-text">{n}</p>
              <p className="text-[11px] text-cw-muted mt-1">Benefícios ainda não detalhados pela liderança</p>
            </div>
          ))}
        </div>
      </div>

      {/* Objeções */}
      <div>
        <p className="text-[10px] font-black text-cw-purple uppercase tracking-widest mb-3">Principais Objeções e Respostas</p>
        <div className="space-y-3">
          {e.objecoes.map((o) => (
            <div key={o.pergunta} className="cw-card p-5">
              <h4 className="font-bold text-cw-text mb-2 text-sm">{o.pergunta}</h4>
              <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line">{o.resposta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlaybookProgressaoCarreira() {
  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex items-center gap-2 mb-2">
          <LineChart className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-bold">Progressão de carreira por nível</h3>
        </div>
        <p className="text-sm text-cw-muted leading-relaxed">
          A progressão de carreira por nível trata da evolução do agente de parcerias dentro do seu mesmo nível de senioridade, seja como Channel Hunter ou Channel Account Manager. O principal critério para essa progressão é a performance em relação às metas estipuladas para o canal, tendo como benefício o aumento da sua taxa de comissionamento e maior protagonismo na gestão e desenvolvimento das parcerias.
        </p>
        <p className="text-xs text-cw-muted mt-2 italic">
          Tabela transcrita fielmente da planilha oficial — valores marcados "#REF!" são referências quebradas na planilha original e foram mantidos como estão, sem inventar dados.
        </p>
      </SectionCard>
      <div className="cw-card p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-cw">
          <table className="text-xs min-w-[1400px]">
            <thead>
              <tr className="bg-cw-elevated">
                {['Senioridade', 'Base Salarial', 'Faixa', '% Meta 1', 'Valor', 'OTE', '% Meta 2', 'Valor', 'OTE', '% Meta 3', 'Valor', 'OTE', 'Meta Clientes', 'Custo/Cliente', 'Elegibilidade', 'Desclassificação'].map((h) => (
                  <th key={h} className="px-2.5 py-2 text-left font-bold text-cw-text border-b border-cw-border whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROGRESSAO_CARREIRA.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-cw-elevated/40' : ''}>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 font-bold text-cw-text whitespace-nowrap">{row.senioridade}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.baseSalarial}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.faixa}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta1Pct}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta1Valor}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta1Ote}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta2Pct}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta2Valor}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta2Ote}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta3Pct}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta3Valor}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.meta3Ote}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.metaClientes}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 whitespace-nowrap">{row.custoPorCliente}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 min-w-[220px]">{row.elegibilidade}</td>
                  <td className="px-2.5 py-2 border-b border-cw-border/60 min-w-[220px]">{row.desclassificacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
