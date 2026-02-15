# 🎪 Tonho Locação - Sistema Web de Locação de Eventos

## 📋 Sobre o Projeto

O **TonhoReact** é a modernização completa do site da **Tonho Locação**, uma empresa especializada em locação de equipamentos para eventos em Belém do Pará. O objetivo principal é transformar a experiência do cliente, permitindo que ele navegue pelo catálogo, monte seu orçamento e **saia com o evento fechado**, algo que o site antigo não proporcionava.

### 🎯 Conceito Principal

> **Modernizar e automatizar** todo o processo de locação, eliminando a necessidade de contato manual inicial. O cliente pode explorar os produtos, visualizar preços, adicionar itens ao carrinho e gerar seu orçamento de forma autônoma — tornando o processo mais ágil tanto para o cliente quanto para a empresa.

---

## 🚀 Diferenciais em Relação ao Site Antigo

| Funcionalidade | Site Antigo | Novo Site |
|---------------|-------------|-----------|
| Catálogo de produtos | Estático e limitado | Completo com detalhes e especificações |
| Preços | Não disponíveis | Visíveis por produto |
| Carrinho de compras | Inexistente | Totalmente funcional |
| Orçamento automático | Manual (via WhatsApp) | Gerado automaticamente |
| Filtro de produtos | Inexistente | Por categoria e tipo de evento |
| Responsividade | Parcial | 100% responsivo |
| Experiência do usuário | Básica | Moderna e interativa |

---

## 🔄 Fluxo do Serviço Web

O fluxo foi projetado para guiar o cliente desde a descoberta até o fechamento do evento:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           JORNADA DO CLIENTE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

1️⃣ DESCOBERTA
   │
   ├── Acessa o site (Home)
   ├── Conhece a empresa (Sobre)
   └── Vê eventos anteriores (Cases)
   
2️⃣ DEFINIÇÃO DO EVENTO
   │
   ├── Responde o filtro inteligente:
   │   • Onde será o evento? (localização)
   │   • Quantas pessoas? (estimativa de convidados)
   │   • Quando será? (data do evento)
   │
   └── Sistema sugere produtos ideais

3️⃣ EXPLORAÇÃO DO CATÁLOGO
   │
   ├── Navega pelas categorias:
   │   • Tendas (brancas, cristal, temáticas)
   │   • Box Truss (pórticos, backdrops, estruturas)
   │   • Móveis (mesas, cadeiras, decorativas)
   │   • Climatizadores
   │   • Eletrônicos (TV, som, microfones)
   │   • Cozinha (fogão, frigobar, bebedouro)
   │
   └── Visualiza detalhes de cada produto

4️⃣ MONTAGEM DO ORÇAMENTO
   │
   ├── Adiciona produtos ao carrinho
   ├── Ajusta quantidades
   ├── Aplica cupom de desconto (se houver)
   └── Visualiza valor total + taxa de instalação

5️⃣ FINALIZAÇÃO
   │
   ├── Preenche informações de contato
   ├── Adiciona observações especiais
   └── Gera orçamento final

6️⃣ FECHAMENTO DO EVENTO
   │
   ├── Equipe Tonho entra em contato
   ├── Confirma detalhes do evento
   └── Data e horário de montagem confirmados
