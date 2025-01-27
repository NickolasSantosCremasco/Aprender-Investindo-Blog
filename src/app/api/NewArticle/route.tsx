import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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

        const decoded = jwt.verify(token, JWT_SECRET as string) as { email: string };
        const userEmail = decoded.email;

        // Obtenção do user_id pelo email
        const [rows] = await db.execute('SELECT id FROM usuarios WHERE email = ?', [userEmail]);
        const user = (rows as any)[0];

        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado!' },
                { status: 404 }
            );
        }

        const userId = user.id;

        // Obtenção dos dados do formulário
        const formData = await req.formData();
        const title = formData.get('title');
        const subtitle = formData.get('subtitle');
        const text = formData.get('text');
        const image = formData.get('image') as File;

        if (typeof title !== 'string' || typeof subtitle !== 'string' || typeof text !== 'string' || !(image instanceof File)) {
            return NextResponse.json(
                { error: 'Todos os Dados São Obrigatórios e precisam ser válidos!' },
                { status: 400 }
            );
        }

        // Salvando a imagem no servidor
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, image.name);
        fs.writeFileSync(filePath, Buffer.from(await image.arrayBuffer()));

        const imageUrl = `uploads/${image.name}`;

        // Inserção no banco de dados
        const query = 'INSERT INTO contas.articles (title, subtitle, content, image_url, author_id) VALUES (?, ?, ?, ?, ?)';
        await db.execute(query, [title, subtitle, text, imageUrl, userId]);

        const response = NextResponse.json(
            {
                message: 'Publicação Efetuada com Sucesso!',
            },
            { status: 201 }
        );
        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao salvar no banco de dados' },
            { status: 500 }
        );
    }
}
