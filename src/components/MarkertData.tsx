import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMarketData from "../Api/MarketData";

import "../style/Dashboard.css";

interface MarketDataItem {
  symbol: string;
  price: string;
}

const SearchMarketData = () => {
  const marketData = useMarketData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<MarketDataItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(marketData);
  }, [marketData]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(marketData);
    } else {
      const filtered = marketData.filter((data) =>
        data.symbol.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleCoinClick = (symbol: string) => {
    navigate(`/coin/${symbol}`);
  };

  return (
    <div className="market-data">
      <div className="header-nav">
        <div>
          <h1>Buscador de criptomonedas</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="example: BTC-btc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            pattern=".*\S.*"
            required
          />
          <button onClick={handleSearch} className="button-search">
            Search
          </button>
        </div>
      </div>
      <div className="market-data-table">
        <table className="market-data-table-container">
          {" "}
          <thead className="market-data-table-header">
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr key={data.symbol}>
                <td>{data.symbol}</td>
                <td>{data.price}</td>
                <td>
                  <button onClick={() => handleCoinClick(data.symbol)}>
                    Ver Gráfica
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchMarketData;
