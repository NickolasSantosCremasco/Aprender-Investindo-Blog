'use client'
import React from "react"
import { useState, ChangeEvent, FormEvent } from "react"

export default function NewArticle() {

   const [title, setTitle] = useState('');
   const [subtitle, setSubtitle] = useState('');
   const [text, setText] = useState('');
   const [image, setImage] = useState<File | null>(null);

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] //verification if exists any file selected
    if (file) {
        setImage(file);
    }
   }

   const handleSubmit =  async (e: FormEvent) => {

    e.preventDefault(); //Avoid the page reload when send the form

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('text', text);
    if (image) {
        formData.append('image', image)
    }

    try {
        const response = await fetch('/api/article', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert('Artigo Criado com Sucesso!');
            // Reset the form after send
            setTitle('');
            setText('');
            setSubtitle('');
            setImage(null);
        } else {
            const errorData = await response.json();
            alert('Erro ao criar o artigo:' + errorData.error);
        }
    }catch (error) {
        console.error("Erro ao criar o artigo:", error);
        alert("Erro ao criar o artigo.");
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
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Publicar Artigo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}