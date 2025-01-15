import {Home,UserRound, Menu, Newspaper, ShoppingBasket, EqualApproximately} from 'lucide-react'

export default function Navbar() {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 py-4 px-10 p-10 max-w-screen-xl mx-auto bg-sky-950 text-white rounded-tr-3xl rounded-tl-3xl shadow-md">
            {/* Logotipo */}
            <a className="text-2xl flex items-center" href="/">
                <span className="mr-2 text-yellow-400">⚡</span>
                <span className="mr-2 text-white">Aprender Investindo</span>
            </a> 

            {/* Menu Toggle (Mobile) */}
            <input className='peer hidden' type="checkbox" id='navbar-open' /> 
            <label className='cursor-pointer text-2xl pt-2 sm:hidden block' htmlFor="navbar-open">
                <Menu /> 
            </label>
            
            {/* Navigation */}
            <nav className='peer-checked:block hidden sm:flex sm:items-center'>
                <ul className="flex flex-col sm:flex-row sm:gap-x-8 items-center">
                    <li className='p-2 flex sm:p-0'>
                        <Home/>
                        <span className='pl-1'> Inicial </span>
                    </li>
                    <li className='p-2 flex sm:p-0'>
                        <Newspaper/> 
                        <span className='pl-1'>Notícias</span>
                    </li>
                    <li className='p-2 flex sm:p-0'>
                        <ShoppingBasket/> 
                        <span className='pl-1'>Produtos</span>
                    </li>
                    <li className='p-2 flex sm:p-0'>
                        <EqualApproximately/> 
                        <span className='pl-1'>Sobre</span>
                    </li>
                    <li className='p-2 flex sm:p-0'>
                        <UserRound/> 
                        <span className='pl-1'>Contato</span>
                    </li>
                    <li className="flex border-2 border-blue-600 px-6 py-1 rounded-xl hover:bg-sky-700 transition-all">
                        Login
                    </li>
                </ul>
            </nav>
            
        </div>
          
    )
}