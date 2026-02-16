import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description: "Leia os termos de serviço do AI Resume Builder.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-prose space-y-6 p-3 py-6">
      <h1 className="text-center text-2xl font-bold">Termos de Serviço</h1>
      <p className="text-muted-foreground text-center text-sm">
        Data de Vigência: 10 de fevereiro de 2026
      </p>
      <p>
        Bem-vindo ao AI Resume Builder. Estes Termos de Serviço
        (&quot;Termos&quot;) regem o uso de nosso site e serviços, incluindo
        quaisquer planos de assinatura pagos. Ao acessar ou usar o AI Resume
        Builder (&quot;o Serviço&quot;), você concorda em estar vinculado a
        estes Termos. Se você não concordar com estes Termos, não use o Serviço.
      </p>
      <h2 className="text-xl font-semibold">1. Visão Geral</h2>
      <p>
        O AI Resume Builder é uma plataforma SaaS que fornece ferramentas de
        criação de currículos alimentadas por inteligência artificial.
        Oferecemos tanto um nível gratuito quanto planos de assinatura pagos
        (&quot;Planos Pagos&quot;). Os pagamentos dos Planos Pagos são
        processados através do Stripe, nosso provedor de pagamentos
        terceirizado.
      </p>
      <h2 className="text-xl font-semibold">2. Elegibilidade</h2>
      <p>
        Você deve ter pelo menos 18 anos de idade e ser capaz de celebrar
        contratos juridicamente vinculantes para usar este Serviço. Ao acessar o
        Serviço, você confirma que atende a este requisito de elegibilidade.
      </p>
      <h2 className="text-xl font-semibold">3. Registro de Conta</h2>
      <p>
        Para acessar alguns recursos do Serviço, incluindo Planos Pagos, você
        deve criar uma conta. Ao se registrar, você concorda em fornecer
        informações precisas e atuais. Você é responsável por manter a segurança
        de sua conta e senha. Não somos responsáveis por qualquer perda ou dano
        resultante de acesso não autorizado à sua conta.
      </p>
      <h2 className="text-xl font-semibold">4. Nível Gratuito</h2>
      <p>
        Oferecemos um nível gratuito do Serviço que inclui acesso limitado a
        determinados recursos. No nível gratuito, você pode criar currículos com
        funcionalidade básica. Alguns recursos avançados e modelos podem estar
        disponíveis apenas para assinantes de Planos Pagos.
      </p>
      <h2 className="text-xl font-semibold">5. Planos de Assinatura Pagos</h2>
      <p>
        Se você optar por atualizar para um Plano Pago, será necessário fornecer
        detalhes de pagamento através do Stripe. Todos os pagamentos são
        processados de forma segura pelo Stripe de acordo com seus termos e
        política de privacidade. Ao assinar, você concorda com os seguintes
        termos:
      </p>
      <ul className="list-inside list-disc">
        <li>
          <strong>Taxas de Assinatura:</strong> As taxas dos Planos Pagos são
          cobradas de forma recorrente (mensal ou anualmente) dependendo do
          plano de assinatura que você selecionar. Os preços podem variar
          dependendo da sua localização e estão sujeitos a alterações mediante
          aviso prévio.
        </li>
        <li>
          <strong>Método de Pagamento:</strong> Você deve fornecer um método de
          pagamento válido (cartão de crédito, cartão de débito, etc.) para
          assinar um Plano Pago. Sua assinatura será renovada automaticamente, a
          menos que você cancele antes da data de renovação.
        </li>
        <li>
          <strong>Política de Reembolso:</strong> O AI Resume Builder não
          oferece reembolsos para quaisquer pagamentos já processados. No
          entanto, você pode cancelar sua assinatura a qualquer momento e
          continuará a ter acesso aos recursos do Plano Pago até o final do seu
          período de cobrança atual.
        </li>
      </ul>
      <h2 className="text-xl font-semibold">6. Cancelamento de Assinatura</h2>
      <p>
        Você pode cancelar sua assinatura a qualquer momento fazendo login em
        sua conta e seguindo o processo de cancelamento. O cancelamento entrará
        em vigor no final do ciclo de cobrança atual, e você não será mais
        cobrado.
      </p>
      <h2 className="text-xl font-semibold">
        7. Alterações nos Serviços e Preços
      </h2>
      <p>
        Reservamo-nos o direito de modificar ou descontinuar o Serviço (ou
        qualquer parte dele) a qualquer momento, com ou sem aviso. Também
        podemos ajustar os preços dos Planos Pagos; no entanto, quaisquer
        alterações de preço não afetarão seu período de assinatura atual e serão
        comunicadas antes de entrarem em vigor nas renovações.
      </p>
      <h2 className="text-xl font-semibold">8. Licença para Usar o Serviço</h2>
      <p>
        O AI Resume Builder concede a você uma licença limitada, não exclusiva,
        intransferível e revogável para usar o Serviço para uso pessoal ou
        profissional de acordo com estes Termos. Você não pode:
      </p>
      <ul className="list-inside list-disc">
        <li>Copiar, modificar ou distribuir qualquer parte do Serviço;</li>
        <li>Usar o Serviço para construir um produto concorrente;</li>
        <li>
          Acessar ou tentar acessar o Serviço por qualquer meio que não seja
          através das interfaces fornecidas.
        </li>
      </ul>
      <h2 className="text-xl font-semibold">9. Propriedade Intelectual</h2>
      <p>
        Todo o conteúdo, marcas comerciais, logotipos e propriedade intelectual
        relacionados ao AI Resume Builder são de propriedade do AI Resume
        Builder ou de seus licenciadores. Você concorda em não infringir esses
        direitos.
      </p>
      <h2 className="text-xl font-semibold">10. Conteúdo do Usuário</h2>
      <p>
        Ao usar o Serviço, você concede ao AI Resume Builder uma licença não
        exclusiva, mundial e livre de royalties para usar, modificar e exibir
        qualquer conteúdo que você criar usando a plataforma (como currículos)
        exclusivamente para o propósito de fornecer o Serviço. Você mantém toda
        a propriedade do seu conteúdo.
      </p>
      <h2 className="text-xl font-semibold">11. Política de Privacidade</h2>
      <p>
        Sua privacidade é importante para nós. Por favor, revise nossa Política
        de Privacidade [link] para entender como coletamos, usamos e protegemos
        suas informações pessoais.
      </p>
      <h2 className="text-xl font-semibold">12. Serviços de Terceiros</h2>
      <p>
        O Serviço pode conter links ou integrações para sites ou serviços de
        terceiros (por exemplo, Stripe para pagamentos). O AI Resume Builder não
        é responsável pelo conteúdo ou práticas de quaisquer sites ou serviços
        de terceiros.
      </p>
      <h2 className="text-xl font-semibold">13. Isenção de Garantias</h2>
      <p>
        O Serviço é fornecido &quot;como está&quot; e &quot;conforme
        disponível&quot;. O AI Resume Builder não oferece garantias, expressas
        ou implícitas, em relação ao Serviço, incluindo, mas não se limitando à
        precisão das saídas de currículo, adequação dos currículos para
        candidaturas a empregos ou disponibilidade ininterrupta do Serviço.
      </p>
      <h2 className="text-xl font-semibold">
        14. Limitação de Responsabilidade
      </h2>
      <p>
        Na máxima extensão permitida por lei, o AI Resume Builder não será
        responsável por quaisquer danos indiretos, incidentais, consequenciais
        ou punitivos, incluindo perda de lucros, dados ou oportunidades de
        negócios, decorrentes de ou relacionados ao seu uso do Serviço.
      </p>
      <h2 className="text-xl font-semibold">15. Lei Aplicável</h2>
      <p>
        Estes Termos são regidos e interpretados de acordo com as leis de
        [Inserir Jurisdição], sem considerar suas disposições de conflito de
        leis. Quaisquer disputas decorrentes destes Termos estarão sujeitas à
        jurisdição exclusiva dos tribunais localizados em [Inserir Localização].
      </p>
      <h2 className="text-xl font-semibold">16. Alterações nos Termos</h2>
      <p>
        Podemos atualizar estes Termos de tempos em tempos. Quaisquer alterações
        serão publicadas nesta página, e a &quot;Data de Vigência&quot; será
        atualizada conforme necessário. Seu uso contínuo do Serviço após as
        alterações entrarem em vigor constituirá sua aceitação dos novos Termos.
      </p>
      <h2 className="text-xl font-semibold">17. Contato</h2>
      <p>
        Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco
        em [Inserir Informações de Contato].
      </p>
      <p>
        Ao usar o AI Resume Builder, você reconhece que leu, compreendeu e
        concorda com estes Termos de Serviço.
      </p>
    </main>
  );
}
