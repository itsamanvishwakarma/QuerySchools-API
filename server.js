const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const db = require("./config/keys").mongoURI;
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
  });
app.use(express.json());

const getSchoolsRouter = require("./routes/school");
app.use("/school", getSchoolsRouter);

app.get("/", (req, res) => {
  res.send("It works !!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
