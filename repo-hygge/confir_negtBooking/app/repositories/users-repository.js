"use strict";

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
      UPDATE users
      SET verifiedAt = ?
      WHERE verificationCode = ?
      AND verifiedAt IS NULL
    `;
  const [result] = await pool.query(sql, [now, verificationCode]);

  return result.affectedRows === 1;
}
async function getUserByVerificationCode(code) {
  const pool = await getPool();
  const sql = `
      SELECT name, email
      FROM users WHERE verificationCode = ?
    `;
  const [user] = await pool.query(sql, code);

  return user[0];
}
module.exports = {
  activateUser,
  getUserByVerificationCode,
};
