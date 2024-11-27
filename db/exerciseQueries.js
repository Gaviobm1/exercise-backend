const db = require("./postgreSQL");

class Exercise {
  getExercises = async (workoutId) => {
    const exercises = await db.query(
      "SELECT * FROM exercises WHERE workout_id = $1",
      [workoutId]
    );
    return exercises.rows;
  };

  getExercise = async (id) => {
    const exercise = await db.query("SELECT * FROM exercises where id = $1", [
      id,
    ]);
    return exercise.rows[0];
  };

  postExercise = async (exercise) => {
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

  updateExercise = async (id, exercise) => {
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

    const newExercise = await db.query(
      "UPDATE exercises SET name = $1, type = $2, notes = $3, reps = $4, sets = $5, time = $6, distance = $7, kcal = $8, easy = $9, weight = $10, multiple_weights = $11 WHERE id = $12 RETURNING name",
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
    return newExercise;
  };

  deleteExercises = async (workoutId) => {
    const deleted = await db.query(
      "DELETE FROM workouts WHERE workout_id = $1",
      [workoutId]
    );
    return deleted.rowCount;
  };

  deleteExercise = async (id) => {
    const deleted = await db.query(
      "DELETE FROM workouts WHERE id = $1 RETURNING name",
      [id]
    );
    return deleted.rows[0];
  };
}

module.exports = new Exercise();
