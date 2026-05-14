# 🛒 Mini E-commerce

Sistema **full stack** de gerenciamento de catálogo de produtos, com backend em Node.js/Fastify e frontend em React. Projeto estruturado em camadas, com validação forte via Zod, testes automatizados e deploy configurado para o Render.

---

## ✨ Funcionalidades

- Cadastro, listagem, edição e remoção de produtos (CRUD completo)
- Validação de dados com Zod no backend e no frontend
- Tratamento global de erros com respostas padronizadas
- Dashboard responsivo com loading states e toasts de feedback
- Testes unitários e de integração no backend
- Deploy via Render (configuração incluída no repositório)

---

## 🧱 Stack

### Backend
| Tecnologia | Papel |
|---|---|
| Node.js + TypeScript | Runtime e linguagem |
| Fastify | Framework HTTP |
| Prisma | ORM e acesso ao banco |
| SQLite | Banco de dados |
| Zod | Validação de schemas |
| Vitest + Supertest | Testes unitários e de integração |

### Frontend
| Tecnologia | Papel |
|---|---|
| React + TypeScript | UI e lógica de componentes |
| Vite | Bundler e dev server |
| TailwindCSS | Estilização utilitária |
| shadcn/ui | Biblioteca de componentes |
| React Hook Form | Gerenciamento de formulários |
| Zod | Validação client-side |

---

## 🗂️ Estrutura do projeto

```
mini-ecommerce/
├── backend/
│   ├── prisma/          # Schema e migrations do banco
│   ├── src/
│   │   ├── routes/      # Definição das rotas HTTP
│   │   ├── controllers/ # Camada de entrada das requisições
│   │   ├── services/    # Regras de negócio
│   │   ├── repositories/# Acesso ao banco via Prisma
│   │   ├── schemas/     # Schemas Zod para validação
│   │   ├── middleware/  # Middlewares globais
│   │   └── utils/       # Utilitários compartilhados
│   └── tests/           # Testes unitários e de integração
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # Comunicação com a API
│   │   ├── hooks/       # Custom hooks
│   │   ├── types/       # Tipagens TypeScript
│   │   └── utils/       # Utilitários do frontend
│   └── index.html
├── DOC/                 # Documentação adicional
├── render.yaml          # Configuração de deploy no Render
└── package.json         # Workspaces e scripts raiz
```

---

## ⚙️ Pré-requisitos

- **Node.js** 20 ou superior
- **npm** 10 ou superior

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/marialuisasanches/mini-ecommerce.git
cd mini-ecommerce
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie os arquivos de exemplo e preencha os valores necessários:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

No `frontend/.env`, defina a URL da API:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Configure o banco de dados

```bash
npm run prisma:generate --workspace backend
npm run prisma:push --workspace backend
```

### 5. Inicie os servidores

**Backend** (porta 3001):
```bash
npm run dev:backend
```

**Frontend** (via Vite):
```bash
npm run dev:frontend
```

---

## 📜 Scripts disponíveis

### Na raiz do projeto

| Script | Descrição |
|---|---|
| `npm run dev:backend` | Inicia o backend em modo desenvolvimento |
| `npm run dev:frontend` | Inicia o frontend com Vite |
| `npm run build:backend` | Compila o backend para produção |
| `npm run build:frontend` | Gera o build do frontend |
| `npm run test:backend` | Executa os testes do backend |

### Workspace `backend`

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor em modo watch |
| `npm run build` | Compilação TypeScript |
| `npm run test` | Vitest (unitários + integração) |
| `npm run prisma:generate` | Gera o client Prisma |
| `npm run prisma:push` | Aplica o schema no banco |

### Workspace `frontend`

| Script | Descrição |
|---|---|
| `npm run dev` | Dev server Vite |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

---

## 🔌 API

As rotas estão disponíveis em duas variações para facilitar versionamento:

```
/products
/api/v1/products
```

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/products` | Cria um novo produto |
| `GET` | `/products` | Lista todos os produtos |
| `GET` | `/products/:id` | Busca um produto por ID |
| `PUT` | `/products/:id` | Atualiza um produto |
| `DELETE` | `/products/:id` | Remove um produto |

### Exemplo de payload

```json
{
  "name": "Notebook Gamer",
  "description": "RTX 4060, 16GB RAM, SSD 512GB",
  "price": 4999.90,
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
    "message": "Produto não encontrado",
    "details": "Nenhum produto encontrado com o ID informado"
  }
}
```

---

## 🧪 Testes

O backend conta com testes unitários de service e testes de integração das rotas HTTP.

```bash
npm run test:backend
```

---

## ☁️ Deploy

O projeto possui configuração pronta para deploy no [Render](https://render.com) via `render.yaml`.

O serviço de backend sobe automaticamente com:

```
npm install && npx prisma migrate deploy && npm run build
```

Para o frontend, basta apontar o build do Vite (`dist/`) para qualquer serviço de hospedagem estática (Vercel, Netlify, Render Static Site, etc.).

---

## 🧠 Decisões técnicas

- **SQLite** foi escolhido pela simplicidade de setup e adequação ao escopo de MVP — sem necessidade de infraestrutura externa de banco.
- **Prisma** garante tipagem forte e acesso previsível ao banco, facilitando manutenção e refatorações.
- A **arquitetura em camadas** no backend (routes → controllers → services → repositories) mantém a regra de negócio isolada da camada HTTP.
- O **frontend modular** com componentes no padrão shadcn/ui proporciona consistência visual e facilidade de manutenção.

---

## 📄 Licença

Este projeto está sob uso livre para fins de estudo e portfólio.
