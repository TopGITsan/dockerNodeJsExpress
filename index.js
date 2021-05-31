const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://topdevop:topdevoppass@mongo:27017/?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("succesfully connected to mongoDB"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  console.log("request to root");
  res.send("<h2>Hi there</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
