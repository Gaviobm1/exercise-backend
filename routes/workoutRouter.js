const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const passport = require("passport");
const multer = require("multer");

const upload = multer();

router.get(
  "/workout/:id",
  passport.authenticate("jwt", { session: false }),
  workoutController.getWorkout
);

router.get(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutController.getWorkouts
);

router.post(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
  workoutController.postWorkout
);

router.put(
  "/workout/:id",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
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

module.exports = router;
