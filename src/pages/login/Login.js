
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import tele from './tele.png';
import logo from './logo-hype-transparent.png';
import mail from './mailt.png';
import loadingGif from './loadingGif.gif';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import default CSS for PhoneInput

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("phone"); // "phone" or "email"
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    generateVerificationCode();
  }, []);

  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setVerificationCode(code);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when login process starts.

    if (inputCaptcha !== verificationCode.toString()) {
      toast.error("Invalid CAPTCHA code.");
      setLoading(false); // Stop loading if CA PTCHA fails.
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginMethod === "phone"
          ? { mobileNumber, password }
          : { email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(res.data.message);
        setLoading(false); // Stop loading if login fails.
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Something went wrong. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false); // Stop loading if an error occurs.
    }
  };

  return (
    <Layout title={"Login - Earning Money"}>
      <div className="sm:w-2/5 mx-auto bg-gradient-to-b from-purple-400 to-blue-500 pb-16">
        <div className="registerHeader p-4 px-6 text-white shadow-lg shadow-blue-400">
          <button onClick={() => navigate(-1)}><img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                /></button>
          <h1>Login</h1>
        </div>
        <div className="loginContainer">
          {/* <div
            className="p-6 m-auto mt-2 mb-10 bg-gradient-to-b from-green-500 to-blue-500 border-2 w-fit rounded-ss-full rounded-br-full"
          >
            <a href="/">
              <img
                src={logo}
                style={{ width: "100px", margin: "auto" }}
                alt="Logo"
              />
            </a>
          </div> */}

          <div className="toggleWrapper">
            <div
              className={`toggleButton text-white ${loginMethod === "phone" ? "active" : ""}`}
              onClick={() => setLoginMethod("phone")}
            >
              <img src={require("./phone_logo1.png")} className="w-24" alt="Phone Icon" />
              Phone number
            </div>
            <div
              className={`toggleButton text-white ${loginMethod === "email" ? "active" : ""}`}
              onClick={() => setLoginMethod("email")}
            >
              <img src={require("./email_logo1.png")} className="w-24" alt="Email Icon" />
              Email / Account
            </div>
          </div>

          <form onSubmit={handleLogin}>
            {loginMethod === "phone" ? (
              <div className="loginInputWrapper">
                 <img src={require('./phone1.png')} alt="Phone Icon" className="userphoneIcon" />
                <PhoneInput
                  country={'in'}
                  value={mobileNumber}
                  onChange={phone => setMobileNumber(phone)}
                  inputStyle={{ width: '80%', padding: '20px', border: 'none' }}
                  buttonStyle={{ width: '10%', border: 'none', backgroundColor: 'white' }}
                  dropdownStyle={{ border: 'none' }}
                  containerStyle={{ margin: '0 auto' }}
                />
              </div>
            ) : (
              <div className="loginInputWrapper">
                <img src={mail} alt="Email Icon" className="phoneIcon" />
                <input
                  type="email"
                  placeholder="Please enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} // Disable input during loading
                />
              </div>
            )}

            <div className="loginInputWrapper">
              <img src={require('./password.png')} alt="Password Icon" className="h-10" />
              <input
                required
                type="password"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Disable input during loading
              />
            </div>

            <div className="loginInputWrapper">
              <img src={require('./verification.png')} alt="Code Icon" className="h-10" />
              <input
                required
                type="text"
                placeholder="Graphic verification code"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
                disabled={loading} // Disable input during loading
              />
              <div className="verificationCode">{verificationCode}</div>
            </div>

            <div className="forgot">
              <div className="cursor-pointer text-white" onClick={() => navigate('/users/user/forgot-password')}>Forgot Password</div>
              <div className="cursor-pointer text-white" onClick={() => navigate('/register')}>Register Now</div>
            </div>

            <button
              type="submit"
              className={`loginBtn mx-auto flex justify-center items-center ${loading ? "loginBtnDisabled" : ""}`}
              disabled={loading} // Disable the button during loading
            >
              {loading ? (
                <img src={loadingGif} className="h-16 " alt="Loading..." />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className=" justify-center items-center m-auto text-center bg-gradient-to-bl from-green-400 to-blue-900 p-2 rounded-lg w-[50%] border border-gray-500">
        <h2 className="text-white text-center">Join Community</h2>
        <a href="https://t.me/earnmoney7989" target="_blank">
          <img className="h-20 cursor-pointer m-auto" src={tele} alt="Telegram" />
          </a>
        </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Login;
