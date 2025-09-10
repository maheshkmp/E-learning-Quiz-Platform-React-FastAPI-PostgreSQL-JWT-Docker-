import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? "http://localhost:8000/auth/register"
      : "http://localhost:8000/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.access_token); // store token
      localStorage.setItem("role", data.role);
      if (res.ok) {
        onLogin(data); // pass user info (like id, username) to parent
      } else {
        alert(data.detail || "Error");
      }
    } catch (err) {
      console.error("Login/Register failed:", err);
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "20px auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p
        onClick={() => setIsRegister(!isRegister)}
        style={{ cursor: "pointer", marginTop: "10px", color: "blue" }}
      >
        {isRegister ? "Already have an account? Login" : "No account? Register"}
      </p>
    </div>
  );
}

export default LoginForm;
