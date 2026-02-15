# 📸 Cases/ - Galeria de Eventos

## 📋 O que é esta página?

A página **Cases** exibe os eventos realizados pela Tonho Locação, servindo como portfólio e prova social.

**Rota:** `/cases`

---

## 🗂️ Estrutura

```
Cases/
├── Cases.jsx             # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── Hero.jsx              # Banner "Nossos Cases"
    ├── GallerySection.jsx    # Galeria de imagens
    ├── TestimonialsSection.jsx # Depoimentos
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧩 Seções

### `GallerySection.jsx` - Galeria de Eventos

**Estrutura de dados:**
```jsx
const cases = [
  {
    id: 1,
    title: 'Casamento na Praia',
    category: 'Casamento',
    image: 'https://...',
    description: 'Evento para 200 convidados...'
  },
  // ...
]
```

**Filtros (futuro):**
- Por tipo de evento
- Por ano
- Por tamanho

### `TestimonialsSection.jsx` - Depoimentos

**Estrutura:**
```jsx
const testimonials = [
  {
    name: 'Maria Silva',
    event: 'Casamento',
    quote: 'Excelente serviço...',
    rating: 5
  }
]
```

---

## 🛠️ Como Adicionar Novo Case

### 1. Adicione imagens em `assets/images/`

### 2. Adicione ao array de cases

```jsx
{
  id: 5,
  title: 'Novo Evento',
  category: 'Corporativo',
  image: require('./assets/images/novo-evento.jpg'),
  description: 'Descrição do evento...'
}
```

---

## 🔮 Melhorias Futuras

- [ ] Galeria com lightbox
- [ ] Filtros por categoria
- [ ] Integração com Instagram
- [ ] Vídeos de eventos
- [ ] Antes/Depois da montagem
