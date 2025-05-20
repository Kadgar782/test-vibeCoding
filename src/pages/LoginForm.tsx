import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const API_KEY = "reqres-free-v1";
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!login.trim() || !password.trim()) {
      alert("Please fill in both login and password fields.");
      return;
    }

    try {
      const res = await axios.post(
        "https://reqres.in/api/login",
        {
          email: login,
          password: password,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = res.data;

      if (token) {
        setError("");
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/weather");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        "Login failed, try using eve.holt@reqres.in or emma.wong@reqres.in in both inputs";
      setError(errorMessage);
    }
  };

  return (
    <>
      <main>
        <div className="appWrapper">
          <div className="loginWrapper">
            <input
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              onClick={handleLogin}
              disabled={!login.trim() || !password.trim()}
            >
              Login
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {token && <p style={{ color: "green" }}>Token: {token}</p>}
        </div>
      </main>
    </>
  );
}

export default LoginForm;
