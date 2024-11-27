const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/userQueries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyCallback = async (email, password, done) => {
  db.findUser(email)
    .then((data) => {
      const user = data.rows[0];
      if (!user) {
        done(null, false, { message: "No user with that email" });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Passwords do not match" });
        })
        .catch((err) => done(err));
    })
    .catch((err) => done(err));
};

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  verifyCallback
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyTokenCallback = async (jwtPayload, done) => {
  db.findById(jwtPayload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
};

const jwtStrategy = new JwtStrategy(opts, verifyTokenCallback);

module.exports = {
  localStrategy,
  jwtStrategy,
};
