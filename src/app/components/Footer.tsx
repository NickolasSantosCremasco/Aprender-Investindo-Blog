import {Instagram, Youtube} from 'lucide-react'

export default function Footer() {
    return (
        <footer className="max-w-screen-xl mx-auto bg-sky-950 text-white py-8 rounded-b-xl shadow-2xl">
            {/* Mainly Footer Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                {/* Logo*/}
                <div className="flex flex-col items-start">
                    <img 
                        src="" 
                        alt="Company Logo"
                        className="w-32 mb-4"
                    />
                    <p className="text-sm text-gray-300">
                        Transformando investimentos em oportunidades.
                        Siga-nos para ficar atualizado com as melhores dicas financeiras.
                    </p>
                </div>
                {/* Navigation Links */}
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-4">Navegação</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-white">Serviços</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Contato</a></li>
                    </ul>
                </div>
                {/* Contact and Social Medias */}
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg mb-4">Contato</h3>
                    <p className="text-sm text-gray-300">
                        Email: <a href="mailto:nck.tec.suporte@gmail.com" className="hover:text-white">nck.tex.suporte@gmail.com</a>
                    </p>
                    <p>
                        Telefone <a href="tel:+5511998989818" className="hover:text-white">(11) 99898-9818</a>
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="" className="text-gray-400 hover:text-white"><Youtube /></a>
                        <a href="" className="text-gray-400 hover:text-white"><Instagram /></a>
                        <a href="" className="text-gray-400 hover:text-white">TikTok</a>

                    </div>
                </div>
            </div>
            {/* Copyrights */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Aprender Investindo. Todos os direitos reservados
                <a href="" className="hover:text-white">Política de Privacidade</a>
                <a href="" className="hover:text-white">Termos de Uso</a>
            </div>
        </footer>
    )
}