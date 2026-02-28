import AnimateIn from '../../shared/components/AnimateIn'
import LoginForm from './components/LoginForm'
import LoginVisual from './components/LoginVisual'

const Login = () => {
  return (
    <main className="min-h-screen flex">
      <AnimateIn animation="slide-in-left" className="w-full lg:w-1/2"><LoginForm /></AnimateIn>
      <AnimateIn animation="slide-in-right" delay={100} className="hidden lg:block w-1/2"><LoginVisual /></AnimateIn>
    </main>
  )
}

export default Login
