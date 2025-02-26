const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dharmik1185:Dharmik153@cluster0.vqk0pvq.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
