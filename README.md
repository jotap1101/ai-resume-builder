<div align="center">
    <h1>AI Resume Builder</h1>
    <img src="./public/logo.png" alt="AI Resume Builder Logo" width="200"/>
</div>

---

## 📋 Sobre o Projeto

Sistema de criação de currículos com editor visual, IA integrada (Google Gemini), sistema de autenticação (Clerk), e planos de assinatura (Stripe).

---

## ✨ Funcionalidades Principais

- Editor de currículos com preview em tempo real
- Geração de conteúdo com IA (planos pagos)
- Sistema de autenticação completo
- Planos Free, Pro e Pro Plus
- Upload de fotos e customizações
- Exportação em PDF

---

## 🛠️ Stack

- **React 19**
- **Next.js 16**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **Clerk**
- **Stripe**
- **Google Gemini AI**
- **Tailwind CSS**
- **shadcn/ui**

---

## 🚀 Instalação e Configuração Local

### Pré-requisitos

- Node.js 20+
- npm/yarn/pnpm
- Conta PostgreSQL ([Neon](https://neon.tech/) ou [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) recomendado)
- Contas de serviços:
  - [Clerk](https://clerk.com/) - Autenticação
  - [Stripe](https://stripe.com/) - Pagamentos (modo teste)
  - [Google AI Studio](https://makersuite.google.com/app/apikey) - Gemini API
  - [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) - Upload de imagens

### Passo a Passo

1. **Clone o repositório e instale as dependências**

```bash
git clone https://github.com/seu-usuario/ai-resume-builder.git
cd ai-resume-builder
npm install
```

2. **Configure variáveis de ambiente**

Copie o arquivo `env.example` para `.env` e preencha com suas credenciais:

```bash
cp env.example .env
```

3. **Configure o banco de dados**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. **Inicie o servidor**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 📝 Observações

Antes de rodar o projeto, você precisará configurar as seguintes plataformas:

- **PostgreSQL (Neon/Vercel)**: Crie um banco de dados e copie as credenciais de conexão
- **Clerk**: Crie uma aplicação, configure URLs de redirect (`/sign-in`, `/sign-up`), e copie as API Keys
- **Stripe**:
  - Crie produtos e preços (Pro e Pro Plus) no Dashboard
  - Copie as API Keys (modo test)
- **Google AI Studio**: Gere uma API Key para o Gemini
- **Vercel Blob**: Crie um token de leitura/escrita

Todas as credenciais devem ser adicionadas no arquivo `.env` conforme o template `env.example`.

Para mais detalhes sobre Clerk, veja [ADD_CLERK.md](./ADD_CLERK.md).

---

## 📄 Licença

MIT
