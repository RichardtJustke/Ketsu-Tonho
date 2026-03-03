import { useState, useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import ClimatizadoresGrid from './components/ClimatizadoresGrid'
import ContactSection from '../Moveis/components/ContactSection'
import { getHasAnsweredForm, subscribeAnsweredForm } from '../../utils/answeredForm'

const Climatizadores = () => {
    const [hasAnsweredForm, setHasAnsweredForm] = useState(getHasAnsweredForm)

    useEffect(() => subscribeAnsweredForm(setHasAnsweredForm), [])

    return (
        <main className="min-h-screen">
            <Navbar />

            <Hero />

            <ClimatizadoresGrid hasAnsweredForm={hasAnsweredForm} />

            <AnimateIn animation="fade-in-up">
                <ContactSection />
            </AnimateIn>

            <Footer />
        </main>
    )
}

export default Climatizadores
