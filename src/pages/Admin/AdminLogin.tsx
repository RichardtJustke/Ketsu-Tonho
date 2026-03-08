import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../integrations/supabase/client.js'
const logo = new URL('../../imagens/logo/logo original.png', import.meta.url).href

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !data.user) {
      setError('Email ou senha inválidos.')
      setLoading(false)
      return
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
      _user_id: data.user.id,
      _role: 'admin',
    })

    if (roleError || !isAdmin) {
      await supabase.auth.signOut()
      setError('Esta conta não possui acesso administrativo.')
      setLoading(false)
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white text-center mb-1">Painel Administrativo</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Entre com suas credenciais de administrador</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="admin@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#FF5F1F] hover:bg-[#e5541b] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              ← Voltar ao site
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
