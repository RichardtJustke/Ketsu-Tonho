import { Link } from 'react-router-dom'

const LoginVisual = () => {
  return (
    <div className="h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-bl-[40px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/10 rounded-bl-[40px]"></div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-8">
        <Link to="/admin/login" className="text-white text-sm font-medium hover:opacity-80 transition-opacity">Admin</Link>
        <a href="#" className="text-white text-sm font-medium hover:opacity-80 transition-opacity">Site</a>
        <a href="#" className="text-white text-sm font-medium hover:opacity-80 transition-opacity">Licença</a>
        <a href="#" className="text-white text-sm font-medium hover:opacity-80 transition-opacity">Termos de Uso</a>
      </div>
    </div>
  )
}

export default LoginVisual
