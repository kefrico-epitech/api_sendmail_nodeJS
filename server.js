const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config();//Importation du fichier .env


const app = express();
app.use(bodyParser.json());

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    },
});

// Point de terminaison pour l'envoi d'e-mail
app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        // Paramètres de l'e-mail
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            text,
        };

        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'E-mail envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail.' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
