const analyzeWeather=require('./analyzeWeather');
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Config the express server
dotenv.config();
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Variables for port and API key
const port = 8080;

// Get Routes
app.get("/", (req, res) => {
  res.sendFile("dist/index.html", { root: __dirname });
});

app.get('/getweatherstatus/:destinationName/:leavingDateDestInput/:returningDateDestInput', async(req, res) => {
  try{
  const { destinationName,leavingDateDestInput,returningDateDestInput } = req.params;
  let response = await analyzeWeather(destinationName,leavingDateDestInput,returningDateDestInput);
  res.json(response);
}
catch (error) {
  console.error("Error in /getweatherstatus route:", error.message);
  res.status(500).json({ error: error.message });
}
})

// Message for server success running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});