const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/schemas");
const { LeaderBoard } = require("../models/schemas");
require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const otp = Math.floor(Math.random() * 100001);

router.post("/sendVerificationCode", async (req, res) => {
  const { Name, Email } = req.body;
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.Pass,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL,
    to: Email,
    subject: "verification code",
    text: `Hello ${Name} , your otp to verify email is : ${otp}`,
  });
  res.json("sent");
});

router.post("/verifyCode", async (req, res) => {
  const { code } = req.body;
  try {
    if (otp == code) {
      res.status(200).json("Matched");
    } else {
      res.json("did not match");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/sign", async (req, res) => {
  const { Name, DOB, Email, Contact, Password } = req.body;

  const salt = await bcrypt.genSalt();
  const HashedPassword = await bcrypt.hash(Password, salt);

  const userData = {
    Name: Name,
    DOB: DOB,
    Email: Email,
    Contact: Contact,
    Password: HashedPassword,
  };

  const newUser = new Users(userData);

  try {
    await newUser.save();
    res.json("User created successfully");
  } catch (error) {
    console.error(error);
    res.json("Internal Server Error");
  }
});

router.post("/logsig", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await Users.findOne({ Email: Email });
    if (user) {
      const passwordMatched = await bcrypt.compare(Password, user.Password);
      if (passwordMatched) {
        res.json(user);
      } else {
        res.json("password does not match");
      }
    } else {
      res.json("email does not match");
    }
  } catch (error) {
    res.json("user not found");
  }
});

router.post("/postResult", async (req, res) => {
  try {
    const { email, name, attempts, score } = req.body;
    const user = await LeaderBoard.findOne({ email: email });

    var userResult = {
      email: email,
      name: name,
      attempts: user ? user.attempts + 1 : 1,
      score: user ? Math.max(user.score, score) : score,
    };

    const newResult = new LeaderBoard(userResult);

    // Save the new result first
    await newResult.save();

    // If the user existed, delete the old result
    if (user) {
      await LeaderBoard.deleteOne({ email: email });
    }

    res.json("result saved successfully");
  } catch (error) {
    res.json(error);
  }
});

router.get("/getResults", async (req, res) => {
  const allResultData = await LeaderBoard.find({});
  res.send(allResultData);
})

module.exports = router;
