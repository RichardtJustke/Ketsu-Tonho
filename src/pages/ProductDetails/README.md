# 📦 ProductDetails/ - Página de Detalhes do Produto

## 📋 O que é esta página?

A página **ProductDetails** é um template dinâmico que exibe os detalhes de qualquer produto. O produto é determinado pelo ID na URL.

**Rota:** `/produto/:productId`

**Exemplos:**
- `/produto/tenda_branca_10x10`
- `/produto/climatizador_guaruja`
- `/produto/portico_de_entrada`

---

## 🗂️ Estrutura

```
ProductDetails/
├── ProductDetails.jsx     # Componente principal
├── README.md              # Esta documentação
└── components/
    ├── ProductHero.jsx        # Banner com nome e CTA
    ├── ProductImage.jsx       # Imagem principal do produto
    ├── ProductAbout.jsx       # Descrição completa
    ├── ProductBenefits.jsx    # Lista de benefícios
    ├── ProductSpecs.jsx       # Especificações técnicas
    ├── ProductActions.jsx     # Botões de ação
    ├── RelatedProducts.jsx    # Produtos relacionados
    └── ContactSection.jsx     # Seção de contato
```

---

## 🧠 Lógica Principal (ProductDetails.jsx)

### Obtendo o Produto

```jsx
import { useParams, Navigate } from 'react-router-dom'
import { getProductById } from '../../data/products'

const ProductDetails = () => {
  // Pega o ID da URL
  const { productId } = useParams()  // Ex: 'tenda_branca_10x10'
  
  // Busca o produto no banco de dados
  const product = getProductById(productId)
  
  // Se não encontrar, redireciona para home
  if (!product) {
    return <Navigate to="/" replace />
  }
  
  // ... resto do componente
}
```

### Estado de Formulário

```jsx
/**
 * Controla se o usuário já verificou disponibilidade
 * 
 * false = Exibe "Ver disponibilidade"
 * true  = Exibe "Adicionar ao carrinho"
 */
const [hasAnsweredForm, setHasAnsweredForm] = useState(false)
```

### Funções

```jsx
// Verificar disponibilidade (abre modal/formulário)
const handleCheckAvailability = () => {
  console.log('Verificando disponibilidade para:', product.id)
  // TODO: Abrir modal de verificação
  // Após responder: setHasAnsweredForm(true)
}

// Adicionar ao carrinho
const handleAddToCart = (id) => {
  console.log('Adicionando ao carrinho:', id)
  // TODO: Adicionar ao estado global do carrinho
}
```

---

## 🧩 Componentes

### `ProductHero.jsx` - Banner do Produto

**Props:**
```jsx
product             // Dados completos do produto
hasAnsweredForm     // Se já verificou disponibilidade
onCheckAvailability // Callback para verificar
```

**O que mostra:**
- Nome do produto
- Descrição curta
- Botão condicional (Ver disponibilidade / Adicionar)

---

### `ProductImage.jsx` - Imagem Principal

**Props:**
```jsx
image   // URL da imagem
name    // Nome do produto (para alt)
```

**Características:**
- Imagem responsiva
- Aspect ratio mantido
- Lazy loading

---

### `ProductAbout.jsx` - Sobre o Produto

**Props:**
```jsx
description   // Texto completo (fullDescription)
```

**O que faz:** Renderiza a descrição longa do produto com formatação.

---

### `ProductBenefits.jsx` - Benefícios

**Props:**
```jsx
benefits   // Array de { title, description }
```

**Estrutura:**
```jsx
benefits = [
  { title: 'Benefício 1', description: 'Descrição...' },
  { title: 'Benefício 2', description: 'Descrição...' }
]
```

---

### `ProductSpecs.jsx` - Especificações

**Props:**
```jsx
specs   // Objeto com especificações
```

**Estrutura:**
```jsx
specs = {
  'Comprimento': '10 metros',
  'Largura': '10 metros',
  'Valor': 'R$ 500,00 por diária'
}
```

---

### `ProductActions.jsx` - Botões de Ação

**Props:**
```jsx
productId           // ID do produto
hasAnsweredForm     // Estado do formulário
onCheckAvailability // Callback
onAddToCart         // Callback
```

**Botões:**
- "Voltar" → Volta para página anterior
- "Ver disponibilidade" (se não respondeu form)
- "Adicionar ao carrinho" (se respondeu form)

---

### `RelatedProducts.jsx` - Produtos Relacionados

**O que faz:** Exibe grid de outros produtos que podem interessar.

**Lógica futura:**
```jsx
// Buscar produtos da mesma categoria
const related = getProductsByCategory(product.category)
  .filter(p => p.id !== product.id)
  .slice(0, 4)
```

---

## 🛠️ Como Usar com Novo Produto

### 1. Adicione o produto em `data/products.js`

```javascript
'meu_produto': {
  id: 'meu_produto',
  name: 'Meu Produto',
  shortDescription: '...',
  fullDescription: '...',
  image: 'https://...',
  category: 'tendas',
  benefits: [...],
  specs: {...}
}
```

### 2. Acesse no navegador

```
http://localhost:5173/produto/meu_produto
```

A página carrega automaticamente os dados!

---

## 🔄 Fluxo de Compra

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Ver detalhes    │────>│  Ver disponibi-  │────>│  Adicionar ao    │
│  do produto      │     │  lidade (modal)  │     │  carrinho        │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                    │
                                    v
                         ┌──────────────────┐
                         │  hasAnsweredForm │
                         │  = true          │
                         └──────────────────┘
```

---

## 🔮 Melhorias Futuras

- [ ] Modal de verificação de disponibilidade
- [ ] Galeria de múltiplas imagens
- [ ] Zoom na imagem
- [ ] Avaliações de clientes
- [ ] "Produtos vistos recentemente"
- [ ] Compartilhar produto (WhatsApp, redes sociais)
- [ ] Cálculo de frete por localização
