// test_yahoo_finance.js
const yahooFinance = require("yahoo-finance2").default;

const tickerSymbol = "AAPL";

async function fetchStockData() {
  try {
    const result = await yahooFinance.historical(tickerSymbol, {
      period1: "2022-01-01",
      period2: "2023-01-01",
    });
    console.log(`Historical Data for ${tickerSymbol}:`, result);
  } catch (error) {
    console.error(`Error fetching data for ${tickerSymbol}:`, error);
  }
}

fetchStockData();
