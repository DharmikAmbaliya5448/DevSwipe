const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");

requestRouter.post("/sendingConnctionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a Connection Request");
  res.send(user.firstName + "Sent the connection request");
});

module.exports = requestRouter;
