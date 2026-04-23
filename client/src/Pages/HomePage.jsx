import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { handleSuccess } from "../../utils";
import Navigation from "../Components/Navigation";
import "../Pages/HomePage.css";
import "../Components/Navigation.css";

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser");

    if (!token) {
      navigate("/login");
      return;
    }
    if (user) {
      try {
        setLoggedInUser(JSON.parse(user));
      } catch (err) {
        setLoggedInUser(user);
      }
    }
  }, [navigate]);
  const handleLogout = () => {
    console.log("logged out");
    handleSuccess("Logged Out successfully!!");

    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="app-layout">
      <header className="layout-header">
        <Navigation user={loggedInUser} onLogout={handleLogout} />
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
