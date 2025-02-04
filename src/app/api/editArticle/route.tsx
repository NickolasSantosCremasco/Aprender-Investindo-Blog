import { error } from 'console';
import mysql from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export async function PATCH(req: NextRequest) {
    try {
        const { id, title, subtitle, content, image_url } = await req.json();

        if (!id || !title || !subtitle || !content || !image_url) {
            return NextResponse.json(
                {error: 'Dados incompletos'},
                {status: 400}
            );
        }

        await db.query(
            "UPDATE articles SET title = ?, subtitle = ?, content = ?, image_url = ? WHERE id = ?",
            [title, subtitle, content, image_url,id]
        );

        return NextResponse.json(
            {message: 'Artigo Atualizado com Sucesso'},
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro ao atualizar o artigo'},
            {status: 500}
        );
    }

}