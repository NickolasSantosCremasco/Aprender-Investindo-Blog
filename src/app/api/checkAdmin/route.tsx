import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface TokenPayload {
    id: number;
    email: string;
    is_admin: boolean;
}

export async function GET(req: NextRequest) {
    try {  
        const token = req.cookies.get('authToken')?.value;

        if (!token) {
            return NextResponse.json(
                {is_admin:0}, 
                {status: 401}
            )
        }

        const decoded = jwt.verify(token, JWT_SECRET as string) as TokenPayload;
        return NextResponse.json(
            { is_admin: decoded.is_admin},
            { status: 200}
        )

    }catch(error) {
        console.error("Erro ao verificar o token", error)
        return NextResponse.json(
            {is_admin:false},
            {status:401}
        )
    }
}