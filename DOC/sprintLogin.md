# 📅 Sprint — Autenticação & Autorização (Login)

> Implementação de autenticação JWT, autorização por perfil e integração frontend/backend

---

# 🚀 Sprint — Autenticação e Autorização

⏱️ Estimativa: 6–8 horas

## 🎯 Objetivo

Adicionar autenticação baseada em JWT (login/register), autorização por perfil (`admin` / `user`), middleware de autenticação no backend e contexto de autenticação no frontend. Proteger rotas sensíveis e condicionar a exibição de botões na UI com base no perfil.

---

## 🗂️ Escopo

Backend

- adicionar campos de senha em `User` (Prisma)
- rotas `POST /api/v1/auth/login` e `POST /api/v1/auth/register`
- middleware `authenticate.ts` e `authorize.ts`
- proteger rotas de produtos e usuários
- hash de senha com `bcryptjs`
- emissão de JWT com `jsonwebtoken`

Frontend

- página de login `LoginPage.tsx`
- `authService.ts` para chamadas de login/logout
- `AuthContext.tsx` e hook `useAuth()`
- `ProtectedRoute.tsx` para rotas protegidas
- axios interceptor para enviar token
- exibição condicional por `role`

---

## 🗄️ Banco de Dados (Prisma)

### Alteração no model `User`

Adicionar campo `password` no `schema.prisma` seguindo o padrão já existente:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String   @default("user")
  password  String
  ativo     Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

Após a alteração, rodar migration:

```bash
npx prisma migrate dev --name add_password_user
```

---

## 🔌 Backend — Endpoints

### Auth

POST `/api/v1/auth/register`

- body: `{ name, email, password, role? }`
- ações: validar com Zod, hashear senha com `bcryptjs`, criar usuário via `userService`
- response: `201` com usuário (sem senha) e `token`

POST `/api/v1/auth/login`

- body: `{ email, password }`
- ações: validar com Zod, buscar usuário, comparar senha com `bcryptjs.compare`, emitir JWT com `jsonwebtoken`
- response: `200` `{ success: true, data: { user, token } }`

---

### Produtos / Usuários (Protegidos)

Todas rotas de `products` e `users` devem usar o middleware `authenticate`.

- Rotas `DELETE` e `PUT` devem também usar `authorize(['admin'])`.
- Rotas `GET` podem ser acessadas por qualquer usuário autenticado.

Exemplos:

```ts
// backend/src/routes/productRoutes.ts
fastify.get(
  "/api/v1/products",
  { preHandler: [authenticate] },
  productController.list,
);
fastify.delete(
  "/api/v1/products/:id",
  { preHandler: [authenticate, authorize(["admin"])] },
  productController.remove,
);
```

---

## 🧩 Middleware

### `authenticate.ts`

- Extrai token do header `Authorization: Bearer <token>`
- Verifica token com `jwt.verify` usando `process.env.JWT_SECRET`
- Anexa `request.user = { id, email, role }` ao objeto de requisição
- Em caso de falha, retorna `401` com formato de erro padrão

### `authorize.ts`

- Função factory `authorize(allowedRoles: string[])`
- Verifica `request.user.role` e retorna `403` se não autorizado

---

## ✅ Validações (Zod)

- `auth/schemas.ts` com `registerSchema` e `loginSchema`
- `userSchema` permanece compatível, adicionar validação de `password` para `register`

Exemplo `registerSchema`:

```ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]).optional(),
});
```

---

## 🧾 Formato de Token (JWT)

Payload mínimo:

```json
{
  "sub": "<userId>",
  "email": "user@example.com",
  "role": "admin",
  "iat": 0,
  "exp": 0
}
```

TTL recomendado: 7 dias (ou configurar `JWT_EXPIRES_IN`)

---

## 🧰 Arquitetura / Nomenclatura

- routes → controllers → services → repositories (mesmo padrão do projeto)
- nomes de arquivos:
  - `backend/src/routes/authRoutes.ts`
  - `backend/src/controllers/authController.ts`
  - `backend/src/services/authService.ts`
  - `backend/src/schemas/authSchema.ts`
  - `backend/src/middleware/authenticate.ts`
  - `backend/src/middleware/authorize.ts`

---

## 🔁 Fluxo (Register)

1. Frontend envia `POST /api/v1/auth/register` com `name, email, password, role?`
2. `authController.register` valida dados via Zod
3. `authService.register` hasheia senha e chama `userRepository.create`
4. Usuário criado no banco
5. `authService` emite JWT e retorna `{ user, token }`

