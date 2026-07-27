/** Página FAQ — perguntas frequentes por categoria, promovida do Playbook de
 *  Representantes (antes a aba `faq`) para navegação de primeiro nível.
 *  Reaproveita o componente PlaybookFaq (busca por palavra-chave e deep-link
 *  via ?q=) sem alterar sua lógica interna. */
import PlaybookFaq from '@/components/playbook/PlaybookFaq';

export default function FaqPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <PlaybookFaq />
    </div>
  );
}
