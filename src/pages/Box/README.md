# 🎪 Box/ - Catálogo Box Truss

## 📋 O que é esta página?

A página **Box** exibe o catálogo de estruturas Box Truss disponíveis para locação: pórticos, backdrops, tendas estruturadas.

**Rota:** `/box`

---

## 🗂️ Estrutura

```
Box/
├── Box.jsx               # Componente principal
├── README.md             # Esta documentação
├── assets/               # Imagens locais
└── components/
    ├── Hero.jsx              # Banner da página
    ├── BoxCard.jsx           # Card individual
    ├── BoxGrid.jsx           # Grid de cards
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧠 Lógica Principal

```jsx
import { getProductsByCategory } from '../../data/products'

const Box = () => {
  // Busca produtos da categoria 'box'
  const boxProducts = getProductsByCategory('box')
  
  return (
    <BoxGrid products={boxProducts} />
  )
}
```

---

## 📚 Produtos Box Truss

| Produto | Descrição | Uso Comum |
|---------|-----------|-----------|
| **Pórtico de Entrada** | 6m × 4,6m | Entradas de eventos |
| **Backdrop 3×2** | 3m × 2m | Fotos, entrevistas |
| **Tenda Box Truss 9×6** | 54m² | Shows, feiras |

---

## 🛠️ Como Adicionar Novo Produto Box

```javascript
// Em data/products.js
'novo_box': {
  id: 'novo_box',
  name: 'Novo Produto Box',
  category: 'box',  // IMPORTANTE
  // ... resto dos dados
}
```

---

## 🔮 Melhorias Futuras

- [ ] Filtros por tipo de estrutura
- [ ] Calculadora de tamanho necessário
- [ ] Galeria 3D das estruturas
