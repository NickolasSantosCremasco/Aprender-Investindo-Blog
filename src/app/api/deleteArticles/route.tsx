//import mysql from 'mysql2/promise'
import {Pool} from 'pg';
import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs/promises'; //for arquives manipulation
import path from 'path'; //path manipulation

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
})
export async function DELETE(req: NextRequest ) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                {error: 'ID não foi recebido'}, 
                {status:400}
            )
        };
        
        const { rows } = await db.query('SELECT image_url FROM articles WHERE id = $1', [id]);

        const imageUrl = rows[0].image_url

        if (imageUrl) {
            const imagePath = path.join(process.cwd(), 'public','uploads', imageUrl);
            try {
                await fs.unlink(imagePath);
            } catch (error) {
                console.error(`Erro ao deletar a imagem: ${imagePath}`, error)
            }
        }

        const result = await db.query('DELETE FROM articles WHERE id = $1', [id])

        //Verification if the article is already deleted
        if (result.rowCount === 0) {
            return NextResponse.json(
                {error: 'Artigo não encontrado'}, 
                {status:404}
            )
        };

        return  NextResponse.json(
            {message: 'Artigo Deletado com Sucesso'},
            {status:200}
        )
    } catch (error) {
        console.error('Erro ao deletar o artigo:', error);
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
    
}