import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (user: { email: string; password: string }) => user.email === email
    );
    if (userExists) {
      alert("El usuario ya existe");
    } else {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registro exitoso");
      navigate("/");
    }
  };

  return (
    <div className="Register">
      <div className="form-container">
        <h1>Register</h1>
        <form className="form" onSubmit={handleRegister}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Register
          </button>
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
