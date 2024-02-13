const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fullstack-taskmanager.aybbcoo.mongodb.net/?retryWrites=true&w=majority`
    );
    return console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectToDatabase;
