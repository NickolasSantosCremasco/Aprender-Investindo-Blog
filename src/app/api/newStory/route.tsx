import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, title, slug, posterPortrait, slides } = body;

    if (!postId || !title || !slug || !posterPortrait || !slides?.length) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Cria o Web Story e os slides vinculados em uma única operação do Prisma
    const newStory = await prisma.story.create({
      data: {
        postId,
        title,
        slug,
        posterPortrait,
        slides: {
          create: slides.map((slide: any, index: number) => ({
            pageOrder: index + 1,
            imageUrl: slide.imageUrl,
            heading: slide.heading || null,
            paragraph: slide.paragraph || null,
            ctaText: slide.ctaText || 'Ler artigo completo',
            ctaUrl: slide.ctaUrl || null,
          })),
        },
      },
      include: {
        slides: true,
      },
    });

    return NextResponse.json({ message: 'Web Story criado com sucesso!', story: newStory }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar Web Story:', error);
    return NextResponse.json({ error: 'Erro ao salvar Web Story no banco' }, { status: 500 });
  }
}