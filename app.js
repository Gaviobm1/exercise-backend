const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");

const { localStrategy, jwtStrategy } = require("./auth/strategies");
const passport = require("passport");

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors());

app.use(express.json());
app.use(userRouter);
app.listen(8080, () => {
  console.log("Listening on 8080");
});
