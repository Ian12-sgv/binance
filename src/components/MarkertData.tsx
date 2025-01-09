import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMarketData from "../Api/MarketData";

interface MarketDataItem {
  symbol: string;
  price: string;
}

const SearchMarketData = () => {
  const marketData = useMarketData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<MarketDataItem[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = marketData.filter((data) =>
      data.symbol.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCoinClick = (symbol: string) => {
    navigate(`/coin/${symbol}`);
  };

  return (
    <div>
      <h1>Search Market Data</h1>
      <input
        type="text"
        placeholder="Search for a coin"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {filteredData.map((data) => (
          <li key={data.symbol}>
            {data.symbol}: {data.price}{" "}
            <button onClick={() => handleCoinClick(data.symbol)}>
              Ver Gráfica
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMarketData;
