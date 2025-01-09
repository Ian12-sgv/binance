import { useEffect, useState } from "react";
import axios from "axios";

const useMarketData = () => {
  interface MarketDataItem {
    symbol: string;
    price: string;
  }

  const [marketData, setMarketData] = useState<MarketDataItem[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price"
        );
        setMarketData(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  return marketData;
};

export default useMarketData;
