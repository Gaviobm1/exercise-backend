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
  const {
    name,
    type,
    notes,
    reps,
    sets,
    time,
    distance,
    kcal,
    easy,
    weight,
    multipleWeights,
    workoutId,
  } = exercise;

  const newExercise = await db.query(
    "INSERT INTO exercises (name, type, notes, reps, sets, time, distance, kcal, easy, weight, multiple_weights, workout_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING name",
    [
      name,
      type,
      notes,
      reps,
      sets,
      time,
      distance,
      kcal,
      easy,
      weight,
      multipleWeights,
      workoutId,
    ]
  );
  return newExercise;
};

const updateExercise = async (id, exercise) => {
  const {
    name,
    type,
    notes,
    reps,
    sets,
    time,
    distance,
    kcal,
    easy,
    weight,
    multipleWeights,
  } = exercise;

  await db.query(
    "UPDATE exercises SET name = COALESCE($1, NAME), type = COALESCE($2, type), notes = COALESCE($3, notes), reps = COALESCE($4, reps), sets = COALESCE($5, sets), time = COALESCE($6, time), distance = COALESCE($7, distance), kcal = COALESCE($8, kcal), easy = COALESCE($9, easy), weight = COALESCE($10, weight), multiple_weights = COALESCE($11, multiple_weights) WHERE id = $12",
    [
      name,
      type,
      notes,
      reps,
      sets,
      time,
      distance,
      kcal,
      easy,
      weight,
      multipleWeights,
      id,
    ]
  );
  const updatedExercise = await db.query(
    "SELECT * FROM exercises WHERE id = $1",
    [id]
  );
  return updatedExercise.rows[0];
};

const deleteExercises = async (workoutId) => {
  const deleted = await db.query("DELETE FROM workouts WHERE workout_id = $1", [
    workoutId,
  ]);
  return deleted.rowCount;
};

const deleteExercise = async (id) => {
  const deleted = await db.query(
    "DELETE FROM workouts WHERE id = $1 RETURNING name",
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
