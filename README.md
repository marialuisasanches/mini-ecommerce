# Mini E-commerce 🛒

[![Deploy Frontend](https://img.shields.io/badge/Deploy%20Frontend-Render-46E3B7)](https://mini-ecommerce-frontend-lj1u.onrender.com)
[![Deploy Backend](https://img.shields.io/badge/Deploy%20Backend-Render-46E3B7)](https://mini-ecommerce-backend-l1pc.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v18+-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5+-000000?logo=fastify&logoColor=white)](https://www.fastify.io/)

---

## 📋 Sobre o Projeto

**Mini E-commerce** é uma aplicação Full Stack desenvolvida como exercício acadêmico no **Instituto Federal Fluminense (IFF) - 5° Período - Desenvolvimento Web II**. O projeto implementa um sistema completo de gestão de produtos e usuários com autenticação segura baseada em JWT.

A aplicação demonstra boas práticas de desenvolvimento web moderno, incluindo:

- ✅ Arquitetura em camadas no backend (Routes → Controllers → Services → Repositories)
- ✅ Componentização no frontend (React + TypeScript)
- ✅ Autenticação e autorização baseada em roles
- ✅ Persistência de dados com ORM (Prisma)
- ✅ Deploy em produção (Render)
- ✅ Responsividade em dispositivos móveis

---

## � Tecnologias Utilizadas

### Frontend

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6+-F23524?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1+-5A29E4?logo=axios&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide%20React-Icons-E55F00?logo=lucide&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-5+-000000?logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.8+-2D3748?logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000)
![bcryptjs](https://img.shields.io/badge/bcryptjs-Password%20Hashing-4169E1)

### Banco de Dados & Deploy

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deploy-46E3B7?logo=render&logoColor=white)

---

## ✨ Funcionalidades Implementadas

### 📦 CRUD de Produtos

- ✅ **Listar produtos** — Visualizar todos os produtos com filtros
- ✅ **Criar produto** — Cadastrar novo produto (admin)
- ✅ **Editar produto** — Atualizar dados do produto (admin)
- ✅ **Deletar produto** — Remover produto do sistema (admin)
- ✅ **Preview de imagem** — Visualizar imagem por URL em tempo real
- ✅ **Campos**: id, nome, descrição, preço, estoque, categoria, imageUrl, ativo

### 👥 CRUD de Usuários

- ✅ **Listar usuários** — Visualizar todos os usuários registrados (admin)
- ✅ **Criar usuário** — Cadastrar novo usuário (admin)
- ✅ **Editar usuário** — Atualizar dados do usuário (admin)
- ✅ **Deletar usuário** — Remover usuário do sistema (admin)
- ✅ **Ativar/Desativar** — Toggle de status do usuário
- ✅ **Campos**: id, nome, email, senha (hash bcryptjs), perfil (admin/customer), ativo

### 🔐 Autenticação & Autorização (BÔNUS)

- ✅ **Login com JWT** — Autenticação segura com tokens JWT (24h)
- ✅ **Registro de usuário** — Novo usuário com hash de senha
- ✅ **Rotas protegidas** — ProtectedRoute redireciona usuários não autenticados
- ✅ **Autorização por role** — Botões de editar/deletar visíveis apenas para admin
- ✅ **Persistência** — Token armazenado em localStorage
- ✅ **Interceptor Axios** — Automaticamente adiciona Authorization header
- ✅ **Admin automático** — Criação de usuário admin padrão ao iniciar servidor
- ✅ **Logout** — Limpeza de token e estado

### 🎨 Interface Responsiva

- ✅ Desktop (1200px+) — Layout completo com tabelas
- ✅ Tablet (768px+) — Cards com scrolling horizontal
- ✅ Mobile (320px+) — Cards em coluna única
- ✅ Dark mode ready — Estrutura para suporte a temas

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js v20+
- npm ou yarn
- Git

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/marialuisasanches/mini-ecommerce.git
cd mini-ecommerce
```

### 2️⃣ Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Executar migrations do Prisma
npm run prisma:migrate

# (Opcional) Rodar seed do admin
npm run seed

# Iniciar servidor de desenvolvimento
npm run dev
```

**O backend estará disponível em:** `http://localhost:3001`

### 3️⃣ Configurar Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

**O frontend estará disponível em:** `http://localhost:5173`

### 4️⃣ Acessar a Aplicação

1. Abra o navegador em `http://localhost:5173`
2. Faça login com:
   - **Email:** `admin@admin.com`
   - **Senha:** `admin123`
3. Explore os CRUDs de produtos e usuários

---

## ⚙️ Variáveis de Ambiente

### Backend (`.env`)

```env
# Banco de Dados
DATABASE_URL=file:./dev.db

# JWT
JWT_SECRET=dev_secret
JWT_EXPIRES_IN_SECONDS=86400

# Server
PORT=3001
```

### Frontend (`.env`)

Frontend usa a variável padrão do Vite:

```env
VITE_API_URL=http://localhost:3001/api/v1
```

---

## 📡 Endpoints da API

### Base URL

- **Desenvolvimento:** `http://localhost:3001/api/v1`
- **Produção:** `https://mini-ecommerce-backend-l1pc.onrender.com/api/v1`

### 🔐 Autenticação

| Método | Endpoint         | Descrição              | Auth |
| ------ | ---------------- | ---------------------- | ---- |
| POST   | `/auth/register` | Registrar novo usuário | ❌   |
| POST   | `/auth/login`    | Fazer login            | ❌   |

**Exemplo - Registrar:**

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Exemplo - Login:**

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "admin123"
  }'
```

**Response:**

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-here",
      "name": "Admin",
      "email": "admin@admin.com",
      "role": "admin"
    }
  }
}
```

### 📦 Produtos

| Método | Endpoint        | Descrição     | Auth | Role  |
| ------ | --------------- | ------------- | ---- | ----- |
| GET    | `/products`     | Listar todos  | ✅   | -     |
| POST   | `/products`     | Criar produto | ✅   | admin |
| PUT    | `/products/:id` | Atualizar     | ✅   | admin |
| DELETE | `/products/:id` | Deletar       | ✅   | admin |

**Exemplo - Criar Produto:**

```bash
curl -X POST http://localhost:3001/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Produto XYZ",
    "description": "Descrição detalhada",
    "price": 99.99,
    "stock": 50,
    "category": "Eletrônicos",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

**Response:**

```json
{
  "data": {
    "id": "uuid-here",
    "name": "Produto XYZ",
    "description": "Descrição detalhada",
    "price": 99.99,
    "stock": 50,
    "category": "Eletrônicos",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2026-05-13T10:30:00Z"
  }
}
```

### 👥 Usuários

| Método | Endpoint     | Descrição     | Auth | Role  |
| ------ | ------------ | ------------- | ---- | ----- |
| GET    | `/users`     | Listar todos  | ✅   | -     |
| POST   | `/users`     | Criar usuário | ✅   | admin |
| PUT    | `/users/:id` | Atualizar     | ✅   | admin |
| DELETE | `/users/:id` | Deletar       | ✅   | admin |

**Exemplo - Criar Usuário:**

```bash
curl -X POST http://localhost:3001/api/v1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "customer"
  }'
```

**Response:**

```json
{
  "data": {
    "id": "uuid-here",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "customer",
    "ativo": true,
    "createdAt": "2026-05-13T10:30:00Z"
  }
}
```

---

## 🔑 Credenciais Padrão

### Usuário Admin (criado automaticamente)

| Campo      | Valor             |
| ---------- | ----------------- |
| **Email**  | `admin@admin.com` |
| **Senha**  | `admin123`        |
| **Perfil** | Admin             |

Este usuário é criado automaticamente quando o servidor inicia pela primeira vez.

---

## 📸 Screenshots

### Tela de Login

```
[Adicionar screenshot da tela de login com design premium]
```

### Dashboard de Produtos

```
[Adicionar screenshot da listagem de produtos]
```

### Dashboard de Usuários

```
[Adicionar screenshot da listagem de usuários]
```

### Criar/Editar Produto

```
[Adicionar screenshot do formulário de produto]
```

### Criar/Editar Usuário

```
[Adicionar screenshot do formulário de usuário]
```

---

## ✅ Critérios de Avaliação Atendidos

### Requisitos Obrigatórios

- ✅ **CRUD Completo de Produtos** — Create, Read, Update, Delete funcionando
- ✅ **CRUD Completo de Usuários** — Create, Read, Update, Delete funcionando
- ✅ **Backend em Node.js + Fastify** — API RESTful com TypeScript
- ✅ **Frontend em React** — Interface responsiva com componentes reutilizáveis
- ✅ **Banco de Dados Relacional** — PostgreSQL com Prisma ORM
- ✅ **Persistência de Dados** — Migrations e seed automático
- ✅ **Deploy em Produção** — Frontend e Backend no Render

### Bônus Implementados

- ✅ **Autenticação com JWT** — Login e registro seguro
- ✅ **Hash de Senha** — bcryptjs com salt 10
- ✅ **Rotas Protegidas** — ProtectedRoute e middleware de autenticação
- ✅ **Autorização por Role** — Admin vs Customer
- ✅ **Interface Responsiva** — Mobile, Tablet, Desktop
- ✅ **Componentes Reutilizáveis** — shadcn/ui + componentes customizados
- ✅ **Validação de Formulários** — Zod no backend, validação client no frontend
- ✅ **Interceptor Axios** — Token JWT automaticamente adicionado
- ✅ **Tratamento de Erros** — Mensagens claras para o usuário
- ✅ **Admin Padrão Automático** — Criado ao iniciar servidor
- ✅ **Design Premium** — Gradientes, animações, sombras e efeitos visuais

---

## 📚 Estrutura de Pastas

```
mini-ecommerce/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/
│   │   │   ├── authenticate.ts
│   │   │   ├── authorize.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validateSchema.ts
│   │   ├── repositories/
│   │   │   ├── productRepository.ts
│   │   │   └── userRepository.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── schemas/
│   │   │   ├── authSchema.ts
│   │   │   ├── productSchema.ts
│   │   │   └── userSchema.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   └── userService.ts
│   │   ├── types/
│   │   │   ├── product.ts
│   │   │   └── user.ts
│   │   ├── utils/
│   │   │   ├── appError.ts
│   │   │   ├── prismaClient.ts
│   │   │   └── response.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests/
│   │   ├── fixtures/
│   │   ├── integration/
│   │   └── unit/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── AppShell.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductsDashboard.tsx
│   │   │   │   ├── ProductTable.tsx
│   │   │   │   ├── ProductFormDialog.tsx
│   │   │   │   └── DeleteProductDialog.tsx
│   │   │   ├── users/
│   │   │   │   ├── UsersDashboard.tsx
│   │   │   │   ├── UserTable.tsx
│   │   │   │   ├── UserFormDialog.tsx
│   │   │   │   └── DeleteUserDialog.tsx
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── ...
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useProducts.ts
│   │   │   └── useUsers.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── UsersPage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   └── userService.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── types/
│   │   │   ├── product.ts
│   │   │   └── user.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── formatCurrency.ts
│   │   │   └── formatDate.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── DOC/
│   ├── geral.md
│   ├── spec.md
│   ├── sprintLogin.md
│   ├── sprintProdutos.md
│   └── sprintUsuarios.md
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev              # Iniciar servidor em modo watch
npm run build           # Compilar TypeScript
npm run start           # Iniciar servidor compilado
npm run test            # Rodar testes unitários
npm run test:watch      # Rodar testes em modo watch
npm run lint            # Verificar linting
npm run format          # Formatar código
npm run prisma:migrate  # Executar migrations
npm run prisma:push     # Push schema para DB
npm run seed            # Rodar seed (admin user)
```

### Frontend

```bash
npm run dev             # Iniciar servidor de desenvolvimento
npm run build           # Build para produção
npm run preview         # Preview do build
npm run lint            # Verificar linting
npm run format          # Formatar código
```

---

## 🚢 Deploy em Produção

### Frontend (Render)

1. Fazer push para GitHub
2. Conectar repositório no Render
3. Configurar:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run preview`
4. Deploy automático a cada push

### Backend (Render)

1. Fazer push para GitHub
2. Conectar repositório no Render
3. Configurar:
   - **Build Command:** `npm run build && npm run prisma:migrate`
   - **Start Command:** `npm run start`
4. Adicionar variáveis de ambiente:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN_SECONDS`
5. Deploy automático a cada push

---

## 🐛 Troubleshooting

### Backend não conecta ao banco

```bash
# Verifique se DATABASE_URL está correto
npm run prisma:migrate
```

### Token JWT expirado

- Padrão: 24 horas
- Modifique `JWT_EXPIRES_IN_SECONDS` no `.env`

### CORS error no frontend

- Verifique se `@fastify/cors` está instalado
- Backend deve ter CORS habilitado

### Componentes UI não aparecem

- Verifique se `shadcn/ui` está instalado
- Execute: `npx shadcn-ui@latest init`

---

## 📖 Documentação Adicional

- [Sprint Produtos](./DOC/sprintProdutos.md) — Detalhes da implementação CRUD produtos
- [Sprint Usuários](./DOC/sprintUsuarios.md) — Detalhes da implementação CRUD usuários
- [Sprint Autenticação](./DOC/sprintLogin.md) — Detalhes da implementação JWT
- [Especificação](./DOC/spec.md) — Especificação geral do projeto
- [Documentação Geral](./DOC/geral.md) — Documentação do projeto

---

## 📝 Licença

Este projeto é um exercício acadêmico e está sob licença **MIT**.

---

## 👤 Autor

**Maria Luísa Sanches**

- GitHub: [@marialuisasanches](https://github.com/marialuisasanches)
- Instituição: Instituto Federal Fluminense (IFF)
- Disciplina: Desenvolvimento Web II
- Período: 5º período

---

## 🙏 Agradecimentos

- Instituto Federal Fluminense pela infraestrutura e apoio
- Comunidade open-source pelos projetos e documentação
- Frameworks e bibliotecas utilizadas

---

## 📞 Contato & Suporte

Para dúvidas ou sugestões sobre o projeto:

1. Abra uma [Issue](https://github.com/marialuisasanches/mini-ecommerce/issues)
2. Envie um Pull Request com melhorias
3. Entre em contato via GitHub

---

**Última atualização:** Maio de 2026

**Status:** ✅ Projeto completo e em produção
