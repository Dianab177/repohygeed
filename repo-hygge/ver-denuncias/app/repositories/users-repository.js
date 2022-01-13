"use strict";

const getPool = require("../infrastructure/database");

async function findUserById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM users WHERE id = ?";
  const [users] = await pool.query(sql, id);
  return [0];
}

module.exports = {
  findUserById,
};
