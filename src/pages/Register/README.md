# 📝 Register/ - Página de Cadastro

## 📋 O que é esta página?

A página **Register** permite que novos usuários criem uma conta no sistema.

**Rota:** `/register`

---

## 🗂️ Estrutura

```
Register/
├── Register.jsx          # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── RegisterForm.jsx      # Formulário de cadastro
    └── RegisterVisual.jsx    # Imagem/visual lateral
```

---

## 🧩 Componentes

### `RegisterForm.jsx` - Formulário

**Campos:**
```jsx
const [userData, setUserData] = useState({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})
```

**Validações:**
```jsx
// Validar email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Validar senha forte
const isStrongPassword = (password) => password.length >= 8

// Validar confirmação
const passwordsMatch = userData.password === userData.confirmPassword
```

**Lógica de registro (futuro):**
```jsx
const handleRegister = async (e) => {
  e.preventDefault()
  
  // Validações
  if (!passwordsMatch) {
    setError('Senhas não conferem')
    return
  }
  
  // TODO: Enviar para backend
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
  
  if (response.ok) {
    navigate('/login')
  }
}
```

---

## 🛠️ Campos do Formulário

| Campo | Tipo | Validação |
|-------|------|-----------|
| Nome | text | Obrigatório, mín. 3 caracteres |
| Email | email | Formato válido, único |
| Telefone | tel | Formato (XX) XXXXX-XXXX |
| Senha | password | Mín. 8 caracteres |
| Confirmar Senha | password | Deve ser igual à senha |

---

## 🔮 Implementação Futura

### Fluxo de Registro

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Usuario │───>│ Valida  │───>│   API   │───>│ Redirecio│
│ preenche│    │ campos  │    │ cria    │    │ na p/   │
│  form   │    │ front   │    │ usuario │    │ login   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Dados a serem salvos
```javascript
// Estrutura do usuário no banco
{
  id: 'uuid',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(91) 99999-9999',
  password: 'hash_bcrypt',
  createdAt: 'timestamp',
  orders: []  // Histórico de pedidos
}
```

---

## ⚠️ Status Atual

**🚧 Em desenvolvimento**

- Layout visual implementado
- Validações de frontend prontas
- Integração com backend pendente