```

---

## 📁 Estrutura do Projeto

```
TonhoReact/
├── public/                    # Arquivos estáticos
├── src/
│   ├── App.jsx               # Configuração de rotas
│   ├── main.jsx              # Ponto de entrada
│   ├── index.css             # Estilos globais
│   │
│   ├── data/
│   │   └── products.js       # Banco de dados de produtos
│   │
│   ├── pages/
│   │   ├── Home/             # Página inicial
│   │   ├── Sobre/            # Sobre a empresa
│   │   ├── Cases/            # Eventos realizados
│   │   ├── Contato/          # Formulário de contato
│   │   ├── Tendas/           # Catálogo de tendas
│   │   ├── Box/              # Catálogo de box truss
│   │   ├── Moveis/           # Catálogo de móveis
│   │   ├── ProductDetails/   # Detalhes do produto
│   │   ├── Cart/             # Carrinho e orçamento
│   │   ├── Login/            # Autenticação
│   │   └── Register/         # Cadastro
│   │
│   └── shared/
│       └── components/
│           ├── Navbar.jsx           # Navegação principal
│           ├── Footer.jsx           # Rodapé
│           ├── EventFilterModal.jsx # Filtro inteligente de eventos
│           └── PageTransition.jsx   # Animações de transição
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📦 Categorias de Produtos

### 🏕️ Tendas
- **Tendas Brancas**: 3x3m, 4x4m, 5x5m, 6x6m, 8x8m, 9x6m, 10x10m
- **Tendas Cristal**: 3x3m, 4x4m, 5x5m, 6x6m, 10x10m
- **Tendas Temáticas**: Paysandu, Remo
- **Tendas Especiais**: Pé d'Água, Box Struss

### 🎪 Box Truss
- Pórtico de Entrada (6m x 4,6m)
- Tenda Box Truss 9x6
- Backdrop 3x2

### 🪑 Móveis
- Cadeiras e Mesas (avulsas e em conjuntos)
- Mesas Bistrô e Banquetas
- Mesas Decorativas
- Mesas de Reunião

### ❄️ Climatização
- Climatizador Guarujá (100L)
- Climatizador Joape 110v
- Climabrisa BR30 (150L)
- Climabrisa Portátil i20

### 📺 Eletrônicos
- TV 55" com Suporte
- Notebook e Impressora
- Microfones (com e sem fio)
- Caixas de Som (simples e vertical 600W)

### 🍳 Cozinha
- Fogão Industrial Progas
- Frigobar 90L
- Cafeteira Dolce Gusto
- Bebedouro e Micro-ondas
- Caixa Térmica 360L

---

## 🛒 Funcionalidade do Carrinho

O carrinho permite ao cliente:

1. **Visualizar produtos selecionados** com imagem, nome e preço
2. **Ajustar quantidades** diretamente no carrinho
3. **Remover itens** indesejados
4. **Aplicar cupom de desconto** (se disponível)
5. **Ver resumo financeiro**:
   - Subtotal dos produtos
   - Taxa de instalação (R$ 300,00)
   - Descontos aplicados
   - **Total final**
6. **Adicionar observações** sobre o evento
7. **Finalizar o orçamento** com dados de contato

---

## 🎨 Design System

### Cores Principais
- **Laranja** (CTA): `#FF5F1F`
- **Cinza Escuro** (Texto): `#333333`
- **Cinza Claro** (Background): `#F7F7F8`
- **Branco**: `#FFFFFF`

### Tipografia
- **Títulos**: Inter Bold
- **Corpo**: Inter Regular
- **Botões**: Inter Semibold

### Componentes
- **Botões**: `rounded-full` com hover states
- **Cards**: `rounded-2xl` com sombras sutis
- **Inputs**: `rounded-xl` com bordas suaves

---

## ⚙️ Tecnologias Utilizadas

- **React 18** - Biblioteca de UI
- **React Router DOM** - Navegação SPA
- **Tailwind CSS** - Estilização
- **Vite** - Build tool e dev server
- **ESLint** - Linting de código

---

## 🚀 Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/RichardtJustke/Ketsu-Tonho.git

# 2. Acesse a pasta do projeto
cd Ketsu-Tonho/TonhoReact

# 3. Instale as dependências
npm install

