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

app.post("/user", (req, res) => {
  res.send("Data send successfully");
});

app.get("/hello", (req, res) => {
  res.send("Hello hello hello!!!");
});

app.get(
  "/hii",
  [(req, res, next) => {
    console.log("Handling the route user!!!");
    //res.send("Response!!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling Route 2nd!!!");
    //res.send("2ns Route...");
    next();
  }],
  (req, res, next) => {
    console.log("Handling the 3rd Route");
    //res.send("3rd Route");
    next();
  },
  (req, res, next) => {
    console.log("Handling the 4th Route");
    res.send("4th Route");
    next();
  }
);

app.listen(7777, () => {
  console.log("Surver is running on port 7777.");
});

//Array inside route
// app.use("/routes",rH1,rH2,rH3,rH4,rH5);
// app.use("/routes",[rH1,rH2,rH3,rH4,rH5]);
// app.use("/routes",rH1,[rH2,rH3],rH4,rH5);
