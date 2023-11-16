const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/schemas");
require("mongoose");

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
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
      }
      else {
        res.json("password does not match");
      }
    }
    else {
      res.json("email does not match");
    }
  } catch (error) {
    res.json("user not found");
  }
});
module.exports = router;
