'use client'
import React from "react"
import { useState, ChangeEvent, FormEvent } from "react"

export default function NewArticle() {
   const [title, setTitle] = useState('');
   const [subtitle, setSubtitle] = useState('');
   const [text, setText] = useState('');
   const [image, setImage] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<string | null>(null);

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] //verification if exists any file selected
    console.log('Arquivo adicionado')
    if (file) {
        if(file.size > 5 * 1024 * 1024) {
            alert('O arquivo deve ter no máximo 5MB.');
            return
        }
        if (!file.type.startsWith('image/')) {
            alert('Por favor, envie um arquivo de imagem válido.');
            return
        }
        setImage(file)
        console.log('Imagem válida', file.name)
    }
   };

   const handleSubmit =  async (e: FormEvent) => {

    e.preventDefault(); 
    setLoading(true);
    setMessage(null); 
    
    console.log('Enviado artigo')
    console.log('Título', title)
    console.log('subtítulo', subtitle)
    console.log('Texto', text)
    console.log('Imagem', image?.name)

    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('text', text);
    if (image) {
        formData.append('image', image)
    }


    try {
        const response = await fetch('/api/newArticle', {
            method: 'POST',
            body: formData,
        });
        console.log('Resposta da API:', response)
        if (response.ok) {
            alert('Artigo Criado com Sucesso!');
            setTitle('');
            setText('');
            setSubtitle('');
            setImage(null);
            console.log('Artigo enviado com sucesso')
        } else {
            const errorData = await response.json();
            setMessage(`Erro ao criar o artigo: ${errorData.error}`);
            console.error('Erro retornado pela API:', errorData)
        }
    }catch (error) {
        console.error("Erro ao criar o artigo:", error);
        setMessage('Erro ao criar o artigo. Tente novamente mais tarde.');
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
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título:
                        </label>
                        <input 
                            type="text" 
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Digite o Título do Artigo"
                        />
                    </div>
                    <div>
                        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                            Subtítulo
                        </label>
                        <input 
                            type="text"
                            id="subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Digite o subtítulo do artigo"
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                            Texto
                        </label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Digite o conteúdo do artigo"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem</label>
                        <input 
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                        />
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 ${loading ? 'bg-blue-500' : 'bg-blue-600} bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading? 'Publicando...':'Publicar Artigo'}
                        </button>
                    </div>
                    {message && (
                        <div className="mt-4 p-2 text-white bg-red-500 rounded-md">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}