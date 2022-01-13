"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findEspaciosById } = require("../../repositories/espacios-repository");

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  fav: Joi.string(1).required(),
});

async function addFavouriteBySpaceId(req, res) {
  try {
    const { id } = req.auth;
    const { idEspacio } = req.params;
    await schema.validateAsync(idEspacio);
    const { body } = req;
    await schemaBody.validateAsync(body);

    const espacio = findEspacioById(idEspacio);
    if (!espacio) {
      throwJsonError(400, "El espacio que buscas no existe");
    }
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = addFavouriteBySpaceId;
