const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = require("../controllers/userController");

router.post("/user", userController.create);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    const payload = {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });
    res.json({ token });
  }
);

router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.delete
);

module.exports = router;
