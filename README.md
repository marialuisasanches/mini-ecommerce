# Mini E-commerce

Sistema full stack para gerenciamento de produtos de uma loja online, com backend em Fastify, Prisma e SQLite, e frontend em React, Vite, TailwindCSS e uma UI no estilo shadcn/ui.

## Visão geral

O projeto implementa o fluxo completo de CRUD de produtos com validação forte, tratamento global de erros e interface responsiva para operação diária de catálogo.

### Stack

- Backend: Node.js, TypeScript, Fastify, Prisma, SQLite, Zod
- Frontend: React, TypeScript, Vite, TailwindCSS, shadcn/ui, React Hook Form, Zod
- Testes: Vitest, Supertest

## Arquitetura

### Backend

Estrutura em camadas:

- `routes`
- `controllers`
- `services`
- `repositories`
- `schemas`
- `middleware`
- `utils`

### Frontend

Estrutura modular com:

- `components`
- `pages`
- `services`
- `hooks`
- `types`
- `utils`

## Estrutura do projeto

```txt
mini-ecommerce/
├── backend/
│   ├── prisma/
│   ├── src/
│   └── tests/
├── frontend/
│   ├── src/
│   └── index.html
└── DOC/
```

## Requisitos

- Node.js 20+ recomendado
- npm 10+

## Configuração

### 1. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

### 2. Variáveis de ambiente

Copie os exemplos abaixo:

- `backend/.env.example` para `backend/.env`
- `frontend/.env.example` para `frontend/.env`

### 3. Prisma

Gerar o client e aplicar o schema no SQLite:

```bash
npm run prisma:generate --workspace backend
npm run prisma:push --workspace backend
```

## Como executar

### Backend

```bash
npm run dev:backend
```

O servidor sobe em `http://localhost:3001`.

### Frontend

```bash
npm run dev:frontend
```

O frontend roda com Vite e consome a API via `VITE_API_BASE_URL`.

## Scripts principais

### Raiz

- `npm run dev:backend`
- `npm run dev:frontend`
- `npm run build:backend`
- `npm run build:frontend`
- `npm run test:backend`

### Backend

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run prisma:generate`
- `npm run prisma:push`

### Frontend

- `npm run dev`
- `npm run build`
- `npm run preview`

## API

As rotas de produtos ficam disponíveis nas duas variações abaixo para facilitar integração e versionamento:

- `/products`
- `/api/v1/products`

### Endpoints

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

### Exemplo de payload

```json
{
  "name": "Notebook Gamer",
  "description": "RTX 4060",
  "price": 4999.9,
  "stock": 10,
  "category": "Eletronicos",
  "imageUrl": "https://example.com/image.png"
}
```

### Resposta de erro padronizada

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Produto nao encontrado",
    "details": "Nenhum produto encontrado com o ID informado"
  }
}
```

## Testes

O backend possui:

- testes unitarios de service
- testes de integracao das rotas

Executar:

```bash
npm run test:backend
```

## Decisões técnicas

- SQLite foi adotado por simplicidade, velocidade de setup e aderencia ao MVP.
- Prisma foi usado para manter tipagem forte e acesso previsivel ao banco.
- O backend foi separado em camadas para manter a regra de negocio isolada da camada HTTP.
- O frontend utiliza componentes reutilizáveis no estilo shadcn/ui para consistencia visual e manutencao.

## Funcionalidades entregues

- cadastro de produto
- listagem de produtos
- edição de produto
- remoção de produto
- validações com Zod
- tratamento global de erros
- dashboard responsivo
- loading states
- toasts de sucesso e erro
