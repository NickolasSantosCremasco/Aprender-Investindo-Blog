export default function Navbar() {
    return (
        <div className="max-w-screen-lg mx-auto flex border-b py-4 items-center justify-between">
            <a className="text-2xl flex items-center" href="/">
                <span></span>
                <span className="mr-2 text-white">Aprendendo a Investir</span>
            </a>    
            <nav>
                <ul className="flex md:gap-x-8 items-center">
                    <li>Inicial</li>
                    <li>Notícias</li>
                    <li>Produtos</li>
                    <li>Sobre</li>
                    <li>Contato</li>
                    <li className="border-2 px-6 py-1 rounded-xl hover:bg-sky-700 transition-all">Login</li>
                </ul>
            </nav>
        </div>  
    )
}