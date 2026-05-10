'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

function ArticleContent() {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [content, setContent] = useState<string>('')
    const [createdAt, setCreatedAt] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) return;

        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/getArticle?id=${id}`);
                if (!response.ok) throw new Error('Artigo não encontrado ou erro no servidor.');
                const data = await response.json();

                setTitle(data.title || 'Sem Título')
                setSubtitle(data.subtitle || '')
                setContent(data.content || 'Conteúdo indisponível.')
                setCreatedAt(data.created_at || '')
                
                // Melhoria: Validação rigorosa da URL para evitar erro de string vazia no src
                const validImg = data.image_url && data.image_url.trim() !== "" 
                    ? data.image_url 
                    : 'https://via.placeholder.com/1200x600';
                setImageUrl(validImg)

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar o conteúdo.')
            } finally {
                setLoading(false)
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-[#22c55e]">
            <span className="animate-pulse">SCANNING DATABASE...</span>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-4 md:px-0">
                {/* Header Dinâmico: Hero com gradiente imersivo */}
                <header className="relative w-full h-[50vh] md:h-[65vh] rounded-b-[40px] overflow-hidden border-b border-gray-800">
                    <img
                        src={imageUrl || ''}
                        alt={title}
                        className="w-full h-full object-cover brightness-50 scale-105 transition-transform duration-1000"
                    />
                    {/* Overlay para legibilidade e fusão com o fundo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12">
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#22c55e] mb-6 hover:-translate-x-2 transition-transform font-mono text-sm uppercase tracking-widest"
                        >
                            <ArrowLeft size={16} /> Voltar para o feed
                        </button>
                        
                        <h1 className="text-3xl md:text-6xl font-black mb-4 leading-tight italic tracking-tighter">
                            {title}
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl">
                            {subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-8 text-xs md:text-sm text-gray-500 font-mono border-t border-gray-800 pt-6">
                            <span className="flex items-center gap-2"><User size={14} className="text-[#22c55e]"/> Nickolas Cremasco</span>
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-[#22c55e]"/> 
                                {createdAt ? new Date(createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : '--'}
                            </span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-[#22c55e]"/> 5 min read</span>
                        </div>
                    </div>
                </header>

                {/* Área de Conteúdo Estilizada */}
                <section className="flex flex-col lg:flex-row gap-12 py-16 px-6 md:px-16 bg-[#0a0b10] mt-[-40px] rounded-[40px] relative z-10 border border-gray-800 shadow-2xl">
                    <div className="flex-grow max-w-3xl mx-auto">
                        {error ? (
                            <div className="p-8 border border-red-900 bg-red-950/20 text-red-500 rounded-2xl font-mono text-sm">
                                [FATAL_ERROR]: {error}
                            </div>
                        ) : (
                            <article className="prose prose-invert prose-green max-w-none 
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
                                prose-headings:text-white prose-headings:font-bold
                                prose-strong:text-[#22c55e] prose-strong:font-bold
                                prose-code:text-[#22c55e] prose-code:bg-[#111] prose-code:px-2 prose-code:rounded
                                prose-blockquote:border-l-[#22c55e] prose-blockquote:bg-[#22c55e]/5 prose-blockquote:py-2">
                                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                    {content}
                                </ReactMarkdown>
                            </article>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

// Wrapper necessário para Next.js App Router ao usar searchParams
export default function Article() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <ArticleContent />
        </Suspense>
    )
}