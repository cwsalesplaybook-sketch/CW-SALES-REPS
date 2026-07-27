/** Página FAQ — perguntas frequentes por categoria, promovida do Playbook de
 *  Representantes (antes a aba `faq`) para navegação de primeiro nível.
 *  Reaproveita o componente PlaybookFaq (busca por palavra-chave e deep-link
 *  via ?q=) sem alterar sua lógica interna. */
import PlaybookFaq from '@/components/playbook/PlaybookFaq';

export default function FaqPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-cw-text">FAQ</h1>
        <p className="text-sm text-cw-muted mt-0.5">
          Perguntas frequentes por categoria — totem, planos, produto, integração com WhatsApp e CW App Store.
        </p>
      </div>
      <PlaybookFaq />
    </div>
  );
}
