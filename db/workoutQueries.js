const db = require("./postgreSQL");

class Workout {
  getWorkouts = async (userId) => {
    const workouts = await db.query(
      "SELECT * FROM workouts WHERE user_id = $1",
      [userId]
    );
    return workouts.rows;
  };

  getWorkout = async (id) => {
    const workout = await db.query("SELECT * FROM workouts WHERE id = $1", [
      id,
    ]);
    return workout.rows[0];
  };

  postWorkout = async (userId, date = Date.now()) => {
    const newWorkout = await db.query(
      "INSERT INTO workouts (user_id, date) VALUES ($1, $2) RETURNING id, date",
      [userId, date]
    );
    return newWorkout.rows[0];
  };

  updateWorkout = async (id, date) => {
    const updated = await db.query(
      "UPDATE workouts SET date = $1 WHERE id = $2 RETURNING id, date",
      [id, date]
    );
    return updated.rows[0];
  };

  deleteWorkout = async (id) => {
    const deleted = await db.query(
      "DELETE FROM workouts WHERE id = $1 RETURNING date",
      [id]
    );
    return deleted.rows[0];
  };

  deleteWorkouts = async (userId) => {
    const deleted = await db.query("DELETE FROM workouts where user_id = $1", [
      userId,
    ]);
    return deleted.rowCount;
  };
}

module.exports = new Workout();
