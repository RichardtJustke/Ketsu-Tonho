# 📦 data/ - Banco de Dados de Produtos

## 📋 O que é esta pasta?

A pasta `data/` contém o **banco de dados local** de todos os produtos disponíveis para locação. Atualmente os dados são estáticos (hardcoded), mas futuramente serão integrados com um banco de dados real.

---

## 🗂️ Estrutura

```
data/
└── products.js    # Todos os produtos do catálogo
```

---

## 📄 products.js

### Propósito
Armazenar **todos os produtos** do sistema com suas informações completas: nome, descrição, imagem, categoria, benefícios e especificações técnicas.

### Estrutura de um Produto

```javascript
export const products = {
  'id_do_produto': {
    id: 'id_do_produto',           // Identificador único (usado na URL)
    name: 'Nome do Produto',        // Nome exibido no site
    shortDescription: '...',        // Descrição curta (cards)
    fullDescription: '...',         // Descrição completa (página do produto)
    image: 'https://...',           // URL da imagem principal
    category: 'tendas',             // Categoria: tendas, box, moveis
    benefits: [                     // Benefícios/diferenciais
      {
        title: 'Título do Benefício',
        description: 'Descrição detalhada...'
      }
    ],
    specs: {                        // Especificações técnicas
      'Comprimento': '10 metros',
      'Largura': '10 metros',
      'Área coberta': '100m²'
    }
  }
}
```

---

## 🛠️ Como Adicionar um Produto

### 1. Abra o arquivo `products.js`

### 2. Adicione um novo objeto dentro de `products`

```javascript
'meu_novo_produto': {
  id: 'meu_novo_produto',
  name: 'Meu Novo Produto',
  shortDescription: 'Descrição curta para os cards...',
  fullDescription: `Descrição completa que aparece na página do produto.
  
  Pode ter múltiplos parágrafos usando template strings.`,
  image: 'https://images.unsplash.com/...',
  category: 'tendas', // tendas, box ou moveis
  benefits: [
    {
      title: 'Benefício 1',
      description: 'Descrição do benefício 1'
    },
    {
      title: 'Benefício 2',
      description: 'Descrição do benefício 2'
    }
  ],
  specs: {
    'Especificação 1': 'Valor 1',
    'Especificação 2': 'Valor 2',
    'Valor': 'R$ XX,00 por diária'
  }
}
```

### 3. Salve o arquivo

O produto já estará disponível automaticamente nas páginas de listagem e na página de detalhes (`/produto/meu_novo_produto`).

---

## 🔍 Funções Utilitárias

O arquivo também exporta funções para buscar produtos:

```javascript
// Busca produto pelo ID
import { getProductById } from '../data/products'
const produto = getProductById('tenda_branca_10x10')

// Busca produtos por categoria
import { getProductsByCategory } from '../data/products'
const tendas = getProductsByCategory('tendas')

// Pega todos os produtos
import { getAllProducts } from '../data/products'
const todosProdutos = getAllProducts()
```

---

## 📚 Categorias Disponíveis

| Categoria | Valor | Descrição |
|-----------|-------|-----------|
| Tendas | `'tendas'` | Tendas brancas, cristal, temáticas |
| Box Truss | `'box'` | Pórticos, backdrops, estruturas |
| Móveis | `'moveis'` | Mesas, cadeiras, climatizadores, eletrônicos |

---

## ⚠️ Regras Importantes

1. **ID único:** Cada produto DEVE ter um ID único (usado na URL)
2. **Sem espaços no ID:** Use underscore `_` ao invés de espaços
3. **Categoria válida:** Use apenas `tendas`, `box` ou `moveis`
4. **Imagens HTTPS:** URLs de imagem devem usar HTTPS
5. **Pelo menos 3 benefícios:** Recomendado para melhor apresentação

---

## 🔮 Futuro: Integração com Backend

Quando o backend for implementado:
1. Este arquivo será substituído por chamadas à API
2. Os produtos virão do banco de dados PostgreSQL/MongoDB
3. As funções `getProductById`, `getProductsByCategory` farão requisições HTTP
4. Será possível adicionar/editar produtos pelo painel admin
