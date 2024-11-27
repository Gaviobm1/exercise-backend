const asyncHandler = require("express-async-handler");
const exerciseDb = require("../db/exerciseQueries");

class ExerciseController {
  addExercise = async (req, res, next) => {
    const newExercise = await exerciseDb.postExercise(req.body);
    return newExercise;
  };

  deleteExercise = async (req, res, next) => {
    const id = req.params.id;
    const deleted = await exerciseDb.deleteExercise(id);
    return res.json(deleted);
  };

  deleteExercises = async (req, res, next) => {
    const workoutId = req.body.workoutId;
    const deleted = await exerciseDb.deleteExercises(workoutId);
    return res.json(deleted);
  };

  updateExercise = async (req, res, next) => {
    const id = req.params.id;
    const updated = await exerciseDb.updateExercise(id, req.body);
    return res.json(updated);
  };

  getExercise = async (req, res, next) => {
    const id = req.params.id;
    const exercise = await exerciseDb.getExercise(id);
    return res.json(exercise);
  };

  getExercises = async (res, res, next) => {
    const workoutId = req.body;
    const exercises = await exerciseDb.getExercises(workoutId);
    return res.json(exercises);
  };
}

module.exports = new ExerciseController();
