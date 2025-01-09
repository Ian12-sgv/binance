import Navbar from "../components/navbar";
import SearchMarketData from "../components/MarkertData";
import "../style/Dashboard.css";

function Dashboard() {
  return (
    <div className="navbar">
      <Navbar />
      <SearchMarketData />
    </div>
  );
}

export default Dashboard;
