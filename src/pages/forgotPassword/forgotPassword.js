import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import logo from "./logo-hype-transparent.png";
// import './forgotPassword.css'
const ForgotPassword = () => {
  const [mobileNumber, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log(email,password);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgot-pass`,
        { mobileNumber, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    toast.success("Password reset successfully");
  };

  return (
    <Layout title={"Forgot Password - Earning Money"}>
      <div className=" bg-gradient-to-b from-blue-500 to-green-300 pb-16 h-fit sm:w-2/5 pt-6">
        <div
          // data-aos="flip-up"
          className="p-6  m-auto  mb-10 bg-gradient-to-b from-green-500 to-blue-500 border-2   w-fit rounded-ss-full rounded-br-full"
        >
          <a href="/">
            <img
              src={logo}
              className=""
              style={{ width: "100px", margin: "auto" }}
              alt="Logo"
            />
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="loginInputWrapper">
            <img
              src="/images/phoneInput.png"
              alt="Phone Icon"
              className="phoneIcon"
            />
            <span className="countryCode">+91</span>
            <input
              type="tel"
              placeholder="Please enter mobile number"
              value={mobileNumber}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="loginInputWrapper">
            <img
              src="/images/passInput.png"
              alt="Password Icon"
              className="phoneIcon"
            />
            <input
              type="password"
              placeholder="Please enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="loginInputWrapper">
            <img
              src="/images/smsInput.png"
              alt="Code Icon"
              className="phoneIcon"
            />
            <input
              type="text"
              placeholder="Your first school (security answer)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
         <div className="flex justify-center">
         <button
            type="submit"
            className="setPassBtn bg-gradient-to-r border-2 border-white from-sky-300 to-green-400 p-6 rounded-lg text-white font-semibold"
          >
            Change Password
          </button>
         </div>
        </form>

        <ToastContainer />
      </div>
    </Layout>
  );
};

export default ForgotPassword;
