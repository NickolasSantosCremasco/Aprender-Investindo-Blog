
import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {title, subtitle, text, image } = body;

        if (!title || !subtitle || !text || !image) {
            return NextResponse.json(
                {error: 'Todos os Dados São Obrigatórios!'},
                {status: 400}
            );
        }

        const insertArticle = 'INSERT INTO articles (title, subtitle, content, image_url) VALUES (?, ?, ?, ?)'
        await db.execute(insertArticle, [title, subtitle, text, image])

        const response = NextResponse.json(
            {
                messsage: 'Publicação Efetuada com Sucesso!',
            },
            {status: 201}
        )
        return response
    }catch(error) {
        console.log('Erro ao salvar no banco de dados:', error)
        return NextResponse.json(
            {error: 'Erro ao salvar no banco de dados'},
            {status: 500}
        )
    }
}