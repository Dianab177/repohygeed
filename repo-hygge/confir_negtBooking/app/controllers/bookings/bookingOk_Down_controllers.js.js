"use strict";
const Joi = require("joi");

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error.js");
const sendMailConfirmationBooking = require("../../helpers/mail-smtp");
const sendMailCancelBooking = require("../../helpers/mail-smtp");
const { isUser } = require("../../helpers/utils");
const { addBooking } = require("../../repositories/espacios-repository");

const schema = Joi.object().keys({
  idReserva: Joi.string().min(3).max(20).required(),
  idEspacio: Joi.string().min(2).max(220).required(),
  fecha: Joi.number()
    .integer()
    .positive()
    .min(2022)
    .max(new Date().getFullYear()),
  idUser: Joi.string().valid(),
  equipamiento: Joi.string().min(3).max(220).required(),
});

async function confirmarBooking(req, res) {
  try {
    const { role } = req.auth;
    isUser(role);

    const { body } = req;

    await schema.validateAsync(body);
    const { booking } = body;
    const idEspacio = await addBooking(body);

    res.status(201);
    res.send({
      message: `Su reserva en ${idEspacio} se ha confirmado.
      Saludos cordiales del servicio de atención de Hygge.`,
    });

    if (booking) {
      throwJsonError(409, "Este hygge está completo en estas fechas");
    }
  } catch (error) {
    createJsonError(error, res);
  }
  await sendMailCancelBooking(nombre, email, idReserva);
}

async function downBooking(req, res) {
  try {
    const { role } = req.auth;
    isUser(role);

    const { body } = req;

    await schema.validateAsync(body);
    const { booking } = body;
    const idEspacio = await addBooking(body);

    res.status(201);
    res.send({
      message: `T reserva en ${idEspacio} no se ha creado.
      Sentimos comunicarte que tu reserva no ha podido ser creada, por favor 
      selecciona otro Hygge espacio si tus fechas son fijas, o si deseas este espacio 
      prueba con otras fechas para poder ofrecerte a tu evento un Hygge espacio.
      Puedes modificar tu reserva ${aqui}//link.
      Saludos cordiales del servicio de atención de Hygge.`,
    });

    if (booking) {
      throwJsonError(409, "Este hygge está completo en estas fechas");
    }
  } catch (error) {
    createJsonError(error, res);
  }
  await sendMailCancelBooking(nombre, email, idReserva);
}
module.exports = {
  confirmarBooking,
  downBooking,
};
