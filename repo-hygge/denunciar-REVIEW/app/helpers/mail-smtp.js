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

async function sendMailUnhappyUser(name, email, code) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?code=${code}`;

  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: `Buenas ${name}, somos el servicio de atención de Hygge`,
    text: `Hola ${name}, nos ponemos en contacto contigo por si podemos ayudarte, puedes acceder a contacto desde aquí: link: ${linkContacto}`,
    html: `Hola ${name}, puedes contarnos tu experiencia aquí <a href='${linkActivation}'>contacto</a> para poder buscar una solución`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendMailUnhappyUser,
};
