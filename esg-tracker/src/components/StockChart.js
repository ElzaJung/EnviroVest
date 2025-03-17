import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const StockChart = ({ companyName }) => {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/stocks?name=${companyName}`
      );
      const data = response.data;

      const labels = data.map((item) =>
        new Date(item["Date"]).toLocaleDateString()
      );
      const prices = data.map((item) => item["Close"]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${companyName} Stock Price`,
            data: prices,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      setChartData({});
      alert("Please enter a valid company name.");
    }
  };

  useEffect(() => {
    if (companyName) {
      fetchData();
    }
  }, [companyName]); // Re-fetch data when companyName changes

  return (
    <div>
      <h2>{companyName} Stock Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
