# 📅 Sprint — CRUD de Usuários

> Seguindo o mesmo padrão do Mini E-commerce MVP

---

# 🚀 Sprint 4 — CRUD de Usuários

⏱️ Estimativa: 4–5 horas

## 🎯 Objetivo

Construir o CRUD completo de usuários seguindo a mesma arquitetura em camadas já usada no projeto:

- Model User no Prisma
- Rotas, controllers, services e repositories
- Validações com Zod
- Interface frontend integrada

---

## 🗄️ Banco de Dados

- [ ] Adicionar model `User` no `schema.prisma`
- [ ] Rodar migration
- [ ] Testar conexão

### Model User

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

## 🔌 Backend — Endpoints

### Create

- [ ] POST `/api/v1/users`

### Read

- [ ] GET `/api/v1/users`
- [ ] GET `/api/v1/users/:id`

### Update

- [ ] PUT `/api/v1/users/:id`

### Delete

- [ ] DELETE `/api/v1/users/:id`

---

## 🏗️ Estrutura Backend

Seguir o mesmo padrão do CRUD de produtos:

```txt
backend/src/
├── routes/
│   └── userRoutes.ts
├── controllers/
│   └── userController.ts
├── services/
│   └── userService.ts
├── repositories/
│   └── userRepository.ts
├── schemas/
│   └── userSchema.ts
```

---

## ✅ Validações com Zod

- [ ] Nome obrigatório
- [ ] Email obrigatório e formato válido
- [ ] Email único (sem duplicatas)
- [ ] Role válido: `customer` ou `admin`

---

## 🚨 Tratamento de Erros

- [ ] 404 quando usuário não encontrado
- [ ] 409 quando email já cadastrado
- [ ] 400 quando dados inválidos
- [ ] Seguir o mesmo formato padrão do projeto:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Usuário não encontrado"
  }
}
```

---

## 🎨 Frontend — Interface

### Página de Usuários

- [ ] Criar página `UsersPage.tsx`
- [ ] Criar rota `/users` no React Router
- [ ] Adicionar link na Navbar

### Componentes

- [ ] `UserTable.tsx` — tabela com listagem
- [ ] `UserForm.tsx` — formulário criar/editar
- [ ] `ConfirmDeleteModal.tsx` — reaproveitar o existente

### Campos do Formulário

| Campo | Tipo   | Validação            |
| ----- | ------ | -------------------- |
| name  | text   | obrigatório          |
| email | email  | obrigatório, formato |
| role  | select | customer \| admin    |

---

## 🔗 Integração API

- [ ] Criar `userService.ts` no frontend (mesmo padrão do `productService.ts`)
- [ ] GET usuários
- [ ] POST usuário
- [ ] PUT usuário
- [ ] DELETE usuário

---

## 🧠 Estados da UI

- [ ] Loading state na listagem
- [ ] Empty state quando sem usuários
- [ ] Toast de sucesso ao criar/editar/deletar
- [ ] Toast de erro em caso de falha

---

## 🧪 Testes

- [ ] Testar criação de usuário válido
- [ ] Testar criação com email duplicado
- [ ] Testar listagem
- [ ] Testar edição
- [ ] Testar remoção

---

## ✅ Resultado esperado da Sprint 4

- CRUD de usuários funcionando no backend
- Interface frontend integrada
- Validações aplicadas
- Erros tratados
- Mesma qualidade e padrão do CRUD de produtos
