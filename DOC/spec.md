# 📋 Specs SDD — Mini E-commerce MVP

Vou gerar as principais specs do projeto para você começar com uma base profissional de verdade.

---

# Spec: Cadastro de Produto

````md id="f8n2xp"
# Spec: Cadastro de Produto

---

# PRD — Product Requirements Document

## Objetivo

Permitir que administradores cadastrem novos produtos
no mini e-commerce através de um formulário integrado à API.

---

## Context / Problem

O sistema precisa permitir gerenciamento de produtos
para que itens possam ser exibidos na loja virtual.

Sem cadastro de produtos, não existe catálogo disponível.

---

## Product Scope

### In Scope

- cadastrar produto
- validar dados
- persistir no banco
- retornar confirmação

### Out of Scope

- upload real de imagem
- múltiplas categorias
- variações de produto

---

## Functional Requirements

| ID   | Prioridade | Descrição                    |
| ---- | ---------- | ---------------------------- |
| FR01 | shall      | Permitir cadastro de produto |
| FR02 | shall      | Validar campos obrigatórios  |
| FR03 | shall      | Persistir produto no banco   |
| FR04 | shall      | Retornar produto criado      |

---

## Business Rules

| ID   | Regra                         |
| ---- | ----------------------------- |
| BR01 | preço deve ser maior que zero |
| BR02 | estoque não pode ser negativo |
| BR03 | nome do produto é obrigatório |

---

## Acceptance Criteria

| ID   | Cenário                                                    |
| ---- | ---------------------------------------------------------- |
| AC01 | Dado produto válido, quando cadastrar, então retorna 201   |
| AC02 | Dado preço inválido, quando cadastrar, então retorna 400   |
| AC03 | Dado estoque negativo, quando cadastrar, então retorna 400 |

---

# TechSpec — Technical Specification

## Stack

| Camada   | Tecnologia         |
| -------- | ------------------ |
| Frontend | React + TypeScript |
| Backend  | Node.js + Fastify  |
| Banco    | SQLite             |
| ORM      | Prisma             |

---

# Backend

## Endpoint

```http
POST /api/v1/products
```
````

---

## Request Body

```json
{
  "name": "Notebook Gamer",
  "description": "RTX 4060",
  "price": 4999.9,
  "stock": 10,
  "category": "Eletrônicos",
  "imageUrl": "https://..."
}
```

---

## Responses

| Status | Descrição       |
| ------ | --------------- |
| 201    | Produto criado  |
| 400    | Dados inválidos |
| 500    | Erro interno    |

---

## Schema Prisma

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

---

## Lógica do Service

1. validar dados
2. verificar preço
3. verificar estoque
4. salvar no banco
5. retornar produto criado

---

# Frontend

## Componente Principal

`ProductForm.tsx`

---

## Campos

| Campo       | Tipo     | Validação   |
| ----------- | -------- | ----------- |
| name        | text     | obrigatório |
| description | textarea | obrigatório |
| price       | number   | > 0         |
| stock       | number   | >= 0        |
| category    | text     | obrigatório |

---

## Fluxo UI

1. usuário preenche formulário
2. formulário valida dados
3. frontend envia POST
4. loading state ativo
5. sucesso → toast
6. erro → mensagem

---

# Testes

## Unitários

- [ ] validar preço
- [ ] validar estoque
- [ ] criar produto válido

## Integração

- [ ] POST retorna 201
- [ ] POST retorna 400 inválido

## E2E

- [ ] fluxo completo de cadastro

````

---

# Spec: Listagem de Produtos

```md id="u3m7yk"
# Spec: Listagem de Produtos

---

# PRD

## Objetivo

Permitir visualização de todos os produtos cadastrados.

---

## Functional Requirements

| ID | Prioridade | Descrição |
|---|---|---|
| FR01 | shall | Listar produtos |
| FR02 | shall | Retornar lista JSON |
| FR03 | should | Ordenar por criação |

---

## Acceptance Criteria

| ID | Cenário |
|---|---|
| AC01 | Quando buscar produtos, então retorna array |
| AC02 | Quando não houver produtos, retorna array vazio |

---

# TechSpec

## Endpoint

```http
GET /api/v1/products
````

---

## Response

```json
[
  {
    "id": "uuid",
    "name": "Produto",
    "price": 100
  }
]
```

---

## Lógica

1. buscar produtos
2. ordenar desc
3. retornar lista

---

# Frontend

## Página

`ProductsPage.tsx`

---

## Componentes

- ProductCard
- ProductTable
- EmptyState

---

# Testes

- [ ] retorna lista
- [ ] retorna vazio

````

---

# Spec: Edição de Produto

```md id="v5r1np"
# Spec: Edição de Produto

---

# PRD

## Objetivo

Permitir atualização de produtos cadastrados.

---

## Functional Requirements

| ID | Descrição |
|---|---|
| FR01 | editar produto |
| FR02 | validar dados |
| FR03 | persistir atualização |

---

# TechSpec

## Endpoint

```http
PUT /api/v1/products/:id
````

---

## Regras

- produto precisa existir
- preço válido
- estoque válido

---

## Responses

| Status | Descrição      |
| ------ | -------------- |
| 200    | atualizado     |
| 404    | não encontrado |
| 400    | inválido       |

---

# Frontend

## Fluxo

1. abrir modal/form
2. editar dados
3. enviar PUT
4. atualizar lista

````

---

# Spec: Remoção de Produto

```md id="y9q4tc"
# Spec: Remoção de Produto

---

# PRD

## Objetivo

Permitir remoção de produtos do sistema.

---

# TechSpec

## Endpoint

```http
DELETE /api/v1/products/:id
````

---

## Regras

- produto deve existir

---

## Responses

| Status | Descrição      |
| ------ | -------------- |
| 204    | removido       |
| 404    | não encontrado |

---

# Frontend

## Fluxo

1. usuário clica remover
2. modal confirmação
3. DELETE API
4. atualizar lista
5. toast sucesso

```

```
