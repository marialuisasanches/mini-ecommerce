# 📅 Sprints — Mini E-commerce MVP

> Projeto Full Stack com Node.js + Fastify + React + TypeScript + Prisma + SQLite

---

# 🚀 Sprint 1 — Backend Foundation

⏱️ Estimativa: 5–6 horas

## 🎯 Objetivo

Construir toda a estrutura do backend:

- Fastify
- Prisma
- SQLite
- CRUD de produtos
- validações
- tratamento global de erros

---

## 📦 Setup do Projeto

- [ ] Criar pasta `backend`
- [ ] Executar `npm init -y`
- [ ] Instalar TypeScript
- [ ] Configurar `tsconfig.json`
- [ ] Instalar Fastify
- [ ] Instalar Prisma
- [ ] Configurar SQLite
- [ ] Criar scripts npm

---

## 🏗️ Estrutura do Backend

- [ ] Criar estrutura de pastas
- [ ] Configurar aliases
- [ ] Configurar ESLint
- [ ] Configurar Prettier

### Estrutura esperada

```txt
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── schemas/
│   ├── middleware/
│   ├── utils/
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
```

---

## 🗄️ Banco de Dados

- [ ] Inicializar Prisma
- [ ] Criar model `Product`
- [ ] Rodar migration
- [ ] Testar conexão banco

### Model Product

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

## 📦 CRUD Produtos

### Create

- [ ] POST `/products`

### Read

- [ ] GET `/products`
- [ ] GET `/products/:id`

### Update

- [ ] PUT `/products/:id`

### Delete

- [ ] DELETE `/products/:id`

---

## ✅ Validações

- [ ] Validar nome obrigatório
- [ ] Validar preço maior que zero
- [ ] Validar estoque >= 0
- [ ] Validar body com Zod

---

## 🚨 Tratamento de Erros

- [ ] Middleware global de erro
- [ ] Erros padronizados
- [ ] Status HTTP corretos

### Exemplo de resposta

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Produto não encontrado"
  }
}
```

---

## 🧪 Testes

- [ ] Testar criação produto
- [ ] Testar listagem
- [ ] Testar produto inválido

---

## ✅ Resultado esperado da Sprint 1

- API REST funcionando
- CRUD completo
- SQLite integrado
- Prisma funcionando
- Estrutura profissional

---

# 🎨 Sprint 2 — Frontend & Integração

⏱️ Estimativa: 7–8 horas

## 🎯 Objetivo

Criar interface moderna e integrar frontend ao backend.

---

## ⚛️ Setup Frontend

- [ ] Criar projeto Vite
- [ ] Configurar React + TypeScript
- [ ] Configurar TailwindCSS
- [ ] Configurar shadcn/ui
- [ ] Configurar aliases

---

## 🧱 Estrutura Frontend

- [ ] Criar páginas
- [ ] Criar components
- [ ] Criar services API
- [ ] Criar types

### Estrutura esperada

```txt
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
```

---

## 🎨 Layout

### Dashboard

- [ ] Header
- [ ] Navbar
- [ ] Área principal

### Produtos

- [ ] ProductCard
- [ ] ProductTable
- [ ] ProductForm

---

## 🔗 Integração API

- [ ] Configurar Axios
- [ ] GET produtos
- [ ] POST produto
- [ ] PUT produto
- [ ] DELETE produto

---

## 🧠 Estados da UI

- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Toasts sucesso/erro

---

## 📱 Responsividade

- [ ] Mobile
- [ ] Tablet
- [ ] Desktop

---

## ✨ UX

- [ ] Feedback visual nos botões
- [ ] Formulário validado
- [ ] Modal de confirmação delete
- [ ] Inputs organizados

---

## ✅ Resultado esperado da Sprint 2

- Frontend bonito
- CRUD visual funcionando
- Integração completa
- UI responsiva

---

# 🚀 Sprint 3 — Finalização & Deploy

⏱️ Estimativa: 2–3 horas

## 🎯 Objetivo

Finalizar projeto para entrega profissional.

---

## 📘 README

- [ ] Descrição projeto
- [ ] Tecnologias
- [ ] Instalação
- [ ] Variáveis ambiente
- [ ] Como rodar
- [ ] Screenshots

---

## 🧹 Refatoração

- [ ] Remover código morto
- [ ] Revisar nomes
- [ ] Revisar imports
- [ ] Revisar componentes

---

## 🧪 Revisão Final

- [ ] Testar CRUD completo
- [ ] Testar responsividade
- [ ] Testar erros
- [ ] Testar banco

---

## 🌍 Deploy

### Frontend

- [ ] Deploy Vercel

### Backend

- [ ] Deploy Render
      ou
- [ ] Deploy Railway

---

## 🎥 Extras (Opcional)

- [ ] GIF demo
- [ ] vídeo rápido
- [ ] dark mode

---

# 🏁 Resultado Final Esperado

Ao final das sprints o projeto deverá possuir:

- [x] API REST profissional
- [x] CRUD completo
- [x] React + TypeScript
- [x] Prisma ORM
- [x] SQLite
- [x] UI moderna
- [x] Responsividade
- [x] README profissional
- [x] Deploy online

---

# 🔥 Ordem Recomendada

## DIA 1

### Manhã

- Sprint 1 Backend

### Noite

- Integração inicial frontend

---

## DIA 2

### Manhã

- Finalizar frontend

### Tarde

- README
- Deploy
- Revisão final
