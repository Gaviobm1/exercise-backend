const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { isNotEmpty } = require("../helpers");
const db = require("../db/userQueries");

const checkValidEmail = async (email) => {
  const { rowCount } = await db.findUser(email);
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
        res.json({ errors: errors.array() });
      }
      const newUser = await db.insertUser(user);
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err);
        }
        res.json();
      });
    });
  }),
];

const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const deleted = await db.deleteUser(id);
  res.json(deleted);
});

const getUser = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await db.findById(id);
  res.json(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await db.updateUser(req.user);
  res.json(user);
});

module.exports = {
  create,
  deleteUser,
  getUser,
  updateUser,
};
