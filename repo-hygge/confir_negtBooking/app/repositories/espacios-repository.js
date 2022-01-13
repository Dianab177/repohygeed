"use strict";

const getPool = require("../infrastructure/database");

async function addBooking(reservas) {
  const pool = await getPool();
  const now = new Date();
  const consulta = `INSERT INTO reservas(
      fecha,
      precio,
      idUser,
      idEspacio,
      aceptada,
      createdAt
      ) VALUES (?, ?, ?, ?, ?)`;

  const { fecha, precio, idUser, idEspacio, aceptada } = espacios;
  const [created] = await pool.query(consulta, [
    fecha,
    precio,
    idUser,
    idEspacio,
    aceptada,
    now,
  ]);
}

function findEspacio() {
  //const sql='SELECT * FROM espacios';
  return espacios;
}

function findEspaciosById(id) {
  // const sql = 'SELECT * FROM espacios WHERE id = id';
  return espacios.find((espacios) => espacios.id === +id);
}
async function findBookingById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM reservas WHERE id = ?";
  const [users] = await pool.query(sql, id);

  return users[0];
}
async function removeBookingById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM reservas WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

module.exports = {
  addBooking,
  findBookingById,
  findEspacio,
  findEspaciosById,
  removeBookingById,
};