# 4. Execute o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:5173
```

---

## 📱 Páginas e Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Página inicial com apresentação |
| `/sobre` | Sobre | História e informações da empresa |
| `/cases` | Cases | Galeria de eventos realizados |
| `/contato` | Contato | Formulário e informações de contato |
| `/tendas` | Tendas | Catálogo de tendas |
| `/box` | Box Truss | Catálogo de estruturas box truss |
| `/moveis` | Móveis | Catálogo de móveis e equipamentos |
| `/produto/:id` | Detalhes | Página de detalhes do produto |
| `/carrinho` | Carrinho | Carrinho e finalização de orçamento |
| `/login` | Login | Autenticação de usuários |
| `/register` | Cadastro | Registro de novos usuários |

---

## 📈 Próximas Funcionalidades

...

> **Nota:** Todo o projeto está sendo desenvolvido com **tecnologias modernas** visando a **máxima compatibilidade** com diferentes dispositivos e navegadores, garantindo uma experiência fluida tanto em desktop quanto em mobile.

---

## 🏢 Sobre a Ketsu

...
site em breve

### 🚀 Nosso Primeiro Projeto

O **TonhoReact** marca o **início da jornada da Ketsu** no mercado de desenvolvimento web. Este projeto representa mais do que apenas uma modernização de site — é a prova do nosso compromisso com:

- ✅ **Qualidade** - Código limpo, organizado e bem documentado
- ✅ **Inovação** - Uso das tecnologias mais modernas do mercado
- ✅ **Resultado** - Foco em entregar valor real para o cliente
- ✅ **Experiência** - Interface intuitiva e agradável para o usuário final

### 💡 Nossa Missão

Transformar ideias em soluções digitais que **realmente funcionam** e **fazem a diferença** no dia a dia dos nossos clientes. A Tonho Locação confiou em nós para dar esse primeiro passo, e estamos entregando um sistema completo que vai revolucionar a forma como eles fazem negócios.

### 🎯 Por que escolher a Ketsu?

| Diferencial | O que oferecemos |
|------------|------------------|
| **Tecnologia Moderna** | React, Node.js, e as melhores práticas do mercado |
| **Design Responsivo** | Funciona perfeitamente em qualquer dispositivo |
| **Código Escalável** | Estrutura preparada para crescer junto com o negócio |
| **Suporte Contínuo** | Acompanhamento e manutenção pós-entrega |

---

## 👨‍💻 Desenvolvedores

<div align="center">

### Equipe Ketsu

| Desenvolvedor | GitHub | Função |
|--------------|--------|--------|
| **Richard Justke** | [![GitHub](https://img.shields.io/badge/RichardtJustke-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/RichardtJustke) | Fundador & Full Stack Developer |
| **Luis Eduardo** | [![GitHub](https://img.shields.io/badge/LLSWE-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/LLSWE) | Full Stack Developer |

</div>

### 🤝 Contribuições

Este projeto foi desenvolvido com dedicação e paixão pela equipe Ketsu:

- **[@RichardtJustke](https://github.com/RichardtJustke)** - Arquitetura do projeto, desenvolvimento frontend, banco de dados de produtos, design system e documentação.

- **[@LLSWE](https://github.com/LLSWE)** - Desenvolvimento de componentes, implementação de funcionalidades e otimizações.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  
  ### 🎪 Tonho Locação × Ketsu
  
  <p><strong>Primeiro projeto. Primeira conquista.</strong></p>
  
  <p>Desenvolvido com ❤️ e ☕ por <strong>Ketsu</strong></p>
  
  <p>
    <a href="https://github.com/RichardtJustke">
      <img src="https://img.shields.io/badge/Richard-Justke-FF5F1F?style=flat-square&logo=github" alt="Richard"/>
    </a>
    <a href="https://github.com/LLSWE">
      <img src="https://img.shields.io/badge/Luis-Eduardo-FF5F1F?style=flat-square&logo=github" alt="Luis"/>
    </a>
  </p>
  
  <p>© 2026 Tonho Locação - Todos os direitos reservados</p>
  <p><sub>Projeto desenvolvido pela <strong>Ketsu</strong> 🚀</sub></p>
  
</div>
