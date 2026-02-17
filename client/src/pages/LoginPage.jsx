import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // redirect logged-in users
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      login(data); // save user + token in context & localStorage
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-3 rounded"
          required
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
