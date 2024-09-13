
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "../../components/Layout";
// import "./Register.css";
// import axios from "axios";
// import tele from './tele.png';
// import logo from './logo-hype-transparent.png';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css'; 
// import phone from './phone.png'
// import mail from './mail.png'
// import verification from './verification.png'
// import reffer from './referal.png'
// import pass from './password.png'
// import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";
// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [inputCaptcha, setInputCaptcha] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [referralCode, setReferralCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [newUserInfo, setNewUserInfo] = useState("");

//   const [showModel, setShowModal] = useState(true);

//   // Function to generate verification code (CAPTCHA)
//   const generateVerificationCode = () => {
//     const code = Math.floor(1000 + Math.random() * 9000);
//     setVerificationCode(code);
//   };

//   useEffect(() => {
//     generateVerificationCode();

//     // Extract referral code from the URL if present
//     const queryParams = new URLSearchParams(location.search);
//     const referralCodeFromUrl = queryParams.get('referral'); // Use 'referral' here to match the query parameter in the link
//     if (referralCodeFromUrl) {
//       setReferralCode(referralCodeFromUrl);
//     }
//   }, [location.search]);

//   // Function to handle registration form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate email format
//     if (!email.endsWith("@gmail.com")) {
//       toast.error("Email must be a Gmail address (e.g., example@gmail.com).");
//       return;
//     }

//     // Validate CAPTCHA code
//     if (inputCaptcha !== verificationCode.toString()) {
//       toast.error("Invalid CAPTCHA code.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
//         mobileNumber,
//         email,
//         password,
//         referredBy: referralCode,
//       });

//       if (res && res.data.token) {
//         toast.success("Registration successful! Redirecting to login...");
//         console.log("res.data=>",res.data.newUser);
//         setNewUserInfo(res.data.newUser);
//         setShowModal(true); 

//         // window.alert(`Mobile No: ${res.data.newUser.mobileNumber},\n Email id: ${res.data.newUser.email},\n Password :${res.data.newUser.password}`)
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         toast.error(res.data.message || "Registration failed");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Registration failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Layout title={'Register - Hype Drinks'}>
//      { showModel && <UserInfoModal userInfo={newUserInfo}  setShowModal={setShowModal}/>}
//       <div className="registerContainer pb-20 bg-gradient-to-b from-green-400 to-blue-500">
//         <div className="registerHeader p-4 px-6 text-white shadow-lg shadow-blue-400">
//           <button onClick={() => navigate(-1)}><img
//                   src={"/images/back.png"}
//                   alt="right arrow"
//                   className="w-10 h-10"
//                 /></button>
//           <h1>Register</h1>
//         </div>

//         <div
//             className="p-6 m-auto mt-7 mb-10 bg-gradient-to-b from-green-500 to-blue-500 border-2 w-fit rounded-ss-full rounded-br-full"
//           >
//             <a href="/">
//               <img
//                 src={logo}
//                 style={{ width: "100px", margin: "auto" }}
//                 alt="Logo"
//               />
//             </a>
//           </div>
//         <div className="register-form-outer mt-6">
//           <form onSubmit={handleSubmit}>
//             <div className="inputWrapper">
//             <img src={phone} alt="Phone Icon" className="h-10" />
//             <PhoneInput
//                 country={'in'}
//                 value={mobileNumber}
//                 onChange={phone => setMobileNumber(phone)}
//                 inputStyle={{ width: '80%', padding: '20px', border: 'none' }}
//                 buttonStyle={{ width: '10%', border: 'none', backgroundColor:'white'   }}
//                 dropdownStyle={{ border: 'none',  }}
//                 containerStyle={{ margin: '0 auto' }}
//             />

//             </div>
//             <div className="inputWrapper">
//               <img src={mail} alt="Email Icon" className="h-10" />
//               <input
//                 type="email"
//                 placeholder="Please enter mail address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="loginInputWrapper">
//               <img
//                 src={verification}
//                 alt="Code Icon"
//                 className="h-10"
//               />
//               <input
//                 type="text"
//                 placeholder="Graphic verification code"
//                 value={inputCaptcha}
//                 onChange={(e) => setInputCaptcha(e.target.value)}
//               />
//               <div className="verificationCode">{verificationCode}</div>
//             </div>

