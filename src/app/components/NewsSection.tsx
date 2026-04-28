'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {Trash2, Pencil, ExternalLink, Plus } from "lucide-react";


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
                    // Promise.all para executar ambas as requisições simultaneamente. Isso reduz o tempo de carregamento pela metade, pois o navegador
                    // não precisa esperar a notícia carregar para verificar se você é admin.
                    const [newsRes, adminRes] = await Promise.all([
                        fetch('/api/getArticles'),
                        fetch('/api/checkAdmin')
                     ]);
                    const articles = await newsRes.json();
                    const adminData = await adminRes.json();
                
                    if (articles.length > 0) {
                        setMainNews(articles.slice(0, 4));
                        setSecondaryNews(articles.slice(4));
                    }
                    setIsAdmin(adminData.is_admin || false);
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
           setMainNews(prev => prev.filter(a => a.id !== id));
            setSecondaryNews(prev => prev.filter(a => a.id !== id));
        } catch(error) {
            console.error('Erro ao deletar notícia',error);
        }
    }

      
  if (loading) return <section className="w-full bg-[#050505] py-20 text-center text-gray-500 font-mono">Loading data stream...</section>;
   
    return (
      <section className="w-full bg-[#050505] text-white py-20 px-6 md:px-12">
            <div className="max-w-screen-xl mx-auto">
                
                {/* Header Estilo Dashboard */}
                <div className="mb-12 border-l-4 border-[#22c55e] pl-6 flex justify-between items-end">
                    <div>
                        <h3 className='text-[#22c55e] font-mono uppercase tracking-widest text-sm mb-1'>Insights</h3>
                        <h1 className='text-4xl md:text-5xl font-extrabold'>Notícias em Tempo Real</h1>
                    </div>
                    {isAdmin && (
                        <button onClick={() => router.push('/pages/newArticle')} className="bg-[#22c55e] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#1da851] flex items-center gap-2 transition-all hover:scale-105">
                            <Plus size={18} /> Novo Artigo
                        </button>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row mt-8 gap-12">
                    
                    {/* Grid Principal: Cards Dark-Tech */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-2/3">
                        {mainNews.map((item) => (
                            <div key={item.id} onClick={() => router.push(`/pages/article?id=${item.id}`)} 
                                className="bg-[#0a0b10] border border-gray-800 rounded-xl overflow-hidden hover:border-[#22c55e]/50 transition-all cursor-pointer group hover:-translate-y-1 relative"
                            >
                                <img src={item.image_url || 'https://via.placeholder.com/600x400'} alt={item.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                {isAdmin && (
                                    <div className="absolute top-2 right-2 flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur">
                                        <Pencil onClick={(e) => { e.stopPropagation(); router.push(`/pages/editArticle?id=${item.id}`) }} className="w-5 h-5 text-blue-400 hover:text-white" />
                                        <Trash2 onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }} className="w-5 h-5 text-red-500 hover:text-white" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-lg font-bold text-white line-clamp-2">{item.title}</h2>
                                    <p className="text-gray-400 mt-2 text-sm line-clamp-3">{item.subtitle}</p>
                                    <div className="flex justify-between items-center mt-6">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString('pt-BR')}</p>
                                        <ExternalLink size={16} className="text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Sidebar de Últimas: Indicador 'Pulse' para efeito real-time */}
                    <div className="lg:w-1/3">
                        <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Últimos Insights
                        </h3>
                        <ul className="space-y-4">
                            {secondaryNews.map((news) => (
                                <li key={news.id} onClick={() => router.push(`/pages/article?id=${news.id}`)}
                                    className="bg-[#0a0b10] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-all cursor-pointer flex gap-4 items-center group"
                                >
                                    <img src={news.image_url || 'https://via.placeholder.com/150'} className="object-cover w-16 h-16 rounded-md opacity-80 group-hover:opacity-100" alt={news.title} />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-200 line-clamp-2">{news.title}</h4>
                                        <p className="text-[10px] text-gray-500 mt-1">{new Date(news.created_at).toLocaleDateString('pt-BR')}</p>
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