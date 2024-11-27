const userDb = require("../db/userQueries");
const workoutDb = require("../db/workoutQueries");
const asyncHandler = require("express-async-handler");

class WorkoutController {
  addWorkout = asyncHandler(async (req, res, next) => {
    const newWorkout = await workoutDb.postWorkout(req.user.id);
    return newWorkout;
  });

  getWorkouts = asyncHandler(async (req, res, next) => {
    const workouts = await workoutDb.getWorkouts(req.user.id);
    res.json(workouts);
  });

  getWorkOut = asyncHandler(async (req, res, next) => {
    const workout = await workoutDb.getWorkout(req.params.id);
    res.json(workout);
  });

  updateWorkout = asyncHandler(async (req, res, next) => {
    const date = req.body.date;
    const updated = await workoutDb.updateWorkout(req.params.id, date);
    res.json(updated);
  });

  deleteWorkout = asyncHandler(async (req, res, next) => {
    const deleted = await workoutDb.deleteWorkout(req.params.id);
    res.json(deleted);
  });

  deleteWorkouts = asyncHandler(async (req, res, next) => {
    const deleted = await workoutDb.deleteWorkouts(req.user.id);
    res.json(deleted);
  });
}

module.exports = new WorkoutController();
