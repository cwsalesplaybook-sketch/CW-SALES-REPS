/** Assistente flutuante do Playbook de Representantes — busca por palavra-chave
 *  e leva direto pro artigo certo (seções da Central de Ajuda, FAQ ou aba geral). */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Send, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CENTRAL_AJUDA_SECOES, NUMERO_TAB } from '@/data/playbookCentralAjuda';
import { FAQ } from '@/data/playbook';

interface Resultado {
  label: string;
  descricao: string;
  path: string;
  cor: string;
}

interface Destino {
  tags: string[];
  label: string;
  descricao: string;
  tab: string;
  cor: string;
}

const DESTINOS: Destino[] = [
  { tags: ['cultura', 'missão', 'visão', 'valores', 'estratégia'], label: 'Cultura & Estratégia', descricao: 'Missão, visão e valores da CW', tab: 'cultura', cor: 'bg-cw-yellow/15 text-cw-yellow border-cw-yellow/30' },
  { tags: ['produto', 'funcionalidade', 'módulos extras', 'foco'], label: 'Produto', descricao: 'Os 3 focos da CW e módulos extras', tab: 'produto', cor: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  { tags: ['primeiros passos', 'boas-vindas', 'login', 'senha', 'primeiro acesso'], label: 'Primeiros Passos', descricao: 'Boas-vindas e acesso ao sistema', tab: 'primeiros-passos', cor: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  { tags: ['gestão', 'pedidos', 'mesas', 'kds', 'caixa', 'catálogo', 'fiado', 'delivery', 'clientes'], label: 'Gestão', descricao: 'Pedidos, mesas, caixa, catálogo e mais', tab: 'gestao-cw', cor: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  { tags: ['automação', 'whatsapp', 'chatbot', 'integração', 'cardapinho'], label: 'Automação', descricao: 'WhatsApp, chatbot e integrações', tab: 'automacao-cw', cor: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30' },
  { tags: ['vendas', 'cupom', 'fidelidade', 'cashback', 'desconto'], label: 'Aumento de Vendas', descricao: 'Cupons, fidelidade e cashback', tab: 'vendas-cw', cor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  { tags: ['módulos do sistema', 'estoque', 'financeiro', 'fiscal', 'entregadores', 'marketplace'], label: 'Módulos do Sistema', descricao: 'Estoque, financeiro, fiscal e mais', tab: 'modulos-cw', cor: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  { tags: ['suporte', 'atendimento', 'anydesk', 'acesso remoto'], label: 'Suporte', descricao: 'Canais, horários e acesso remoto', tab: 'suporte-cw', cor: 'bg-cw-red/15 text-cw-red border-cw-red/30' },
  { tags: ['plano', 'planos', 'preço', 'preco', 'valor', 'mensalidade'], label: 'Planos & Preços', descricao: 'Tabela de planos e módulos', tab: 'planos', cor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { tags: ['concorrente', 'concorrentes', 'comparativo'], label: 'Concorrentes', descricao: 'Diferenciais CW vs mercado', tab: 'concorrentes', cor: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  { tags: ['cargo', 'cargos', 'sdr', 'closer', 'bdr'], label: 'Cargos', descricao: 'Cargos do time comercial', tab: 'cargos', cor: 'bg-cw-purple/15 text-cw-purple-light border-cw-purple/30' },
  { tags: ['icp', 'cliente ideal', 'perfil'], label: 'ICP', descricao: 'Perfil de cliente ideal', tab: 'icp', cor: 'bg-cw-purple/15 text-cw-purple-light border-cw-purple/30' },
  { tags: ['hack', 'dica', 'urgência'], label: 'Hacks', descricao: 'Scripts para situações difíceis', tab: 'hacks', cor: 'bg-cw-yellow/15 text-cw-yellow border-cw-yellow/30' },
  { tags: ['objeção', 'objeções', 'caro', 'resistência'], label: 'Objeções', descricao: 'Matriz de objeções', tab: 'objecoes', cor: 'bg-cw-red/15 text-cw-red border-cw-red/30' },
  { tags: ['perda', 'motivos de perda'], label: 'Motivos de Perda', descricao: 'Por que perdemos um lead', tab: 'perda', cor: 'bg-cw-red/15 text-cw-red border-cw-red/30' },
  { tags: ['faq', 'maquininha', 'terminal', 'totem', 'app store', 'meta'], label: 'FAQ', descricao: 'Perguntas frequentes', tab: 'faq', cor: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  { tags: ['material', 'materiais', 'artigo', 'canalize'], label: 'Materiais', descricao: 'Artigos e materiais internos', tab: 'materiais', cor: 'bg-cw-purple/15 text-cw-purple-light border-cw-purple/30' },
];

function normalizar(s: string) {
  return s.normalize('NFD').replace(new RegExp('[̀-ͯ]', 'g'), '').toLowerCase().trim();
}

function buscar(query: string): Resultado[] {
  if (!query.trim()) return [];
  const q = normalizar(query);
  const out: { r: Resultado; score: number }[] = [];

  for (const d of DESTINOS) {
    const score = d.tags.reduce((acc, tag) => {
      const t = normalizar(tag);
      if (t === q) return acc + 4;
      if (t.startsWith(q) || q.startsWith(t)) return acc + 2;
      if (t.includes(q) || q.includes(t)) return acc + 1;
      return acc;
    }, 0);
    if (score > 0) {
      out.push({ score, r: { label: d.label, descricao: d.descricao, path: `/playbook?tab=${d.tab}`, cor: d.cor } });
    }
  }

  if (q.length >= 3) {
    for (const secao of CENTRAL_AJUDA_SECOES) {
      const titulo = normalizar(secao.titulo);
      let score = 0;
      if (titulo === q) score = 8;
      else if (titulo.includes(q)) score = 6;
      else if (q.includes(titulo)) score = 5;
      else if (secao.blocos.some((b) => (b.texto && normalizar(b.texto).includes(q)) || b.itens?.some((i) => normalizar(i).includes(q)))) score = 3;
      if (score > 0) {
        const tab = NUMERO_TAB[secao.numero] ?? 'gestao-cw';
        out.push({
          score,
          r: { label: 'Central de Ajuda', descricao: secao.titulo, path: `/playbook?tab=${tab}&q=${secao.numero}`, cor: 'bg-cw-purple/15 text-cw-purple-light border-cw-purple/30' },
        });
      }
    }

    for (const item of FAQ) {
      const pergunta = normalizar(item.pergunta);
      let score = 0;
      if (pergunta === q) score = 8;
      else if (pergunta.includes(q)) score = 6;
      else if (q.includes(pergunta)) score = 5;
      else if (normalizar(item.resposta).includes(q)) score = 3;
      if (score > 0) {
        out.push({
          score,
          r: { label: 'FAQ', descricao: item.pergunta, path: `/playbook?tab=faq&q=${encodeURIComponent(item.pergunta)}`, cor: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
        });
      }
    }
  }

  return out.sort((a, b) => b.score - a.score).slice(0, 6).map((x) => x.r);
}

function BotAvatar({ size = 28 }: { size?: number }) {
  return (
    <div className="rounded-full gradient-primary shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <Zap style={{ width: size * 0.5, height: size * 0.5 }} className="text-white" />
    </div>
  );
}

export function RepAssistant() {
  const [aberto, setAberto] = useState(false);
  const [query, setQuery] = useState('');
  const [novo, setNovo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const quickReplies = ['Gestão', 'FAQ', 'Planos', 'Objeções', 'Automação'];

  useEffect(() => {
    const jaAbriu = sessionStorage.getItem('cw.rep-assistant.opened');
    if (!jaAbriu) {
      const t = setTimeout(() => {
        setAberto(true);
        sessionStorage.setItem('cw.rep-assistant.opened', '1');
      }, 2000);
      return () => clearTimeout(t);
    } else {
      setNovo(true);
      const t = setTimeout(() => setNovo(false), 4000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (aberto) {
      setNovo(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery('');
    }
  }, [aberto]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setAberto(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function ir(r: Resultado) {
    nav(r.path);
    setAberto(false);
  }

  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const res = buscar(query);
      if (res.length >= 1) ir(res[0]);
    }
  }

  const resultados = buscar(query);

  return (
    <>
      {aberto && <div className="fixed inset-0 z-40" onClick={() => setAberto(false)} />}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {aberto && (
          <div
            className="w-80 rounded-2xl border border-[#ffffff12] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-3 fade-in duration-200"
            style={{ background: 'linear-gradient(180deg, #1f1040 0%, #150d30 100%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#ffffff0a]">
              <BotAvatar size={32} />
              <div className="flex-1">
                <p className="text-[13px] font-bold text-white leading-tight">Assistente CW</p>
                <p className="text-[10px] text-[#9b6fc4]">Playbook de Representantes</p>
              </div>
              <button onClick={() => setAberto(false)} className="text-[#7c5aa8] hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 py-4 space-y-3 max-h-72 overflow-y-auto">
              <div className="flex items-end gap-2">
                <BotAvatar size={24} />
                <div className="flex flex-col gap-1.5 max-w-[85%]">
                  <div className="bg-[#2d1760] rounded-2xl rounded-bl-sm px-3 py-2">
                    <p className="text-[13px] text-white leading-snug">Posso ajudar? 👋</p>
                  </div>
                  <div className="bg-[#2d1760] rounded-2xl rounded-bl-sm px-3 py-2">
                    <p className="text-[12px] text-[#d4c0ee] leading-snug">
                      Digite uma dúvida — tipo <span className="text-cw-yellow font-semibold">"maquininha"</span> ou <span className="text-cw-yellow font-semibold">"KDS"</span> — e te levo direto pro artigo certo.
                    </p>
                  </div>
                </div>
              </div>

              {!query && (
                <div className="ml-8 flex flex-wrap gap-1.5">
                  {quickReplies.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQuery(r.toLowerCase())}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#2d1760] border border-[#ffffff12] text-[#b89fd4] hover:bg-cw-purple/30 hover:text-white hover:border-cw-purple/40 transition-all"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}

              {resultados.length > 0 && (
                <div className="flex items-end gap-2">
                  <BotAvatar size={24} />
                  <div className="flex flex-col gap-1.5 max-w-[85%]">
                    <div className="bg-[#2d1760] rounded-2xl rounded-bl-sm px-3 py-2">
                      <p className="text-[12px] text-[#d4c0ee]">Encontrei isso para você:</p>
                    </div>
                    {resultados.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => ir(r)}
                        className="group flex items-center gap-2 bg-[#1a0f2e] border border-[#ffffff10] hover:border-cw-purple/50 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-[#2d1760]"
                      >
                        <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0', r.cor)}>{r.label}</span>
                        <span className="text-[11px] text-[#b89fd4] flex-1 truncate group-hover:text-white transition-colors">{r.descricao}</span>
                        <ArrowRight className="h-3 w-3 text-[#7c5aa8] group-hover:text-cw-purple shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && resultados.length === 0 && (
                <div className="flex items-end gap-2">
                  <BotAvatar size={24} />
                  <div className="bg-[#2d1760] rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                    <p className="text-[12px] text-[#d4c0ee]">Hmm, não encontrei nada para <span className="text-white font-semibold">"{query}"</span>.</p>
                    <p className="text-[11px] text-[#7c5aa8] mt-1">Tente: gestão, faq, planos, objeção...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 pb-3 border-t border-[#ffffff08] pt-3">
              <div className="flex items-center gap-2 bg-[#0d0018] border border-[#ffffff10] rounded-xl px-3 py-2 focus-within:border-cw-purple/50 transition-colors">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleEnter}
                  placeholder='Ex: "maquininha", KDS, planos...'
                  className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#7c5aa8] outline-none"
                />
                {query ? (
                  <button
                    onClick={() => { const res = buscar(query); if (res.length > 0) ir(res[0]); }}
                    className="h-6 w-6 rounded-lg gradient-primary flex items-center justify-center shrink-0"
                  >
                    <Send className="h-3 w-3 text-white" />
                  </button>
                ) : (
                  <Send className="h-3.5 w-3.5 text-[#7c5aa8]" />
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setAberto((v) => !v)}
          title="Assistente CW"
          className="relative h-14 w-14 rounded-full gradient-primary shadow-2xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
          style={{ boxShadow: '0 4px 20px rgba(165,67,250,0.5)' }}
        >
          {aberto ? <X className="h-5 w-5 text-white" /> : <Zap className="h-6 w-6 text-white" />}
          {novo && !aberto && (
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-cw-yellow border-2 border-[#150d30] animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
}
