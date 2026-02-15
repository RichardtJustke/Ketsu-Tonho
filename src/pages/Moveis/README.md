# 🪑 Moveis/ - Catálogo de Móveis e Equipamentos

## 📋 O que é esta página?

A página **Moveis** exibe todos os móveis e equipamentos complementares: mesas, cadeiras, climatizadores, eletrônicos, itens de cozinha.

**Rota:** `/moveis`

---

## 🗂️ Estrutura

```
Moveis/
├── Moveis.jsx            # Componente principal
├── README.md             # Esta documentação
├── assets/               # Imagens locais
└── components/
    ├── Hero.jsx              # Banner da página
    ├── MovelCard.jsx         # Card individual
    ├── MoveisGrid.jsx        # Grid de cards
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧠 Lógica Principal

```jsx
import { getProductsByCategory } from '../../data/products'

const Moveis = () => {
  // Busca produtos da categoria 'moveis'
  const moveis = getProductsByCategory('moveis')
  
  return (
    <MoveisGrid products={moveis} />
  )
}
```

---

## 📚 Subcategorias de Móveis

| Subcategoria | Produtos |
|--------------|----------|
| **Climatização** | Climatizadores (Guarujá, Joape, Climabrisa) |
| **Eletrônicos** | TV 55", Notebook, Impressora, Microfones, Som |
| **Cozinha** | Fogão industrial, Frigobar, Cafeteira, Bebedouro |
| **Mobiliário** | Mesas, Cadeiras, Banquetas, Bistrô |
| **Decoração** | Mesas decorativas, Conjuntos |

---

## 🛠️ Como Adicionar Novo Móvel

```javascript
// Em data/products.js
'novo_movel': {
  id: 'novo_movel',
  name: 'Novo Móvel',
  category: 'moveis',  // IMPORTANTE
  // ... resto dos dados
}
```

---

## 🔮 Melhorias Futuras

- [ ] Filtros por subcategoria
- [ ] Pacotes/combos de móveis
- [ ] Calculadora de quantidade por convidados
- [ ] Lista de desejos
