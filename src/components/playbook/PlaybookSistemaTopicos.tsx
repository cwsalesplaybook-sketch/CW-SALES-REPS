/** Tópicos do sistema Cardápio Web — conteúdo da Central de Ajuda, dividido por
 *  setor/assunto em abas próprias do Playbook (Primeiros Passos, Gestão, Automação,
 *  Aumento de Vendas, Módulos do Sistema, Suporte). Dados em src/data/playbookCentralAjuda.ts. */
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { CENTRAL_AJUDA_SECOES, type CentralAjudaSecao } from '@/data/playbookCentralAjuda';

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

function BlocoView({ bloco }: { bloco: CentralAjudaSecao['blocos'][number] }) {
  if (bloco.tipo === 'subtitulo') {
    return <h5 className="text-xs font-bold uppercase tracking-wider text-cw-purple-light mt-4 mb-1.5 first:mt-0">{bloco.texto}</h5>;
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
  const [busca, setBusca] = useState('');

  const filtradas = useMemo(
    () => secoes.filter((s) => secaoContemBusca(s, busca)),
    [secoes, busca],
  );

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
        <Accordion type="single" collapsible className="space-y-2">
          {filtradas.map((secao) => (
            <AccordionItem
              key={secao.numero}
              value={`st-${secao.numero}`}
              className="border border-cw-border rounded-lg px-4 bg-cw-surface hover:border-cw-purple/50 transition-colors"
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

function porNumero(numeros: number[]): CentralAjudaSecao[] {
  return numeros
    .map((n) => CENTRAL_AJUDA_SECOES.find((s) => s.numero === n))
    .filter((s): s is CentralAjudaSecao => Boolean(s));
}

export function PlaybookPrimeirosPassos() {
  return <TopicosAccordion secoes={porNumero([1, 3, 4])} buscaPlaceholder="Buscar (ex: senha, login, cardápio demo...)" />;
}

export function PlaybookGestaoCW() {
  return <TopicosAccordion secoes={porNumero([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])} buscaPlaceholder="Buscar (ex: mesas, KDS, caixa, catálogo, fiado...)" />;
}

export function PlaybookAutomacaoCW() {
  return <TopicosAccordion secoes={porNumero([21, 22, 23])} buscaPlaceholder="Buscar (ex: chatbot, disparo, integração...)" />;
}

export function PlaybookAumentoVendasCW() {
  return <TopicosAccordion secoes={porNumero([24, 25])} buscaPlaceholder="Buscar (ex: cupom, fidelidade, cashback...)" />;
}

export function PlaybookModulosCW() {
  return <TopicosAccordion secoes={porNumero([26, 27, 28, 29, 30])} buscaPlaceholder="Buscar (ex: estoque, financeiro, fiscal, entregadores...)" />;
}

export function PlaybookSuporteCW() {
  return <TopicosAccordion secoes={porNumero([31])} buscaPlaceholder="Buscar" />;
}
