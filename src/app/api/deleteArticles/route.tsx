import {Pool} from 'pg';
import { NextResponse, NextRequest } from 'next/server'

// Removemos 'fs' e 'path' pois não vamos mais mexer em arquivos físicos

const db = new Pool({
    connectionString: process.env.DATABASE_UR,
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
        
        // --- MUDANÇA: Removemos a parte que buscava a imagem e tentava apagar do disco ---
        // Agora vamos direto para deletar o registro do banco.

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