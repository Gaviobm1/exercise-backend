const db = require("./postgreSQL");

const getWorkouts = async (userId) => {
  const workouts = await db.query("SELECT * FROM workouts WHERE user_id = $1", [
    userId,
  ]);
  return workouts.rows;
};

const getWorkoutIds = async (userId) => {
  const workouts = await db.query(
    "SELECT id FROM workouts WHERE user_id = $1",
    [userId]
  );
  return workouts.rows;
};

const getWorkout = async (id) => {
  const workout = await db.query("SELECT * FROM workouts WHERE id = $1", [id]);
  return workout.rows[0];
};

const postWorkout = async (userId, date = new Date()) => {
  const dateInfo = new Date(date);
  const newWorkout = await db.query(
    "INSERT INTO workouts (user_id, date) VALUES ($1, $2) RETURNING id, date",
    [userId, dateInfo]
  );
  return newWorkout.rows[0];
};

const updateWorkout = async (id, date) => {
  const updated = await db.query(
    "UPDATE workouts SET date = $1 WHERE id = $2 RETURNING id, date",
    [date, id]
  );
  return updated.rows[0];
};

const deleteWorkout = async (id) => {
  const deleted = await db.query(
    "DELETE FROM workouts WHERE id = $1 RETURNING date",
    [id]
  );
  return deleted.rows[0];
};

const deleteWorkouts = async (userId) => {
  const deleted = await db.query("DELETE FROM workouts where user_id = $1", [
    userId,
  ]);
  return deleted.rowCount;
};

module.exports = {
  getWorkout,
  getWorkouts,
  getWorkoutIds,
  postWorkout,
  updateWorkout,
  deleteWorkout,
  deleteWorkouts,
};
