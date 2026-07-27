/** Página Materiais — une o que antes eram duas abas separadas do Playbook
 *  de Representantes ("Materiais" e "Materiais Internos"): leitura
 *  recomendada (artigos do Canalize PRM) e listas internas de apresentação
 *  e planejamento, agora como seções claramente rotuladas de uma única página. */
import type { LucideIcon } from 'lucide-react';
import { BookOpen, Presentation, CalendarClock } from 'lucide-react';
import { ARTIGOS, ArtigoCard } from '@/pages/Playbook';

const APRESENTACAO_ITENS = [
  'Apresentação institucional Cardápio Web',
  'Pitch deck para parceiros e indicações',
  'Vídeo institucional da marca',
];

const PLANEJAMENTO_ITENS = [
  'Calendário de metas do trimestre',
  'Roadmap de produto',
  'Plano de expansão do canal de representantes',
];

function SectionLabel({ icon: Icon, titulo }: { icon: LucideIcon; titulo: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-4 w-4 text-cw-purple-light" />
      <p className="text-xs font-bold text-cw-muted tracking-wide uppercase">{titulo}</p>
    </div>
  );
}

function ListaMateriais({ titulo, icon, itens }: { titulo: string; icon: LucideIcon; itens: string[] }) {
  return (
    <div>
      <SectionLabel icon={icon} titulo={titulo} />
      <div className="cw-card divide-y divide-cw-border">
        {itens.map((item) => (
          <div key={item} className="flex items-center gap-3 px-5 py-3.5">
            <div className="h-1.5 w-1.5 rounded-full bg-cw-purple shrink-0" />
            <span className="text-sm text-cw-text flex-1">{item}</span>
            <span className="text-[10px] font-medium text-cw-muted bg-cw-elevated rounded-full px-2.5 py-0.5">
              Em breve
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Materiais() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Materiais</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Leitura recomendada e materiais internos de apoio para o time de Representantes.
        </p>
      </div>

      <div>
        <SectionLabel icon={BookOpen} titulo="Leitura recomendada — Canalize PRM" />
        <div className="grid md:grid-cols-2 gap-4">
          {ARTIGOS.map((a) => (
            <ArtigoCard key={a.url} artigo={a} />
          ))}
        </div>
      </div>

      <ListaMateriais titulo="Apresentação" icon={Presentation} itens={APRESENTACAO_ITENS} />
      <ListaMateriais titulo="Planejamento" icon={CalendarClock} itens={PLANEJAMENTO_ITENS} />
    </div>
  );
}
