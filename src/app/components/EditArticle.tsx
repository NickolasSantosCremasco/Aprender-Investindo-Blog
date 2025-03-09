'use client';
import React, { useEffect } from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditArticle() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [text, setText] = useState('');
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
        const response = await fetch(`/api/getArticles?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setText(data.content);
          setImageUrl(data.image_url);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Verification if any file is selected
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Por favor, envie um arquivo de imagem válido.');
        return;
      }
      setImageUrl(URL.createObjectURL(file)); // Atualiza a URL da imagem para exibição
    }
  };

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
      const response = await fetch('/api/editArticle', {
        method: 'PATCH',
        body: JSON.stringify({
          id,
          title,
          subtitle,
          content: text,
          image_url: imageUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessage('Artigo editado com sucesso.');
        setTimeout(() => router.push('/'), 3000);
      } else {
        const errorData = await response.json();
        setError(`Erro ao editar o artigo: ${errorData.error}`);
        setMessage('');
        console.error('Erro retornado pela API:', errorData);
      }
    } catch (error) {
      console.error('Erro ao editar o artigo:', error);
      setError('Erro ao editar o artigo. Tente novamente mais tarde.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edite Este Artigo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Texto:
            </label>
            <textarea
              id="text"
              value={text || ''}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Digite o conteúdo do artigo"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Imagem:
            </label>
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
              className={`px-6 py-2 ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? 'Alterando...' : 'Alterar Artigo'}
            </button>
          </div>
          {message && (
            <div className="mt-4 p-2 text-white bg-green-500 rounded-md">
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