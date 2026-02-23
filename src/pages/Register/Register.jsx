import AnimateIn from '../../shared/components/AnimateIn'
import RegisterForm from './components/RegisterForm'
import RegisterVisual from './components/RegisterVisual'

const Register = () => {
  return (
    <main className="min-h-screen flex">
      <AnimateIn animation="slide-in-left"><RegisterForm /></AnimateIn>
      <AnimateIn animation="slide-in-right" delay={100}><RegisterVisual /></AnimateIn>
    </main>
  )
}

export default Register
