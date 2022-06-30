import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPwd = await generateHash(password);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPwd,
    });

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //finding the user
    const user = await User.findOne({ username: username });
    console.log(!user);
    !user && res.status(500).json("Invalid user or password");
    //verifying the password
    const verifyPassword = await bcrypt.compare(password, user.password);
    !verifyPassword && res.status(500).json("Invalid user or password");

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

async function generateHash(pwd) {
  const NumberOfRounds = 10;
  const salting = await bcrypt.genSalt(NumberOfRounds);
  const hashedValue = await bcrypt.hash(pwd, salting);
  return hashedValue;
}

export const userRouter = router;
