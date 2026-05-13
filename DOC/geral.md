# Mini E-commerce — Planejamento Técnico Completo

---

# 🎯 VISÃO GERAL

## Informações do Projeto

Produto:
Mini E-commerce

Tipo:
Full Stack (Backend + Frontend + Banco de Dados)

Prazo:
2 dias

Nível:
Iniciante

Problema resolvido:
Permitir que usuários cadastrem, visualizem,
editem e removam produtos de uma loja online
através de uma interface web integrada a uma API REST.

---

# ⚡ STACK TECNOLÓGICA

## Backend

- Node.js
- TypeScript
- Fastify

## Frontend

- React
- TypeScript
- Vite
- shadcn/ui

## Banco

- SQLite

## ORM

- Prisma

---

# 🗄️ BANCO DE DADOS

## Banco escolhido

SQLite

## Justificativa

Banco leve, simples e sem necessidade
de configuração complexa.

Ideal para:

- MVPs
- testes técnicos
- desenvolvimento rápido
- foco total na implementação

---

# 🔌 ORM

## Decisão

Prisma ORM

## Justificativa

- produtividade alta
- integração excelente com TypeScript
- migrations automáticas
- tipagem forte
- facilidade para iniciantes

---

# 🏗️ ARQUITETURA

## Backend

Arquitetura em camadas com Service Layer

### Estrutura

backend/
├── src/
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── schemas/
│ ├── database/
│ ├── middleware/
│ ├── utils/
│ └── server.ts
│
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── tests/
├── package.json
└── tsconfig.json

---

## Frontend

React modular simplificado

### Estrutura

frontend/
├── src/
│ ├── components/
│ │ ├── ui/
│ │ └── layout/
│ │
│ ├── pages/
│ │ ├── Dashboard/
│ │ ├── Products/
│ │ └── CreateProduct/
│ │
│ ├── services/
│ ├── hooks/
│ ├── lib/
│ ├── types/
│ ├── utils/
│ ├── App.tsx
│ └── main.tsx
│
├── public/
├── package.json
└── vite.config.ts

---

# 📐 PADRÕES DE CÓDIGO

## Convenções

### camelCase

- funções
- variáveis
- services
- controllers

### PascalCase

- componentes React

### UPPER_SNAKE_CASE

- constantes

---

## Ferramentas

### Backend

- ESLint
- Prettier
- Zod

### Frontend

- ESLint
- Prettier
- React Hook Form
- Zod

---

## Organização de Imports

1. bibliotecas externas
2. módulos internos
3. imports relativos

---

## Regras de Código Limpo

- funções pequenas
- responsabilidade única
- evitar duplicação
- nomes descritivos
- tipagem forte
- evitar any

---

# 🧪 ESTRATÉGIA DE TESTES

## Tipos de Teste

### Unitários

- services
- validações

### Integração

- rotas da API
- banco de dados

### Frontend

- testes manuais

---

## Ferramentas

- Vitest
- Supertest

---

## Cobertura

### Meta

- ≥ 80% nos services

### Fluxos obrigatórios

- criação de produto
- listagem
- edição
- remoção

---

## Estrutura

tests/
├── unit/
├── integration/
└── fixtures/

---

# 🚨 TRATAMENTO DE ERROS

## Hierarquia

ApplicationError
├── ValidationError
├── NotFoundError
├── ConflictError
└── DatabaseError

---

## Formato padrão

{
"error": {
"code": "PRODUCT_NOT_FOUND",
"message": "Produto não encontrado",
"details": "Nenhum produto encontrado com o ID informado"
}
}

---

## Logging

### Ferramenta

Pino Logger

### Estratégia

- logs estruturados
- middleware global
- respostas padronizadas

### Não logar

- senhas
- tokens
- dados sensíveis

---

# 📅 ROADMAP

## Sprint 1 — Backend Foundation

### Objetivos

- setup backend
- Prisma
- SQLite
- CRUD produtos
- validações
- testes básicos

### Tarefas

- inicializar projeto
- configurar TypeScript
- configurar Fastify
- configurar Prisma
- criar model Product
- criar rotas CRUD
- criar middleware de erro

---

## Sprint 2 — Frontend

### Objetivos

- dashboard
- integração API
- CRUD visual
- responsividade

### Tarefas

- setup Vite
- setup shadcn/ui
- criar páginas
- criar formulário
- integração Axios
- loading states
- toasts

---

## Sprint 3 — Finalização

### Objetivos

- README
- deploy
- revisão final

### Tarefas

- documentação
- refatoração
- deploy frontend
- deploy backend

---

# 📦 FUNCIONALIDADES MVP

## Produtos

- criar produto
- listar produtos
- editar produto
- remover produto

---

## Campos do Produto

| Campo       | Tipo     |
| ----------- | -------- |
| id          | UUID     |
| name        | string   |
| description | string   |
| price       | float    |
| stock       | integer  |
| category    | string   |
| imageUrl    | string   |
| createdAt   | datetime |

---

# 🎨 FRONTEND MVP

## Telas

- Dashboard
- Lista de Produtos
- Cadastro de Produto
- Editar Produto

---

## Componentes

- Navbar
- Sidebar (opcional)
- ProductCard
- ProductTable
- ProductForm
- ConfirmDeleteModal

---

# 🔥 DIFERENCIAIS DO PROJETO

## Técnicos

- TypeScript full stack
- Prisma ORM
- arquitetura em camadas
- validação com Zod
- tratamento global de erros

## Visuais

- UI moderna
- responsividade
- feedback visual
- loading states
- toasts

## Profissionais

- README completo
- estrutura escalável
- código organizado
- separação de responsabilidades
