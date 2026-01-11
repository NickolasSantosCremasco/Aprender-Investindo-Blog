'use client'
import React, { useState, FormEvent } from "react"
import { useRouter } from "next/navigation";

export default function NewArticle() {
   const [title, setTitle] = useState('');
   const [subtitle, setSubtitle] = useState('');
   const [content, setContent] = useState(''); 
   const [imageUrl, setImageUrl] = useState('');
   
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null); 

   const router = useRouter();

   const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault(); 
        setLoading(true);
        setMessage(null); 
        setError(null)

        try {
            
            const payload = {
                title,
                subtitle,
                content,    
                image_url: imageUrl 
            };

            const response = await fetch('/api/newArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage('Artigo Criado com Sucesso!')
            
                setTitle('');
                setSubtitle('');
                setContent('');
                setImageUrl('');
                setError('');
                
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(`Erro ao criar o artigo: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Erro ao criar o artigo:", error);
            setError('Erro ao criar o artigo. Verifique sua conexão.');
        } finally {
            setLoading(false)
        }
   };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crie um novo artigo</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                        <input 
                            type="text" 
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                            placeholder="Digite o Título do Artigo"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo:</label>
                        <input 
                            type="text"
                            id="subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                            placeholder="Digite o subtítulo do artigo"
                            required 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Texto (Conteúdo):</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                            placeholder="Digite o conteúdo do artigo"
                            required
                        />
                    </div>
                    

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Link da Imagem (URL):</label>
                        <input 
                            type="text"
                            id="image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black" 
                            placeholder="Ex: https://imgur.com/foto.jpg"
                            required
                        />
           
                        {imageUrl && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Pré-visualização:</p>
                                <img src={imageUrl} alt="Preview" className="h-24 w-auto rounded object-cover border" />
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 ${loading ? 'bg-blue-400' : 'bg-blue-600'} text-white font-medium rounded-md shadow-md hover:bg-blue-700`}
                        >
                            {loading ? 'Publicando...' : 'Publicar Artigo'}
                        </button>
                    </div>
                    
                    {message && (
                        <div className="mt-4 p-2 text-white bg-green-500 rounded-md text-center">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mt-4 p-2 text-white bg-red-500 rounded-md text-center">
                            {error} <span className="cursor-pointer hover:text-blue-200 font-bold underline ml-2" onClick={() => router.push('/pages/login')}>Faça Login</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}