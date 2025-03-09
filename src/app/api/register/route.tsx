import { NextResponse } from "next/server"; 
import { Pool } from "pg";
//import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"; 
import { NextRequest } from "next/server";

//Database Config
const db = new Pool({ 
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
});

const JWT_SECRET = process.env.JWT_SECRET

//REGISTER ROUTE
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        // Data Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, senha e nome são obrigatórios!'}, 
                {status:400}
            );
        }

        //Verification if email already exists in database
        const checkQuery = 'SELECT COUNT(*) as count FROM users WHERE email = $1';
        const {rows} = await db.query(checkQuery, [email])
        const {count} = rows[0];

        if (count > 0) {
            return NextResponse.json(
                {error: 'Email já cadastrado!'}, 
                {status:400}
            );
        }

        //Password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        //insertion on database
        const insertQuery = 'INSERT INTO users (email,password, name) VALUES ($1, $2, $3)';
        await db.query(insertQuery, [email, hashedPassword, name]);

        const token = jwt.sign({ email }, JWT_SECRET as string, {
            expiresIn: '7d'
        });

        const response =  NextResponse.json(
            { message: 'Email Cadastrado com Sucesso!', token},
            { status: 201}
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
        });

      
        return response;
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log('Erro ao salvar no banco de dados:',error);
            return NextResponse.json(
                { error: 'Erro ao salvar no banco de dados.' }, 
                { status: 500 }
            );
        }
    }
};