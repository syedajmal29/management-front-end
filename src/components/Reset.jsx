import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://management-backend-b1uo.onrender.com/reset-password/${token}`, { newPassword });
      toast.success("Password Reset Successfully");
navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-800 text-white p-6 rounded-md max-w-sm mx-auto mt-10 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <input
        type="password"
        className="w-full p-3 mb-4 rounded-md border border-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md"
      >
        Reset Password
      </button>
    </form>
  );
}

export default Reset;