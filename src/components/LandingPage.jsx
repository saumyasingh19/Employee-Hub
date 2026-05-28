import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-emerald-600 hover:scale-110 transition duration-300 cursor-pointer">Employee Hub</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Employee Hub-Employee Management<br></br> System
        </h1>
        <p className="text-gray-600 max-w-xl text-lg">
        Help employees, Admins, and HR teams efficiently manage tasks and workflows from a centralized dashboard.
        </p>

        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold shadow"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;