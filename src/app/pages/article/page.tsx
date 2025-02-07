'use client'
import mysql from 'mysql2';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

//page that will be the body of the article
export default function Article() {

    const router = useRouter()

    return(
        <section className='max-w-screen-xl shadow-xl mx-auto flex flex-col'>
            {/* Header Section */}
            <div className='relative w-full h-[300px] md:h-[400px] overflow-hidden'>
                    <img 
                        src="https://static.vecteezy.com/ti/fotos-gratis/t2/2286681-view-of-modern-business-arranha-ceu-glass-and-sky-view-landscape-of-comercial-building-in-a-central-city-gratis-foto.jpg" 
                        alt="imagem" 
                        className='brightness-50 bg-cover w-full h-full' />
                <div className="absolute inset-0 flex flex-col justify-center md:justify-center pl-6 md:pl-16 gap-1 text-white">
                    <nav className="text-xs sm:text-sm opacity-80 relative  xl:bottom-5 bottom-0">
                        <span><span onClick={(e) => router.back()} className='hover:opacity-50 cursor-pointer'>Início</span> &gt; Artigos &gt;</span>
                        <span className="font-semibold"> O que faz um investidor de Sucesso!</span>
                    </nav>
                    <h1 className="text-2xl md:text-5xl font-bold mt-40">O que faz um investidor de Sucesso?</h1>
                    <h2 className="text-sm md:text-xl opacity-80">Segredos de um investidor de sucesso</h2>
                    <p className="text-xs md:text-sm mt-1">Por <span className="font-semibold">Nickolas Cremasco</span> - Fevereiro 07, 2025</p>
                </div>
            </div>
            {/* Corpo do Artigo */}
            <div className='p-6 md:p-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>Introdução</h2>
                <p className='text-lg pl-10 pr-10 text-justify leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam incidunt deleniti aliquid nam architecto recusandae ad esse repellat doloribus deserunt ipsa minus at, libero rerum voluptates non. Fugit, quasi.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae nemo cupiditate ullam nam distinctio, similique veniam alias laudantium labore, molestias odit ea commodi iure reprehenderit? Eum ad magnam doloremque eaque.

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati recusandae praesentium aliquid dignissimos id sit, reprehenderit illum ipsam pariatur iusto! Illo, ducimus inventore accusamus in necessitatibus iure expedita velit. Sed.
                </p>
            </div>
        </section>
        
    )
}