/** Página Templates — centraliza mensagens prontas para copiar e colar no dia a
 *  dia (prospecção, follow-up e confirmação de apresentação). Promovida do
 *  Playbook de Representantes, que antes tinha 6 abas separadas para essas
 *  mensagens (`mensagem-confirmacao`, `cadencia-prospeccao` e as 4 cadências
 *  de follow-up). Conteúdo derivado diretamente de `@/data/playbookReps`,
 *  sem duplicar texto. Favoritos ficam salvos no localStorage do navegador. */
import { useEffect, useMemo, useState } from 'react';
import { Copy, Star, MessageSquareText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  CADENCIA_PROSPECCAO, CADENCIA_POS_REUNIAO, CADENCIA_ONBOARDING,
  CADENCIA_1_CLIENTE, CADENCIA_2_CLIENTE, MENSAGENS_CONFIRMACAO,
  type CadenciaData,
} from '@/data/playbookReps';

type Categoria = 'Prospecção' | 'Follow-up' | 'Confirmação';

interface Template {
  id: string;
  titulo: string;
  categoria: Categoria;
  subtitulo: string;
  texto: string;
}

/** Extrai só os passos com mensagem/script real, pulando ligações sem
 *  roteiro escrito (onde `texto` é idêntico ao `tipo`, ex: "Ligação de
 *  diagnóstico"). */
function passosComTexto(cadencia: CadenciaData, prefixo: string, nomeCadencia?: string): Template[] {
  return cadencia.passos
    .filter((p) => p.texto !== p.tipo)
    .map((p, i) => ({
      id: `${prefixo}-${i}`,
      titulo: p.tipo,
      categoria: (nomeCadencia ? 'Follow-up' : 'Prospecção') as Categoria,
      subtitulo: nomeCadencia ? `Follow-up · ${nomeCadencia}` : `Prospecção · ${p.dia}`,
      texto: p.texto,
    }));
}

const FOLLOWUPS: { data: CadenciaData; nome: string; prefixo: string }[] = [
  { data: CADENCIA_POS_REUNIAO, nome: 'Pós-reunião', prefixo: 'followup-pos-reuniao' },
  { data: CADENCIA_ONBOARDING, nome: 'Onboarding', prefixo: 'followup-onboarding' },
  { data: CADENCIA_1_CLIENTE, nome: '1º Cliente', prefixo: 'followup-1cliente' },
  { data: CADENCIA_2_CLIENTE, nome: '2º Cliente', prefixo: 'followup-2cliente' },
];

const TEMPLATES: Template[] = [
  ...passosComTexto(CADENCIA_PROSPECCAO, 'prospeccao'),
  ...FOLLOWUPS.flatMap(({ data, nome, prefixo }) => passosComTexto(data, prefixo, nome)),
  ...MENSAGENS_CONFIRMACAO.map((m, i) => ({
    id: `confirmacao-${i}`,
    titulo: m.etapa,
    categoria: 'Confirmação' as Categoria,
    subtitulo: 'Confirmação de Apresentação',
    texto: m.texto,
  })),
];

const CATEGORIAS: Categoria[] = ['Prospecção', 'Follow-up', 'Confirmação'];
const FAVORITOS_KEY = 'cw-templates-favoritos';

function lerFavoritos(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITOS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function TemplateCard({ template, favorito, onToggleFavorito }: {
  template: Template;
  favorito: boolean;
  onToggleFavorito: () => void;
}) {
  const copiar = () => {
    navigator.clipboard?.writeText(template.texto)
      .then(() => toast({ title: 'Mensagem copiada!' }))
      .catch(() => toast({ title: 'Não foi possível copiar', variant: 'destructive' }));
  };

  return (
    <div className="cw-card cw-card-hover p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-cw-text leading-snug">{template.titulo}</p>
          <p className="text-[11px] font-medium text-cw-purple-light mt-0.5">{template.subtitulo}</p>
        </div>
        <button
          onClick={onToggleFavorito}
          className={`shrink-0 h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
            favorito
              ? 'bg-amber-50 border-amber-300 text-amber-500'
              : 'bg-cw-elevated border-cw-border text-cw-muted hover:text-amber-500 hover:border-amber-300'
          }`}
          title={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Star className={`h-4 w-4 ${favorito ? 'fill-amber-400' : ''}`} />
        </button>
      </div>
      <div className="bg-[#dcf8c6] dark:bg-[#0b3d1f] rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
        <p className="text-[13px] text-cw-text/90 leading-relaxed whitespace-pre-line">{template.texto}</p>
      </div>
      <button
        onClick={copiar}
        className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-cw-elevated border border-cw-border px-3 py-2 text-xs font-bold text-cw-muted hover:text-cw-purple hover:border-cw-purple/40 transition-colors"
      >
        <Copy className="h-3.5 w-3.5" /> Copiar
      </button>
    </div>
  );
}

export default function Templates() {
  const [filtro, setFiltro] = useState<'Todas' | Categoria | 'Favoritos'>('Todas');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => { setFavoritos(lerFavoritos()); }, []);

  const toggleFavorito = (id: string) => {
    setFavoritos((atual) => {
      const proximo = atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id];
      localStorage.setItem(FAVORITOS_KEY, JSON.stringify(proximo));
      return proximo;
    });
  };

  const visiveis = useMemo(() => {
    if (filtro === 'Todas') return TEMPLATES;
    if (filtro === 'Favoritos') return TEMPLATES.filter((t) => favoritos.includes(t.id));
    return TEMPLATES.filter((t) => t.categoria === filtro);
  }, [filtro, favoritos]);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">Templates</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Mensagens prontas para copiar e colar — prospecção, follow-up e confirmação de apresentação.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(['Todas', ...CATEGORIAS] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              filtro === c
                ? 'gradient-primary text-white border-transparent'
                : 'bg-cw-surface border-cw-border text-cw-muted hover:border-cw-purple/40'
            }`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setFiltro('Favoritos')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
            filtro === 'Favoritos'
              ? 'gradient-primary text-white border-transparent'
              : 'bg-cw-surface border-cw-border text-cw-muted hover:border-cw-purple/40'
          }`}
        >
          <Star className={`h-3 w-3 ${filtro === 'Favoritos' ? 'fill-white' : ''}`} /> Favoritos
        </button>
      </div>

      {visiveis.length === 0 ? (
        <div className="cw-card p-10 text-center text-sm text-cw-muted flex flex-col items-center gap-2">
          <MessageSquareText className="h-6 w-6 text-cw-muted" />
          {filtro === 'Favoritos' ? 'Você ainda não favoritou nenhum template.' : 'Nenhum template encontrado.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visiveis.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              favorito={favoritos.includes(t.id)}
              onToggleFavorito={() => toggleFavorito(t.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
