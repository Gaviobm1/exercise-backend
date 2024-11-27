const db = require("./postgreSQL.js");

class User {
  findUser = async (email) => {
    return await db.query("SELECT * FROM users WHERE email = $1", [email]);
  };

  findById = async (id) => {
    const data = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return data.rows[0];
  };

  insertUser = async (user) =>
    await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [user.firstName, user.lastName, user.email, user.password]
    );

  deleteUser = async (id) => {
    const deleted = await db.query("DELETE FROM users WHERE id = $1", [id]);
  };

  updateUser = async (user) => {
    const { firstName, lastName, email } = user;
    const updated = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3",
      [firstName, lastName, email]
    );
    return updated;
  };
}

module.exports = new User();
