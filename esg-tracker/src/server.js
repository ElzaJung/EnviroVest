const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Enable CORS for all requests

app.get("/api/stock/:ticker", async (req, res) => {
  const { ticker } = req.params;

  try {
    // Fetch historical data for the last week
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7); // Go back 7 days

    const result = await yahooFinance.historical(ticker, {
      period1: lastWeek.toISOString().split("T")[0], // Set start date
      period2: today.toISOString().split("T")[0], // Set end date
      interval: "1d", // Daily interval
    });

    res.json(result);
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
