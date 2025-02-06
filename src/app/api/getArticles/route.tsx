import mysql from 'mysql2/promise';
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
        // Search for the articles on the database
        const [rows] = await db.query('SELECT * FROM articles ORDER BY created_at DESC');
        
        // Return articles in json
        return NextResponse.json([rows], { status: 200 });

    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar artigos do banco de dados' },
            { status: 500 }
        );
    }
}
