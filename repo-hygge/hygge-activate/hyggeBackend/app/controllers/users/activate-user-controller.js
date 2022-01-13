"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");

const { sendMailCorrectValidation } = require("../../helpers/mail-smtp");
const {
  activateUser,
  getUserByVerificationCode,
} = require("../../repositories/users-repository");
//users-repositories-comprobar nombre.Verificar por envío de código, agregar en la tabla users

async function validateUser(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      throwJsonError(400, "Código no válido");
    }
    const isActivated = await activateUser(code);
    if (!isActivated) {
      throwJsonError(400, "Código no válido");
    }
    const user = await getUserByVerificationCode(code);
    const { name, email } = user; //comprobar nombre constante
    await sendMailCorrectValidation(name, email);
    res.status(200);
    res.send({ message: "Tu cuenta se ha activado correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = validateUser;
