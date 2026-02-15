# 📄 pages/ - Páginas da Aplicação

## 📋 O que é esta pasta?

A pasta `pages/` contém **todas as páginas** do site. Cada pasta representa uma rota/URL diferente da aplicação.

---

## 🗂️ Estrutura

```
pages/
├── Home/              # Página inicial (/)
├── Sobre/             # Sobre a empresa (/sobre)
├── Cases/             # Eventos realizados (/cases)
├── Contato/           # Formulário de contato (/contato)
├── Tendas/            # Catálogo de tendas (/tendas)
├── Box/               # Catálogo box truss (/box)
├── Moveis/            # Catálogo de móveis (/moveis)
├── ProductDetails/    # Detalhes do produto (/produto/:id)
├── Cart/              # Carrinho (/carrinho)
├── Login/             # Autenticação (/login)
└── Register/          # Cadastro (/register)
```

---

## 📐 Padrão de Estrutura de Página

Cada página segue a mesma estrutura:

```
NomeDaPagina/
├── NomeDaPagina.jsx    # Componente principal (OBRIGATÓRIO)
├── README.md           # Documentação da página
├── assets/             # Imagens e ícones locais
│   ├── icons/
│   └── images/
└── components/         # Componentes específicos desta página
    ├── Hero.jsx
    ├── Section1.jsx
    └── Section2.jsx
```

---

## 🔧 Estrutura Padrão do Componente Principal

```jsx
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
// ... outros componentes

const NomeDaPagina = () => {
  // Estados (se necessário)
  const [estado, setEstado] = useState(null)

  return (
    <main className="min-h-screen">
      {/* 1. Navbar - SEMPRE no topo */}
      <Navbar />
      
      {/* 2. Hero Section */}
      <Hero />
      
      {/* 3-N. Outras seções */}
      {/* ... */}
      
      {/* Último. Footer - SEMPRE no final */}
      <Footer />
    </main>
  )
}

export default NomeDaPagina
```

---

## 🛠️ Como Criar uma Nova Página

### 1. Crie a estrutura de pastas

```
src/pages/NovaPagina/
├── NovaPagina.jsx
├── README.md
└── components/
    └── Hero.jsx
```

### 2. Crie o componente principal (`NovaPagina.jsx`)

```jsx
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'

const NovaPagina = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* Adicione suas seções aqui */}
      <Footer />
    </main>
  )
}

export default NovaPagina
```

### 3. Crie o Hero (`components/Hero.jsx`)

```jsx
const Hero = () => {
  return (
    <section className="relative h-[60vh] bg-[#333333] flex items-center justify-center overflow-hidden">
      {/* Background ou imagem */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      
      {/* Conteúdo */}
      <div className="relative z-20 text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Título da Página
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Descrição da página
        </p>
      </div>
    </section>
  )
}

export default Hero
```

### 4. Registre a rota no `App.jsx`

```jsx
import NovaPagina from './pages/NovaPagina/NovaPagina'

// Dentro do <Routes>
<Route path="/nova-pagina" element={<NovaPagina />} />
```

### 5. Adicione ao menu (opcional)

Edite `shared/components/Navbar.jsx` para adicionar o link.

---

## 📚 Descrição de Cada Página

| Página | Rota | Descrição |
|--------|------|-----------|
| **Home** | `/` | Landing page com todas as seções de apresentação |
| **Sobre** | `/sobre` | História, métricas e valores da empresa |
| **Cases** | `/cases` | Galeria de eventos realizados |
| **Contato** | `/contato` | Formulário e informações de contato |
| **Tendas** | `/tendas` | Catálogo de tendas com cards clicáveis |
| **Box** | `/box` | Catálogo de estruturas box truss |
| **Moveis** | `/moveis` | Catálogo de móveis e equipamentos |
| **ProductDetails** | `/produto/:id` | Página de detalhes de qualquer produto |
| **Cart** | `/carrinho` | Carrinho de compras e finalização |
| **Login** | `/login` | Autenticação de usuários |
| **Register** | `/register` | Cadastro de novos usuários |

---

## 🔗 Links para READMEs das páginas

- [🏠 Home](./Home/README.md)
- [ℹ️ Sobre](./Sobre/README.md)
- [📸 Cases](./Cases/README.md)
- [📞 Contato](./Contato/README.md)
- [⛺ Tendas](./Tendas/README.md)
- [🎪 Box](./Box/README.md)
- [🪑 Móveis](./Moveis/README.md)
- [📦 ProductDetails](./ProductDetails/README.md)
- [🛒 Cart](./Cart/README.md)
- [🔐 Login](./Login/README.md)
- [📝 Register](./Register/README.md)
