# 🔐 Login/ - Página de Autenticação

## 📋 O que é esta página?

A página **Login** permite que usuários existentes acessem suas contas.

**Rota:** `/login`

---

## 🗂️ Estrutura

```
Login/
├── Login.jsx             # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── LoginForm.jsx         # Formulário de login
    └── LoginVisual.jsx       # Imagem/visual lateral
```

---

## 🧩 Componentes

### `LoginForm.jsx` - Formulário

**Campos:**
```jsx
const [credentials, setCredentials] = useState({
  email: '',
  password: ''
})
```

**Lógica de login (futuro):**
```jsx
const handleLogin = async (e) => {
  e.preventDefault()
  
  // TODO: Implementar autenticação
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  
  if (response.ok) {
    const { token } = await response.json()
    localStorage.setItem('token', token)
    navigate('/')
  }
}
```

---

### `LoginVisual.jsx` - Visual

**O que faz:** Exibe imagem decorativa ao lado do formulário (layout split-screen).

---

## 🛠️ Estrutura do Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌──────────────┐    ┌──────────────────────┐  │
│  │              │    │                      │  │
│  │   Imagem     │    │   Formulário         │  │
│  │   Visual     │    │   - Email            │  │
│  │              │    │   - Senha            │  │
│  │              │    │   - Botão Entrar     │  │
│  │              │    │   - Link "Cadastrar" │  │
│  └──────────────┘    └──────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔮 Implementação Futura

### Fluxo de Autenticação

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Usuario │───>│  Login  │───>│   API   │───>│  Token  │
│  entra  │    │  form   │    │ valida  │    │ salvo   │
│  dados  │    │ submit  │    │ creds   │    │ local   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Tecnologias sugeridas
- JWT para tokens
- bcrypt para senhas
- Refresh tokens para sessões longas

---

## ⚠️ Status Atual

**🚧 Em desenvolvimento**

- Layout visual implementado
- Lógica de autenticação pendente (backend necessário)
- Validações básicas funcionando
