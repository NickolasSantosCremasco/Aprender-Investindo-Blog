import {Pool} from 'pg';
//import mysql from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
});

export async function PATCH(req: NextRequest) {
    try {
        
        const { id, title, subtitle, content, image_url } = await req.json();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                {error: 'ID do artigo não encontrado!'},
                {status: 400}
            );
        }

        const checkQuery = 'SELECT id FROM articles WHERE id = $1';
        const { rowCount } = await db.query(checkQuery, [id]);

        if (rowCount === 0) {
            return NextResponse.json(
                {error:'Artigo Não Encontrado'},
                {status: 404}
            )
        }

        console.log('Atualizando Artigos ID:', id)
        //dinamic array for the fields that are received for update
        const updates = [];
        const values = [];
        let paramsIndex = 1;

        if (title) {
            updates.push(`title = $${paramsIndex++}`)
            values.push(title)
        }

        if (subtitle) {
            updates.push(`subtitle = $${paramsIndex++}`)
            values.push(subtitle)
        }

        if (content) {
            updates.push(`content = $${paramsIndex++}`)
            values.push(content)
        }

        if (image_url) {
            updates.push(`image_url = $${paramsIndex++}`)
            values.push(image_url)
        }

        values.push(id)

        
        if (updates.length === 0) {
            return NextResponse.json(
                {error: 'Nenhum Campo para Atualizar'},
                {status: 400}
            );
        }

        const query = `UPDATE articles SET ${updates.join(', ')} WHERE id = $${paramsIndex} RETURNING *;`
        const { rows } = await db.query(query, values);


        //if dont have any field to update, return error
       
        

        return NextResponse.json(
            {message: 'Artigo Atualizado com Sucesso', article: rows[0]},
            {status:200}
        )
    } catch (error) {
        console.error('Erro ao Atualizar Artigo:', error)
        return NextResponse.json(
            {error: `Erro ao atualizar o artigo`},
            {status: 500}
        );
    }

}