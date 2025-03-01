import { NextResponse, NextRequest } from "next/server";
import transporter from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
    console.log('Rota /api/contact chamada'); // Log para verificar se a rota está sendo chamada
    try {
        const { name, email, tel, services, msg } = await req.json();

        console.log('Dados recebidos:', { name, email, tel, services, msg });

        if (!name || !email || !tel) {
            return NextResponse.json(
                { message: 'Nome, e-mail e telefone são obrigatórios.' },
                { status: 400 }
            );
        }

        console.log('Enviando e-mail para:', process.env.EMAIL_TO);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: 'Contato Realizado',
            text: `
                Nome: ${name}
                Email: ${email}
                Telefone: ${tel}
                Serviço de Interesse: ${services}
                Mensagem: ${msg}
            `
        });

        console.log('E-mail enviado com sucesso!');

        return NextResponse.json(
            { message: 'E-mail enviado com Sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return NextResponse.json(
            { message: 'Ocorreu um erro ao enviar o e-mail.', error }, { status: 500 }
        );
    }
}