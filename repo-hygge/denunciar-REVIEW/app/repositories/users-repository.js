"use strict";

const getPool = require("../infrastructure/database");

async function findUserById(idUser) {
  const pool = await getPool();
  const sql = `SELECT reviews_espacios.*, users.idUser, idEspacio, reviews_espacios FROM reviews_espacios
    LEFT JOIN espacios ON espacios.id = reviews.idEspacio
    WHERE idUser = ?`;
  const [users] = await pool.query(sql, idUser);

  return users;
}

module.exports = {
  findUserById,
};
