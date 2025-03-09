import { NextResponse } from "next/server";
//import mysql from 'mysql2/promise';
import {Pool} from 'pg';
import bcrypt from 'bcryptjs' // Password hash
import jwt from 'jsonwebtoken'; //For token generation
import { NextRequest } from "next/server";

// Database Config
const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized:false}
});

interface User {
    id: Number,
    email: string,
    password: string,
    is_admin: boolean
}

//JWT Secret
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não definido no ambiente.')
}

// LOGIN ROUTE
export async function POST(req: NextRequest) {
    
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
        const query = "SELECT id, email, password, is_admin FROM users WHERE email = $1";
        const {rows} = await db.query(query, [email]);
        const user = rows[0] as User;

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

        const payload = {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin
        }
        //Generate a JWT token (Valid for 1 hour)
        const token = jwt.sign(payload, JWT_SECRET as string, {
            expiresIn: '1h',
        });

        //Sucess return with token
        const response = NextResponse.json(
            {message: 'Login bem sucedido!', token},
            {status: 200}
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        });
        return response
    } catch (error: any) {
        console.error('Erro no login:', error);
        
        return NextResponse.json(
            {error: 'Erro interno no servidor.'},
            { status: 500}
            
        );
        
    }
}