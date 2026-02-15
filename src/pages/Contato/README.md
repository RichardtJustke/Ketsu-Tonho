# 📞 Contato/ - Página de Contato

## 📋 O que é esta página?

A página **Contato** oferece formulário de contato e informações para o cliente entrar em contato com a Tonho Locação.

**Rota:** `/contato`

---

## 🗂️ Estrutura

```
Contato/
├── Contato.jsx           # Componente principal
├── README.md             # Esta documentação
└── components/
    ├── Hero.jsx              # Banner "Entre em Contato"
    ├── ContactForm.jsx       # Formulário de contato
    ├── ContactInfo.jsx       # Informações (tel, email, etc)
    └── ContactMap.jsx        # Mapa de localização
```

---

## 🧩 Componentes

### `ContactForm.jsx` - Formulário

**Campos:**
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  message: ''
})
```

**Lógica de envio (futuro):**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // TODO: Enviar para backend
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
  
  // TODO: Mostrar mensagem de sucesso
}
```

---

### `ContactInfo.jsx` - Informações

**Dados exibidos:**
- 📞 Telefone/WhatsApp
- 📧 Email
- 📍 Endereço
- ⏰ Horário de funcionamento

---

### `ContactMap.jsx` - Mapa

**Opções de implementação:**
1. Google Maps Embed
2. Google Maps API
3. Imagem estática do mapa

---

## 🛠️ Como Modificar

### Atualizar informações de contato

Edite `ContactInfo.jsx`:
```jsx
const contactInfo = {
  phone: '(91) 99999-9999',
  email: 'contato@tonholocacao.com.br',
  address: 'Rua X, Nº Y - Bairro, Belém/PA'
}
```

### Adicionar novo campo ao formulário

1. Adicione ao state `formData`
2. Adicione o input no JSX
3. Adicione validação se necessário

---

## 🔮 Melhorias Futuras

- [ ] Integração com backend para envio de emails
- [ ] Validação de campos em tempo real
- [ ] Integração com WhatsApp Business API
- [ ] Chatbot para atendimento inicial
- [ ] Agendamento de visita técnica
