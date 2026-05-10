import { MetadataRoute } from 'next'

// Defina a interface conforme o retorno da sua API
interface Article {
    id: string;
    updated_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://aprenderinvestindo.com.br'

    // 1. Fetch dos artigos dinâmicos
    let dynamicArticles: MetadataRoute.Sitemap = []
    
    try {
        // Importante: use a URL completa da sua API se necessário (em produção)
        // Se a API estiver no mesmo projeto, você pode chamar o fetch apontando para a rota da API
        const response = await fetch(`${baseUrl}/api/getArticles`, {
            next: { revalidate: 3600 } // Opcional: revalida o cache a cada hora
        })
        
        if (response.ok) {
            const articles: Article[] = await response.json()
            
            dynamicArticles = articles.map((art) => ({
                url: `${baseUrl}/pages/article?id=${art.id}`,
                lastModified: art.updated_at ? new Date(art.updated_at) : new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7, // Artigos costumam ter prioridade um pouco menor que a Home
            }))
        }
    } catch (error) {
        console.error("Erro ao gerar sitemap dinâmico:", error)
    }

    // 2. Páginas Estáticas (Removi páginas administrativas como 'edit' e 'new' que o Google NÃO deve ver)
    const routes = ['', '/pages/about', '/pages/contact', '/pages/portifolio', '/pages/login', '/pages/register'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        })
    )

    return [...routes, ...dynamicArticles]
}