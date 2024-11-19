import { createTransport } from "nodemailer";
import { renderEmail } from "./converter.js";
import dotenv from "dotenv";

dotenv.config();

const FROM_ADDRESS_DETAIL = {
    name: 'FAKE_BANK',
    address: 'test-bank@gmail.com'
};

export async function sendEmail(options) {
    const client = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    await client.sendMail(options);
}

export async function sendResetPasswordEmail(email, token) {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password-reset/${token}`;

    const html = await renderEmail('reset-password.mjml', {
      name: email,
      url: resetPasswordUrl
    });

    await sendEmail({
      to: email,
      from: FROM_ADDRESS_DETAIL,
      subject: 'Permintaan Reset Password',
      html
    });
}
