import {Pool} from 'pg';
//import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const db = new Pool({
   connectionString: process.env.DB_URL,
   ssl: {rejectUnauthorized: false}
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    try {
        // Verificação do token e decodificação
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
            return NextResponse.json(
                {error: 'Token Inválido ou expirado'},
                {status: 401}
            )
        }

        const userEmail = decoded.email
        // Get user_id by email
        const { rows } = await db.query('SELECT id FROM users WHERE email = $1', [userEmail]);
        if (rows.length === 0) {
            return NextResponse.json(
                {error: 'Usuário não encontrado!'},
                {status: 401}
            );
        }
        const userId = rows[0].id;

        // get form data
        const formData = await req.formData();
        const title = formData.get('title');
        const subtitle = formData.get('subtitle');
        const text = formData.get('text');
        const image = formData.get('image');

        if (typeof title !== 'string' || typeof subtitle !== 'string' || typeof text !== 'string' || !(image instanceof File)) {
            return NextResponse.json(
                { error: 'Todos os Dados São Obrigatórios e precisam ser válidos!' },
                { status: 400 }
            );
        }

        // Save the image on server
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, image.name);
        fs.writeFileSync(filePath, Buffer.from(await image.arrayBuffer()));

        const imageUrl = `uploads/${image.name}`;

        // Database on Insertion
        const query = 'INSERT INTO articles (title, subtitle, content, image_url, author_id) VALUES ($1, $2, $3, $4, $5)';
        await db.query(query, [title, subtitle, text, imageUrl, userId]);

        const response = NextResponse.json(
            { message: 'Publicação Efetuada com Sucesso!' },
            { status: 201 }
        );
        return response;
    } catch (error) {
        console.error('Erro ao processar a requisição', error)
        return NextResponse.json(
            { error: 'Erro ao salvar no banco de dados' },
            { status: 500 }
        );
    }
}
