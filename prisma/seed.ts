import { prisma } from '../src/lib/db';

async function main() {
  // 1. Tenta buscar um post no banco ou cria um post de teste caso esteja vazio
  let post = await prisma.post.findFirst();

  if (!post) {
    console.log('📝 Nenhum post encontrado. Criando post de teste...');
    post = await prisma.post.create({
      data: {
        title: 'Como Começar a Investir em 2026: Guia Prático',
        subtitle: 'Aprenda os primeiros passos para organizar suas finanças.',
        content: 'Este é o conteúdo do post de teste sobre investimentos...',
        slug: 'como-comecar-a-investir-2026',
        published: true,
      },
    });
    console.log('✅ Post de teste criado:', post.title);
  }

  // 2. Cria o Web Story vinculado a esse post
  const story = await prisma.story.create({
    data: {
      postId: post.id,
      title: '3 Dicas para Começar a Investir do Zero',
      slug: 'dicas-investir-do-zero',
      posterPortrait: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=720',
      slides: {
        create: [
          {
            pageOrder: 1,
            imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=720',
            heading: 'Reserva de Emergência',
            paragraph: 'O primeiro passo antes de investir em ações é criar sua reserva em liquidez diária.',
            ctaText: 'Ler artigo completo',
            ctaUrl: `http://localhost:3000/article/${post.slug}`,
          },
          {
            pageOrder: 2,
            imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=720',
            heading: 'Diversificação Inteligente',
            paragraph: 'Nunca coloque todos os ovos na mesma cesta. Divida entre Renda Fixa e Renda Variável.',
            ctaText: 'Ver guia completo',
            ctaUrl: `http://localhost:3000/article/${post.slug}`,
          },
        ],
      },
    },
  });

  console.log('🚀 Web Story de teste criado com sucesso! Slug:', story.slug);
}

main()
  .catch((e) => console.error('❌ Erro no seed:', e))
  .finally(async () => await prisma.$disconnect());