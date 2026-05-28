import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "employee",
    contact: "",
  });

  const { signup, signupWithGoogle } = useFirebase();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = async (e) => {
  e.preventDefault();
  const { fullName, email, password, role, contact } = formData;

  try {
    await signup(email, password, fullName, role, contact);
    setFormData({ fullName: "", email: "", password: "", role: "employee", contact: "" });

    alert("Signup successful! You can now log in.");
    setUser({ name: fullName, role });

    if (role === "admin") navigate("/admin");
    else if (role === "hr") navigate("/hr-dashboard");
    else navigate("/employe");
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup failed: " + error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-emerald-50 px-4">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl bg-white border border-green-100">
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number (optional)"
            className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={signupWithGoogle}
            className="w-full border border-gray-300 text-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            Sign up with Google
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-emerald-600 underline hover:text-green-800">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;