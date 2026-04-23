import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils";
import { useLoginUserMutation } from "../redux/slices/userSlice";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginInfo).unwrap();
      console.log("LOGIN RESPONSE:", res);

      const rawUser = res?.user || res?.data?.user || res?.data || res;

      console.log("RAW USER:", rawUser);

      if (!rawUser?._id) {
        throw new Error("User ID missing in response");
      }

      const user = {
        _id: rawUser._id,
        name: rawUser.name,
        email: rawUser.email,
      };

      localStorage.setItem("user", JSON.stringify(user));

      if (res?.token || res?.jwtToken) {
        localStorage.setItem("token", res.token || res.jwtToken);
      }

      console.log("STORED USER:", user);
      handleSuccess("Login successfull!!");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      handleError("Unable to login!!");
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
