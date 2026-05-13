# 🛍️ Mini E-Commerce

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5.3+-000000?style=flat-square&logo=fastify)](https://www.fastify.io/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)

Uma plataforma e-commerce **full-stack moderna** desenvolvida com arquitetura em camadas, implementando as melhores práticas de engenharia de software, escalabilidade e manutenibilidade.

---

## 📋 Visão Geral

O **Mini E-Commerce** é uma aplicação robusta de gestão de **produtos** e **usuários**, construída para demonstrar padrões profissionais em desenvolvimento full-stack. Inclui validação automática, tratamento centralizado de erros, testes automatizados e deployment contínuo com migrations automáticas.

### ✨ Diferenciais Técnicos

- ✅ **Arquitetura em Camadas** — Routes → Controllers → Services → Repositories (Clean Architecture)
- ✅ **Type Safety 100%** — TypeScript em backend e frontend
- ✅ **Validação em Múltiplas Camadas** — Zod + Prisma + TypeScript
- ✅ **Testes Automatizados** — Unit tests (services) + Integration tests (routes)
- ✅ **Tratamento de Erros Robusto** — Respostas padronizadas com error codes
- ✅ **API RESTful Versionada** — `/api/v1/` para controle de versão
- ✅ **Interface Responsiva** — Desktop (tabelas) + Mobile (cards)
- ✅ **Deploy Automatizado** — Migrations rodando no build do Render
- ✅ **CORS Configurado** — Pronto para múltiplos domínios
- ✅ **Middleware Customizado** — Validação de schema, tratamento de 404

---

## 🚀 Stack Tecnológico

### Backend — Node.js + TypeScript + Fastify

| Tecnologia     | Versão | Propósito                          |
| -------------- | ------ | ---------------------------------- |
| **Node.js**    | 20+    | Runtime JavaScript                 |
| **TypeScript** | 5.6+   | Type safety no código              |
| **Fastify**    | 5.3+   | Framework HTTP de alta performance |
| **Prisma**     | 6.8+   | ORM com type safety total          |
| **SQLite**     | 3      | Banco de dados relacional          |
| **Zod**        | 3.24+  | Validação com inferência de tipos  |
| **Vitest**     | -      | Framework de testes rápido         |
| **Supertest**  | -      | Testes de endpoints HTTP           |
| **ESLint**     | -      | Linting e padrão de código         |
| **Prettier**   | -      | Formatação automática              |

### Frontend — React + TypeScript + Vite

| Tecnologia           | Versão | Propósito                              |
| -------------------- | ------ | -------------------------------------- |
| **React**            | 18.3+  | Library para UI moderno                |
| **TypeScript**       | 5.6+   | Type safety em React                   |
| **Vite**             | 6.3+   | Build tool e dev server ultrarrápido   |
| **React Router DOM** | 7.15+  | Roteamento SPA moderno                 |
| **TailwindCSS**      | 3.4+   | Utility-first CSS                      |
| **shadcn/ui**        | -      | Componentes UI acessíveis              |
| **React Hook Form**  | -      | Gerenciamento eficiente de formulários |
| **Axios**            | -      | HTTP client para API                   |
| **Lucide React**     | -      | Ícones SVG reutilizáveis               |

### DevOps & Deployment

| Tecnologia | Ambiente | Propósito                        |
| ---------- | -------- | -------------------------------- |
| **Render** | Produção | Deploy automático com migrations |
| **GitHub** | SCM      | Versionamento de código          |
| **Vercel** | Produção | Deploy frontend (opcional)       |

---

## 🏗️ Arquitetura

### Backend — Clean Architecture em Camadas

```
src/
├── routes/                    # Definição das rotas HTTP
│   ├── productRoutes.ts       # GET, POST, PUT, DELETE /products
│   └── userRoutes.ts          # GET, POST, PUT, DELETE /users
├── controllers/               # Handlers HTTP - recebem request e retornam response
│   ├── productController.ts   # create, list, getById, update, delete
│   └── userController.ts      # create, list, getById, update, delete
├── services/                  # Lógica de negócio - sem conhecimento de HTTP
│   ├── productService.ts      # createProduct, listProducts, updateProduct, deleteProduct
│   └── userService.ts         # createUser, listUsers, updateUser, deleteUser
├── repositories/              # Acesso aos dados via Prisma
│   ├── productRepository.ts   # Interface + implementação Prisma
│   └── userRepository.ts      # Interface + implementação Prisma
├── schemas/                   # Validação com Zod
│   ├── productSchema.ts       # Schemas para product
│   └── userSchema.ts          # Schemas para user
├── types/                     # Tipos TypeScript
│   ├── product.ts             # Product, CreateProductInput, UpdateProductInput
│   └── user.ts                # User, CreateUserInput, UpdateUserInput, UserRole
├── middleware/                # Middlewares Fastify
│   ├── errorHandler.ts        # Tratamento centralizado de erros
│   ├── notFoundHandler.ts     # Retorna 404 padronizado
│   └── validateSchema.ts      # Validação automática de body/params
├── utils/                     # Utilitários reutilizáveis
│   ├── appError.ts            # Erros customizados (ApplicationError, ConflictError, NotFoundError)
│   ├── prismaClient.ts        # Singleton do PrismaClient
│   └── response.ts            # buildSuccessResponse helper
├── app.ts                     # Configuração da aplicação Fastify
└── server.ts                  # Entry point da aplicação
```

### Frontend — Feature-Based Structure

```
src/
├── components/
│   ├── layout/
│   │   └── AppShell.tsx       # Layout principal com header e navegação
│   ├── products/              # Feature de Produtos
│   │   ├── ProductsDashboard.tsx      # Componente principal
│   │   ├── ProductTable.tsx           # Tabela com produtos
│   │   ├── ProductFormDialog.tsx      # Modal de criar/editar
│   │   ├── ProductStats.tsx           # Cards com estatísticas
│   │   └── DeleteProductDialog.tsx    # Modal de confirmação delete
│   ├── users/                 # Feature de Usuários
│   │   ├── UsersDashboard.tsx         # Componente principal
│   │   ├── UserTable.tsx              # Tabela com usuários
│   │   ├── UserFormDialog.tsx         # Modal de criar/editar
│   │   ├── UserStats.tsx              # Cards com estatísticas
│   │   └── DeleteUserDialog.tsx       # Modal de confirmação delete
│   └── ui/                    # Componentes reutilizáveis
│       ├── button.tsx         # Button com variantes
│       ├── card.tsx           # Card container
│       ├── dialog.tsx         # Modal/Dialog
│       ├── input.tsx          # Input field
│       ├── label.tsx          # Form label
│       ├── table.tsx          # Data table
│       ├── textarea.tsx       # Textarea field
│       ├── badge.tsx          # Badge/tag
│       ├── skeleton.tsx       # Loading skeleton
│       └── index.ts           # Export barrel
├── pages/                     # Páginas da aplicação
│   ├── ProductsPage.tsx       # Rota /products
│   └── UsersPage.tsx          # Rota /users
├── services/                  # Serviços HTTP
│   ├── api.ts                 # Configuração do axios
│   ├── productService.ts      # API client para products
│   └── userService.ts         # API client para users
├── hooks/                     # Custom hooks
│   ├── useProducts.ts         # State management de products
│   └── useUsers.ts            # State management de users
├── types/                     # Tipos compartilhados
│   ├── product.ts             # Product, ApiResponse
│   └── user.ts                # User, UserRole, ApiResponse
├── utils/                     # Funções utilitárias
│   ├── cn.ts                  # classnames helper
│   ├── formatCurrency.ts      # Formatação de moeda
│   └── formatDate.ts          # Formatação de data
├── App.tsx                    # Componente raiz com Router
└── main.tsx                   # Entry point React
```

---

## 📦 Funcionalidades

### 🛒 Gerenciamento de Produtos

- ✅ **CRUD Completo** — Criar, listar, visualizar, editar e deletar produtos
- ✅ **Validação Forte** — Nome, descrição, preço, estoque, categoria obrigatórios
- ✅ **Busca e Filtros** — Filtrar por nome e categoria em tempo real
- ✅ **Estatísticas** — Total de produtos, em estoque, fora de estoque
- ✅ **Interface Responsiva** — Tabela desktop + cards mobile
- ✅ **Feedback Visual** — Toasts de sucesso e erro

### 👥 Gerenciamento de Usuários

- ✅ **CRUD Completo** — Criar, listar, visualizar, editar e deletar usuários
- ✅ **Validação de Email** — Constraint unique no banco + validação no service
- ✅ **Sistema de Roles** — Suporte a "customer" e "admin" para futuros ACLs
- ✅ **Busca e Filtros** — Filtrar por nome e role
- ✅ **Estatísticas** — Total de usuários, clientes, administradores
- ✅ **Interface Responsiva** — Tabela desktop + cards mobile

### 🔧 Funcionalidades Técnicas

- ✅ **Tratamento de Erros Robusto** — Respostas JSON padronizadas
- ✅ **Validação em Camadas** — Zod → TypeScript → Prisma
- ✅ **Migrations Versionadas** — Prisma com histórico completo
- ✅ **Type Safety 100%** — TypeScript em todos os arquivos
- ✅ **Testes Unitários** — Services com 100% de cobertura
- ✅ **Testes de Integração** — Endpoints completos com banco em memória
- ✅ **Logging** — Fastify logger ativo em dev
- ✅ **CORS** — Configurado para múltiplos domínios

---

## 🔌 API REST

### Base URLs

```
Produção:      https://mini-ecommerce-backend-l1pc.onrender.com/api/v1
Desenvolvimento: http://localhost:3001/api/v1
```

### Endpoints de Produtos

#### ✨ Listar Produtos

```http
GET /api/v1/products
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
      "name": "Laptop Pro",
      "description": "Laptop de alta performance",
      "price": 3500.0,
      "stock": 5,
      "category": "Eletrônicos",
      "imageUrl": "https://...",
      "createdAt": "2026-05-13T09:30:00Z"
    }
  ]
}
```

#### ✨ Criar Produto

```http
POST /api/v1/products
Content-Type: application/json

{
  "name": "Laptop Pro",
  "description": "Laptop de alta performance com RTX 4090",
  "price": 3500.00,
  "stock": 5,
  "category": "Eletrônicos",
  "imageUrl": "https://example.com/laptop.jpg"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
    "name": "Laptop Pro",
    "description": "Laptop de alta performance com RTX 4090",
    "price": 3500.0,
    "stock": 5,
    "category": "Eletrônicos",
    "imageUrl": "https://example.com/laptop.jpg",
    "createdAt": "2026-05-13T09:30:00Z"
  }
}
```

#### ✨ Obter Produto por ID

```http
GET /api/v1/products/:id
```

#### ✨ Atualizar Produto

```http
PUT /api/v1/products/:id
Content-Type: application/json

{
  "name": "Laptop Pro Max",
  "price": 4500.00,
  "stock": 3
}
```

#### ✨ Deletar Produto

```http
DELETE /api/v1/products/:id
```

**Response (204 No Content)**

---

### Endpoints de Usuários

#### ✨ Listar Usuários

```http
GET /api/v1/users
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "u1a2b3c4-d5e6-47f8-a9b0-c1d2e3f4a5b6",
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "customer",
      "createdAt": "2026-05-13T10:00:00Z"
    }
  ]
}
```

#### ✨ Criar Usuário

```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "customer"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "u1a2b3c4-d5e6-47f8-a9b0-c1d2e3f4a5b6",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "customer",
    "createdAt": "2026-05-13T10:00:00Z"
  }
}
```

#### ✨ Atualizar Usuário

```http
PUT /api/v1/users/:id
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.silva@example.com",
  "role": "admin"
}
```

#### ✨ Deletar Usuário

```http
DELETE /api/v1/users/:id
```

---

### Tratamento de Erros

Todos os erros seguem um padrão consistente:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email inválido",
    "details": "O campo email deve ser um endereço de email válido"
  }
}
```

| Código             | Status | Descrição                    |
| ------------------ | ------ | ---------------------------- |
| `VALIDATION_ERROR` | 400    | Erro de validação de entrada |
| `CONFLICT_ERROR`   | 409    | Email ou recurso já existe   |
| `NOT_FOUND_ERROR`  | 404    | Recurso não encontrado       |
| `ROUTE_NOT_FOUND`  | 404    | Rota não existe              |
| `INTERNAL_ERROR`   | 500    | Erro interno do servidor     |

---

## 📊 Schema do Banco de Dados

### Product

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  stock       Int
  category    String
  imageUrl    String?
  createdAt   DateTime @default(now())
}
```

