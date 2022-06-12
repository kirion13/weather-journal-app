const express = require("express");
const app = express();
const cors = require("cors");
const port = 5001;

const baseEndpoint = [];

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("website"));
app.post("/api", (req, res) => {
  try {
    const {
      main: { temp, temp_min, temp_max },
      weather: [{ main, description, icon }],
      feeling,
    } = req.body;
    baseEndpoint.unshift({
      temp,
      temp_min,
      temp_max,
      weather: main,
      description,
      date: new Date(),
      feeling,
      icon,
    });
    /////////
    res.status(201).json(baseEndpoint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/api", (req, res) => {
  res.status(200).json(baseEndpoint);
});
///
app.listen(port, () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT: ${port}`);
});
