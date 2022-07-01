import mongoose from "mongoose";
import { pin } from "../models/pin.js";
import express from "express";

const router = express.Router();

router.post("/createpin", async (req, res) => {
  try {
    const newPin = new pin(req.body);
    const pinObj = await newPin.save();
    res.status(200).json(pinObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getpins", async (req, res) => {
  try {
    const storedPin = await pin.find();
    res.status(200).json(storedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const pinRouter = router;
