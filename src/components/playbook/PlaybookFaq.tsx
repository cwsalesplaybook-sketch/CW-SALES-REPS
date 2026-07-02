/** Aba FAQ — perguntas frequentes por categoria (Totem, Planos, Produto,
 *  Integração WhatsApp, CW App Store). Suporta deep-link via ?q=, igual
 *  aos tópicos da Central de Ajuda — usado pelo assistente de busca e
 *  pelos cards de Módulos Extras (ex: Totem -> ?tab=faq&q=totem). */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { FAQ, type FaqItem } from '@/data/playbook';

function normalizar(txt: string) {
  return txt.normalize('NFD').replace(new RegExp('[̀-ͯ]', 'g'), '').toLowerCase();
}

interface Categoria {
  nome: string;
  itens: FaqItem[];
}

function agruparPorCategoria(faq: FaqItem[]): Categoria[] {
  const mapa = new Map<string, FaqItem[]>();
  for (const item of faq) {
    if (!mapa.has(item.categoria)) mapa.set(item.categoria, []);
    mapa.get(item.categoria)!.push(item);
  }
  return Array.from(mapa.entries()).map(([nome, itens]) => ({ nome, itens }));
}

function categoriaContemBusca(cat: Categoria, busca: string) {
  if (!busca) return true;
  const alvo = normalizar(busca);
  if (normalizar(cat.nome).includes(alvo)) return true;
  return cat.itens.some((i) => normalizar(i.pergunta).includes(alvo) || normalizar(i.resposta).includes(alvo));
}

function pontuarCategoria(cat: Categoria, q: string) {
  const alvo = normalizar(q);
  const nome = normalizar(cat.nome);
  if (nome === alvo) return 6;
  if (nome.includes(alvo)) return 4;
  if (categoriaContemBusca(cat, q)) return 1;
  return 0;
}

const CATEGORIAS = agruparPorCategoria(FAQ);
const SLUG: Record<string, string> = {
  'Totem de Autoatendimento': 'totem',
  'Planos & Preços': 'planos',
  Produto: 'produto',
  'Integração WhatsApp (Meta)': 'whatsapp',
  'CW App Store': 'app-store',
};

export default function PlaybookFaq() {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q') ?? '';
  const [busca, setBusca] = useState(qParam);

  const filtradas = useMemo(
    () => CATEGORIAS.filter((c) => categoriaContemBusca(c, busca)),
    [busca],
  );

  const melhorMatch = useMemo(() => {
    if (!qParam) return null;
    const bySlug = CATEGORIAS.find((c) => SLUG[c.nome] === normalizar(qParam));
    if (bySlug) return bySlug;
    let melhor: Categoria | null = null;
    let melhorScore = 0;
    for (const c of CATEGORIAS) {
      const score = pontuarCategoria(c, qParam);
      if (score > melhorScore) { melhor = c; melhorScore = score; }
    }
    return melhor;
  }, [qParam]);

  useEffect(() => {
    if (!melhorMatch) return;
    const el = document.getElementById(`faq-${SLUG[melhorMatch.nome] ?? melhorMatch.nome}`);
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      return () => clearTimeout(t);
    }
  }, [melhorMatch]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cw-muted" />
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar (ex: maquininha, totem, meta, app store...)"
          className="pl-9"
        />
      </div>

      {filtradas.length === 0 ? (
        <div className="cw-card p-8 text-center text-sm text-cw-muted">
          Nenhum resultado para essa busca.
        </div>
      ) : (
        <Accordion type="single" collapsible defaultValue={melhorMatch ? `fc-${SLUG[melhorMatch.nome] ?? melhorMatch.nome}` : undefined} className="space-y-2">
          {filtradas.map((cat) => {
            const slug = SLUG[cat.nome] ?? cat.nome;
            return (
              <AccordionItem
                key={cat.nome}
                id={`faq-${slug}`}
                value={`fc-${slug}`}
                className="border border-cw-border rounded-lg px-4 bg-cw-surface hover:border-cw-purple/50 transition-colors scroll-mt-4"
              >
                <AccordionTrigger className="text-sm font-semibold text-cw-text hover:no-underline py-3 text-left">
                  {cat.nome}
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  {cat.itens.map((item, i) => (
                    <div key={i} className="border-l-2 border-cw-purple pl-3">
                      <p className="text-sm font-semibold text-cw-text mb-1">{item.pergunta}</p>
                      <p className="text-sm text-cw-muted leading-relaxed whitespace-pre-line">{item.resposta}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
