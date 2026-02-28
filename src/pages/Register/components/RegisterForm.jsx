import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../integrations/supabase/client'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!keepLoggedIn) { setError('Você precisa aceitar os Termos e Política de Privacidade.'); return }
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: window.location.origin
        }
      })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  if (success) {
    return (
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center px-6 py-6 lg:px-16 lg:py-8">
        <div className="max-w-[420px] text-center">
          <h1 className="text-[#2B3674] text-3xl font-bold mb-4">Verifique seu email!</h1>
          <p className="text-[#A3AED0] text-sm mb-6">Enviamos um link de confirmação para <strong className="text-[#2B3674]">{email}</strong>. Clique no link para ativar sua conta.</p>
          <Link to="/login" className="text-[#FF5F1F] font-medium hover:opacity-80 transition-opacity">
            Voltar para o Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-1/2 h-screen flex flex-col justify-between px-6 py-6 lg:px-16 lg:py-8 overflow-hidden">
      {/* Voltar */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#A3AED0] text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 1L1.5 6L6.5 11" stroke="#A3AED0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </Link>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSignUp} className="flex-1 flex flex-col justify-center max-w-[420px]">
        <h1 className="text-[#2B3674] text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-[#A3AED0] text-sm mb-5">Enter your details to create an account!</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Botão Google */}
        <button type="button" onClick={handleGoogleSignUp} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#F4F7FE] rounded-2xl text-[#2B3674] text-sm font-medium hover:bg-[#eef2fc] transition-colors mb-4">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1711 8.36788H17.5V8.33329H9.99996V11.6666H14.7095C14.0225 13.607 12.1761 15 9.99996 15C7.23871 15 4.99996 12.7612 4.99996 9.99996C4.99996 7.23871 7.23871 4.99996 9.99996 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6741 3.90913C14.1858 2.52204 12.195 1.66663 9.99996 1.66663C5.39788 1.66663 1.66663 5.39788 1.66663 9.99996C1.66663 14.602 5.39788 18.3333 9.99996 18.3333C14.602 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2757 8.89579 18.1711 8.36788Z" fill="#FFC107" />
            <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6741 3.90913C14.1858 2.52204 12.1949 1.66663 9.99994 1.66663C6.79911 1.66663 4.02328 3.47371 2.62744 6.12121Z" fill="#FF3D00" />
            <path d="M10 18.3333C12.1525 18.3333 14.1083 17.5095 15.5871 16.17L13.008 13.9875C12.1431 14.6451 11.0864 15.0008 10 15C7.83246 15 5.99163 13.6179 5.29913 11.6891L2.58163 13.7829C3.96079 16.4816 6.76163 18.3333 10 18.3333Z" fill="#4CAF50" />
            <path d="M18.1712 8.36788H17.5V8.33329H10V11.6666H14.7096C14.3809 12.5901 13.7889 13.3971 13.0067 13.988L13.008 13.9871L15.587 16.1696C15.4046 16.3354 18.3333 14.1666 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1712 8.36788Z" fill="#1976D2" />
          </svg>
          Sign up with Google
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-[#E0E5F2]"></div>
          <span className="text-[#A3AED0] text-sm">or</span>
          <div className="flex-1 h-px bg-[#E0E5F2]"></div>
        </div>

        {/* Campo Nome */}
        <div className="mb-3">
          <label className="block text-[#2B3674] text-sm font-medium mb-1.5">
            Name<span className="text-[#FF5F1F]">*</span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-transparent border border-[#E0E5F2] rounded-2xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label className="block text-[#2B3674] text-sm font-medium mb-1.5">
            Email<span className="text-[#FF5F1F]">*</span>
          </label>
          <input
            type="email"
            placeholder="mail@simmmple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-transparent border border-[#E0E5F2] rounded-2xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
        </div>

        {/* Campo Password */}
        <div className="mb-3">
          <label className="block text-[#2B3674] text-sm font-medium mb-1.5">
            Password<span className="text-[#FF5F1F]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2.5 bg-transparent border border-[#E0E5F2] rounded-2xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3AED0] hover:text-[#2B3674] transition-colors"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms agreement */}
        <div className="flex items-center mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${keepLoggedIn ? 'bg-[#FF5F1F]' : 'border border-[#E0E5F2]'}`}
              onClick={() => setKeepLoggedIn(!keepLoggedIn)}
            >
              {keepLoggedIn && (
                <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[#2B3674] text-sm font-medium">I agree to the Terms and Privacy Policy</span>
          </label>
        </div>

        {/* Botão Create Account */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#FF5F1F] rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-opacity mb-4 disabled:opacity-50"
        >
          {loading ? 'Criando conta...' : 'Create Account'}
        </button>

        {/* Sign In */}
        <p className="text-[#2B3674] text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FF5F1F] font-medium hover:opacity-80 transition-opacity">
            Sign In
          </Link>
        </p>
      </form>

      {/* Footer - Info da empresa */}
      <div className="pt-4">
        <p className="text-[#A3AED0] text-xs">
          © 2025 Tonho Locação. Todos os direitos reservados. CNPJ: XX.XXX.XXX/XXXX-XX
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
