'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/app/components/Footer';


//page that will be the body of the article
export default function Article() {

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

                
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

                console.log('URL da imagem recebida', data.image_url)

                setTitle(data.title || 'Título não encontrado')
                setSubtitle(data.subtitle || '')
                setText(data.content || 'O conteúdo do artigo não foi encontrado!')
                setImage(data.image_url ?? 'https://via.placeholder.com/1200x400')

               
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

    useEffect(() => {
        if (image) {
            document.body.style.backgroundImage = `url(/${image})`
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backdropFilter = 'blur(10px)'
        }
    }, [image])
    return(
        <section className='max-w-screen-xl mt-3 shadow-xl mx-auto flex flex-col'>
            
            {/* Header Section */}
            <div className='relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-tr-3xl rounded-ss-3xl'>
                    <img 
                        src={`/${image}`}
                        alt={title} 
                        className='brightness-50 shadow-sm bg-cover w-full h-full' 
                    />
                <div className="absolute inset-0 flex flex-col justify-center md:justify-center pl-6 md:pl-16 gap-1 text-white">
                    <nav className="text-xs sm:text-sm opacity-80 relative  xl:bottom-5 bottom-0">
                        <span><span onClick={(e) => router.back()} className='hover:opacity-50 cursor-pointer'>Início</span> &gt; Artigos &gt;</span>
                        <span className="font-semibold">{title}</span>
                    </nav>
                    <h1 className="text-2xl md:text-5xl font-bold mt-72">{title}</h1>
                    <h2 className="text-sm md:text-xl opacity-80">{subtitle}</h2>
                    <p className="text-xs md:text-sm mt-1">Por <span className="font-semibold">Nickolas Cremasco</span> - Fevereiro 07, 2025</p>
                </div>
            </div>
            {/* Corpo do Artigo */}
            <div className=''>
                <div className='w-full bg-white p-10'>
                {error ? (
                    <p className='text-red-500 text-center'>{error}</p>
                ) : (
                    <>
                        <h2 className='text-2xl md:text-3xl font-bold mb-4'>{title}</h2>
                        <p className='text-lg pl-10 pr-10 text-justify leading-relaxed'>{text}</p>
                    </>
                )}
                </div>
                
                
            </div>
            <Footer/>
        </section>
        
    )
}