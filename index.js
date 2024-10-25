const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
//const cors = require('cors');
const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
dotenv.config();


const app = express();

// Habilita el middleware para analizar cuerpos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Si también quieres manejar formularios


//app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(cors());



// Especifica el directorio desde el cual se servirán los archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar otras solicitudes
app.get('*', (req, res) => {
    // Obtener la ruta del archivo solicitado por el cliente
    const filePath = path.resolve(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url.slice(1));

    // Obtener la extensión del archivo
    const extname = path.extname(filePath);

    // Definir el tipo MIME según la extensión del archivo
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.ico':
            contentType = 'image/x-icon'; // Define el tipo MIME para los archivos .ico
            break;
        case '.woff':
            contentType = 'application/font-woff'; // Define el tipo MIME para los archivos de fuentes .woff
            break;
        case '.woff2':
            contentType = 'application/font-woff2'; // Define el tipo MIME para los archivos de fuentes .woff2
            break;
        case '.svg':
            contentType = 'image/svg+xml'; // Define el tipo MIME para los archivos de fuentes .svg
            break;
        case '.ttf':
            contentType = 'application/font-sfnt'; // Define el tipo MIME para los archivos de fuentes .ttf
            break;
        case '.eot':
            contentType = 'application/vnd.ms-fontobject'; // Define el tipo MIME para los archivos de fuentes .eot
            break;
    }
    // Configurar la cookie
    res.cookie('cookieName', 'cookieValue', {
        sameSite: 'None',
        secure: true
    });

    // Verificar si filePath apunta a un archivo válido
    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Si el archivo no existe, envía un código de estado 404 (Not Found)
                res.status(404).send('404 Not Found');
            } else {
                // Si hay otro error, envía un código de estado 500 (Internal Server Error)
                res.status(500).send('500 Internal Server Error: ' + err.code);
            }
        } else {
            // Si filePath es un archivo válido, leer el contenido del archivo y enviarlo al cliente con el tipo MIME adecuado
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.status(500).send('500 Internal Server Error: ' + err.code);
                } else {
                    res.set('Content-Type', contentType);
                    res.send(content);
                }
            });
        }
    });
});

// Configura el transportador de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.com',      // Servidor SMTP de IONOS
    port: 587,                   // Puerto para TLS
    secure: false,               // true para 465, false para otros puertos
    auth: {
        user: process.env.IONOS_USERNAME,
        pass: process.env.IONOS_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
});
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USERNAME,
//         pass: process.env.GMAIL_PASSWORD,
//     },
//     tls: {
//         rejectUnauthorized: false
//     },
// });

app.post('/contact', (req, res) => {
    console.log('Solicitud recibida');
    console.log(req.body);
    const { name, email, subject, message } = req.body || {};
    console.log('Received data:', name, email, subject, message);
    console.log('Sending Email...');

    const mailOptions = {
        from: "Web Service Contact Message" `<${process.env.IONOS_USERNAME}>`,
        to: process.env.IONOS_USERNAME, // Asegúrate de que el email esté correctamente formateado
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.send('<p style="color: red;">Error sending Email, please try again later!.</p>');
        }
        console.log('Email sent:', info.response);
        return res.send('<p style="color: green;">Mail Sent Sucessfully!.</p>');
    });
});
// Escuchar en el puerto 3000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});