import { NextResponse } from "next/server"; // Respostas HTTP (Envia mensagens de sucesso ou erro ao front)
import mysql from 'mysql2/promise'; //Permite interagir com banco de dados usando promises, facilita o uso de async/await

//Database Config
const db = mysql.createPool({ //cria um pool de conexão com o banco de dados, permite que várias requisições sejam processadas sem criar uma nova para cada uma
    host: 'localhost',
    user: 'root',
    password: 'Nick072227@1',
    database: 'contas',
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email é ogrigatório!'}, {status:400});
        }

        //if email already exists in database
        const checkQuery = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
        const [rows] = await db.execute(checkQuery, [email])
        const {count} = (rows as any)[0];

        if (count > 0) {
            return NextResponse.json({error: 'Email já cadastrado!'}, {status:400})
        }

        //insert on Database
        const insertQuery = 'INSERT INTO usuarios (email) VALUES (?)';
        await db.execute(insertQuery, [email]);

        return NextResponse.json({ message: 'Mail Cadastrado com Sucesso!'});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Erro ao salvar no banco de dados.'}, { status: 500})
    }
};