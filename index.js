import { SMTPClient } from 'emailjs';
import express from 'express'
import * as dotenv from "dotenv";
import bodyParser from 'body-parser'
import cors from 'cors'

const corsOption = {
    origin: ['http://localhost:3000'],
};

dotenv.config();


const app = express();
app.use(cors())

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', urlencodedParser, function (req, res) {
    res.send('Hello World!');
});

app.post('/mail', jsonParser, async (req, res) => {
    console.log(req.body)
    const { email, phone, name, to_mail } = req.body;
    const text =
        (process.env.MAIL_TITLE || "Сообщение с формы") +
        "\n" +
        `Имя: ${name}\n` +
        `Почта: ${email}\n` +
        `Телефон: ${phone}`;


    const client = new SMTPClient({
        user: process.env.EMAIL,
        password: process.env.PASS,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    try {
        const message = await client.sendAsync({
            text: text,
            from: `form <${process.env.USER}>`,
            to: `you <${to_mail}>`,
            subject: 'Отправка формы',
        });
        console.log(message);
        res.send('Сообщение успешно отправлено')
    } catch (err) {
        console.error(err);
        res.send('Произошла ошибка при отправки сообщения')
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

