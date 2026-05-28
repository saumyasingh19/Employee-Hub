import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 shadow">
      <nav className="flex items-center justify-between px-6 py-4 bg-white rounded-b-lg">
        <div>
          <h1 className="text-lg text-green-600">Hello,</h1>
          <h2 className="text-2xl font-bold text-green-800">{user?.name}</h2>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Header;