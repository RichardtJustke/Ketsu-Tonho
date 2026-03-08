import { useState } from 'react'
import { supabase } from '../../../integrations/supabase/client'

const PhoneModal = ({ userId, onSuccess, onClose }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setError('Informe um telefone válido com DDD.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', userId)
      if (updateError) throw updateError
      onSuccess(phone)
    } catch (err) {
      setError('Erro ao salvar telefone. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-[#2B3674] mb-1">Precisamos do seu telefone</h2>
        <p className="text-sm text-[#A3AED0] mb-4">
          Para entrarmos em contato sobre seu orçamento, informe seu número com DDD.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            required
            className="w-full px-4 py-2.5 border border-[#E0E5F2] rounded-2xl text-[#2B3674] text-sm placeholder-[#A3AED0] focus:outline-none focus:border-[#FF5F1F] transition-colors mb-4"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#E0E5F2] rounded-2xl text-[#2B3674] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-[#FF5F1F] rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhoneModal
