// import React, { useEffect, useState } from "react";
// import Layout from "../Layout";
// import { useLocation, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useAuth } from "../../context/auth";
// import { useCurrencyAuth } from "../../context/currency"; // Import useCurrencyAuth hook
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const SingleProduct = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [auth, setAuth] = useAuth();
//   const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); // Access currency context
//   const [user, setUser] = useState();
//   const [profit, setProfit] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const item = location.state;

//   const getUser = async () => {
//     const { id } = auth.user;
//     const token = auth.token;

//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_URL}/user/profile/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUser(res.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };


//   const handlePackage = async () => {
//     setLoading(true); // Set loading state to true at the start
  
//     if (user?.rechargeWallet < item.price) {
//       toast.error("Insufficient Balance! Please recharge your wallet first");
//       setLoading(false); // Set loading state to false if balance is insufficient
//     } else {
//       try {
//         const token = auth.token;
//         const userId = auth?.user.id;
//         const packageId = item._id;
  
//         const result = await axios.post(
//           `${process.env.REACT_APP_API_URL}/user/buy-package`,
//           { packageId, userId }, // This is the request body
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         // Setting the profit based on package name
//         switch (item.name) {
//           case "A-1-540":
//             setProfit(100);
//             break;
//           case "B-2-1350":
//             setProfit(150);
//             break;
//           case "C-3-3150":
//             setProfit(250);
//             break;
//           case "D-4-6750":
//             setProfit(300);
//             break;
//           case "E-5-11250":
//             setProfit(600);
//             break;
//           default:
//             setProfit(1000);
//         }
  
//         toast.success(
//           `Congrats! You have bought the package(${item.name}) successfully.`
//         );
  
//         setTimeout(() => {
//           navigate("/users/user");
//           setLoading(false);
//         }, 2000);
//       } catch (error) {
//         console.error(error);
        
//         // Check if error response exists and display the error message
//         if (error.response && error.response.data && error.response.data.error) {
//           toast.error(error.response.data.error);
//         } else {
//           toast.error("Something went wrong. Please try again.");
//         }
  
//         setLoading(false); // Set loading state to false in case of an error
//       }
//     }
//   };
  





//   useEffect(() => {
//     getUser();
//     AOS.init();
//   }, []);

