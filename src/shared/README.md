# 🔧 shared/ - Componentes Compartilhados

## 📋 O que é esta pasta?

A pasta `shared/` contém **componentes reutilizáveis** que aparecem em múltiplas páginas do site. São elementos comuns como Navbar, Footer, modais e animações.

---

## 🗂️ Estrutura

```
shared/
└── components/
    ├── Navbar.jsx           # Barra de navegação superior
    ├── Footer.jsx           # Rodapé do site
    ├── EventFilterModal.jsx # Modal de filtro de eventos
    └── PageTransition.jsx   # Animação de transição entre páginas
```

---

## 🧩 Componentes

### `Navbar.jsx`
**Propósito:** Barra de navegação presente em todas as páginas.

**Características:**
- Logo da empresa
- Links de navegação (Home, Sobre, Cases, Produtos, Contato)
- Menu mobile responsivo
- Botão de carrinho

**Como adicionar um novo link:**
```jsx
// Encontre o array de links e adicione:
{ name: 'Nome', path: '/rota' }
```

---

### `Footer.jsx`
**Propósito:** Rodapé com informações da empresa e links úteis.

**Seções:**
- Logo e descrição
- Links rápidos
- Informações de contato
- Redes sociais
- Copyright

---

### `EventFilterModal.jsx`
**Propósito:** Modal interativo step-by-step para filtrar produtos baseado no evento do cliente.

**Fluxo:**
1. **Tela de Introdução** - Apresenta o modal
2. **Pergunta 1** - Localização do evento
3. **Pergunta 2** - Quantidade de convidados
4. **Pergunta 3** - Data do evento
5. **Finalização** - Retorna os filtros selecionados

**Lógica Principal:**
```jsx
// Estados
const [currentStep, setCurrentStep] = useState(-1)  // -1 = intro
const [filters, setFilters] = useState({
  location: '',
  guests: '',
  date: ''
})

// Avançar step
const advanceStep = () => setCurrentStep(prev => prev + 1)

// Finalizar
const handleComplete = () => {
  onComplete(filters)  // Passa os filtros para o componente pai
  onClose()
}
```

**Como usar:**
```jsx
import EventFilterModal from '../../shared/components/EventFilterModal'

const [isOpen, setIsOpen] = useState(false)

<EventFilterModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onComplete={(filters) => console.log(filters)}
/>
```

---

### `PageTransition.jsx`
**Propósito:** Adicionar animação suave de fade nas transições entre páginas.

**Como funciona:**
- Envolve todas as rotas no `App.jsx`
- Usa CSS transitions para animar entrada/saída
- Detecta mudança de rota automaticamente

---

## 🛠️ Como Criar um Novo Componente Compartilhado

### 1. Crie o arquivo em `shared/components/`

```jsx
// shared/components/MeuComponente.jsx

const MeuComponente = ({ prop1, prop2 }) => {
  return (
    <div className="...">
      {/* Conteúdo */}
    </div>
  )
}

export default MeuComponente
```

### 2. Importe onde precisar

```jsx
import MeuComponente from '../../shared/components/MeuComponente'

// Use no JSX
<MeuComponente prop1="valor" prop2={variavel} />
```

---

## 📐 Padrões de Componentes Shared

### 1. Props bem documentadas
```jsx
/**
 * MeuComponente - Descrição do que faz
 * 
 * @param {string} prop1 - Descrição da prop1
 * @param {function} onAction - Callback quando algo acontece
 */
const MeuComponente = ({ prop1, onAction }) => { ... }
```

### 2. Responsividade
```jsx
// Mobile first com breakpoints
<div className="text-sm md:text-base lg:text-lg">
```

### 3. Acessibilidade
```jsx
<button aria-label="Fechar modal">
  <svg aria-hidden="true" />
</button>
```

---

## 🔗 Link para documentação detalhada

- [📘 components/](./components/README.md) - Detalhes de cada componente
