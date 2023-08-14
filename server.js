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

app.get('/', async (res) => {
    res.status(200).json({
        message: "Bienvenus sur notre api sendmail NodeJS",
        route: "/send-mail",
        body: {
            "to": "destinataire@example.com",
            "subject": "Sujet de l'e-mail personnalisé",
            "html": "<p>Contenu HTML de l'e-mail personnalisé</p>",
            "authorName": "Votre Nom"
        }

    })
})
// Point de terminaison pour l'envoi d'e-mail
app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, html, authorName } = req.body; // Ajoutez "authorName"

        // Paramètres de l'e-mail
        const mailOptions = {
            from: `"${authorName}" <${process.env.SMTP_EMAIL}>`, // Utilisation de "from" pour le nom de l'auteur
            to,
            subject,
            html,
        };

        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ status: 200, message: 'E-mail envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ status: 400, message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail.' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
