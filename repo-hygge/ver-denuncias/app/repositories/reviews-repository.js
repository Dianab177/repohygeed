"use strict";

const getPool = require("../infrastructure/database");

async function findReviewsByUserId(idUser) {
  const pool = await getPool();
  const sql = `SELECT reviews.*, espacios.precio, espacios.instalaciones, espacios.actividades
    FROM reviews
    LEFT JOIN espacios ON espacios.id = reviews.idEspacio
    WHERE idUser = ?`;
  const [reviews] = await pool.query(sql, idUser);

  return reviews;
}

module.exports = {
  findReviewsByUserId,
};
