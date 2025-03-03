import { NextResponse, NextRequest } from "next/server";
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(req: NextRequest) {
    console.log('Rota /api/contact chamada'); // Log para verificar se a rota está sendo chamada
    try {
        const { name, email, tel, services, msg } = await req.json();

        if (!name || !email || !tel) {
            return NextResponse.json(
                { message: 'Nome, e-mail e telefone são obrigatórios.' },
                { status: 400 }
            );
        }

    // Setting the Email Content
        const emailContent = {
            to: process.env.EMAIL_TO || '', 
            from: process.env.EMAIL_USER || '',
            replyTo: email, 
            subject: 'Contato Realizado',
            text: `
                Nome: ${name}
                Email: ${email}
                Telefone: ${tel}
                Serviço de Interesse: ${services}
                Mensagem: ${msg}
            `,
            html: `
                <h1>Novo Contato</h1>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${tel}</p>
                <p><strong>Serviço de Interesse:</strong> ${services}</p>
                <p><strong>Mensagem:</strong> ${msg}</p>
            `,
        };

        await sgMail.send(emailContent);

        return NextResponse.json(
            { message: 'E-mail enviado com Sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return NextResponse.json(
            { message: 'Ocorreu um erro ao enviar o e-mail.'}, { status: 500 }
        );
    }
}