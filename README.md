# 🚀 Fincodes Tech - Blog Platform

Uma plataforma moderna de blog minimalista focada em artigos de tecnologia, finanças e empreendedorismo. O projeto foi construído utilizando o ecossistema de ponta do Next.js, contando com renderização dinâmica, gerenciamento avançado de Markdown e uma identidade visual escura (*high-tech*) com detalhes em verde neon.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi arquitetado focado em performance, tipografia fluida e escalabilidade:

* **Framework:** [Next.js](https://nextjs.org/) (App Router & Turbopack Compiler)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) (para renderização perfeita de posts)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (utilizando a biblioteca `pg` com Connection Pool)
* **Autenticação & Segurança:** Rotas de API protegidas com tokens JWT para controle do painel administrativo.
* **Hospedagem & Deploy:** [Vercel](https://vercel.com/)
* **Métricas:** [Google Analytics 4](https://analytics.google.com/) (Rastreamento avançado e tratamento de tráfego interno)

---

## 🌟 Funcionalidades Principais

* **Renderização em Markdown:** Suporte total a títulos estruturados, blocos de códigos, espaçamentos avançados e citações estilizadas em tempo real.
* **Painel Administrativo Autenticado:** Área exclusiva para criação, edição e exclusão de artigos através de requisições à API integrada do Next.js.
* **Funil Híbrido de Conversão (CTA 2.0):** Seções estratégicas ao final de cada artigo divididas entre captura de leads (Newsletter) e conversão direta (Agendamento no Calendly).
* **Componente de Artigos Relacionados:** Sistema automático no rodapé que lê a API de metadados do banco para recomendar novos conteúdos ao leitor de forma dinâmica.
* **Arquitetura Otimizada:** Endpoints inteligentes no back-end capazes de discernir requisições pesadas (com o conteúdo completo do post) de requisições leves de sumário (apenas para exibição de cards).

---

## 📂 Estrutura de Pastas Resumida

```text
├── src/
│   ├── app/
│   │   ├── api/             # Endpoints de back-end (login, getArticles, contact...)
│   │   ├── components/      # Componentes reutilizáveis (Herosection, RelatedArticles...)
│   │   ├── pages/           # Rotas da aplicação (article, newArticle, dashboard...)
│   │   ├── globals.css      # Estilos globais e injeções do Tailwind
│   │   └── layout.tsx       # Layout root da aplicação com scripts de tracking
├── tailwind.config.ts       # Configuração do Tailwind contendo os plugins oficiais
└── next.config.ts           # Configurações do compilador do Next.js (Turbopack)
