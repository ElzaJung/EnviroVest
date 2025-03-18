import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

// Register all necessary components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const StockChart = () => {
  const canvasRef = useRef(null);
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/stock/AAPL");
        const data = await response.json();

        // Transform API data to Chart.js candlestick format
        const formattedData = data.map((item) => ({
          t: new Date(item.date).getTime(), // Timestamp
          o: item.open, // Open price
          h: item.high, // High price
          l: item.low, // Low price
          c: item.close, // Close price
        }));

        setFinancialData(formattedData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    if (financialData.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "candlestick",
      data: {
        datasets: [
          {
            label: "AAPL Stock Data",
            data: financialData,
            color: {
              up: "green",
              down: "red",
              unchanged: "blue",
            },
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Price",
            },
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, [financialData]);

  return <canvas ref={canvasRef} width={800} height={400} />;
};

export default StockChart;
