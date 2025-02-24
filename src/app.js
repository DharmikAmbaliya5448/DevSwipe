const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hii from the server side!");
});

app.get("/test", (req, res) => {
  res.send("Hello from the test side!");
});

app.get("/hello", (req, res) => {
  res.send("Hello hello hello!!!");
});

app.listen(7777, () => {
  console.log("Surver is running on port 7777.");
});
