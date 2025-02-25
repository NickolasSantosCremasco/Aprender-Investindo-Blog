import { NextResponse, NextRequest } from "next/server";
import transporter from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
    try {
        const {name, email, tel, services, msg} = await req.json()

        const mailOptions = {
            from: process.env.EMAIL_USER, //email remetente
            to: process.env.EMAIL_TO,
            subject: 'Contato Realizado Pelo Usuário do Blog',
            text: `
                Nome: ${name}
                Email: ${email}
                Telefone: ${tel}
                Serviço de Interesse: ${services}
                Mensagem: ${msg}
            `
        };

        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            {message: 'E-mail enviado com Sucesso!'},
            {status:200}
        )
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return NextResponse.json(
            {message: 'Ocorreu um erro ao enviar o e-mail.'}, {status:500}
        )
    }
}