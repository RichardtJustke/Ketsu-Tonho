# 🏠 Home/ - Página Inicial

## 📋 O que é esta página?

A **Home** é a landing page principal do site. É a primeira impressão do cliente e apresenta todos os serviços da Tonho Locação.

**Rota:** `/`

---

## 🗂️ Estrutura

```
Home/
├── Home.jsx              # Componente principal
├── README.md             # Esta documentação
├── assets/               # Imagens locais (se houver)
└── components/
    ├── Hero.jsx              # Banner principal com CTA
    ├── AboutSection.jsx      # "Tudo que você precisa..."
    ├── ProcessSection.jsx    # "Como funciona" (passos)
    ├── ServiceSection.jsx    # Cards de serviços
    ├── WhyChooseSection.jsx  # "Por que escolher a Tonho"
    ├── TrustSection.jsx      # Logos de clientes
    ├── EventTypeSection.jsx  # Accordion de tipos de evento
    ├── ItemsSection.jsx      # Grid de itens populares
    ├── CtaSection.jsx        # "Monte seu evento em 2 min"
    ├── TestimonialSection.jsx # Depoimentos de clientes
    └── ContactSection.jsx    # Formulário de contato
```

---

## 🧩 Componentes

### `Home.jsx` - Componente Principal

**Estados:**
```jsx
// Controla abertura do modal de filtro
const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

// Armazena filtros selecionados pelo usuário
const [eventFilters, setEventFilters] = useState(null)
```

**Funções:**
```jsx
// Abre o modal de filtro
const handleOpenFilterModal = () => {
  setIsFilterModalOpen(true)
}

// Recebe os filtros quando usuário completa o modal
const handleFilterComplete = (filters) => {
  console.log('Filtros:', filters)
  setEventFilters(filters)
  // TODO: Redirecionar para página de produtos filtrados
}
```

---

### `Hero.jsx` - Banner Principal

**O que faz:** Primeira coisa que o usuário vê. Tem título impactante e botão de CTA.

**Props:**
```jsx
onOpenFilterModal  // Função para abrir o modal de filtro
```

**Estrutura:**
- Background escuro com overlay
- Título principal
- Subtítulo
- Botão "Montar meu evento" (abre o modal)

---

### `ProcessSection.jsx` - Como Funciona

**O que faz:** Mostra os 4 passos do processo de locação.

**Passos:**
1. Escolha os produtos
2. Informe o local e data
3. Receba o orçamento
4. Confirmação e entrega

---

### `ServiceSection.jsx` - Cards de Serviços

**O que faz:** Grid de cards com as categorias principais.

**Categorias:**
- Tendas
- Box Truss
- Móveis
- Climatizadores

---

### `EventTypeSection.jsx` - Tipos de Evento

**O que faz:** Accordion com tipos de eventos que a Tonho atende.

**Estado:**
```jsx
const [openItem, setOpenItem] = useState(null)
```

**Tipos:**
- Casamentos
- Aniversários
- Eventos Corporativos
- Feiras e Exposições
- Shows e Festivais

---

### `CtaSection.jsx` - Call to Action

**O que faz:** Seção de destaque para incentivar o usuário a montar o evento.

**Props:**
```jsx
onOpenFilterModal  // Função para abrir o modal
```

---

## 🛠️ Como Modificar

### Adicionar nova seção

1. Crie o componente em `components/NovaSecao.jsx`
2. Importe no `Home.jsx`
3. Adicione no JSX (respeitando a ordem)

```jsx
// Home.jsx
import NovaSecao from './components/NovaSecao'

// No return, entre outras seções:
<NovaSecao />
```

### Mudar texto do Hero

Edite `components/Hero.jsx`:
```jsx
<h1>Seu novo título aqui</h1>
<p>Sua nova descrição aqui</p>
```

### Alterar processo (passos)

Edite `components/ProcessSection.jsx` e modifique o array de passos.

---

## 🔗 Integrações

| Componente | Integra com |
|------------|-------------|
| Hero | EventFilterModal |
| CtaSection | EventFilterModal |
| ServiceSection | Páginas de catálogo |
| ContactSection | Backend (futuro) |

---

## 🔮 Melhorias Futuras

- [ ] Usar filtros do modal para mostrar produtos personalizados
- [ ] Seção de promoções/destaques dinâmicos
- [ ] Integrar depoimentos com Google Reviews
- [ ] Analytics de cliques no CTA
