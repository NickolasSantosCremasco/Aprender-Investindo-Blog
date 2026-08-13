import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Ajuste o caminho se a sua instância do Prisma Client estiver em outro arquivo

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug não informado' }, { status: 400 });
    }

    // Busca o Story e seus slides ordenados por pageOrder via Prisma
    const story = await prisma.story.findUnique({
      where: { slug },
      include: {
        slides: {
          orderBy: { pageOrder: 'asc' },
        },
      },
    });

    if (!story) {
      return NextResponse.json({ error: 'Web Story não encontrado' }, { status: 404 });
    }

    return NextResponse.json(story, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar Web Story:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}