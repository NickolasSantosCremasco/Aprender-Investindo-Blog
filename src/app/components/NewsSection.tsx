'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";


interface Article {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    image_url: string; 
    created_at: string;
  }

export default function NewsSection () {
    const router = useRouter()

    const [mainNews, setMainNews] = useState<Article[]>([])    
    const [secondaryNews, setSecondaryNews] = useState<Article[]>([])
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)

        useEffect(() => {
            async function fetchNews() {
                try {
                    // O nome da rota deve bater com sua pasta (getArticles no plural)
                    const response = await fetch('/api/getArticles');
                    const articles = await  response.json();
                
                    if (articles.length > 0) {
                        setMainNews(articles.slice(0, 4))
                        setSecondaryNews(articles.slice(4))
                    }
                    
                } catch(error) {
                    console.error('Erro ao carregar as notícias:', error);
                } finally {
                    setLoading(false);
                }
            }

            async function checkAdmin() {
                try {
                    const response = await fetch('/api/checkAdmin')
                    if (!response.ok) {
                        // Não jogue erro aqui para não travar a tela se não for admin, apenas ignore
                        return;
                    }
                    const data = await response.json();
                    setIsAdmin(data.is_admin)
                } catch(error) {
                    console.error('Erro ao verificar a autenticação:', error);
                }
            }
            fetchNews();  
            checkAdmin();  
        }, []);

    async function handleDelete(id: number) {
        const confirmed = window.confirm('Tem certeza que deseja deletar este artigo?');
        if(!confirmed) return;
        
        try {
            const response = await fetch(`/api/deleteArticles`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id}),
            });

            if (!response.ok) throw new Error('Erro ao deletar a notícia')

            // Update the list removing the article
            const updatedMainNews = mainNews.filter(article => article.id !== id);
            const updatedSecondaryNews = secondaryNews.filter(article => article.id !== id)
            setMainNews(updatedMainNews)
            setSecondaryNews(updatedSecondaryNews)
        } catch(error) {
            console.error('Erro ao deletar notícia',error);
        }
    }

      
    if (loading) {
        return (
            <section className="max-w-screen-xl mx-auto text-sky-900 shadow-2xl py-16 px-8">
                <p className="text-center animate-pulse">Carregando as Notícias...</p>
            </section>
        );
    };
   
    return (
        <section className="max-w-screen-xl mx-auto text-sky-900 shadow-2xl py-16 px-8">
            <div>
                {/* Titles */}
                <h3 className='text-xl font-semibold pl-4 md:pl-0'>Finanças</h3>
                <h1 className='text-4xl font-bold pl-4 md:pl-0'>Notícias em Tempo Real</h1>
                
                {/* News Layout */}
                <div className="flex flex-col lg:flex-row mt-8 gap-8">
                    {/* Mainly News */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3">
                        {mainNews.map((item) => (
                            <div key={item.id} onClick={() => router.push(`/pages/article?id=${item.id}`)} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg cursor-pointer hover:scale-105 transition-all relative group">
                                <img 
                                    // AJUSTE 1: Fallback se a URL vier vazia
                                    src={item.image_url || 'https://via.placeholder.com/600x400'} 
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    {isAdmin && (
                                        <div className="absolute top-2 right-2 bg-white/80 rounded-lg p-1 hidden group-hover:block">
                                            {/* Botões de Admin (Trash/Pencil) */}
                                            <div className="flex gap-2">
                                                <Pencil 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/pages/editArticle?id=${item.id}`)
                                                    }} 
                                                    className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
                                                />
                                                <Trash2 
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        handleDelete(item.id)
                                                    }} 
                                                    className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">{item.title}</h2>
                                    <p className="text-gray-600 mt-2 line-clamp-3">{item.subtitle}</p>
                                
                                    <p className="text-sm text-gray-400 mt-4">Publicado em: {new Date(item.created_at).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Últimas Notícias (Barra Lateral) */}
                    <div className="lg:w-1/3 ">
                    {isAdmin && (
                        <button 
                            className="border-2 rounded-lg pt-1 pb-1 pl-4 pr-4 hover:scale-105 transition-all hover:bg-yellow-400 float-right cursor-pointer mb-4" 
                            onClick={() => router.push('/pages/newArticle')}>
                                Novo Artigo
                        </button>
                    )}
    
                        <h3 className="text-lg font-semibold mb-4 clear-both">Últimas Notícias</h3>
                        <ul className="space-y-4">
                            {secondaryNews.map((news) => (
                                <li
                                    key={news.id}
                                    // AJUSTE 2: Adicionado onClick aqui, senão clicar não fazia nada
                                    onClick={() => router.push(`/pages/article?id=${news.id}`)}
                                    className="bg-white overflow-hidden h-32 shadow-md rounded-lg hover:shadow-lg transition-shadow flex cursor-pointer hover:bg-gray-50"
                                >
                                    <img 
                                        // AJUSTE 3: Fallback de imagem aqui também
                                        src={news.image_url || 'https://via.placeholder.com/150'} 
                                        className="object-cover w-32 h-full"  
                                        alt={news.title} 
                                    />
                                    <div className="p-3 flex flex-col justify-center">
                                        <p className="text-xs text-yellow-500 font-bold uppercase">Nickolas Cremasco</p>
                                        <h4 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">{news.title}</h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(news.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}