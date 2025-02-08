'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

//page that will be the body of the article
export default function Article() {

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')

    useEffect(()=> {
        if(!id) return;
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/getArticle?id=${id}`);
                if (!response.ok) throw new Error('Erro ao carregar o artigo.') 
                const data = await response.json();
                setTitle(data.title || 'Título não encontrado')
                setSubtitle(data.subtitle || '')
                setText(data.content || 'O conteúdo do artigo não foi encontrado!')
                setImage(data.image_url || 'https://via.placeholder.com/1200x400')
            
            } catch(error) {
                setError(error.message)
            }
        };
        fetchArticle();
    }, [id])
    return(
        <section className='max-w-screen-xl shadow-xl mx-auto flex flex-col'>
            {/* Header Section */}
            <div className='relative w-full h-[300px] md:h-[400px] overflow-hidden'>
                    <img 
                        src={image} 
                        alt={image} 
                        className='brightness-50 bg-cover w-full h-full' />
                <div className="absolute inset-0 flex flex-col justify-center md:justify-center pl-6 md:pl-16 gap-1 text-white">
                    <nav className="text-xs sm:text-sm opacity-80 relative  xl:bottom-5 bottom-0">
                        <span><span onClick={(e) => router.back()} className='hover:opacity-50 cursor-pointer'>Início</span> &gt; Artigos &gt;</span>
                        <span className="font-semibold">{title}</span>
                    </nav>
                    <h1 className="text-2xl md:text-5xl font-bold mt-40">{title}</h1>
                    <h2 className="text-sm md:text-xl opacity-80">{subtitle}</h2>
                    <p className="text-xs md:text-sm mt-1">Por <span className="font-semibold">Nickolas Cremasco</span> - Fevereiro 07, 2025</p>
                </div>
            </div>
            {/* Corpo do Artigo */}
            <div className='p-6 md:p-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>Introdução</h2>
                <p className='text-lg pl-10 pr-10 text-justify leading-relaxed'>{text}</p>
            </div>
        </section>
        
    )
}