# 📁 src/ - Código Fonte Principal

## 📋 O que é esta pasta?

A pasta `src/` contém **todo o código fonte** da aplicação React. É aqui que fica a lógica, os componentes, páginas e dados do sistema.

---

## 🗂️ Estrutura

```
src/
├── App.jsx           # Configuração de rotas da aplicação
├── main.jsx          # Ponto de entrada do React
├── index.css         # Estilos globais (Tailwind CSS)
├── data/             # Banco de dados de produtos
├── pages/            # Páginas da aplicação
└── shared/           # Componentes compartilhados (Navbar, Footer, etc.)
```

---

## 📄 Arquivos Principais

### `App.jsx`
**Propósito:** Configurar todas as rotas da aplicação usando React Router.

```jsx
// Estrutura básica
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/tendas" element={<Tendas />} />
  // ... outras rotas
</Routes>
```

**Como adicionar uma nova página:**
1. Crie a pasta da página em `pages/`
2. Importe o componente no `App.jsx`
3. Adicione a rota no `<Routes>`

---

### `main.jsx`
**Propósito:** Inicializar a aplicação React e conectar ao DOM.

⚠️ **Não modificar** este arquivo a menos que necessário.

---

### `index.css`
**Propósito:** Estilos globais e configuração do Tailwind CSS.

**O que tem aqui:**
- Diretivas do Tailwind (`@tailwind base`, etc.)
- Fontes customizadas
- Variáveis CSS globais
- Animações personalizadas

---

## 🔗 Links para READMEs das subpastas

- [📦 data/](./data/README.md) - Banco de dados de produtos
- [📄 pages/](./pages/README.md) - Páginas da aplicação
- [🔧 shared/](./shared/README.md) - Componentes compartilhados

---

## 🎨 Padrões do Projeto

### Cores (Tailwind)
- **Laranja (CTA):** `#FF5F1F` → `text-[#FF5F1F]` ou `bg-[#FF5F1F]`
- **Cinza Escuro:** `#333333` → `text-[#333333]`
- **Cinza Claro:** `#F7F7F8` → `bg-[#F7F7F8]`

### Bordas
- **Cards:** `rounded-2xl`
- **Botões:** `rounded-full`
- **Inputs:** `rounded-xl`

### Sombras
- **Cards:** `shadow-lg` ou `shadow-xl`
- **Botões hover:** `hover:shadow-xl`
