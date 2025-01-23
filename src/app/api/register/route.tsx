import { NextResponse } from "next/server"; 
import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"; 

//Database Config
const db = mysql.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const JWT_SECRET = process.env.JWT_SECRET

//REGISTER ROUTE
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios!'}, 
                {status:400}
            );
        }

        //Verification if email already exists in database
        const checkQuery = 'SELECT COUNT(*) as count FROM contas.usuarios WHERE email = ?';
        const [rows] = await db.execute(checkQuery, [email])
        const {count} = (rows as any)[0];

        if (count > 0) {
            return NextResponse.json(
                {error: 'Email já cadastrado!'}, 
                {status:400}
            );
        }

        //Password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        //insertion on database
        const insertQuery = 'INSERT INTO usuarios (email,password) VALUES (?, ?)';
        await db.execute(insertQuery, [email, hashedPassword]);

        const token = jwt.sign({ email }, JWT_SECRET as string, {
            expiresIn: '7d'
        });

        const response =  NextResponse.json(
            { 
                message: 'Email Cadastrado com Sucesso!',
                token,
            },
            { status: 201}
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
        });

      
        return response;
    } catch (error: any) {
        console.log('Erro ao salvar no banco de dados:',error);
        return NextResponse.json(
            { error: 'Erro ao salvar no banco de dados.' }, 
            { status: 500 }
        );
    }
};