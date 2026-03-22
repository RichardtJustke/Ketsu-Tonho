import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Sobre from './pages/Sobre/Sobre'
import Cases from './pages/Cases/Cases'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Tendas from './pages/Tendas/Tendas'
import Box from './pages/Box/Box'
import Moveis from './pages/Moveis/Moveis'
import Climatizadores from './pages/Climatizadores/Climatizadores'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import PageTransition from './shared/components/PageTransition'
import WhatsAppButton from './shared/components/WhatsAppButton'
import Admin from './pages/Admin/Index.tsx'
import { AppLayout } from './pages/Admin/components/AppLayout.tsx'
import AdminGuard from './pages/Admin/components/AdminGuard.tsx'
import AdminLogin from './pages/Admin/AdminLogin.tsx'
import TonhoDashboard from './pages/Admin/tonho/TonhoDashboard.tsx'
import TonhoEstoque from './pages/Admin/tonho/TonhoEstoque.tsx'
import TonhoProdutos from './pages/Admin/tonho/TonhoProdutos.tsx'
import TonhoVendas from './pages/Admin/tonho/TonhoVendas.tsx'
import TonhoEventos from './pages/Admin/tonho/TonhoEventos.tsx'
import TonhoOrcamentos from './pages/Admin/tonho/TonhoOrcamentos.tsx'
import TonhoCalendario from './pages/Admin/tonho/TonhoCalendario.tsx'
import ChicasDashboard from './pages/Admin/chicas/ChicasDashboard.tsx'
import ChicasServicos from './pages/Admin/chicas/ChicasServicos.tsx'
import ChicasDisponibilidade from './pages/Admin/chicas/ChicasDisponibilidade.tsx'
import ChicasEventos from './pages/Admin/chicas/ChicasEventos.tsx'
import ChicasOrcamentos from './pages/Admin/chicas/ChicasOrcamentos.tsx'
import ChicasCalendario from './pages/Admin/chicas/ChicasCalendario.tsx'
import ChicasCardapio from './pages/Admin/chicas/ChicasCardapio.tsx'
import Clientes from './pages/Admin/Clientes.tsx'
import CentralOrcamentos from './pages/Admin/CentralOrcamentos.tsx'
import Administracao from './pages/Admin/Administracao.tsx'
import Cupons from './pages/Admin/Cupons.tsx'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tendas" element={<Tendas />} />
          <Route path="/box" element={<Box />} />
          <Route path="/moveis" element={<Moveis />} />
          <Route path="/climatizadores" element={<Climatizadores />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/produto/:productId" element={<ProductDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><AppLayout><Admin /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho" element={<AdminGuard><AppLayout><TonhoDashboard /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/estoque" element={<AdminGuard><AppLayout><TonhoEstoque /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/produtos" element={<AdminGuard><AppLayout><TonhoProdutos /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/vendas" element={<AdminGuard><AppLayout><TonhoVendas /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/eventos" element={<AdminGuard><AppLayout><TonhoEventos /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/orcamentos" element={<AdminGuard><AppLayout><TonhoOrcamentos /></AppLayout></AdminGuard>} />
          <Route path="/admin/tonho/calendario" element={<AdminGuard><AppLayout><TonhoCalendario /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas" element={<AdminGuard><AppLayout><ChicasDashboard /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/cardapio" element={<AdminGuard><AppLayout><ChicasCardapio /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/servicos" element={<AdminGuard><AppLayout><ChicasServicos /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/disponibilidade" element={<AdminGuard><AppLayout><ChicasDisponibilidade /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/eventos" element={<AdminGuard><AppLayout><ChicasEventos /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/orcamentos" element={<AdminGuard><AppLayout><ChicasOrcamentos /></AppLayout></AdminGuard>} />
          <Route path="/admin/chicas/calendario" element={<AdminGuard><AppLayout><ChicasCalendario /></AppLayout></AdminGuard>} />
          <Route path="/admin/clientes" element={<AdminGuard><AppLayout><Clientes /></AppLayout></AdminGuard>} />
          <Route path="/admin/orcamentos" element={<AdminGuard><AppLayout><CentralOrcamentos /></AppLayout></AdminGuard>} />
          <Route path="/admin/cupons" element={<AdminGuard><AppLayout><Cupons /></AppLayout></AdminGuard>} />
          <Route path="/admin/administracao" element={<AdminGuard><AppLayout><Administracao /></AppLayout></AdminGuard>} />
        </Routes>
      </PageTransition>
      <WhatsAppButton />
    </>
  )
}

export default App
