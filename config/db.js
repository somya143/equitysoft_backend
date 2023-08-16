const mongoose = require("mongoose");

async function connect() {
    try {
     const DB_URI = process.env.MONGO_URI || "mongodb+srv://raj:raj@cluster0.cb7b3hu.mongodb.net/form-app"
      await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

 module.exports = connect;