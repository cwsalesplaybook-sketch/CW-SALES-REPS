/** Tópicos do sistema Cardápio Web — conteúdo da Central de Ajuda, dividido por
 *  setor/assunto em abas próprias do Playbook (Primeiros Passos, Gestão, Automação,
 *  Aumento de Vendas, Módulos do Sistema, Suporte). Dados em src/data/playbookCentralAjuda.ts.
 *  Suporta deep-link via ?q= (numero da seção ou palavra-chave) vindo do assistente
 *  de busca ou de outros links do Playbook — abre e rola até o artigo certo. */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { CENTRAL_AJUDA_SECOES, GRUPOS_TOPICO, type CentralAjudaSecao } from '@/data/playbookCentralAjuda';

function normalizar(txt: string) {
  return txt.normalize('NFD').replace(new RegExp('[̀-ͯ]', 'g'), '').toLowerCase();
}

function secaoContemBusca(secao: CentralAjudaSecao, busca: string) {
  if (!busca) return true;
  const alvo = normalizar(busca);
  if (normalizar(secao.titulo).includes(alvo)) return true;
  return secao.blocos.some((b) => {
    if (b.texto && normalizar(b.texto).includes(alvo)) return true;
    if (b.itens && b.itens.some((i) => normalizar(i).includes(alvo))) return true;
    return false;
  });
}

function pontuarSecao(secao: CentralAjudaSecao, q: string) {
  const alvo = normalizar(q);
  const titulo = normalizar(secao.titulo);
  if (titulo === alvo) return 6;
  if (titulo.includes(alvo)) return 4;
  if (secaoContemBusca(secao, q)) return 1;
  return 0;
}

function BlocoView({ bloco }: { bloco: CentralAjudaSecao['blocos'][number] }) {
  if (bloco.tipo === 'subtitulo') {
    return <h5 className="text-xs font-bold tracking-wide text-cw-purple-light mt-4 mb-1.5 first:mt-0">{bloco.texto}</h5>;
  }
  if (bloco.tipo === 'lista') {
    return (
      <ul className="space-y-1.5 mb-2">
        {bloco.itens?.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-cw-muted leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cw-purple/60 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="text-sm text-cw-muted leading-relaxed mb-2">{bloco.texto}</p>;
}

/** Accordion de tópicos, com busca por palavra-chave — usado por cada aba de setor. */
function TopicosAccordion({ secoes, buscaPlaceholder }: { secoes: CentralAjudaSecao[]; buscaPlaceholder: string }) {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q') ?? '';
  const qEhNumero = /^\d+$/.test(qParam);
  const [busca, setBusca] = useState(qEhNumero ? '' : qParam);

  const filtradas = useMemo(
    () => secoes.filter((s) => secaoContemBusca(s, busca)),
    [secoes, busca],
  );

  const melhorMatch = useMemo(() => {
    if (!qParam) return null;
    if (qEhNumero) {
      const direto = secoes.find((s) => String(s.numero) === qParam);
      if (direto) return direto;
    }
    let melhor: CentralAjudaSecao | null = null;
    let melhorScore = 0;
    for (const s of secoes) {
      const score = pontuarSecao(s, qParam);
      if (score > melhorScore) { melhor = s; melhorScore = score; }
    }
    return melhor;
  }, [secoes, qParam]);

  useEffect(() => {
    if (!melhorMatch) return;
    const el = document.getElementById(`central-ajuda-${melhorMatch.numero}`);
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      return () => clearTimeout(t);
    }
  }, [melhorMatch]);

  return (
    <div className="space-y-4">
      {secoes.length > 3 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cw-muted" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder={buscaPlaceholder}
            className="pl-9"
          />
        </div>
      )}

      {filtradas.length === 0 ? (
        <div className="cw-card p-8 text-center text-sm text-cw-muted">
          Nenhum resultado para essa busca.
        </div>
      ) : (
        <Accordion type="single" collapsible defaultValue={melhorMatch ? `st-${melhorMatch.numero}` : undefined} className="space-y-2">
          {filtradas.map((secao) => (
            <AccordionItem
              key={secao.numero}
              id={`central-ajuda-${secao.numero}`}
              value={`st-${secao.numero}`}
              className="border border-cw-border rounded-lg px-4 bg-cw-surface hover:border-cw-purple/50 transition-colors scroll-mt-4"
            >
              <AccordionTrigger className="text-sm font-semibold text-cw-text hover:no-underline py-3 text-left">
                {secao.titulo}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {secao.blocos.map((bloco, i) => (
                  <BlocoView key={i} bloco={bloco} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

function secoesPorTab(tab: string): CentralAjudaSecao[] {
  const grupo = GRUPOS_TOPICO.find((g) => g.tab === tab);
  if (!grupo) return [];
  return grupo.numeros
    .map((n) => CENTRAL_AJUDA_SECOES.find((s) => s.numero === n))
    .filter((s): s is CentralAjudaSecao => Boolean(s));
}

export function PlaybookPrimeirosPassos() {
  return <TopicosAccordion secoes={secoesPorTab('primeiros-passos')} buscaPlaceholder="Buscar (ex: senha, login, cardápio demo...)" />;
}

export function PlaybookGestaoCW() {
  return <TopicosAccordion secoes={secoesPorTab('gestao-cw')} buscaPlaceholder="Buscar (ex: mesas, KDS, caixa, catálogo, fiado...)" />;
}

export function PlaybookAutomacaoCW() {
  return <TopicosAccordion secoes={secoesPorTab('automacao-cw')} buscaPlaceholder="Buscar (ex: chatbot, disparo, integração...)" />;
}

export function PlaybookAumentoVendasCW() {
  return <TopicosAccordion secoes={secoesPorTab('vendas-cw')} buscaPlaceholder="Buscar (ex: cupom, fidelidade, cashback...)" />;
}

export function PlaybookModulosCW() {
  return <TopicosAccordion secoes={secoesPorTab('modulos-cw')} buscaPlaceholder="Buscar (ex: estoque, financeiro, fiscal, entregadores...)" />;
}

export function PlaybookSuporteCW() {
  return <TopicosAccordion secoes={secoesPorTab('suporte-cw')} buscaPlaceholder="Buscar" />;
}
