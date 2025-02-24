const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hii from the server side!");
});

app.get("/test", (req, res) => {
  res.send("Hello from the test side!");
});

//This will only handles GET Calls to /user
// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params)
//   res.send({ firstname: "Dharmik", lastname: "Ambaliya" });
// });

app.get(/.*fly$/, (req, res) => {
    // console.log(req.query)
  res.send({ firstname: "Dharmik", lastname: "Ambaliya" });
});

app.post("/user",(req,res) => {
    res.send("Data send successfully");
});
 
app.get("/hello", (req, res) => {
  res.send("Hello hello hello!!!");
});

app.listen(7777, () => {
  console.log("Surver is running on port 7777.");
});
