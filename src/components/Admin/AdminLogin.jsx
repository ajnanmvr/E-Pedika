import React, { useState } from "react";
import Axios from "../../Axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Send a POST request to the backend sign-in endpoint
      const response = await Axios.post(
        "/user/login",
        { username, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      setLoading(false);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen font-semibold justify-center  items-center">

<div className="border p-10 rounded-xl border-primary flex flex-col gap-5">
<img src="/logos/logo.png" alt="logo"  className="h-16 object-contain"/>
      <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-2">

        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg border border-gray-900 px-3 py-[6px] w-full"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-gray-900 px-3 py-[6px] w-full"
          />
        </label>
        {error && <div className="text-xs text-gray-600 text-center">{error}</div>}

        {loading ? (
          <div>processing...</div>
        ) : (
          <button type="submit" className="rounded-lg border border-primary bg-primary text-white px-6 py-[6px] w-full">Sign In</button>
        )}
      </form>
</div>
    </div>
  );
};

export default LoginForm;
