const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");
const workoutRouter = require("./routes/workoutRouter");
const exerciseRouter = require("./routes/exerciseRouter");

const { jwtStrategy } = require("./auth/strategies");
const passport = require("passport");

passport.use(jwtStrategy);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(workoutRouter);
app.use(exerciseRouter);
app.listen(8080, () => {
  console.log("Listening on 8080");
});
