const express = require('express');
const router = express.Router();
// const schema = require('../models/schemas');
require("mongoose");
const Users = require('../models/schemas');

router.post('/sign', async(req ,res) => {
    const { Name, DOB, Email, Contact, Password } = req.body;
    
    const userData = { Name: Name, DOB: DOB, Email: Email, Contact: Contact, Password: Password };

  const newUser = new Users(userData);

    try {
      await newUser.save();
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
})

router.post("/logsig", async(req, res) => {
  const { Email, Password } = req.body;
  try {
    const emailFound = await Users.findOne({Email:Email, Password:Password})
    
    if (emailFound) {
      res.json(emailFound);
    }
    else {
      res.json("not exist");
    }
  } catch (error) {
    res.json("user not found");
  }
})
module.exports = router;