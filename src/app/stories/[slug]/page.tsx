import { notFound } from 'next/navigation';
import { Story, StorySlide } from '@prisma/client';

// Revalidação a cada 1 hora (ISR) para alta velocidade e bom SEO
export const revalidate = 3600;

// Tipo que junta o Story com o array de StorySlide do Prisma
type StoryWithSlides = Story & {
  slides: StorySlide[];
};

async function getStoryData(slug: string): Promise<StoryWithSlides | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/getStory?slug=${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar Web Story:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getStoryData(params.slug);
  if (!data) return {};

  return {
    title: data.title,
    openGraph: {
      title: data.title,
      images: [data.posterPortrait],
    },
  };
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = await getStoryData(params.slug);

  if (!story) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aprenderinvestindo.com.br';

  return (
    <html {...{ amp: '' }} lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <link rel="canonical" href={`${siteUrl}/stories/${story.slug}`} />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <style amp-boilerplate="">{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style>
        <noscript>{`<style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>`}</noscript>
      </head>
      <body>
        <amp-story
          standalone=""
          title={story.title}
          publisher="Aprender Investindo"
          publisher-logo-src={`${siteUrl}/logo.png`}
          poster-portrait-src={story.posterPortrait}
        >
          {story.slides.map((slide, index) => (
            <amp-story-page id={`slide-${index}`} key={slide.id || index}>
              {/* Imagem de Fundo do Slide */}
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={slide.imageUrl}
                  width="720"
                  height="1280"
                  layout="responsive"
                  alt={slide.heading || story.title}
                />
              </amp-story-grid-layer>

              {/* Camada de Texto e Título */}
              <amp-story-grid-layer template="vertical">
                {slide.heading && <h1>{slide.heading}</h1>}
                {slide.paragraph && <p>{slide.paragraph}</p>}
              </amp-story-grid-layer>

              {/* Botão de Call To Action (Redireciona para o Artigo do Blog) */}
              {slide.ctaUrl && (
                <amp-story-cta-layer>
                  <a href={slide.ctaUrl} className="button">
                    {slide.ctaText || 'Ler artigo completo'}
                  </a>
                </amp-story-cta-layer>
              )}
            </amp-story-page>
          ))}
        </amp-story>
      </body>
    </html>
  );
}