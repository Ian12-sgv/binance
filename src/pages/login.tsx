import "../style/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="Login">
      <div className="form-container">
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>
        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Login
          </button>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
