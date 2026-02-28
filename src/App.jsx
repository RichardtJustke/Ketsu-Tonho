import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Sobre from './pages/Sobre/Sobre'
import Cases from './pages/Cases/Cases'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Contato from './pages/Contato/Contato'
import Tendas from './pages/Tendas/Tendas'
import Box from './pages/Box/Box'
import Moveis from './pages/Moveis/Moveis'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import PageTransition from './shared/components/PageTransition'
import Admin from './pages/Admin/Index.tsx'

function App() {
  const location = useLocation()

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/tendas" element={<Tendas />} />
        <Route path="/box" element={<Box />} />
        <Route path="/moveis" element={<Moveis />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/produto/:productId" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </PageTransition>
  )
}

export default App
