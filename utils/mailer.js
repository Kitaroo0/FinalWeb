const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: 'javafrom@yandex.ru',
        pass: 'cegbkuthamcmvsvm'
    }
});

async function sendWelcomeEmail(email) {
    try {
        await transporter.sendMail({
            from: 'javafrom@yandex.ru',
            to: email,
            subject: 'Welcome to Our Website',
            text: 'Thank you for registering on our website. We hope you enjoy your experience!'
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
}

async function sendPortfolioCreationEmail(email) {
    try {
        await transporter.sendMail({
            from: 'javafrom@yandex.ru',
            to: email,
            subject: 'New Portfolio Item Created',
            text: 'A new portfolio item has been created on your website.'
        });
    } catch (error) {
        console.error('Error sending portfolio creation email:', error);
    }
}

module.exports = { sendWelcomeEmail, sendPortfolioCreationEmail };