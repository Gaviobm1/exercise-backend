const db = require("./postgreSQL.js");

const findUser = async (email) => {
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return user.rows[0];
};

const findById = async (id) => {
  const data = await db.query(
    "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
    [id]
  );
  return data.rows[0];
};

const insertUser = async (user) => {
  const newUser = await db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
    [user.firstName, user.lastName, user.email, user.password]
  );
  return newUser.rows[0];
};

const deleteUser = async (id) => {
  const deleted = await db.query("DELETE FROM users WHERE id = $1", [id]);
  return deleted.rowCount;
};

const updateUser = async (user) => {
  const { first_name, last_name, email, id } = user;
  const updated = await db.query(
    "UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email) WHERE id = $4 RETURNING id, first_name, last_name, email",
    [first_name, last_name, email, id]
  );
  return updated.rows[0];
};

module.exports = {
  findUser,
  findById,
  insertUser,
  deleteUser,
  updateUser,
};
