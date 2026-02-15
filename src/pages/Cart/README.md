# 🛒 Cart/ - Página do Carrinho

## 📋 O que é esta página?

A página do **Carrinho** é onde o cliente visualiza os produtos selecionados, ajusta quantidades e finaliza o orçamento.

**Rota:** `/carrinho`

---

## 🗂️ Estrutura

```
Cart/
├── Cart.jsx              # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── Hero.jsx              # Banner "Finalize seu Pedido"
    ├── CartItems.jsx         # Lista de itens no carrinho
    ├── CartItem.jsx          # Card individual de produto
    ├── OrderSummary.jsx      # Resumo do pedido (sidebar)
    ├── SpecialInstructions.jsx # Textarea para observações
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧠 Lógica Principal (Cart.jsx)

### Estados

```jsx
// Lista de itens no carrinho (atualmente com 3 exemplos)
const [cartItems, setCartItems] = useState([
  {
    id: '85417',
    name: 'Climatizador Joape 110v',
    price: 300.00,
    quantity: 1,
    category: 'Climatizador',
    image: 'https://...'
  },
  // ... outros itens
])

// Observações especiais do cliente
const [specialInstructions, setSpecialInstructions] = useState('')
```

### Cálculos

```jsx
// Subtotal = soma de (preço × quantidade) de cada item
const subtotal = cartItems.reduce(
  (acc, item) => acc + (item.price * item.quantity), 
  0
)
```

### Funções

```jsx
// Alterar quantidade de um item
const handleQuantityChange = (itemId, newQuantity) => {
  setCartItems(items => 
    items.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    )
  )
}

// Remover item do carrinho
const handleRemoveItem = (itemId) => {
  setCartItems(items => items.filter(item => item.id !== itemId))
}

// Finalizar pedido
const handleFinalize = () => {
  console.log('Finalizando:', { items: cartItems, subtotal, specialInstructions })
  // TODO: Enviar para backend / WhatsApp
}
```

---

## 🧩 Componentes

### `CartItems.jsx` - Lista de Itens

**Props:**
```jsx
items              // Array de itens do carrinho
onQuantityChange   // Função para alterar quantidade
onRemove           // Função para remover item
```

**O que renderiza:**
- Header com contagem de itens
- Lista de `CartItem` para cada produto
- Mensagem se carrinho vazio

---

### `CartItem.jsx` - Card do Produto

**Props:**
```jsx
item               // Dados do produto
onQuantityChange   // Callback para alterar quantidade
onRemove           // Callback para remover
```

**Estrutura do card:**
```
┌─────────────────────────────────────────────────┐
│ [Imagem]  Nome do Produto                       │
│           Categoria                             │
│           ─ [qty] +          R$ XXX,XX    🗑️   │
└─────────────────────────────────────────────────┘
```

**Lógica de quantidade:**
```jsx
// Incrementar
const increment = () => onQuantityChange(item.id, item.quantity + 1)

// Decrementar (mínimo 1)
const decrement = () => {
  if (item.quantity > 1) {
    onQuantityChange(item.id, item.quantity - 1)
  }
}
```

---

### `OrderSummary.jsx` - Resumo do Pedido

**Props:**
```jsx
subtotal           // Soma dos produtos
installationFee    // Taxa de instalação (R$ 300)
discount           // Desconto aplicado (cupom)
onFinalize         // Função para finalizar
```

**O que mostra:**
- Input de cupom de desconto
- Subtotal dos produtos
- Taxa de instalação
- Desconto (se houver)
- **Total final**
- Botão "Finalizar Pedido"
- Badges de benefícios

**Cálculo do total:**
```jsx
const total = subtotal + installationFee - discount
```

---

### `SpecialInstructions.jsx` - Observações

**Props:**
```jsx
onInstructionsChange   // Callback quando texto muda
```

**O que faz:** Textarea para o cliente adicionar observações sobre o evento.

---

## 🛠️ Como Modificar

### Alterar os produtos de exemplo

Edite o `useState` inicial em `Cart.jsx`:
```jsx
const [cartItems, setCartItems] = useState([
  {
    id: 'novo_id',
    name: 'Nome do Produto',
    price: 500.00,
    quantity: 1,
    category: 'Categoria',
    image: 'https://url-da-imagem.com'
  }
])
```

### Mudar taxa de instalação

Em `Cart.jsx`, altere o valor passado para `OrderSummary`:
```jsx
<OrderSummary 
  installationFee={400}  // Novo valor
  // ...
/>
```

### Adicionar lógica de cupom

Em `OrderSummary.jsx`, implemente:
```jsx
const [couponCode, setCouponCode] = useState('')
const [discount, setDiscount] = useState(0)

const applyCoupon = () => {
  if (couponCode === 'DESCONTO10') {
    setDiscount(subtotal * 0.10)  // 10% de desconto
  }
}
```

---

## 🔮 Integração Futura com Backend

### Estrutura esperada da API

```javascript
// POST /api/orders
{
  items: [
    { productId: 'xxx', quantity: 2 }
  ],
  customer: {
    name: '...',
    phone: '...',
    email: '...'
  },
  event: {
    location: '...',
    date: '...',
    notes: '...'
  },
  couponCode: 'DESCONTO10'
}
```

### O que vai mudar:

1. `cartItems` virá do Context/Redux global
2. `handleFinalize` fará POST para API
3. Cupons serão validados no backend
4. Redirecionamento para página de confirmação

---

## ⚠️ Notas Importantes

- Atualmente os itens são **exemplos estáticos**
- Não há lógica de "adicionar ao carrinho" implementada ainda
- Taxa de instalação é fixa (R$ 300)
- Cupons ainda não funcionam (visual apenas)
