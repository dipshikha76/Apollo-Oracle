const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/schemas");
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

    if ( otp == code) {
      res.status(200).json("Matched");
    }
    else {
      res.json("did not match");
    };
  } catch (error) {
    console.log(error);
  }
})

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
module.exports = router;
