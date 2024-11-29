const asyncHandler = require("express-async-handler");
const exerciseDb = require("../db/exerciseQueries");

const addExercise = async (req, res, next) => {
  const newExercise = await exerciseDb.postExercise(req.body);
  return newExercise;
};

const deleteExercise = async (req, res, next) => {
  const id = req.body.exerciseId;
  const deleted = await exerciseDb.deleteExercise(id);
  return res.json(deleted);
};

const deleteExercises = async (req, res, next) => {
  const workoutId = req.body.workoutId;
  const deleted = await exerciseDb.deleteExercises(workoutId);
  return res.json(deleted);
};

const updateExercise = async (req, res, next) => {
  const id = req.body.exerciseId;
  const exerciseData = req.body;
  const updated = await exerciseDb.updateExercise(id, exerciseData);
  return res.json(updated);
};

const getExercise = async (req, res, next) => {
  const id = req.body.exerciseId;
  const exercise = await exerciseDb.getExercise(id);
  return res.json(exercise);
};

const getExercises = async (req, res, next) => {
  const workoutId = req.body.workoutId;
  const exercises = await exerciseDb.getExercises(workoutId);
  res.json(exercises);
};

module.exports = {
  addExercise,
  deleteExercise,
  deleteExercises,
  updateExercise,
  getExercise,
  getExercises,
};