//             <div className="inputWrapper">
//               <img src={pass} alt="Password Icon" className="h-10" />
//               <input
//                 type="password"
//                 placeholder="Please enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="inputWrapper">
//               <img src={reffer} alt="Referral Code Icon" className="h-10" />
//               <input
//                 type="text"
//                 placeholder="Referral code (optional)"
//                 value={referralCode}
//                 onChange={(e) => setReferralCode(e.target.value)}
//               />
//             </div>

//             <div className="exist text-white">
//               <h3>Existing Account?</h3>
//               <div onClick={() => navigate('/login')} className="cursor-pointer text-white">Sign in now</div>
//             </div>

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="signUp"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Registering...' : 'Register'}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="flex flex-wrap justify-center items-center">
//           <img className="h-20 cursor-pointer" src={tele} alt="Telegram" />
//         </div>

//         <ToastContainer />
//       </div>
//     </Layout>
//   );
// };

// export default Register;























import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import "./Register.css";
import axios from "axios";
import tele from './tele.png';
import logo from './logo-hype-transparent.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import phone from './phone.png';
import mail from './mail.png';
import verification from './verification.png';
import reffer from './referal.png';
import pass from './password.png';
import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to generate verification code (CAPTCHA)
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setVerificationCode(code);
  };

  useEffect(() => {
    generateVerificationCode();

    // Extract referral code from the URL if present
    const queryParams = new URLSearchParams(location.search);
    const referralCodeFromUrl = queryParams.get('referral');
    if (referralCodeFromUrl) {
      setReferralCode(referralCodeFromUrl);
    }
  }, [location.search]);

  // Function to handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email.endsWith("@gmail.com")) {
      toast.error("Email must be a Gmail address (e.g., example@gmail.com).");
      return;
    }

    // Validate CAPTCHA code
    if (inputCaptcha !== verificationCode.toString()) {
      toast.error("Invalid CAPTCHA code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        mobileNumber,
        email,
        password,
        referredBy: referralCode,
      });

      if (res && res.data.token) {
        toast.success("Registration successful! Redirecting to login...");
        setNewUserInfo(res.data.newUser);
        setShowModal(true); 

        showModal && setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title={'Register - Hype Drinks'}>
      {showModal && <UserInfoModal newUserInfo={newUserInfo} setShowModal={setShowModal} />}
      <div className="registerContainer pb-20 bg-gradient-to-b from-green-400 to-blue-500">
        <div className="registerHeader p-4 px-6 text-white shadow-lg shadow-blue-400">
          <button onClick={() => navigate(-1)}>
            <img
              src={"/images/back.png"}
              alt="Back"
              className="w-10 h-10"
            />
          </button>
          <h1>Register</h1>
        </div>

        <div className="p-6 m-auto mt-7 mb-10 bg-gradient-to-b from-green-500 to-blue-500 border-2 w-fit rounded-ss-full rounded-br-full">
          <a href="/">
            <img
              src={logo}
              style={{ width: "100px", margin: "auto" }}
              alt="Logo"
            />
          </a>
        </div>

        <div className="register-form-outer mt-6">
          <form onSubmit={handleSubmit}>
            <div className="inputWrapper">
              <img src={phone} alt="Phone Icon" className="h-10" />
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
            <div className="inputWrapper">
              <img src={mail} alt="Email Icon" className="h-10" />
              <input
                type="email"
                placeholder="Please enter mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="loginInputWrapper">
              <img src={verification} alt="Code Icon" className="h-10" />
              <input
                type="text"
                placeholder="Graphic verification code"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
              />
              <div className="verificationCode">{verificationCode}</div>
            </div>

            <div className="inputWrapper">
              <img src={pass} alt="Password Icon" className="h-10" />
              <input
                type="password"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="inputWrapper">
              <img src={reffer} alt="Referral Code Icon" className="h-10" />
              <input
                type="text"
                placeholder="Referral code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>

            <div className="exist text-white">
              <h3>Existing Account?</h3>
              <div onClick={() => navigate('/login')} className="cursor-pointer text-white">Sign in now</div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="signUp"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>

        <div className=" justify-center items-center m-auto text-center bg-gradient-to-bl from-green-400 to-blue-900 p-2 rounded-lg w-[50%] border border-gray-500">
        <h2 className="text-white text-center">Join Community</h2>
        <a href="https://t.me/hypedrinkoffical" target="_blank">
          <img className="h-20 cursor-pointer m-auto" src={tele} alt="Telegram" />
          </a>
        </div>

        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Register;