## 🔁 Fluxo (Login)

1. Frontend envia `POST /api/v1/auth/login` com `email, password`
2. `authController.login` valida via Zod
3. `authService.login` busca usuário e compara senha
4. Se OK, emite JWT e retorna `{ user, token }`

---

## 🔒 Frontend — Implementação

Arquivos a criar/alterar (frontend):

- `frontend/src/pages/LoginPage.tsx`
- `frontend/src/services/authService.ts`
- `frontend/src/context/AuthContext.tsx` (ou `AuthProvider.tsx`)
- `frontend/src/hooks/useAuth.tsx`
- `frontend/src/components/ProtectedRoute.tsx`
- configurar `src/services/api.ts` com axios interceptor para enviar token

### `authService.ts`

- `login(credentials)`: POST `/api/v1/auth/login` → salvar token e user retornado
- `logout()`: limpar `localStorage` e contexto

### `AuthContext` / `useAuth()`

- estado: `{ user: User | null, token: string | null, login, logout }`
- ao iniciar app, carregar `token` de `localStorage`, validar (opcional) e buscar `me` (opcional)

### `ProtectedRoute.tsx`

- Componente que verifica `useAuth().user`; se null, redireciona para `/login`

### Exibição condicional

- Em componentes `ProductTable`, `UserTable` e formulários, usar `const { user } = useAuth()` e checar `user.role === 'admin'` para mostrar botões Edit/Delete/Ativar

---

## 🔗 Integração Axios (Interceptor)

No `frontend/src/services/api.ts`:

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token)
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});
```

---

## 🧪 Testes / Verificações

- Testar `register` cria usuário com senha hasheada
- Testar `login` retorna token válido
- Testar rota protegida sem token → `401`
- Testar rota protegida com token sem role → `403` nas rotas admin
- Testar exibição condicional no frontend

---

## 📁 Lista de arquivos a criar/alterar (resumo)

- backend/prisma/schema.prisma — adicionar `password` no model `User`
- backend/src/routes/authRoutes.ts — criar
- backend/src/controllers/authController.ts — criar
- backend/src/services/authService.ts — criar
- backend/src/schemas/authSchema.ts — criar
- backend/src/middleware/authenticate.ts — criar
- backend/src/middleware/authorize.ts — criar
- backend/src/utils/appError.ts — reutilizar formato de erro padrão
- backend/src/repositories/userRepository.ts — garantir funções `findByEmail`, `create`, `update`, `remove` (usar o padrão existente)

- frontend/src/pages/LoginPage.tsx — criar
- frontend/src/services/authService.ts — crear
- frontend/src/context/AuthContext.tsx — criar
- frontend/src/hooks/useAuth.ts — criar
- frontend/src/components/ProtectedRoute.tsx — criar
- frontend/src/services/api.ts — adicionar interceptor

---

## ✅ Commits sugeridos (padrão do projeto)

- `feat(auth): add register and login routes with JWT`
- `feat(auth): add authenticate and authorize middleware`
- `feat(frontend): add AuthContext and LoginPage`
- `fix(security): hash user passwords with bcryptjs`

---

## ✅ Comandos para rodar após implementação

Instalar dependências backend:

```bash
cd backend
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

Rodar migration:

```bash
npx prisma migrate dev --name add_password_user
```

Instalar dependências frontend (se necessário):

```bash
cd frontend
npm install
```

Executar ambos os projetos em modo dev:

```bash
# na raiz (scripts já existentes)
npm run dev:backend
npm run dev:frontend
```

---

## ✅ Resultado esperado desta Sprint

- Usuários podem registrar e autenticar via JWT
- Rotas protegidas por middleware de autenticação
- Autorização por perfil para ações sensíveis
- Frontend com contexto de auth, rota protegida e exibição condicional

---

## Referências rápidas

- Padrões de projeto: [DOC/geral.md](DOC/geral.md)
- Specs técnicas: [DOC/spec.md](DOC/spec.md)
- Sprints relacionadas: [DOC/sprintProdutos.md](DOC/sprintProdutos.md), [DOC/sprintUsuarios.md](DOC/sprintUsuarios.md)
  Meu projeto é um Mini E-Commerce full-stack com:

