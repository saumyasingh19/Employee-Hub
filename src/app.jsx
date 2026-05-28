import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import Employe from "./components/dashboard/employee/Employee";
import AdminDashboard from "./components/dashboard/AdminDashboard/AdminDashboard";

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/employe" element={<Employe />} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App