import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs' // Password hash
import jwt from 'jsonwebtoken'; //For token generation

// Database Config
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

//JWT Secret
const JWT_SECRET = process.env.JWT_SECRET

// LOGIN ROUTE
export async function POST(req: Request) {
    
    try {
        
        const body = await req.json();
       
        const { email, password } = body;

        //Validation: Check if email and password are provided
        if ( !email || !password ) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios!' }, 
                { status: 400 }
            );
        }

        // Query user by email
        const query = "SELECT id, email, password FROM contas.usuarios WHERE email = ?";
        const [rows] = await db.execute(query, [email]);
        const user = (rows as any)[0];

        if (!user) {
            return NextResponse.json(
                { error: 'Email ou senha inválidos!' },
                { status: 401 }
            );
        }

        //compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Email ou senha inválidos!' },
                { status: 401 }
            );
        }

        //Generate a JWT token (Valid for 1 hour)
        const token = jwt.sign({id:user.id, email:user.email}, JWT_SECRET as string, {
            expiresIn: '1h',
        });

      

        //Sucess return with token
        return NextResponse.json(
            {
                message: 'login bem-sucedido',
                token, // JWT token
            },
            {status: 200}
        );
    } catch (error: any) {
        console.error('Erro no login:', error);
        
        return NextResponse.json(
            {error: 'Erro interno no servidor.'},
            { status: 500}
            
        );
        
    }
}