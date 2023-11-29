const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  createDouble,
  getAllDoubles,
  updateDouble,
  deleteDouble,
  getSingleDouble,
} = require("./controllers/doubleController");
const {
  createSingle,
  getAllSingles,
  getSingleSingle,
  updateSingle,
  deleteSingle,
} = require("./controllers/singleController");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5175",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

const { PORT, MONGO_URI } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/double", createDouble);
app.get("/double", getAllDoubles);
app.get("/double/:id", getSingleDouble);
app.patch("/double", updateDouble);
app.delete("/double/:id", deleteDouble);
app.post("/single", createSingle);
app.get("/single", getAllSingles);
app.get("/single/:id", getSingleSingle);
app.patch("/single/:id", updateSingle);
app.delete("/single/:id", deleteSingle);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 5000, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
