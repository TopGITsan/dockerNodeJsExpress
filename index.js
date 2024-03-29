const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("succesfully connected to mongoDB"))
    .catch((e) => {
      console.log(e);
      // TO DO only if service error
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  console.log("request to root");
  res.send("<h2>Hi there</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
