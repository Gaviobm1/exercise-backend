const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const upload = multer();

const userController = require("../controllers/userController");
const workoutController = require("../controllers/workoutController");

router.post("/user", upload.none(), userController.create);

router.post("/user/login", upload.none(), userController.login);

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
