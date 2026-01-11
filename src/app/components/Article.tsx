'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

export default function Article() {

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [imageUrl, setImageUrl] = useState<string | null>(null) // Mudado para imageUrl para manter padrão
    const [content, setContent] = useState<string>('') // Mudado de 'text' para 'content' (congruência)
    const [createdAt, setCreatedAt] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
                
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(()=> {
        if(!id) return;

        const fetchArticle = async () => {
            try {
                // Busca o artigo pelo ID
                const response = await fetch(`/api/getArticle?id=${id}`);
                if (!response.ok) throw new Error('Erro ao carregar o artigo.') 
                const data = await response.json();

                setTitle(data.title || 'Título não encontrado')
                setSubtitle(data.subtitle || '')
                setContent(data.content || 'O conteúdo do artigo não foi encontrado!')
                
                // AQUI ESTÁ A MUDANÇA DA IMAGEM
                // Se não tiver imagem, usa um placeholder.
                setImageUrl(data.image_url || 'https://via.placeholder.com/1200x400')
                
                setCreatedAt(data.created_at ?? 'Data não encontrada')

            } catch(error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Erro desconhecido')
                }
            }
        };
        fetchArticle();
    }, [id])

    // Efeito para colocar a imagem no fundo do body
    useEffect(() => {
        if (imageUrl) {
            // Removemos a barra '/' do início. Agora aceita links completos.
            document.body.style.backgroundImage = `url(${imageUrl})`
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed"; // Opcional: faz o fundo ficar parado ao rolar
        }

        // LIMPEZA (Cleanup):
        // Quando você sair dessa página, isso remove a imagem de fundo para não atrapalhar o resto do site
        return () => {
            document.body.style.backgroundImage = '';
        }
    }, [imageUrl])

    return(
            <>
                <div><br /></div>
                <Navbar/>
                <section className='max-w-screen-xl shadow-xl mx-auto flex flex-col bg-white min-h-screen'>
                    
                    {/* Header Section */}
                    <div className='relative w-full h-[400px] md:h-[500px] overflow-hidden group'>
                            {/* MUDANÇA: src direto, sem template literal com barra / */}
                            <img 
                                src={imageUrl || ''}
                                alt={title} 
                                className='brightness-50 shadow-sm bg-cover w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
                            />
                        <div className="absolute inset-0 flex flex-col justify-center md:justify-center pl-6 md:pl-16 gap-1 text-white z-10">
                            <nav className="text-sm sm:text-sm opacity-80 relative px-5 xl:bottom-1 bottom-0 mb-4">
                                <span><span onClick={() => router.back()} className='hover:opacity-50 cursor-pointer underline'>Voltar</span> &gt; Artigos &gt;</span>
                                <span className="font-semibold ml-1">{title}</span>
                            </nav>
                            <h1 className="text-xl md:text-5xl font-bold px-5 drop-shadow-lg">{title}</h1>
                            <h2 className="text-sm md:text-2xl opacity-90 px-5 mt-2 drop-shadow-md">{subtitle}</h2>
                            <p className="text-xs md:text-sm mt-4 px-5 opacity-80">
                                Por <span className="font-semibold">Nickolas Cremasco</span> - {createdAt && !isNaN(Date.parse(createdAt)) ? new Date(createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                }) : 'Data inválida'}
                            </p>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className='flex-grow'>
                        <div className='w-full bg-white p-6 md:p-14'>
                        {error ? (
                            <div className='p-10 text-center border border-red-200 bg-red-50 rounded text-red-600'>
                                {error}
                            </div>
                        ) : (
                            <article className='prose lg:prose-xl max-w-none text-gray-800 leading-relaxed text-justify'>
                                {/* Renderização do Markdown */}
                                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                    {content}
                                </ReactMarkdown>
                            </article>
                        )}
                        </div>
                    </div>
                    <Footer/>
                </section>
                <div><br /></div>
            </>
    )
}