### User

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String   @default("customer")
  createdAt DateTime @default(now())
}
```

---

## 🏃 Como Rodar Localmente

### Pré-requisitos

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 10+ (incluído com Node.js)
- **Git**

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/marialuisasanches/mini-ecommerce.git
cd mini-ecommerce
```

### 2️⃣ Instalar Dependências

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

**Backend (.env):**

```bash
cd backend
cat > .env << 'EOF'
DATABASE_URL="file:./dev.db"
PORT=3001
EOF
```

**Frontend (.env.local):**

```bash
cd frontend
cat > .env.local << 'EOF'
VITE_API_BASE_URL=http://localhost:3001/api/v1
EOF
```

### 4️⃣ Rodar Migrations do Prisma

```bash
cd backend
npx prisma migrate dev
```

Isto irá criar as tabelas no SQLite e gerar o Prisma Client.

### 5️⃣ Iniciar Backend

```bash
cd backend
npm run dev
```

Backend rodando em: `http://localhost:3001` ✅

### 6️⃣ Iniciar Frontend (em novo terminal)

```bash
cd frontend
npm run dev
```

Frontend rodando em: `http://localhost:5173` ✅

---

## 🧪 Testes

### Rodar Todos os Testes

```bash
cd backend
npm run test
```

### Modo Watch (reexecuta ao salvar)

