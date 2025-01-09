import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  zoomPlugin
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: [number, number][];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface KlineData {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: number;
  7: string;
  8: number;
  9: string;
  10: string;
  11: string;
}

const CoinChart = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get<KlineData[]>(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d`
        );
        const data = response.data;

        const dates = data.map((item) =>
          new Date(item[0]).toLocaleDateString()
        );
        const prices: [number, number][] = data.map((item) => [
          parseFloat(item[3]),
          parseFloat(item[2]),
        ]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Prices`,
              data: prices,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgb(43, 189, 38)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    if (symbol) {
      fetchCoinData();
    }
  }, [symbol]);

  return (
    <div>
      <h2>{symbol} Chart</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: `${symbol} Prices` },
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        }}
      />
      <button onClick={() => navigate("/dashboard")}>Volver a Buscar</button>
    </div>
  );
};

export default CoinChart;
