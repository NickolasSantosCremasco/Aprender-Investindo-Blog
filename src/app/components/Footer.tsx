'use client'
import { Instagram, Youtube, Linkedin, Github, Mail, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full bg-[#050505] border-t border-gray-900 py-16 px-6 md:px-12 text-gray-400">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Logo e Branding */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <img src="/uploads/logo.png" alt="logo" className="w-8 h-8" />
                        Fincodes<span className="text-[#22c55e]">Tech</span>
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Construindo o futuro das startups com stacks modernas e automação de alta performance. 
                    </p>
                </div>

                {/* Navegação */}
                <div className="space-y-4">
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Navegação</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-[#22c55e] transition-colors">Inicial</a></li>
                        <li><a href="/pages/projects" className="hover:text-[#22c55e] transition-colors">Projetos</a></li>
                        <li><a href="/pages/about" className="hover:text-[#22c55e] transition-colors">Sobre Nós</a></li>
                        <li><a href="/pages/contact" className="hover:text-[#22c55e] transition-colors">Contato</a></li>
                    </ul>
                </div>

                {/* Contato e Social */}
                <div className="space-y-4">
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Conexão</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <a href="mailto:nck.tec.suporte@gmail.com" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors">
                            <Mail size={16}/> nck.tec.suporte@gmail.com
                        </a>
                        <a href="tel:+5511998989818" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors">
                            <Phone size={16}/> (11) 99898-9818
                        </a>
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                        <a href="https://www.youtube.com/@AprendendoaInvestirOficial" target='_blank' className="hover:text-[#22c55e] transition-colors"><Youtube size={20} /></a>
                        <a href="https://www.instagram.com/nickolascremasco/" target='_blank' className="hover:text-[#22c55e] transition-colors"><Instagram size={20} /></a>
                        <a href="https://www.tiktok.com/@nickolas.cremasco" target='_blank' className="hover:text-[#22c55e] transition-colors font-bold text-xs">TIKTOK</a>
                        <a href="#" className="hover:text-[#22c55e] transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-screen-xl mx-auto mt-12 border-t border-gray-900 pt-8 text-center text-xs text-gray-600 font-mono">
                <p>© {new Date().getFullYear()} FincodesTech. Todos os direitos reservados. Build in Public.</p>
            </div>
        </footer>
    )
}