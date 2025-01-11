import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Binance from "../assets/svg/Binance.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../style/Navbar.css";

function Navbar() {
  const history = useNavigate();
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );
  useEffect(() => {
    if (!loggedInUser) {
      history("/");
    }
  }, [loggedInUser, history]);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    history("/");
  };
  if (!loggedInUser) {
    return null;
  }
  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={Binance} alt="Binance" className="logo-img" />
        <h2 className="logo">BINANCE</h2>{" "}
      </div>
      <div>
        <a onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </a>{" "}
      </div>
    </nav>
  );
}

export default Navbar;
