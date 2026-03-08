import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../shared/contexts/AuthContext.jsx'
import { supabase } from '../../../integrations/supabase/client.js'

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      setIsAdmin(false)
      setChecking(false)
      return
    }

    const checkRole = async () => {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      })
      setIsAdmin(error ? false : !!data)
      setChecking(false)
    }

    checkRole()
  }, [user, authLoading])

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white gap-4">
        <h1 className="text-2xl font-bold">Acesso Negado</h1>
        <p className="text-gray-400">Você não tem permissão para acessar esta área.</p>
        <a href="/" className="text-orange-500 hover:underline">Voltar ao site</a>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminGuard
