import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <h2>Bienvenido, {loggedInUser.username}</h2>{" "}
      <button onClick={handleLogout}>Cerrar sesión</button>{" "}
    </nav>
  );
}

export default Navbar;
