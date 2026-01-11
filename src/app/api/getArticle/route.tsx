import {Pool} from 'pg';
//import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
});

export async function GET(req: Request) {
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
        const { rows } = await db.query('SELECT * FROM articles WHERE id = $1', [id]);

        if (rows.length === 0) {
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