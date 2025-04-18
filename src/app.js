const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Connection succesfully established...");
    app.listen(7777, () => {
      console.log("Server is running on port 7777.");
    });
  })
  .catch((err) => {
    console.log("Connection Refused");
  });

