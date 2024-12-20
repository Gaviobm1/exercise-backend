const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const passport = require("passport");
const multer = require("multer");

const upload = multer();

router.get(
  "/exercise/:workoutId",
  passport.authenticate("jwt", { session: false }),
  exerciseController.getExercises
);

router.get(
  "/exercise/:id",
  passport.authenticate("jwt", { session: false }),
  exerciseController.getExercise
);

router.post(
  "/exercise",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
  exerciseController.addExercise
);

router.put(
  "/exercise/:id",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
  exerciseController.updateExercise
);

router.delete(
  "/exercise",
  passport.authenticate("jwt", { session: false }),
  exerciseController.deleteExercises
);

router.delete(
  "/exercise/:id",
  passport.authenticate("jwt", { session: false }),
  exerciseController.deleteExercise
);

module.exports = router;
