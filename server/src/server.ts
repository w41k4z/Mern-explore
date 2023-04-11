import "dotenv/config";
import mongoose from "mongoose";
import express from "express";

const app = express();
const port = process.env.PORT;

// endpoints
app.get("/", (req, res) => {
  res.send("Hello World");
});

// connect to database
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    app.listen(port!, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(console.error);
