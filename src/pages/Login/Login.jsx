import AnimateIn from '../../shared/components/AnimateIn'
import LoginForm from './components/LoginForm'
import LoginVisual from './components/LoginVisual'

const Login = () => {
  return (
    <main className="min-h-screen flex">
      <AnimateIn animation="slide-in-left"><LoginForm /></AnimateIn>
      <AnimateIn animation="slide-in-right" delay={100}><LoginVisual /></AnimateIn>
    </main>
  )
}

export default Login
