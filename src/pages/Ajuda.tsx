import { ExternalLink } from 'lucide-react';

const HELP_URL = 'https://ajuda.cardapioweb.com';

export default function Ajuda() {
  return (
    <div className="flex flex-col" style={{ height: '100vh' }}>
      {/* Barra superior */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-cw-border bg-white flex-shrink-0">
        <div>
          <h1 className="text-base font-black text-cw-text">Central de Ajuda</h1>
          <p className="text-xs text-cw-muted">ajuda.cardapioweb.com</p>
        </div>
        <a
          href={HELP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-cw-purple hover:text-cw-purple/70 transition-colors"
        >
          Abrir em nova aba <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Iframe */}
      <iframe
        src={HELP_URL}
        title="Central de Ajuda Cardapio Web"
        className="flex-1 w-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}
