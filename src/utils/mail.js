import { createTransport } from "nodemailer";

const FROM_ADDRESS_DETAIL = {
    name: 'FAKE_BANK',
    address: 'test-bank@gmail.com'
};

export async function sendEmail(options) {
    const client = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    await client.sendMail(options);
}

export async function sendResetPasswordEmail(email, token) {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password-reset/${token}`;
  
    await sendEmail({
      to: email,
      from: FROM_ADDRESS_DETAIL,
      subject: 'Permintaan Reset Password',
      html: `
        <h1>Permintaan Reset Password</h1>
        <p>Klik <a href="${resetPasswordUrl}">link ini</a> untuk mereset password anda</p>
        <p>Link ini akan kadaluarsa dalam 1 jam</p>
        <p>Jika anda tidak meminta pesan ini, silahkan abaikan pesan ini</p>
      `
    });
}

export async function sendOtpEmail(email, otp) {
    await sendEmail({
      to: email,
      from: FROM_ADDRESS_DETAIL,
      subject: 'Permintaan Verifikasi OTP',
      html: `
        <h1>Verifikasi OTP</h1>
        <h2>Terimakasih Telah Memilih test-bank!, Untuk memastikan keamanan akun anda, kami membutuhkan verifikasi identitas anda dengan menggunakan OTP berikut ini</h2>
        <h3>OTP anda: ${otp}</h3>
        <p>Otp ini berlaku selama 5 menit, pastikan anda melakukan verifikasi sebelum melewati batas waktu</p>
        <p>Jika anda tidak meminta OTP ini, silahkan abaikan pesan ini</p>
      `
    });
  }