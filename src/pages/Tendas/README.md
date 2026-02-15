# ⛺ Tendas/ - Catálogo de Tendas

## 📋 O que é esta página?

A página **Tendas** exibe o catálogo completo de tendas disponíveis para locação. É uma página de listagem com cards clicáveis que levam aos detalhes de cada produto.

**Rota:** `/tendas`

---

## 🗂️ Estrutura

```
Tendas/
├── Tendas.jsx            # Componente principal
├── README.md             # Esta documentação
├── assets/               # Imagens locais
└── components/
    ├── Hero.jsx              # Banner da página
    ├── TendaCard.jsx         # Card individual de tenda
    ├── TendasGrid.jsx        # Grid de cards
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧠 Lógica Principal

### Carregamento dos Produtos

```jsx
import { getProductsByCategory } from '../../data/products'

const Tendas = () => {
  // Busca todos os produtos da categoria 'tendas'
  const tendas = getProductsByCategory('tendas')
  
  return (
    // ...
    <TendasGrid products={tendas} />
    // ...
  )
}
```

---

## 🧩 Componentes

### `TendasGrid.jsx` - Grid de Produtos

**Props:**
```jsx
products   // Array de produtos da categoria tendas
```

**O que faz:**
- Renderiza grid responsivo de cards
- 1 coluna no mobile, 2 no tablet, 3 no desktop

**Estrutura:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <TendaCard key={product.id} product={product} />
  ))}
</div>
```

---

### `TendaCard.jsx` - Card de Produto

**Props:**
```jsx
product   // Dados do produto individual
```

**Estrutura visual:**
```
┌─────────────────────────┐
│        [Imagem]         │
├─────────────────────────┤
│ Nome da Tenda           │
│ Descrição curta...      │
│                         │
│ [Ver detalhes →]        │
└─────────────────────────┘
```

**Lógica de navegação:**
```jsx
import { Link } from 'react-router-dom'

<Link to={`/produto/${product.id}`}>
  Ver detalhes
</Link>
```

---

## 🛠️ Como Adicionar Nova Tenda

### 1. Adicione em `data/products.js`

```javascript
'minha_nova_tenda': {
  id: 'minha_nova_tenda',
  name: 'Minha Nova Tenda',
  shortDescription: 'Descrição curta para o card...',
  fullDescription: 'Descrição completa...',
  image: 'https://url-da-imagem.com',
  category: 'tendas',  // IMPORTANTE: deve ser 'tendas'
  benefits: [...],
  specs: {...}
}
```

### 2. Pronto!

O produto aparece automaticamente na listagem.

---

## 📚 Tipos de Tendas

| Tipo | Descrição |
|------|-----------|
| **Brancas** | Tendas tradicionais brancas em vários tamanhos |
| **Cristal** | Tendas transparentes para eventos sofisticados |
| **Temáticas** | Remo, Paysandu e outras personalizadas |
| **Especiais** | Pé d'Água, Box Struss e estruturas diferenciadas |

---

## 🔮 Melhorias Futuras

- [ ] Filtros por tamanho (3x3, 5x5, 10x10)
- [ ] Filtros por tipo (branca, cristal, temática)
- [ ] Ordenação por preço
- [ ] Busca por texto
- [ ] Comparador de tendas
