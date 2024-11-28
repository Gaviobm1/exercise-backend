const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const passport = require("passport");

router.get(
  "/workout/:id",
  passport.authenticate("jwt", { session: false }),
  workoutController.getWorkOut
);

router.get(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutController.getWorkouts
);

router.post(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutController.postWorkout
);

router.put(
  "/workout/:id",
  passport.authenticate("jwt", { session: false }),
  workoutController.updateWorkout
);

router.delete(
  "/workout/:id",
  passport.authenticate("jwt", { session: false }),
  workoutController.deleteWorkout
);

router.delete(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutController.deleteWorkouts
);
