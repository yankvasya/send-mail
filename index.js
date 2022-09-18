import { SMTPClient } from 'emailjs';
import * as dotenv from "dotenv";
dotenv.config();

const client = new SMTPClient({
    user: process.env.EMAIL,
    password: process.env.PASS,
    host: 'smtp.gmail.com',
    ssl: true,
});

try {
    const message = await client.sendAsync({
        text: 'form text',
        from: `form <${process.env.USER}>`,
        to: `you <${process.env.TO}>`,
        subject: 'Отправка формы',
    });
    console.log(message);
} catch (err) {
    console.error(err);
}
