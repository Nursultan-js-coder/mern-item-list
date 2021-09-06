const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const itemRouter = require("./routes/api/items");
const bookRouter = require("./routes/api/books");
const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const path = require("path");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(config.get("mongoDbURI"), {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully !");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/items", itemRouter);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || config.get("port") || 9000;
app.listen(PORT, () => {
  console.log("port is listening to ", PORT);
});
