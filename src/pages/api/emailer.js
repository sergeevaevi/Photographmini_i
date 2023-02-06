// let testEmailAccount = await nodemailer.createTestAccount()

import nodemailer from "nodemailer";

const email = process.env.NEXT_PUBLIC_EMAIL;
const emailTo = process.env.NEXT_PUBLIC_EMAIL_TO;
const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const emailOptions = {
    email: email,
    to: email
}