// src/app/components/RelatedArticles.tsx
import Link from 'next/link';

interface ArticleSummary {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
}

interface RelatedArticlesProps {
  currentArticles: ArticleSummary[]; // Passar os posts vindos da API
}

export default function RelatedArticles({ currentArticles }: RelatedArticlesProps) {
  return (
    <div className="mt-16 pt-12 border-t border-zinc-900">
      <h3 className="text-xl font-bold text-white mb-8 tracking-tight flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        Continue lendo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentArticles.map((article) => (
          <Link 
            key={article.id} 
            href={`/pages/article?id=${article.id}`} // Mude para a sua estrutura de rota real
            className="group block p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/30 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-2">
              <h4 className="text-base font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                {article.subtitle}
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors flex items-center gap-1">
                Acessar artigo <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}