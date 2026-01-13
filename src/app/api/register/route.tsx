import { NextResponse, NextRequest } from "next/server"; 
import { Pool } from "pg";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"; 

// eslint-disable-next-line no-var
declare global {
  var pool: Pool | undefined;
}

let pool: Pool;

if (!global.pool) {
  global.pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
}
pool = global.pool;
const db = pool;

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, senha e nome são obrigatórios!'}, 
                { status: 400 }
            );
        }

        const checkQuery = 'SELECT COUNT(*) as count FROM users WHERE email = $1';
        const { rows } = await db.query(checkQuery, [email])
        
        const userCount = Number(rows[0].count); 

        if (userCount > 0) {
            return NextResponse.json(
                { error: 'Email já cadastrado!'}, 
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const insertQuery = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)';
        await db.query(insertQuery, [email, hashedPassword, name]);

        const token = jwt.sign({ email }, JWT_SECRET as string, {
            expiresIn: '7d'
        });

        const response = NextResponse.json(
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
        console.error('Erro no registro:', error); 
        
        if(error instanceof Error) {
            return NextResponse.json(
                { error: 'Erro ao salvar no banco de dados.' }, 
                { status: 500 }
            );
        }
         return NextResponse.json(
                { error: 'Erro desconhecido.' }, 
                { status: 500 }
            );
    }
};