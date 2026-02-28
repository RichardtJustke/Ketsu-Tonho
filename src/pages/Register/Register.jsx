import AnimateIn from '../../shared/components/AnimateIn'
import RegisterForm from './components/RegisterForm'
import RegisterVisual from './components/RegisterVisual'

const Register = () => {
  return (
    <main className="min-h-screen flex">
      <AnimateIn animation="slide-in-left" className="w-full lg:w-1/2"><RegisterForm /></AnimateIn>
      <AnimateIn animation="slide-in-right" delay={100} className="hidden lg:block w-1/2"><RegisterVisual /></AnimateIn>
    </main>
  )
}

export default Register
