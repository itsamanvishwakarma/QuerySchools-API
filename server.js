const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const db = require("./config/keys").mongoURI;
const tokenRouter = require("./routes/tokenRouter");
const schoolsRouter = require("./routes/schoolsRouter");
const logger = require("./middlewares/log");
const PORT = process.env.PORT || 3000;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
    logger.log({
      level: "error",
      message: error.message,
      timestamp: new Date(),
    });
  });
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("It works !!");
});

app.use("/api/token", tokenRouter);

app.use("/api/schools", schoolsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});
