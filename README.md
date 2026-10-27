# RefletIA

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

1. **[Node.js](https://nodejs.org/)** (v18.x ou superior)
2. **npm** (incluído com o Node.js)

---

### ⚙️ Configuração do Ambiente

#### 1. Clone o repositório

```bash
git clone https://github.com/steffaneleal/InteliGenteCards.git
cd InteliGenteCards
```

#### 2. Instale as dependências

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # serve o build
```

Copie `.env.example` para `.env.local` quando o backend existir.

## Estrutura

```
src/
  app/              # ROTAS (o "AppRoutes" do Next.js): cada pasta com page.jsx vira uma URL
    layout.jsx      #   layout raiz: CSS global, fonte, script do FinisherHeader
    (public)/       #   páginas com navbar: /  /login  /cadastro
    (dashboard)/    #   áreas logadas: /estudante  /facilitador  /admin
  views/            # telas (antiga pasta "pages"; renomeada porque o Next trata "pages" como rota)
  components/       # componentes reutilizáveis
  data/             # dados fictícios (serão substituídos pela API)
  lib/routes.js     # constantes de rotas
  config/features.js# flags de funcionalidades fora do MVP (ranking = false)
  styles/  icons/
public/assets/      # imagens (servidas em /assets/...)
```

## Funcionalidades fora do MVP

O ranking está desativado em `src/config/features.js` (`ranking: false`). O código foi mantido; para reativar, troque para `true`.
