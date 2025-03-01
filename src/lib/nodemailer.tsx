import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, //isso não pode ter, já vou começar a atualizar para colocar no sendgrid ao inves do nodemailer
    }
});

export default transporter;

