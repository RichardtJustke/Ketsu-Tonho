import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../integrations/supabase/client'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isRecovery, setIsRecovery] = useState(false)

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash
    if (hash.includes('type=recovery')) {
      setIsRecovery(true)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) { setError('As senhas não coincidem.'); return }
    if (password.length < 8) { setError('A senha deve ter no mínimo 8 caracteres.'); return }
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] px-6">
        <div className="max-w-md text-center">
          <h1 className="text-[#2B3674] text-2xl font-bold mb-4">Link inválido</h1>
          <p className="text-[#A3AED0] text-sm mb-6">Este link de recuperação é inválido ou expirou.</p>
          <Link to="/login" className="text-[#FF5F1F] font-medium hover:opacity-80">Voltar para o Login</Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] px-6">
        <div className="max-w-md text-center">
          <h1 className="text-[#2B3674] text-2xl font-bold mb-4">Senha alterada!</h1>
          <p className="text-[#A3AED0] text-sm mb-6">Sua senha foi atualizada com sucesso. Redirecionando para o login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] px-6">
      <form onSubmit={handleReset} className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-[#2B3674] text-2xl font-bold mb-2">Nova senha</h1>
        <p className="text-[#A3AED0] text-sm mb-6">Digite sua nova senha abaixo.</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-4">
          <label className="block text-[#2B3674] text-sm font-medium mb-1.5">Nova senha</label>
          <input
            type="password"
            placeholder="Min. 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 border border-[#E0E5F2] rounded-xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#2B3674] text-sm font-medium mb-1.5">Confirmar senha</label>
          <input
            type="password"
            placeholder="Repita a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-[#E0E5F2] rounded-xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#FF5F1F] rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Atualizando...' : 'Atualizar senha'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
