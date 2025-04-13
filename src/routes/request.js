const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const user = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type:" + status });
      }

      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      // If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request is already Exists!!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }

    //const user = req.user;
    // console.log("Sending a Connection Request");
    // res.send(user.firstName + "Sent the connection request");
  }
);

module.exports = requestRouter;
