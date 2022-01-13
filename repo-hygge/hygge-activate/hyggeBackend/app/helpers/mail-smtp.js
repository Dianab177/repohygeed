"use strict";
const nodemailer = require("nodemailer");
const { HTTP_SERVER_DOMAIN, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "ReviewsHygge - Account activated!",
    text: `Hola ${name},\n tu cuenta ya está activada.`,
    html: `<h1>Hola ${name},</h1> tu cuenta Hygge te espera.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendMailCorrectValidation,
};
