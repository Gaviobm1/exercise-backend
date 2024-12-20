const userDb = require("../db/userQueries");
const workoutDb = require("../db/workoutQueries");
const exerciseDb = require("../db/exerciseQueries");
const asyncHandler = require("express-async-handler");

const validWorkout = asyncHandler(async (req) => {
  const workoutId = req.params.id;
  const userId = req.user.id;
  const workout = await workoutDb.getWorkout(workoutId);

  if (!workout || workout.user_id !== userId) {
    return false;
  }
  return true;
});

const postWorkout = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const newWorkout = await workoutDb.postWorkout(
    req.user.id,
    req.body && req.body.date
  );
  return res.json(newWorkout);
});

const getWorkouts = asyncHandler(async (req, res, next) => {
  const workouts = await workoutDb.getWorkouts(req.user.id);
  return res.json(workouts);
});

const getWorkoutId = asyncHandler(async (req, res, next) => {
  const workouts = await workoutDb.getWorkoutIds(req.body.id);
  res.json(workouts);
});

const getWorkout = asyncHandler(async (req, res, next) => {
  const isValid = validWorkout(req);
  if (!isValid) {
    return res.json("Invalid user");
  }
  const workout = await workoutDb.getWorkout(req.params.id);
  return res.json(workout);
});

const updateWorkout = asyncHandler(async (req, res, next) => {
  const isValid = validWorkout(req);
  if (!isValid) {
    return res.json("Invalid user");
  }
  const date = req.body.date;
  const updated = await workoutDb.updateWorkout(req.params.id, date);
  return res.json(updated);
});

const deleteWorkout = asyncHandler(async (req, res, next) => {
  const isValid = validWorkout(req);
  if (!isValid) {
    return res.json("Invalid user");
  }
  await exerciseDb.deleteExercises(req.params.id);
  const deleted = await workoutDb.deleteWorkout(req.params.id);
  return res.json(deleted);
});

const deleteWorkouts = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const workoutIds = await workoutDb.getWorkoutIds(userId);
  for await (const workoutId of workoutIds) {
    const { id } = workoutId;
    await exerciseDb.deleteExercises(id);
  }
  const deleted = await workoutDb.deleteWorkouts(userId);
  return res.json(deleted);
});

module.exports = {
  postWorkout,
  getWorkout,
  getWorkouts,
  getWorkoutId,
  updateWorkout,
  deleteWorkout,
  deleteWorkouts,
};
