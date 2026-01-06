const express = require("express"); // Import the Express framework
const fetch = require("node-fetch"); // Import node-fetch request for the API
const path = require("path"); // Import path to handle file
const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; 

// Serve static files from the Multi-Device
app.use(express.static(path.join(__dirname, "Multi-Device")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Multi-Device", "A2_Multi-Device Application.html")); // Shows the main HTML when accessing the URL
});

// API endpoit to get the dessert recipes
app.get("/api/desserts", async (req, res) => {
  try {
    const baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"; //The API URl for dessert
    const response = await fetch(baseUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desserts" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
