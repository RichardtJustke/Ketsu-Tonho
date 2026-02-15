# 🧩 shared/components/ - Componentes Reutilizáveis

## 📋 O que é esta pasta?

Contém os **componentes que são usados em várias páginas** do site. São a "espinha dorsal" visual da aplicação.

---

## 📄 Componentes Disponíveis

### 1. `Navbar.jsx` - Barra de Navegação

**O que faz:** Menu superior presente em todas as páginas.

**Funcionalidades:**
- Logo clicável (vai para home)
- Links de navegação
- Menu hamburger no mobile
- Link para carrinho

**Estados:**
```jsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
```

**Lógica de navegação:**
```jsx
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Cases', path: '/cases' },
  { name: 'Tendas', path: '/tendas' },
  { name: 'Box Truss', path: '/box' },
  { name: 'Móveis', path: '/moveis' },
  { name: 'Contato', path: '/contato' }
]
```

**Para adicionar novo link:**
1. Adicione ao array `navLinks`
2. A navegação atualiza automaticamente

---

### 2. `Footer.jsx` - Rodapé

**O que faz:** Rodapé com informações da empresa.

**Seções:**
- **Coluna 1:** Logo + descrição
- **Coluna 2:** Links rápidos
- **Coluna 3:** Contato (telefone, email, endereço)
- **Coluna 4:** Redes sociais
- **Rodapé:** Copyright

**Não tem estados** - componente puramente visual.

---

### 3. `EventFilterModal.jsx` - Modal de Filtro de Eventos

**O que faz:** Guia o usuário por 3 perguntas para personalizar a busca de produtos.

**Props:**
| Prop | Tipo | Descrição |
|------|------|-----------|
| `isOpen` | boolean | Controla visibilidade |
| `onClose` | function | Callback para fechar |
| `onComplete` | function | Recebe os filtros selecionados |

**Estados:**
```jsx
// Step atual: -1 (intro), 0, 1, 2 (perguntas)
const [currentStep, setCurrentStep] = useState(-1)

// Respostas do usuário
const [filters, setFilters] = useState({
  location: '',    // Localização do evento
  guests: '',      // Quantidade de convidados
  date: ''         // Data do evento
})

// Controle de animações
const [isAnimating, setIsAnimating] = useState(false)
const [direction, setDirection] = useState('next')
```

**Fluxo de Steps:**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Step -1    │───>│   Step 0    │───>│   Step 1    │───>│   Step 2    │
│   Intro     │    │  Localização │    │  Convidados │    │    Data     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**Funções principais:**
```jsx
// Avançar para próximo step
const advanceStep = () => {
  setIsAnimating(true)
  setTimeout(() => {
    setCurrentStep(prev => prev + 1)
    setIsAnimating(false)
  }, 300)
}

// Voltar step
const handleBack = () => {
  setCurrentStep(prev => prev - 1)
}

// Finalizar e enviar dados
const handleComplete = () => {
  onComplete(filters)  // Envia filtros para componente pai
  onClose()            // Fecha o modal
}
```

**Exemplo de uso:**
```jsx
// Na página Home.jsx
const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

<EventFilterModal 
  isOpen={isFilterModalOpen}
  onClose={() => setIsFilterModalOpen(false)}
  onComplete={(filters) => {
    console.log('Filtros:', filters)
    // TODO: Usar filtros para buscar produtos
  }}
/>

// Para abrir o modal:
<button onClick={() => setIsFilterModalOpen(true)}>
  Montar meu evento
</button>
```

---

### 4. `PageTransition.jsx` - Animação de Transição

**O que faz:** Adiciona fade suave entre páginas.

**Como funciona:**
1. Envolve o conteúdo das rotas
2. Detecta mudança de URL
3. Aplica animação de saída/entrada

**Uso no App.jsx:**
```jsx
import PageTransition from './shared/components/PageTransition'

<PageTransition>
  <Routes>
    {/* rotas aqui */}
  </Routes>
</PageTransition>
```

---

## 🛠️ Como Modificar um Componente

### Modificar o Navbar

**Adicionar novo link:**
```jsx
// Encontre o array navLinks e adicione:
{ name: 'Nova Página', path: '/nova-pagina' }
```

**Mudar cor do logo:**
```jsx
// Procure className do logo e altere
className="text-[#FF5F1F]" // Laranja
```

### Modificar o Footer

**Atualizar informações de contato:**
```jsx
// Procure a seção de contato e edite:
<p>(91) 99999-9999</p>
<p>contato@tonholocacao.com.br</p>
```

### Modificar o EventFilterModal

**Adicionar nova pergunta:**
```jsx
// No array steps, adicione:
{
  title: 'Nova pergunta?',
  subtitle: 'Descrição da pergunta',
  field: 'novoField',        // Adicione também no state filters
  placeholder: 'Ex: ...',
  icon: '🎯'
}

// E no state filters:
const [filters, setFilters] = useState({
  location: '',
  guests: '',
  date: '',
  novoField: ''  // Novo campo
})
```

---

## ⚠️ Cuidados Importantes

1. **Navbar e Footer são globais** - Mudanças afetam TODAS as páginas
2. **Responsividade** - Sempre teste em mobile (use `md:` e `lg:` do Tailwind)
3. **Acessibilidade** - Mantenha `aria-label` em botões sem texto
4. **Performance** - Evite re-renders desnecessários (use `useCallback` quando necessário)
