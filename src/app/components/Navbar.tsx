    'use client'
    import {Home,UserRound, Menu, Newspaper, ShoppingBasket, EqualApproximately, LogOut} from 'lucide-react'
    import { useRouter } from 'next/navigation'
    import { useEffect, useState } from 'react';

    export default function Navbar() {

        const router = useRouter();
        const [isLoading, setIsloading] = useState(true)
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        //Verification: if token JWT are present in localStorage
        useEffect(() => {
            const token = localStorage.getItem('authToken'); //Substituition of 'authToken' for the name that is used to save the token
            setIsAuthenticated(!!token); // transform the value in boolean
            setIsloading(false)
        }, [])

        //logout function
        const handleLogout = () => {
            localStorage.removeItem('authToken'); 
            setIsAuthenticated(false);
            router.push('/')
        }
        return (
            
            <div className="flex flex-col sm:flex-row items-center justify-between pt-7 px-10 pb-7  max-w-screen-xl mx-auto bg-sky-950 text-white rounded-tr-2xl rounded-tl-2xl shadow-md">
                {/* Logotipo */}
                <a className="text-2xl flex items-center" href="/">
                    <span className="mr-2 text-yellow-400 w-20"><img src="/uploads/logo.png" alt="logo" /></span>
                    <span className="mr-2 text-white ">Aprender Investindo</span>
                </a> 

                {/* Menu Toggle (Mobile) */}
                <input className='peer hidden' type="checkbox" id='navbar-open' /> 
                <label className='cursor-pointer text-2xl pt-2 sm:hidden block' htmlFor="navbar-open" aria-label='Abrir Menu de Navegação'>
                    <Menu /> 
                </label>
                
                {/* Navigation */}
                <nav className='peer-checked:block hidden sm:flex sm:items-center w-full' aria-label='Menu de navegação principal'>
                    <div className='flex flex-1 justify-center'>
                        <ul className="flex flex-col sm:flex-row sm:gap-x-8 items-center pr-10">
                            <li className='p-2 flex sm:p-0 cursor-pointer hover:text-yellow-400 transition-all' onClick={() => router.push('/')}>
                                <Home/>
                                <span className='pl-1'> Inicial </span>
                            </li>
                        
                        
                            <li className='p-2 flex sm:p-0 cursor-pointer hover:text-yellow-400 transition-all' onClick={() => router.push('/pages/about')}>
                                <EqualApproximately/> 
                                <span className='pl-1'>Sobre Nós</span>
                            </li>
                            
                            <li className='p-2 flex sm:p-0 cursor-pointer hover:text-yellow-400 transition-all' onClick={() => router.push('/pages/contact')}>
                                <UserRound/> 
                                <span className='pl-1'>Contato</span>
                            </li>
                        </ul>
                    </div>
                       
                        {isLoading ? (
                            <div className='ml-2 border-2 px-6 py-1 border-orange-600 rounded-xl'>Carregando...</div>
                        ) : (
                            <ul className='flex items-center'>
                                {isAuthenticated ? (
                                    <li className="flex item-center border rounded-xl py-1 px-2 hover:text-yellow-400 border-red-500 cursor-pointer hover:bg-red-500  transition-all relative">
                                        <button onClick={handleLogout} className='flex ml-2 text-sm  text-red-500 hover:underline hover:text-white '>
                                            <LogOut className='w-8'/>
                                            <h3 className='font-bold w-full text-base'>Sair</h3>
                                        </button>
                                    </li>
                                ) : (
                                    <li className="flex border-2 border-blue-600 px-6 py-1 rounded-xl hover:bg-sky-700  transition-all cursor-pointer">
                                        <button onClick={() => router.push('/pages/login')}>
                                            Login
                                        </button>
                                    </li>
                                )}
                            </ul>
                        )}
                            
                </nav>
                
            </div>
            
        )
    }