'use client'
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default function About() {
    const router = useRouter()

    return (
        <>
            <div><br/></div>
            <Navbar/>
            <section className="max-w-screen-xl w-full bg-gradient-to-r from-sky-900 to-sky-950 mx-auto flex flex-col lg:flex-row items-center justify-between border-t border-sky-800 p-8 lg:p-12">
                {/* Left Content */}
                <div className="flex-1 lg:pr-8 lg:ml-5 text-center lg:text-left ">

                    <h3 className="text-sm text-yellow-300 uppercase tracking-widest">Aprendiz | Nickolas</h3>

                    <h1 className="text-3xl lg:text-4xl font-bold text-white mt-4">Temos o Objetivo de Mostrar Como Investir  pode Ser Fácil para Qualquer Tipo De Pessoa!</h1>

                    <h2 className="text-white mt-4 text-lg lg:text-xl leading-relaxed">Acreditamos que o conhecimento é a chave para a liberdade financeira. Por isso, estamos aqui para simplificar o mundo dos investimentos e torná-lo acessível a todos.</h2>

                    <button onClick={() => router.push('/pages/contact')} className="text-sky-950 font-semibold mt-6 bg-yellow-400 p-3 px-8 rounded-lg hover:bg-yellow-500 hover:scale-105 transition-all transform">
                        Começe a Investir Hoje!
                    </button>

                </div>
                {/* Right Content */}
                <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
                    <img src="/uploads/Nickolas.png" className="w-64 border-4 shadow-2xl hover:shadow-cyan-500/50 transition-shadow duration-300 mr-24 bg-gradient-to-r from-cyan-400 to-cyan-700 rounded-3xl" alt="Website Creator" />
                </div>
            </section>
            {/* Testimonials Section */}
            <section className="max-w-screen-xl mx-auto p-8 lg:p-12 bg-white shadow-2xl mt-8">
                <div className="text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-sky-950">Depoimentos</h1>
                    <h2 className="text-gray-600 mt-4 text-lg lg:text-xl">
                        Pessoas que ajudamos a atingir sua liberdade financeira com apenas compartilhando conhecimento
                    </h2>
                </div>
                {/* People */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {/* 1 Person */}
                    <div className="bg-gray-50 p-6 shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300">
                        <div className="flex items-center gap-4 ">
                            <img src="/uploads/Nickolas.png" className="w-16 h-16 border-4 border-cyan-400 rounded-full" alt="Testemunho 1" />
                            <h3 className="font-bold text-xl text-sky-950">Nickolas Cremasco</h3>
                        </div>
                        <p className="text-gray-950 mt-4">
                            "Aprender a investir mudou a minha vida! Com o conhecimento que adquiri, consegui alcançar minha independencia financeira e hoje trabalho em busca de divulgar esse conhecimento!"
                        </p>
                    </div>

                {/* 2 Person */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <img 
                                src="/uploads/gisele.jpeg" 
                                className="w-16 h-16 border-4 border-cyan-400 rounded-full" 
                                alt="Nickolas Cremasco" 
                            />
                            <h3 className="font-bold text-xl text-sky-950">Gisele S. Silva</h3>
                        </div>
                        <p className="text-gray-600 mt-4">
                            "Antes, eu não sabia como fazer meu dinheiro trabalhar para mim. Agora, com as estratégias que aprendi, estou colhendo os frutos dos meus investimentos. A independência financeira não é mais um sonho, é a minha realidade!"
                        </p>
                    </div>


                    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <img 
                                src="/uploads/janete.png" 
                                className="w-16 h-16 border-4 border-cyan-400 rounded-full" 
                                alt="Nickolas Cremasco" 
                            />
                            <h3 className="font-bold text-xl text-sky-950">Janete Rodrigues</h3>
                        </div>
                        <p className="text-gray-600 mt-4">
                            "Pensei que era tarde para investir, mas descobri que nunca é. Com o conhecimento que adquiri, transformei minha aposentadoria em uma renda segura. Agora, vivo com mais tranquilidade e independência, aproveitando cada momento ao lado da minha família."
                        </p>
                    </div>

                </div>
            </section>
            <Footer/>
            <div><br /></div>
        </>
    )
}