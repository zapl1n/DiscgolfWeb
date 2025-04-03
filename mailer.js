const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
        console.log('Email sent: ' + info.response);
        
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

module.exports = sendEmail;