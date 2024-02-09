const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", router);

// const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//upper db options is no longer needed;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT;

const server = () => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`); 
  });
};

server();
