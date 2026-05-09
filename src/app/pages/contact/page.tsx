'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Headphones, CheckCircle2 } from "lucide-react"
import Navbar from "@/app/components/Navbar"


export default function Contact() {
    const router = useRouter();
    const [Isloading, setIsLoading] = useState(false);

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Mensagem Enviada com Sucesso!');
                router.push('/')
            } else {
                alert('Ocorreu um erro. Tente novamente mais tarde.')
            }
        } catch (error) {
            console.error('Erro ao Enviar o formulário:', error);
            alert('Ocorreu um erro. Tente novamente mais tarde.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
        <Navbar/>
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* Efeito de luz de fundo (Glow Neon) conforme o padrão visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22c55e]/15 blur-[120px] rounded-full pointer-events-none"></div>

            <section className="relative z-10 w-full max-w-5xl bg-[#0a0b10]/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                
                {/* Coluna de Informação: Portal de Atendimento Premium */}
                <div className="md:w-2/5 bg-[#0c0d14] p-10 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-between">
                    <div>
                        <button 
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 text-gray-500 hover:text-[#22c55e] transition-colors mb-12 font-mono text-xs tracking-widest uppercase"
                        >
                            <ArrowLeft size={16} /> Voltar
                        </button>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#22c55e]">
                                <Headphones size={28} className="animate-pulse" />
                                <div className="flex gap-2 text-[10px] font-mono border border-[#22c55e]/30 px-2 py-1 rounded bg-[#22c55e]/10">
                                    <span>FINCODES</span> | <span>TECH</span> | <span>SUPORTE</span>
                                </div>
                            </div>
                            <h1 className="text-4xl font-extrabold leading-tight text-white">
                                Fale com o <br/> 
                                <span className="text-[#22c55e]">Atendimento Premium</span>
                            </h1>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Deixe seu feedback sobre o site, compartilhe seu depoimento ou nos informe qual serviço despertou seu interesse. Estamos aqui para ajudar e fornecer exatamente o que você precisa!
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800/50 flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase">
                        <CheckCircle2 size={14} className="text-[#22c55e]" />
                        Protocolo de análise técnica ativo
                    </div>
                </div>

                {/* Coluna do Formulário: Estilo Glassmorphism */}
                <div className="md:w-3/5 p-10 lg:p-14 bg-transparent">
                    <form onSubmit={handlerSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Nome</label>
                                <input 
                                    type="text" name="name" id="name" placeholder="Digite seu Nome" required
                                    className="w-full bg-white/5 border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-sm placeholder:text-gray-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Email</label>
                                <input 
                                    type="email" name="email" id="email" placeholder="Digite seu Email" required
                                    className="w-full bg-white/5 border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-sm placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="tel" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Telefone</label>
                                <input 
                                    type="tel" name="tel" id="tel" placeholder="(00) 00000-0000" required
                                    className="w-full bg-white/5 border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-sm placeholder:text-gray-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="services" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Serviços</label>
                                <div className="relative">
                                    <select 
                                        name="services" id="services"
                                        className="w-full bg-[#0a0b10] border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 transition-all text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="">Nenhum / Feedback Geral</option>
                                        <option value="parceria">Parceria e Afiliação</option>
                                        <option value="gestao">Ferramentas de Gestão</option>
                                        <option value="automacao">Automação de Finanças</option>
                                        <option value="dev">Desenvolvimento de Site/App</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]">▼</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="msg" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Sua Mensagem</label>
                            <textarea 
                                name="msg" id="msg" rows={4} placeholder="Como podemos ajudar você hoje?" required
                                className="w-full bg-white/5 border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-sm placeholder:text-gray-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" disabled={Isloading}
                                className="w-full bg-[#22c55e] hover:bg-[#1da851] disabled:bg-gray-800 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                            >
                                <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-xs">
                                    {Isloading ? 'Enviando Protocolo...' : 'Enviar Mensagem'}
                                    {!Isloading && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    </>
    )
}