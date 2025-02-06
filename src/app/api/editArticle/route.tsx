
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

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                {error: 'ID do artigo não encontrado!'},
                {status: 400}
            );
        }

        console.log('Atualizando Artigos ID:', id)
        //dinamic array for the fields that are received for update
        const updates = [];
        const values = [];

        if (title) {
            updates.push('title = ?')
            values.push(title)
        }

        if (subtitle) {
            updates.push('subtitle = ?')
            values.push(subtitle)
        }

        if (content) {
            updates.push('content = ?')
            values.push(content)
        }

        if (image_url) {
            updates.push('image_url = ?')
            values.push(image_url)
        }

        //if doesn't have any fields to update, return error

        if (updates.length === 0) {
            return NextResponse.json(
                {error: 'Nenhum Campo para Atualizar'},
                {status: 400}
            );
        }

        values.push(id)

        const GET = `SELECT * FROM articles WHERE id = ?`
        const query = `UPDATE articles SET ${updates.join(", ")} WHERE id = ?`;
        await db.query(query, values);
        await db.query(GET, id )

        return NextResponse.json(
            {message: 'Artigo Atualizado com Sucesso'},
            {status:200}
        )
    } catch (error) {
        console.error('Erro ao Atualizar Artigo:', error)
        return NextResponse.json(
            {error: 'Erro ao atualizar o artigo:'},
            {status: 500}
        );
    }

}