'use client'
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { TrendingUp, CheckCircle2, Quote } from "lucide-react"

export default function About() {
    const router = useRouter()

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Navbar />
            
            {/* Seção Hero: Democratizando a Liberdade Financeira */}
            <section className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-8 lg:py-24 border-b border-gray-900">
                
                {/* Lado Esquerdo: Conteúdo e Texto */}
                <div className="flex-1 lg:pr-12 text-center lg:text-left z-10">
                    <div className="inline-block px-3 py-1 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e] text-xs font-mono uppercase tracking-widest mb-6">
                        Aprendiz | Nickolas
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                        Democratizando a <span className="text-[#22c55e]">Liberdade Financeira</span>
                    </h1>

                    <p className="text-gray-400 mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl">
                        Acreditamos que o conhecimento é a chave. Por isso, simplificamos o mundo dos investimentos através de tecnologia e educação acessível para todos.
                    </p>

                    <div className="mt-10 flex justify-center lg:justify-start">
                        <button 
                            onClick={() => router.push('/pages/contact')} 
                            className="group relative bg-[#22c55e] text-black font-bold py-4 px-10 rounded-xl hover:bg-[#1da851] transition-all transform hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">Começar Jornada</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Lado Direito: Imagem com Glow Neon */}
                <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0 relative">
                    {/* Efeito de Aura Verde atrás da foto */}
                    <div className="absolute inset-0 bg-[#22c55e]/20 blur-[100px] rounded-full"></div>
                    
                    <div className="relative group">
                        <img 
                            src="/uploads/Nickolas.png" 
                            className="w-72 lg:w-80 rounded-3xl border-2 border-gray-800 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl relative z-10" 
                            alt="Nickolas Cremasco" 
                        />
                        
                        {/* Badge Flutuante de Status */}
                        <div className="absolute -bottom-4 -left-6 bg-[#0a0b10]/90 border border-gray-800 p-4 rounded-2xl shadow-xl z-20 backdrop-blur-sm hidden lg:block border-l-[#22c55e] border-l-4 transition-transform group-hover:-translate-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="text-[#22c55e]" size={18} />
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Status:</span>
                            </div>
                            <p className="text-xs font-bold text-white uppercase italic">Online & Analisando</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Depoimentos: Insight Wall */}
            <section className="max-w-screen-xl mx-auto py-20 px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4">Depoimentos</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto italic">
                        Pessoas que ajudamos a atingir sua liberdade financeira apenas compartilhando conhecimento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: Nickolas */}
                    <div className="bg-[#0a0b10] border border-gray-800 p-8 rounded-2xl hover:border-[#22c55e]/40 transition-all group relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-[#22c55e]/20 group-hover:text-[#22c55e]/40 transition-colors">
                            <Quote size={40} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <img src="/uploads/Nickolas.png" className="w-14 h-14 rounded-full border-2 border-[#22c55e] object-cover" alt="Nickolas" />
                            <div>
                                <div className="flex items-center gap-1">
                                    <h3 className="font-bold text-white">Nickolas Cremasco</h3>
                                    <CheckCircle2 size={14} className="text-[#22c55e]" />
                                </div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Founder | Dev</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed italic relative z-10">
                            "Aprender a investir mudou a minha vida! Com o conhecimento que adquiri, alcancei minha independência e hoje trabalho para divulgar esse conhecimento!"
                        </p>
                    </div>

                    {/* Card 2: Gisele */}
                    <div className="bg-[#0a0b10] border border-gray-800 p-8 rounded-2xl hover:border-[#22c55e]/40 transition-all group relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-[#22c55e]/20 group-hover:text-[#22c55e]/40 transition-colors">
                            <Quote size={40} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <img src="/uploads/gisele.jpeg" className="w-14 h-14 rounded-full border-2 border-[#22c55e] object-cover" alt="Gisele" />
                            <div>
                                <div className="flex items-center gap-1">
                                    <h3 className="font-bold text-white">Gisele S. Silva</h3>
                                    <CheckCircle2 size={14} className="text-[#22c55e]" />
                                </div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Client</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed italic relative z-10">
                            "Antes, eu não sabia como fazer meu dinheiro trabalhar para mim. Agora estou colhendo os frutos dos meus investimentos. A independência financeira não é mais um sonho, é realidade!"
                        </p>
                    </div>

                    {/* Card 3: Janete */}
                    <div className="bg-[#0a0b10] border border-gray-800 p-8 rounded-2xl hover:border-[#22c55e]/40 transition-all group relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-[#22c55e]/20 group-hover:text-[#22c55e]/40 transition-colors">
                            <Quote size={40} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <img src="/uploads/janete.png" className="w-14 h-14 rounded-full border-2 border-[#22c55e] object-cover" alt="Janete" />
                            <div>
                                <div className="flex items-center gap-1">
                                    <h3 className="font-bold text-white">Janete Rodrigues</h3>
                                    <CheckCircle2 size={14} className="text-[#22c55e]" />
                                </div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Client</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed italic relative z-10">
                            "Pensei que era tarde para investir, mas descobri que nunca é. Transformei minha aposentadoria em uma renda segura. Aproveito cada momento ao lado da minha família."
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}