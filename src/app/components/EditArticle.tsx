'use client';
import React, { useEffect,  useState, FormEvent, ChangeEvent } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function EditArticle() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // URL id

  // Function to search in data for the article
  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        //Check if the get one article route is correct
        const response = await fetch(`/api/getArticles?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
          setContent(data.content || '');
          setImageUrl(data.image_url || '');
        } else {
          setError('Erro ao carregar o artigo.');
        }
      } catch (error) {
        console.error('Erro:', error);
        setError('Erro ao buscar o artigo.');
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError('ID do artigo não encontrado.');
      return;
    }
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      //CONSTRUÇÃO DO PAYLOAD
      const payload = {
        id,
        title,
        subtitle,
        content,
        image_url: imageUrl,
      };

      const response = await fetch('/api/editArticle', {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Artigo editado com sucesso.');
        router.refresh();
        setTimeout(() => router.push('/'), 2000);
      } else {
        const errorData = await response.json();
        setError(`Erro ao editar o artigo: ${errorData.error}`);
        setMessage('');
        console.error('Erro retornado pela API:', errorData);
      }
    } catch (error) {
      console.error('Erro ao editar o artigo:', error);
      setError('Erro ao editar o artigo. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edite Este Artigo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título:
            </label>
            <input
              type="text"
              id="title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Digite o Título do Artigo"
            />
          </div>

             {/* Campo Subtítulo */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
              Subtítulo:
            </label>
            <input
              type="text"
              id="subtitle"
              value={subtitle || ''}
              onChange={(e) => setSubtitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Digite o subtítulo do artigo"
            />
          </div>

             {/* Campo Texto */}
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Texto:
            </label>
            <textarea
              id="text"
              value={content || ''}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Digite o conteúdo do artigo"
            />
          </div>

          {/* Campo Imagem (URL) */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Imagem:
            </label>
            <input
              type="text"
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder='Ex: https://i.imgur.com/foto.jpg'
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
              className={`px-6 py-2 ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
          {/* Mensagens de Sucesso e Erro */}
          {message && (
            <div className="mt-4 p-2 text-white bg-green-500 rounded-md text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 p-2 text-white bg-red-500 rounded-md">
              {error} <span className="cursor-pointer hover:text-blue-300 font-bold underline" onClick={() => router.push('/pages/login')}>Faça Login</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}