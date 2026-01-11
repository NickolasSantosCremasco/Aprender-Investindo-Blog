import {Pool} from 'pg';
//import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
});

export async function GET() {
    try {
        // Search for the articles on the database
        const { rows } = await db.query('SELECT * FROM articles ORDER BY created_at DESC');
        
        // Return articles in json
        return NextResponse.json(rows, { status: 200 });

    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar artigos do banco de dados' },
            { status: 500 }
        );
    }}