- Backend: Node.js + TypeScript + Fastify + Prisma + SQLite
- Frontend: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- Deploy: Render (backend)
- Repositório: https://github.com/marialuisasanches/mini-ecommerce

Preciso implementar TUDO abaixo em ordem. Me dê o código completo de cada arquivo alterado ou criado.

---

## 1. AUTENTICAÇÃO COM JWT

### Backend:

- Instalar: `jsonwebtoken`, `bcryptjs` e seus @types
- Adicionar campo `password` no model User do schema.prisma
- Criar migration: `npx prisma migrate dev --name add_password_user`
- Criar rota POST `/api/v1/auth/login` que recebe `email` e `password`, valida com bcrypt e retorna JWT
- Criar rota POST `/api/v1/auth/register` que cria usuário com senha hasheada
- Criar middleware `authenticate.ts` que valida o JWT no header `Authorization: Bearer <token>`
- Proteger todas as rotas de produtos e usuários com esse middleware

### Frontend:

- Criar página `LoginPage.tsx` com formulário de email e senha
- Criar `authService.ts` com funções `login()` e `logout()`
- Criar `AuthContext.tsx` com contexto de autenticação (user, token, login, logout)
- Salvar token no localStorage
- Criar `ProtectedRoute.tsx` que redireciona para /login se não autenticado
- Adicionar axios interceptor para enviar o token em todas as requisições

---

## 2. AUTORIZAÇÃO POR PERFIL (admin/user)

### Backend:

- Criar middleware `authorize.ts` que recebe roles permitidas e verifica o perfil do usuário no JWT
- Rotas de DELETE e PUT de usuários: apenas `admin`
- Rotas de DELETE e PUT de produtos: apenas `admin`
- Rotas de GET: qualquer usuário autenticado

### Frontend:

- Esconder botões de Editar/Deletar/Ativar para usuários com perfil `user`
- Mostrar esses botões apenas para `admin`
- Criar hook `useAuth()` para acessar o contexto de autenticação
- Exibir nome e perfil do usuário logado no header

---

## 3. BUSCA E FILTRO

### Backend:

- Atualizar rota GET `/api/v1/products` para aceitar query params: `search`, `category`, `ativo`
- Atualizar rota GET `/api/v1/users` para aceitar query params: `search`, `role`, `ativo`
- Implementar filtros no repository usando Prisma `where` com `contains` (case insensitive)

### Frontend:

- Já existe busca no frontend, garantir que está chamando a API com os query params corretos
- Adicionar filtro por `ativo` (Todos / Ativos / Inativos) nos dashboards de produtos e usuários

---

## 4. PAGINAÇÃO

### Backend:

- Atualizar rotas GET de produtos e usuários para aceitar `page` (default: 1) e `limit` (default: 10)
- Retornar junto com os dados: `total`, `page`, `limit`, `totalPages`
- Exemplo de response:
  {
  "success": true,
  "data": [...],
  "pagination": {
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
  }
  }

### Frontend:

- Adicionar componente `Pagination.tsx` com botões Anterior/Próximo e indicador de página
- Atualizar hooks `useProducts` e `useUsers` para gerenciar estado de paginação
- Resetar para página 1 quando aplicar filtros

---

## 5. UPLOAD DE IMAGEM DO PRODUTO

### Backend:

- Instalar: `@fastify/multipart`
- Criar rota POST `/api/v1/upload` que recebe um arquivo de imagem
- Salvar a imagem na pasta `uploads/` do backend
- Servir arquivos estáticos da pasta `uploads/` via `@fastify/static`
- Retornar a URL pública da imagem salva
- Limitar tamanho máximo: 5MB
- Aceitar apenas: jpg, jpeg, png, webp

### Frontend:

- Atualizar `ProductFormDialog.tsx` para ter duas opções no campo de imagem:
  1. Input de URL (já existe)
  2. Botão "Fazer Upload" que abre seletor de arquivo
- Ao selecionar arquivo, fazer POST para `/api/v1/upload` e preencher o campo imageUrl com a URL retornada
- Mostrar preview da imagem em ambos os casos

---

## IMPORTANTE:

- Me dê o código completo de CADA arquivo que precisa ser criado ou alterado
- Mantenha a estrutura de pastas existente do projeto
- Use os mesmos padrões de código já existentes (Clean Architecture, Zod, error handling centralizado)
- Após cada seção, me diga quais comandos rodar (npm install, migrations, etc)
- Não quebre nenhuma funcionalidade existente
