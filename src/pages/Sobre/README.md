# ℹ️ Sobre/ - Página Sobre a Empresa

## 📋 O que é esta página?

A página **Sobre** apresenta a história, valores e diferenciais da Tonho Locação.

**Rota:** `/sobre`

---

## 🗂️ Estrutura

```
Sobre/
├── Sobre.jsx             # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── Hero.jsx              # Banner "Sobre a Tonho"
    ├── HistorySection.jsx    # História da empresa
    ├── MetricsSection.jsx    # Números (eventos, anos, etc.)
    ├── ValuesSection.jsx     # Valores e missão
    ├── TeamSection.jsx       # Equipe (opcional)
    ├── ExperienceSection.jsx # Experiência e atuação
    └── ContactSection.jsx    # Seção de contato
```

---

## 🧩 Seções

### `MetricsSection.jsx` - Números da Empresa

**Métricas típicas:**
```jsx
const metrics = [
  { number: '10+', label: 'Anos de experiência' },
  { number: '500+', label: 'Eventos realizados' },
  { number: '100%', label: 'Satisfação dos clientes' },
  { number: '24h', label: 'Suporte disponível' }
]
```

### `ValuesSection.jsx` - Missão e Valores

**Conteúdo:**
- **Missão:** Proporcionar a melhor experiência em locação
- **Visão:** Ser referência em Belém
- **Valores:** Qualidade, Pontualidade, Atendimento

---

## 🛠️ Como Modificar

### Atualizar métricas

Edite `components/MetricsSection.jsx`:
```jsx
const metrics = [
  { number: '15+', label: 'Anos no mercado' },
  // ...
]
```

### Mudar história

Edite `components/HistorySection.jsx` e atualize o texto.

---

## 🔮 Melhorias Futuras

- [ ] Timeline interativa da história
- [ ] Galeria de fotos da equipe
- [ ] Certificações e prêmios
- [ ] Depoimentos de parceiros
