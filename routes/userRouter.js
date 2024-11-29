const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = require("../controllers/userController");
const workoutController = require("../controllers/workoutController");

router.post("/user", userController.create);

router.post("/user/login", userController.login);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

router.put(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.delete(
  "/user",
  passport.authenticate("jwt", { session: false }),
  workoutController.deleteWorkouts,
  userController.deleteUser
);

module.exports = router;
