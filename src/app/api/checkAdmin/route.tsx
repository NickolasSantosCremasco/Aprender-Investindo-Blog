import mysql from 'mysql2/promise'
import { NextResponse, NextRequest } from 'next/server'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

export async function CheckAdmin(req:NextRequest) {
    try {
        const { userId } = await req.json()

        if (!userId) {
            return NextResponse.json(
                {error: 'Usuário não autenticado!'},
                {status:401}
            )
        }

        const [rows]: any = await db.query('SELECT is_admin FROM usuarios WHERE id = ?', [userId]);
        if (!rows || rows.length === 0) {
            return NextResponse.json(
                {error:'Usuário não encontrado'},
                {status:404}
            )
        }
        const isAdmin = rows[0].is_admin === 1;
        return NextResponse.json({isAdmin})
    } catch(error) {
        console.error('Erro ao verificar admin:', error);
        return NextResponse.json({error: 'Erro interno do servidor'}, {status: 500})
    }
}