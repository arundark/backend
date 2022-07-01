import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { pinRouter } from "./routes/pins.js";

dotenv.config();

const app = express();
const port = 5000;
const URL = process.env.MONGO_URL;

app.use(express.json());
app.use("/user", userRouter);
app.use("/pin", pinRouter);

mongoose
  .connect(URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected DB Secussesfully");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});
