"use strict";

const getPool = require("../infrastructure/database");

function findEspaciosById(id) {
  // const sql = 'SELECT * FROM espacios WHERE id = id';
  return espacios.find((espacios) => espacios.id === +id);
}

async function getFavourites(idEspacio) {
  const pool = await getPool();
  const sql = `
    SELECT
    AVG(ffavourites) as media,
    COUNT(favourites) as numFavourites,
    FROM favourites WHERE idEspacios = ?`;
  const [reviews] = await pool.query(sql, idEspacio);

  return reviews[0];
}

module.exports = {
  getFavourites,
  findEspaciosById,
};
