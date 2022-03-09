const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");

// const { create, destroy } = require("./test");
const {
  logIn,
  logOut,
  signUp,
  findUser,
} = require("./controller/userController");

const {findMusic} = require("./controller/musicController");
const postRouter = require("./router/postRouter");
const spotifyRouter = require("./router/spotifyRouter");
//const musicListRouter = require("./test/musicListRouter");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/login", logIn);
app.post("/logout", logOut);
app.post("/signup", signUp);
app.get("/userinfo", findUser);

// app.get("/test1", create);
// app.get("/test2", destroy);
app.get("/musiclist", findMusic);
app.use("/post", postRouter);
app.use("/spotify", spotifyRouter);

app.get("/", (req, res) => {
  res.status(200).send("Beautiful Music Flower");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found!");
});
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => console.log("server is running"));
