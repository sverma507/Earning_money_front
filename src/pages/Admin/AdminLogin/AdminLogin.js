import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AdminLogin.css";
import { useAdminAuth } from "../../../context/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAuth, setAdminAuth] = useAdminAuth();
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogin(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, { email, password });
      
      if (res && res.data.success) {
        setIsLogin(false);
        toast.success(res.data.message);

        // Save user and token in context and local storage
        setAdminAuth({
          ...adminAuth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("AdminAuth", JSON.stringify(res.data));

        setTimeout(() => {
          navigate("/dashboard/admin");
        }, 2000);
      } else {
        toast.error(res.data.message);
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="loginContainerAdmin">
      <form onSubmit={handleLogin} className="adminLoginForm">
        <h2 className="text-white text-center mb-10">Admin Login</h2>
        <div className="adminloginInputWrapper">
          <img src="/images/phoneInput.png" alt="Phone Icon" className="phoneIcon" />
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="adminloginInputWrapper">
          <img src="/images/passInput.png" alt="Password Icon" className="phoneIcon" />
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`${
            isLogin ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
          } text-white w-40 mt-6 font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300`}
          disabled={isLogin}
        >
          {isLogin ? "Submitting..." : "Login"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
