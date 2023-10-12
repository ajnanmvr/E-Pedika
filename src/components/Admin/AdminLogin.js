import React, { useContext, useState } from "react";
import Axios from "../../Axios";
import { UserContext } from "../../contexts/UserContext";

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
      window.location.href = "/admin/data";
    } catch (error) {
      setLoading(false);
      // Display error message
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-gradient-to-r from-[#eaeaea] to-[#e3f3ff]">
      <form
        className="max-w-md p-8 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl">username:</label>
          <input
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl">password:</label>
          <input
            className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <div
            className="bg-gradient-to-r w-full from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
          processing...
          </div>
        ) : (
          <button
            className="bg-gradient-to-r w-full from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
          >
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
