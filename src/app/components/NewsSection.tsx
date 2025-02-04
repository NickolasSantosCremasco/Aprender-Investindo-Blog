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

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('/api/getArticles');
                const articles = await  response.json();
              
                if (articles.length > 0) {
                    setMainNews(articles[0].slice(0, 4))
                    setSecondaryNews(articles[0].slice(4))
                }
                //Organization of the news between de main and secondaries
                
            } catch(error) {
                console.error('Erro ao carregar as notícias:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();    
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
                <p>Carregando as Notícias...</p>
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
                            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg cursor-pointer hover:scale-105 transition-all">
                                <img 
                                    src={item.image_url} 
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <Trash2 onClick={() => handleDelete(item.id)} className="float-right p-1  w-9 h-9 text-black text-4xl mt-1 hover:text-red-400 hover:transition-all hover:scale-110 rounded-lg"/>
                                    <Pencil onClick={() => router.push('')} className="float-right mt-3 text-black hover:scale-110 transition-all hover:text-blue-400"/>
                                    <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                                    <p className="text-gray-600 mt-2">{item.subtitle}</p>
                                    <p className="text-sm text-gray-400 mt-4">{item.created_at}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-1/3 ">
                    <button className="border-2 rounded-lg pt-1 pb-1 pl-4 pr-4 hover:scale-105 transition-all hover:bg-yellow-400 float-right cursor-pointer" onClick={() => router.push('/pages/newArticle')}>Novo Artigo</button>
                        <h3 className="text-lg font-semibold mb-4">Últimas Notícias</h3>
                        <ul className="space-y-4">
                            {secondaryNews.map((news) => (
                                <li
                                    key={news.id}
                                    className="bg-white overflow-auto h-32 shadow-md rounded-lg hover:shadow-lg transition-shadow flex cursor-pointer"
                                >
                                    <img src={news.image_url} className="object-cover w-24 overflow-hidden "  alt={news.title} />
                                    <div className="p-5">
                                        <p className="text-yellow-400">Nickolas Cremasco</p>
                                        <h4 className="text-lg font-semibold text-gray-800">{news.title}</h4>
                                        <p className="text-sm text-gray-400 mt-2">{news.created_at}</p>
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