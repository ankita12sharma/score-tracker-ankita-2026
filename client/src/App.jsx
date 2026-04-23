import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/SignupForm";
import Login from "./Pages/LoginForm";
import HomePage from "./Pages/HomePage";
import Dashboard from "./Components/Dashboard";
import "../src/index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Dashboard />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
