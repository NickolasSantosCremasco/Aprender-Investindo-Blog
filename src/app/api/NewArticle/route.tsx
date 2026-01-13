import { Pool } from 'pg';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Removemos 'fs' e 'path' pois não vamos mais salvar arquivos no disco do servidor

const db = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: {rejectUnauthorized: false}
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    try {
        // 1. Verificação de TOKEN (Mantive idêntico, pois é segurança)
        const token = req.cookies.get('authToken')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Usuário não autenticado!' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET as string) as {email:string};
        } catch(error) {
            console.error('Erro no Token:', error)
            return NextResponse.json(
                {error: 'Token Inválido ou expirado'},
                {status: 401}
            )
        }

        // 2. Pegar o ID do Usuário (Mantive idêntico)
        const userEmail = decoded.email
        const { rows } = await db.query('SELECT id FROM users WHERE email = $1', [userEmail]);
        
        if (rows.length === 0) {
            return NextResponse.json(
                {error: 'Usuário não encontrado!'},
                {status: 401}
            );
        }
        const userId = rows[0].id;

        const body = await req.json();
        const { title, subtitle, content, image_url } = body;

        // 4. Validação simples
        if (!title || !subtitle || !content || !image_url) {
            return NextResponse.json(
                { error: 'Todos os campos (título, subtítulo, conteúdo e link da imagem) são obrigatórios!' },
                { status: 400 }
            );
        }

     
       
        const query = 'INSERT INTO articles (title, subtitle, content, image_url, user_id) VALUES ($1, $2, $3, $4, $5)';
        
       
        await db.query(query, [title, subtitle, content, image_url, userId]);

        return NextResponse.json(
            { message: 'Publicação Efetuada com Sucesso!' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao processar a requisição', error)
        return NextResponse.json(
            { error: 'Erro ao salvar no banco de dados' },
            { status: 500 }
        );
    }
}