//   return (
//     <Layout title={`Package ${item.productCode} - Earning Money`}>
//       <div className="sm:w-2/5 mx-auto p-4 pb-16 bg-gradient-to-b from-purple-400 to-blue-500 text-white">
//         <div className="flex justify-between">
//           <div
//             className="cursor-pointer"
//             onClick={() => {
//               navigate(-1);
//             }}
//           >
//             <img
//               src={"/images/back.png"}
//               alt="right arrow"
//               className="w-10 h-10"
//             />
//           </div>
//           <div className="text-white text-lg">Package Details</div>
//           <div className="font-bold w-9"></div>
//         </div>
//         <img
//           data-aos="flip-right"
//           src={`${item.img1}`}
//           className={" h-[20% rounded-lg m-auto"}
//         />
//         <p className="mt-3 font-bold text-xl">
//           Product Name:-{" "}
//           <span className="mt-1 font-normal text-lg">{item.name}</span>
//         </p>
//         <div className="border-2 border-white grid grid-cols-2 mt-5 lg:grid-cols-3 p-2 gap-4 bg-gradient-to-b from-purple-400 to-blue-500 rounded-lg">
//           <div
//             data-aos="flip-right"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">
//               {currencyAuth === "INR"
//                 ? `Rs. ${(item.price || 0).toLocaleString("en-IN")}`
//                 : `$ ${(item.price / 90).toFixed(2)}`}
//             </div>
//             <div>Price</div>
//           </div>
//           <div
//             data-aos="flip-up"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">{item.cycle}</div>
//             <div>Term</div>
//           </div>
//           <div
//             data-aos="flip-left"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">
//               {currencyAuth === "INR"
//                 ? `Rs. ${item.income}`
//                 : `$ ${(item.income / 90).toFixed(2)}`}
//             </div>
//             <div>Daily Income</div>
//           </div>
//           <div
//             data-aos="flip-left"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">
//               {currencyAuth === "INR"
//                 ? `Rs. ${item.income *item.cycle}`
//                 : `$ ${((item.income * item.cycle) / 90).toFixed(2)}`}
//             </div>
//             <div>Total Revenue</div>
//           </div>
//           <div
//             data-aos="flip-down"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">
//               {Math.floor(((item.income * item.cycle) / item.price) * 100)}%
//             </div>
//             <div>Total Return</div>
//           </div>
//           <div
//             data-aos="flip-right"
//             className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
//           >
//             <div className="font-bold text-xl text-red-500">Limited</div>
//             <div>Purchase Level</div>
//           </div>
//         </div>
//         <div
//           data-aos="fade-down"
//           className="w-[100%] mt-4 bg-sky-500 border-2 border-white text-white rounded-lg pt-4"
//         >
//           <h2 className=" ml-3 mb-4 font-bold text-xl">Package description</h2>
//           {/* <img src={`${item.img2}`} className="" /> */}
//           <p className=" p-2">{item.description}</p>
//         </div>
//         <button
//           disabled={loading}
//           className={`bg-white w-full text-blue-500 p-4 mt-4 mb-5 rounded-lg shadow-md flex flex-col text-center items-center justify-center ${
//             loading ? "cursor-not-allowed " : " cursor-pointer"
//           }`}
//           onClick={handlePackage}
//         >
//           {loading ? (
//             <div className="font-bold text-xl text-red-500">Loading ...</div>
//           ) : (
//             <div className="font-bold text-xl text-red-500">Purchase</div>
//           )}
//         </button>
//         <ToastContainer />
//       </div>
//     </Layout>
//   );
// };

// export default SingleProduct;

















import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../context/auth";
import { useCurrencyAuth } from "../../context/currency"; // Import useCurrencyAuth hook
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

// Privacy Policy Modal Component
const PrivacyPolicyModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white sm:w-2/5  p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Privacy and Policy</h2>
        <div className="h-40 overflow-y-scroll text-black space-y-4">
  <h3 className="font-bold">Privacy and Policy</h3>
  <p>
    We value your privacy and are committed to ensuring the security of your data. Please review our policies carefully.
  </p>

  <h4 className="font-semibold">1. Personal Information</h4>
  <p>
    We collect your name, email, phone number, and address for account setup and communication purposes.
  </p>

  <h4 className="font-semibold">2. Financial Information</h4>
  <p>
    Payment details such as bank account or payment method are collected for transactions and commission payouts.
  </p>

  <h4 className="font-semibold">3. Referral Information</h4>
  <p>
    We collect details of users referred by you, including their names and contact information.
  </p>

  <h4 className="font-semibold">4. Usage Data</h4>
  <p>
    Information about how you interact with our platform, including IP address, browser type, and device information, is collected for analytics and security purposes.
  </p>

  <h4 className="font-semibold">5. Third-Party Services</h4>
  <p>
    We may share data with trusted third-party service providers for payment processing, analytics, and other operational purposes.
  </p>

  <h4 className="font-semibold text-red-600">6. User Responsibility</h4>
  <p className="font-bold text-red-600">
    By using this platform, you acknowledge that you are fully responsible for your investment decisions, profits, and losses.
  </p>
</div>

<div className="mt-4 flex justify-end">
  <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg mr-2">
    Cancel
  </button>
  <button onClick={onAccept} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
    Accept
  </button>
</div>

      </div>
    </div>
  );
};

const SingleProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth();
  const [user, setUser] = useState();
  const [profit, setProfit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const item = location.state;

  const getUser = async () => {
    const { id } = auth.user;
    const token = auth.token;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handlePurchaseClick = () => {
    setShowPrivacyPolicy(true);
  };

  const handlePolicyAccept = () => {
    setIsPolicyAccepted(true);
    setShowPrivacyPolicy(false);
    handlePackage();
  };

  const handlePackage = async () => {
    setLoading(true);

    if (user?.rechargeWallet < item.price) {
      toast.error("Insufficient Balance! Please recharge your wallet first");
      setLoading(false);
    } else {
      try {
        const token = auth.token;
        const userId = auth?.user.id;
        const packageId = item._id;

        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/buy-package`,
          { packageId, userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        switch (item.name) {
          case "A-1-540":
            setProfit(100);
            break;
          case "B-2-1350":
            setProfit(150);
            break;
          case "C-3-3150":
            setProfit(250);
            break;
          case "D-4-6750":
            setProfit(300);
            break;
          case "E-5-11250":
            setProfit(600);
            break;
          default:
            setProfit(1000);
        }

        toast.success(`Congrats! You have bought the package (${item.name}) successfully.`);

        setTimeout(() => {
          navigate("/users/user");
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUser();
    AOS.init();
  }, []);

  return (
    <Layout title={`Package ${item.productCode} - Earning Money`}>
      <div className="sm:w-2/5 mx-auto p-4 pb-16 bg-gradient-to-b from-purple-400 to-blue-500 text-white">
        <div className="flex justify-between">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={"/images/back.png"} alt="right arrow" className="w-10 h-10" />
          </div>
          <div className="text-white text-lg">Package Details</div>
          <div className="font-bold w-9"></div>
        </div>
        <img data-aos="flip-right" src={item.img1} className={"h-[20%] rounded-lg m-auto"} />
        <p className="mt-3 font-bold text-xl">
          Product Name: <span className="mt-1 font-normal text-lg">{item.name}</span>
        </p>
        <div className="border-2 border-white grid grid-cols-2 mt-5 lg:grid-cols-3 p-2 gap-4 bg-gradient-to-b from-purple-400 to-blue-500 rounded-lg">
        <div
            data-aos="flip-right"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">
              {currencyAuth === "INR"
                ? `Rs. ${(item.price || 0).toLocaleString("en-IN")}`
                : `$ ${(item.price / 90).toFixed(2)}`}
            </div>
            <div>Price</div>
          </div>
          <div
            data-aos="flip-up"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">{item.cycle}</div>
            <div>Term</div>
          </div>
          <div
            data-aos="flip-left"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">
              {currencyAuth === "INR"
                ? `Rs. ${item.income}`
                : `$ ${(item.income / 90).toFixed(2)}`}
            </div>
            <div>Daily Income</div>
          </div>
          <div
            data-aos="flip-left"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">
              {currencyAuth === "INR"
                ? `Rs. ${item.income *item.cycle}`
                : `$ ${((item.income * item.cycle) / 90).toFixed(2)}`}
            </div>
            <div>Total Revenue</div>
          </div>
          <div
            data-aos="flip-down"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">
              {Math.floor(((item.income * item.cycle) / item.price) * 100)}%
            </div>
            <div>Total Return</div>
          </div>
          <div
            data-aos="flip-right"
            className="bg-sky-200 border-4 border-yellow-300 text-blue-500 p-4 rounded-lg shadow-md flex flex-col text-center"
          >
            <div className="font-bold text-xl text-red-500">Limited</div>
            <div>Purchase Level</div>
          </div>
        </div>
      
        <div data-aos="fade-down" className="w-[100%] mt-4 bg-sky-500 border-2 border-white text-white rounded-lg pt-4">
          <h2 className="ml-3 mb-4 font-bold text-xl">Package description</h2>
          <p className="p-2">{item.description}</p>
        </div>
        <button
          disabled={loading}
          className={`bg-white w-full text-blue-500 p-4 mt-4 mb-5 rounded-lg shadow-md flex flex-col text-center items-center justify-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handlePurchaseClick}
        >
          {loading ? (
            <div className="font-bold text-xl text-red-500">Loading ...</div>
          ) : (
            <div className="font-bold text-xl text-red-500">Purchase</div>
          )}
        </button>
        <PrivacyPolicyModal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} onAccept={handlePolicyAccept} />
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default SingleProduct;

