const db = require("./postgreSQL");

const getExercises = async (workoutId) => {
  const exercises = await db.query(
    "SELECT * FROM exercises WHERE workout_id = $1",
    [workoutId]
  );
  return exercises.rows;
};

const getExercise = async (id) => {
  const exercise = await db.query("SELECT * FROM exercises where id = $1", [
    id,
  ]);
  return exercise.rows[0];
};

const postExercise = async (exercise) => {
  const { name, type, notes, easy, workoutId, exercise_data } = exercise;
  console.log(exercise);
  const newExercise = await db.query(
    "INSERT INTO exercises (name, notes, easy,  workout_id, exercise_data, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name",
    [name, notes, easy, workoutId, exercise_data, type]
  );
  return newExercise;
};

const updateExercise = async (id, exercise) => {
  const { name, type, notes, easy, exercise_data } = exercise;
  await db.query(
    "UPDATE exercises SET name = COALESCE($1, NAME), type = COALESCE($2, type), notes = COALESCE($3, notes),  easy = COALESCE($4, easy), exercise_data = COALESCE($5, exercise_data) WHERE id = $6",
    [name, type, notes, easy, exercise_data, id]
  );
  const updatedExercise = await db.query(
    "SELECT * FROM exercises WHERE id = $1",
    [id]
  );
  return updatedExercise.rows[0];
};

const deleteExercises = async (workoutId) => {
  const deleted = await db.query(
    "DELETE FROM exercises WHERE workout_id = $1",
    [workoutId]
  );
  return deleted.rowCount;
};

const deleteExercise = async (id) => {
  const deleted = await db.query(
    "DELETE FROM exercises WHERE id = $1 RETURNING name",
    [id]
  );
  return deleted.rows[0];
};

module.exports = {
  getExercise,
  getExercises,
  postExercise,
  updateExercise,
  deleteExercise,
  deleteExercises,
};
