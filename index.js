const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_IP,
  REDIS_PORT,
  REDIS_SECRET,
} = require("./config/config");

let redisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_IP,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

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

app.use(
  session({
    store: new redisStore({ client: redisClient }),
    secret: REDIS_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  console.log("request to root");
  res.send("<h2>Hi there</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
