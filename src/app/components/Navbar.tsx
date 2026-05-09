'use client'

import { Home, Menu, X, LogOut, BriefcaseBusiness, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
    const router = useRouter()
    const logoRef = useRef<HTMLHeadingElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Efeito GSAP para o Logo
    useEffect(() => {
        const chars = logoRef.current?.querySelectorAll('.char')
        if (chars) {
            gsap.fromTo(chars, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
            )
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        setIsAuthenticated(!!token)
        setIsLoading(false)
    }, [])

    // Função auxiliar para quebrar o texto em letras individuais com span
    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
        ))
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-[#000000] border-b border-gray-900">
            <div className="flex items-center justify-between py-4 px-6 md:px-10 max-w-screen-xl mx-auto">
                
                {/* Logo com GSAP Typewriter */}
                <button 
                    onClick={() => router.push('/')} 
                    className="flex items-center gap-2 text-white font-bold text-xl"
                >
                    <img src="/uploads/logo.png" alt="logo" className="w-8 h-8" />
                    <h1 ref={logoRef} className="flex">
                        {splitText("Fincodes")}
                        <span className="text-[#22c55e] flex">{splitText("Tech")}</span>
                    </h1>
                </button>

                {/* Mobile Toggle */}
                <button className="sm:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <nav className={`
                    ${isMenuOpen ? 'flex' : 'hidden'} 
                    sm:flex flex-col sm:flex-row 
                    absolute sm:static top-full left-0 w-full 
                    bg-[#000000] sm:bg-transparent 
                    border-b sm:border-0 border-gray-900 
                    p-6 sm:p-0 
                    items-center 
                    gap-6 
                    sm:flex-1 sm:justify-end /* <--- ISSO RESOLVE A SOBREPOSIÇÃO */
                `}>
                    
                    <ul className="flex flex-col sm:flex-row gap-6 sm:gap-8 font-medium text-gray-400">
                        <li>
                            <button onClick={() => { router.push('/'); setIsMenuOpen(false) }} className='flex items-center gap-2 hover:text-[#22c55e] transition-colors'>
                                <Home size={18}/> Inicial
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { router.push('/pages/contact'); setIsMenuOpen(false) }} className='flex items-center gap-2 hover:text-[#22c55e] transition-colors'>
                                <BriefcaseBusiness size={18}/> Projetos
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { router.push('/pages/about'); setIsMenuOpen(false) }} className='flex items-center gap-2 hover:text-[#22c55e] transition-colors'>
                                <Info size={18}/> Sobre
                            </button>
                        </li>
                    </ul>

                    {/* O container do botão não precisa mais de border-t, pois o flex resolve o alinhamento */}
                    <div className="sm:pl-6 pt-4 sm:pt-0">
                        {isLoading ? (
                            <div className="w-20 h-8 animate-pulse bg-gray-900 rounded-lg" />
                        ) : (
                            isAuthenticated ? (
                                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all font-semibold">
                                    <LogOut size={18}/> Sair
                                </button>
                            ) : (
                                <button onClick={() => { router.push('/pages/login'); setIsMenuOpen(false) }} className="bg-[#22c55e] hover:bg-[#1da851] text-black px-6 py-2 rounded-full font-bold transition-all hover:scale-105 whitespace-nowrap">
                                    Acessar Conta
                                </button>
                            )
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}