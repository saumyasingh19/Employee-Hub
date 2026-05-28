import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../context/firebase";
import { useUser } from "../context/UserContext";


const Login = () => {
    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useFirebase();

   const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const user = await login(email, password);
    const uid = user.uid;

    const docRef = doc(firestore, "employee", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("No user data found!");

    const { role, fullName } = docSnap.data();
    setUser({ name: fullName, role });

    if (role === "admin") navigate("/admin");
    else if (role === "hr") navigate("/hr");
    else navigate("/employee");
  } catch (error) {
    alert("Login failed: " + error.message);
  }

  setEmail("");
  setPassword("");
};
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#EAF9F1]">
            <div className="w-full max-w-md p-10 rounded-2xl shadow-2xl bg-white border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                    Welcome Back!
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="rounded-lg px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <input
                        type="password"
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="rounded-lg px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-400 transition text-white font-semibold py-3 rounded-lg shadow-md"
                    >
                        Log In
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <NavLink to="/signup" className="text-emerald-500 font-semibold hover:underline">
                            Sign up
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;