```bash
cd backend
npm run test:watch
```

### Cobertura de Testes

```bash
cd backend
npm run test:coverage
```

### Testes Implementados

- ✅ **Unit Tests** — `productService.test.ts`, `userService.test.ts`
- ✅ **Integration Tests** — `productRoutes.test.ts`, `userRoutes.test.ts`
- ✅ **Fixtures** — `inMemoryProductRepository.ts`, `inMemoryUserRepository.ts`

---

## 🚀 Deploy no Render

### Pré-requisitos

- Conta no [Render](https://render.com) (free tier disponível)
- Repositório no GitHub com código commitado

### Passos de Deploy

#### 1️⃣ Push para GitHub

```bash
git add .
git commit -m "chore: pronto para deploy"
git push origin main
```

#### 2️⃣ Conectar Render

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em **"New +"** → **"Web Service"**
3. Authorize GitHub e selecione o repositório
4. Configure conforme abaixo:

```yaml
Name: mini-ecommerce-backend
Environment: Node
Root Directory: backend
Build Command: npm install && npx prisma migrate deploy && npm run build
Start Command: npm run start
Plan: Free
```

#### 3️⃣ Deploy e Monitoramento

- Clique em **"Create Web Service"**
- Acesse **"Logs"** para ver o progresso
- Confirme que a migration foi executada
- Acesse `https://mini-ecommerce-backend-l1pc.onrender.com/api/v1/products` para testar

#### 4️⃣ Deploy Frontend (Vercel - recomendado)

```bash
npm i -g vercel
cd frontend
vercel
```

---

## 📝 Scripts Disponíveis

### Backend

```bash
npm run dev           # Dev server com hot reload
npm run build         # Transpila TypeScript para JavaScript
npm run start         # Inicia o servidor em produção
npm run test          # Executa todos os testes
npm run test:watch    # Testes em modo watch
npm run test:coverage # Gera relatório de cobertura
npm run lint          # Executa ESLint
npm run format        # Formata com Prettier
```

### Frontend

```bash
npm run dev       # Dev server com HMR
npm run build     # Build otimizado para produção
npm run preview   # Preview do build localmente
npm run lint      # Verifica tipos e lint
```

---

## 📂 Estrutura de Pastas Completa

```
mini-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests/
│   │   ├── fixtures/
│   │   ├── integration/
│   │   └── unit/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── dist/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.cjs
│   ├── index.html
│   ├── .env.local
│   └── .env.example
├── DOC/
│   ├── geral.md
│   ├── spec.md
│   ├── sprintProdutos.md
│   └── sprintUsuarios.md
├── render.yaml
├── README.md
├── .gitignore
└── package.json
```

---

## 🎯 Padrões de Código

### Backend - Service Layer Pattern

```typescript
// routes → controllers → services → repositories
// Cada camada tem responsabilidade clara
// Services usam repositórios (injeção de dependência)
// Testes mocam repositórios com in-memory alternatives
```

### Frontend - Hooks + Services Pattern

```typescript
// Components → Hooks → Services → API
// Custom hooks gerenciam estado
// Services chamam API
// Components são presentation-only
```

### Validação - Zod Schema First

```typescript
// Define schema Zod → gera tipos TypeScript
// Mesmo schema usado em routes, services e frontend
// Validação automática com middleware
```

### Erro - Centralizado e Padronizado

```typescript
// Erros customizados (ApplicationError, ConflictError, NotFoundError)
// Middleware centralizado converte para JSON padronizado
// Error codes facilita tratamento no frontend
```

---

## 🔒 Decisões de Segurança

- ✅ CORS configurado (restrição de origem)
- ✅ Validação de entrada em todas as rotas
- ✅ Emails únicos com constraint no banco
- ✅ UUIDs para IDs (não sequenciais)
- ✅ Sem dados sensíveis em respostas de erro
- ✅ Timestamps automáticos no banco

---

## 📚 Documentação Adicional

- [DOC/geral.md](./DOC/geral.md) — Visão geral técnica do projeto
- [DOC/spec.md](./DOC/spec.md) — Especificação funcional completa
- [DOC/sprintProdutos.md](./DOC/sprintProdutos.md) — Sprint de produtos
- [DOC/sprintUsuarios.md](./DOC/sprintUsuarios.md) — Sprint de usuários

---

## 🤝 Contribuindo

1. Fork o projeto (`git clone https://github.com/seu-user/mini-ecommerce.git`)
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Commit

- `feat:` — Nova funcionalidade
- `fix:` — Correção de bug
- `docs:` — Alterações em documentação
- `test:` — Adição/alteração de testes
- `chore:` — Atualizações de dependências, config, etc

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Maria Luísa Sanches**

- 🌍 GitHub: [@marialuisasanches](https://github.com/marialuisasanches)
- 💼 LinkedIn: [Maria Luísa Sanches](https://linkedin.com/in/marialuisasanches)
- 📧 Email: [seu-email@example.com](mailto:seu-email@example.com)

---

## 🙏 Agradecimentos

- [Fastify](https://www.fastify.io/) — Framework HTTP ultrarrápido
- [Prisma](https://www.prisma.io/) — ORM type-safe moderno
- [React](https://react.dev/) — Library UI declarativa
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Componentes acessíveis reutilizáveis
- [Vite](https://vitejs.dev/) — Build tool ultrarrápido
- [TypeScript](https://www.typescriptlang.org/) — Type safety em JavaScript

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

[Abrir no GitHub](https://github.com/marialuisasanches/mini-ecommerce) • [Ver Deploy](https://mini-ecommerce-backend-l1pc.onrender.com/api/v1/products)

</div>
