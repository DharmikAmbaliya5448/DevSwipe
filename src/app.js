const express = require("express");
const connectDB = require("./config/database.js");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("./utils/validation.js");
const { userAuth } = require("./middleware/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //Creating the new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully...");
    } else {
      throw new Error("Password not correct");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendingConnctionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a Connection Request");
  res.send(user.firstName + "Sent the connection request");
});

//GET User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
    // } catch (err) {
    //   res.status(404).send("Something went wrong");
    // }
    // });

    //   try {
    //     const users = await User.find({ emailId: userEmail });
    //     if (users.length === 0) {
    //       res.status(404).send("User Not Found");
    //     } else {
    //       res.send(users);
    //     }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//Feed API - GET /Feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //const user = await User.findByIdAndDelete({_id:userId});
    const user = await User.findByIdAndDelete(userId);
    res.send("UserId Deleted Succefully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated succefully");
  } catch (err) {
    res.status(400).send("DATA NOT UPDATED:" + err.message);
  }
});

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
// const { adminAuth,customerAuth } = require("./middleware/auth.js");

// app.get("/", (req, res) => {
//   res.send("Hii from the server side!");
// });

// app.get("/test", (req, res) => {
//   res.send("Hello from the test side!");
// });

//This will only handles GET Calls to /user
// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params)
//   res.send({ firstname: "Dharmik", lastname: "Ambaliya" });
// });

// app.get(/.*fly$/, (req, res) => {
//   // console.log(req.query)
//   res.send({ firstname: "Dharmik", lastname: "Ambaliya" });
// });

// app.post("/user", (req, res) => {
//   res.send("Data send successfully");
// });

// app.get("/hello", (req, res) => {
//   res.send("Hello hello hello!!!");
// });

// app.get(
//   "/hii",
//   [
//     (req, res, next) => {
//       console.log("Handling the route user!!!");
//       //res.send("Response!!!");
//       next();
//     },
//     (req, res, next) => {
//       console.log("Handling Route 2nd!!!");
//       //res.send("2ns Route...");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     console.log("Handling the 3rd Route");
//     //res.send("3rd Route");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the 4th Route");
//     res.send("4th Route");
//     next();
//   }
// );

//Playing with the middleware
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data Send");
// });

// app.get("/admin/deleteAllData", (req, res) => {
//   res.send("Delete All Data");
// });

// app.use("/customer",customerAuth);

// app.get("/customer/getAllData", (req, res) => {
//   res.send("All customer Data Send");
// });

// app.get("/customer/deleteAllData", (req, res) => {
//   res.send("Delete customer All Data");
// });

//Array inside route
// app.use("/routes",rH1,rH2,rH3,rH4,rH5);
// app.use("/routes",[rH1,rH2,rH3,rH4,rH5]);
// app.use("/routes",rH1,[rH2,rH3],rH4,rH5);
