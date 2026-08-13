import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, sourceType, sourceSlug } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }

    // O upsert garante que, se o e-mail já existir, ele não duplica e não gera erro 500
    const lead = await prisma.lead.upsert({
      where: { email },
      update: {},
      create: {
        email,
        sourceType: sourceType || 'article',
        sourceSlug: sourceSlug || null,
      },
    });

    return NextResponse.json({ message: 'Lead registrado com sucesso!', lead }, { status: 200 });

  } catch (error) {
    console.error('Erro ao registrar Lead:', error);
    return NextResponse.json({ error: 'Erro ao registrar e-mail' }, { status: 500 });
  }
}