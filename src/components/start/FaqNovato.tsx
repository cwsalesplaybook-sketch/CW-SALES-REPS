import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = [
  { q: 'Posso errar no roleplay?', a: 'Pode e vai. Roleplay existe pra isso, se errar agora, não erra com cliente real. Quanto mais você expor onde tá com dúvida, mais rápido evolui.' },
  { q: 'Quanto tempo até bater meta cheia?', a: 'O ramp-up oficial é de ~3 meses. Esperamos crescimento gradual, sem cobrança de meta cheia no primeiro mês. Você terá 1:1s quinzenais para acompanhar evolução.' },
  { q: 'O que acontece se eu não ler a Cumbuca?', a: 'A cumbuca é cancelada e a gente pula o capítulo, por conta que é um compromisso.' },
  { q: 'Posso pedir ajuda mesmo se for óbvio?', a: 'Sim. Pergunta boba é a que ficou na sua cabeça. Slack do seu líder, da Joelma ou Pedro, tudo aberto.' },
  { q: 'Como funciona o Berserker?', a: 'Toda virada de mês a liderança define UMA métrica (ex: agendamentos). Quem performar mais nessa métrica vira o Berserker do mês, entra no Hall of Fame.' },
];

export function FaqNovato() {
  return (
    <section className="cw-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-cw-purple-light" />
        <h2 className="text-xl font-bold">Perguntas que todo novato faz</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`} className="border-cw-border">
            <AccordionTrigger className="text-left hover:text-cw-purple-light">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-cw-muted leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
