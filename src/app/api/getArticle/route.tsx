import mysql from 'mysql2/promise';
import { NodeNextResponse } from 'next/dist/server/base-http/node';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});



export async function GET(req: NextRequest) {
    try {
        //get the ID from article URL
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if(!id) {
            return NextResponse.json(
                {error: 'ID do artigo não fornecido'},
                {status: 400}
            );
        }

        // Search for article in the Database
        const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [id]) as any[];

        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json(
                {error: 'Artigo Não encontrado'},
                {status: 404}
            );
        }
        return NextResponse.json(rows[0], {status: 200});

    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar artigos do banco de dados' },
            { status: 500 }
        );
    }
}
