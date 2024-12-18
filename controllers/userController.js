const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { isNotEmpty } = require("../helpers");
const userDb = require("../db/userQueries");
const workoutDb = require("../db/workoutQueries");
const exerciseDb = require("../db/exerciseQueries");
const jwt = require("jsonwebtoken");

const checkValidEmail = async (email) => {
  const { rowCount } = await userDb.findUser(email);
  return rowCount === 0 ? true : false;
};

const validateUser = [
  body("first_name").trim().isLength({ min: 1, max: 255 }).escape(),
  body("last_name").trim().isLength({ min: 1, max: 255 }).escape(),
  body("email")
    .trim()
    .isEmail()
    .custom(async (email) =>
      checkValidEmail(email).then((result) => {
        if (!result) {
          throw new Error("Email already in use");
        }
        return result;
      })
    )
    .escape(),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .escape(),
  body("confirm-password")
    .trim()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    })
    .escape(),
];

const create = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const errors = validationResult(req);
      const user = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      };
      if (isNotEmpty(errors)) {
        return res.json({ errors: errors.array() });
      }
      const newUser = await userDb.insertUser(user);

      const payload = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      return res.json({ token });
    });
  }),
];

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userDb.findUser(email);
  if (!user) {
    return res.status(401).json({ message: "email or password invalid" });
  }
  bcrypt
    .compare(password, user.password)
    .then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "12h",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "email or password invalid" });
      }
    })
    .catch((err) => next(err));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const deleted = await userDb.deleteUser(userId);
  return res.json(deleted);
});

const getUser = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await userDb.findById(id);
  return res.json(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const newData = req.body;
  const user = await userDb.updateUser(newData);
  return res.json(user);
});

module.exports = {
  create,
  login,
  deleteUser,
  getUser,
  updateUser,
};
