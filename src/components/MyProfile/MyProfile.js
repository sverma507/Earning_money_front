import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useAuth } from "../../context/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import rechrgeImage from "./40.png";
import withdrawlImage from "./withdrawl.png";
import logo from "./logo-hype-transparent.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCurrencyAuth } from "../../context/currency";
import "./Myprofile.css";
function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [auth, setAuth] = useAuth();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth();
  const [todayEarnings, setTodayEarnings] = useState(0);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logout successfully");
  };

  const handleClick = () => {
      toast.error("Technical issue. We are updating something for your better experience!");
  };

  // console.log(auth.user);
  const getUser = async () => {
    const { id } = auth.user;
    const token = auth.token;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data) {
        const previousWallet = user ? user.wallet : 0;
        const newWallet = res.data.wallet;

        if (newWallet > previousWallet) {
          const addedAmount = newWallet - previousWallet;
          const today = new Date().toDateString();
          const storedDate = localStorage.getItem("earningsDate");

          if (storedDate === today) {
            const storedEarnings =
              parseFloat(localStorage.getItem("todayEarnings")) || 0;
            const updatedEarnings = storedEarnings + addedAmount;
            setTodayEarnings(updatedEarnings);
            localStorage.setItem("todayEarnings", updatedEarnings);
          } else {
            setTodayEarnings(addedAmount);
            localStorage.setItem("todayEarnings", addedAmount);
            localStorage.setItem("earningsDate", today);
          }
        }

        setUser(res.data);
        console.log("auth=>", auth);
      } else {
        toast.error("Failed to retrieve user profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("earningsDate");

    if (storedDate !== today) {
      localStorage.setItem("earningsDate", today);
      localStorage.setItem("todayEarnings", 0);
    }

    const storedEarnings =
      parseFloat(localStorage.getItem("todayEarnings")) || 0;
    setTodayEarnings(storedEarnings);

    getUser();
    // console.log(user.email);

    AOS.init();
  }, []);

  return (
    <Layout title={"My Profile - Earning Money"}>
      <Toaster/>
      <div className=" text-white sm:w-2/5 mx-auto min-h-screen pb-24 bg-gradient-to-b from-purple-400 to-blue-500 ">
        {/* <div className="flex justify-between items-center px-4 py-2"> */}
        <div className="registerHeader p-4 px-6 text-white shadow-lg shadow-blue-400">
          <button onClick={() => navigate(-1)}>
            <img
              src={"/images/back.png"}
              alt="right arrow"
              className="w-10 h-10"
            />
          </button>
          <h1>My Profile</h1>
        </div>
        {/* <div className=" grid place-items-center mt-4">
          <div
            data-aos="flip-up"
            className="p-6 bg-gradient-to-b from-green-500 to-blue-500 border-2   w-fit rounded-ss-full rounded-br-full"
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
        </div> */}
        <div className="px-4 py-8">
          <div className="text-center " data-aos="flip-right">
            <p className=" font-bold text-4xl text-slate-50">
              +{user?.mobileNumber}
            </p>
            <p className=" text-xl">ID: {user?.referralCode}</p>
          </div>
        </div>
        <div className="flex justify-center gap-24 py-4">
          <div
            data-aos="fade-down"
            className="text-center cursor-pointer   "
            onClick={() => {
              navigate("/users/user/recharge");
            }}
          >
            <img
              className="h-28"
              src={rechrgeImage}
              style={{ marginTop: "" }}
              alt="recharge"
            />
            <p
              className=""
              style={{
                fontSize: "25px",

                marginBottom: "10px",
                color: "white",
                fontWeight: "700",
              }}
            >
              Recharge
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="text-center  cursor-pointer"
            onClick={() => {
              navigate("/users/user/withdrawl",{state:{data:user.wallet}});
              // handleClick()
            }}
          >
            <img className="h-28 " src={withdrawlImage} alt="withdraw" />
            <p
              style={{
                fontSize: "25px",

                marginBottom: "10px",
                color: "white",
                fontWeight: "700",
              }}
            >
              Withdraw
            </p>
          </div>
        </div>
        <div
          className="border-2  border-white grid-cols-2 md:grid-cols-3 bg-gradient-to-tr from-purple-400  to-blue-500"
          style={{
            display: "grid",
            // gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            width: "93%",
            borderRadius: "10px",
            padding: "10px",
            margin: "auto",
          }}
        >
          {/* Card 1 */}
          <div
            data-aos="fade-up-right"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            <p className="text-black text-sm font-bold">
              {currencyAuth === "INR"
                ? `Rs. ${Math.floor(user?.wallet).toLocaleString("en-IN")}`
                : `$ ${(user?.wallet / 90).toFixed(2)}`}
            </p>
            <p className="text-black font-semibold text-xs mb-2">
              Balance Wallet
            </p>
          </div>

          {/* Card 2 */}
          <div
            data-aos="flip-up"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            {user?.packages.length > 0 ? (
              <p className="text-white text-lg font-bold">Active</p>
            ) : (
              <p className="text-red-500 text-sm font-bold">Unrecharged</p>
            )}
            <p className="text-black font-semibold text-xs mb-2">Package</p>
          </div>

          {/* Card 3 */}
          <div
            data-aos="fade-up-left"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            <p className="text-black text-sm font-bold">
              {currencyAuth === "INR"
                ? `Rs. ${Math.floor(user?.todayEarning).toLocaleString("en-IN")}`
                : `$ ${((user?.todayEarning)/90).toFixed(2)||0}`}
            </p>
            <p className="text-black font-semibold text-xs mb-2">
              Earnings Today
            </p>
          </div>

          {/* Card 4 */}
          <div
            data-aos="fade-down-left"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            <p className="text-black text-sm font-bold">
              {currencyAuth === "INR"
                ? `Rs. ${Math.floor(user?.rechargeWallet).toLocaleString("en-IN")}`
                : `$ ${(user?.rechargeWallet / 90).toFixed(2)}`}
            </p>
            <p className="text-black font-semibold text-xs mb-2">
              Recharge Wallet
            </p>
          </div>

          {/* Card 5 */}
          <div
            data-aos="flip-down"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            <p className="text-black text-sm font-bold">
              {currencyAuth === "INR"
                ? `Rs. ${Math.floor(user?.totalEarning).toLocaleString("en-IN")}`
                : `$ ${(user?.totalEarning / 90).toFixed(2)}`}
            </p>
            <p className="text-black font-semibold text-xs mb-2">
              Total Earning
            </p>
          </div>

          {/* Card 6 */}
          <div
            data-aos="fade-down-right"
            className=" rounded-md p-4 border-2 bg-sky-300 border-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
            style={{ height: "100px" }}
          >
            <p className="text-black text-sm font-bold">
              {Math.floor(user?.packages.length)}
            </p>
            <p className="text-black font-semibold text-xs mb-2">Product</p>
          </div>
        </div>

        <div className="px-4 mt-4 ">
          <div className="grid grid-cols-1 gap-4">
            <div
              data-aos="fade-up-right"
              className="bg-white  cursor-pointer  hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
              onClick={() => {
                navigate("/users/user/contact-manager");
              }}
            >
              <div className="rounded-full  mr-4">
                <img
                  src={"/images/contactmg.png"}
                  alt="customer support"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">Contact Manager</p>
              <div className="ml-auto ">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              className="bg-white  hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center cursor-pointer  duration-200"
              onClick={() => {
                navigate("/users/user/invitation");
              }}
            >
              <div className="rounded-full  mr-4 ">
                <img
                  src={"/images/invite.png"}
                  alt="user"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">Invite Friends</p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            {/* <div
                data-aos="fade-down-left"
                className="bg-white  cursor-pointer hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
              >
                <div className="rounded-full bg-green-200  mr-4">
                  <img
                    src={"/images/png1/discount.png"}
                    alt="percent sign"
                    className="w-10 h-10"
                  />
                </div>
                <p className="text-gray-700 font-bold text-lg">Discount Coupon</p>
                <div className="ml-auto">
                  <img
                    src={"/images/viewmore.png"}
                    alt="right arrow"
                    className="w-10 h-10"
                  />
                </div>
              </div> */}
            <div
              data-aos="fade-down-right"
              onClick={() => {
                navigate("/users/user/my-team");
              }}
              className="bg-white cursor-pointer hover:bg-sky-300  duration-200 rounded-md p-3 shadow-md flex items-center"
            >
              <div className="rounded-full   mr-4">
                <img
                  src={"/images/myteam.png"}
                  alt="user group"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700  font-bold text-lg">My Teams</p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            {/* <div
              data-aos="flip-up"
              className="bg-white  cursor-pointer hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
            >
              <div className="rounded-full   mr-4">
                <img
                  src={"/images/fundingdetails.png"}
                  alt="document"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">Funding Details</p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div> */}
            <div
              onClick={() => {
                navigate("/users/user/all-transaction-details");
              }}
              data-aos="flip-up"
              className="bg-white  cursor-pointer hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
            >
              <div className="rounded-full   mr-4">
                <img
                  src={"/images/alltransction.png"}
                  alt="document"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">
                All Transactions
              </p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            {/* <div
              data-aos="fade-down-down"
              className="bg-white  cursor-pointer hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
            >
              <div className="rounded-full  mr-4">
                <img
                  src={"/images/bankDetails (2).png"}
                  alt="credit card"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">
                Bank Account Info
              </p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div> */}
            <div
              data-aos="fade-up-right"
              className="bg-white  cursor-pointer  hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
              onClick={() => {
                navigate("/terms-conditions");
              }}
            >
              <div className="rounded-full  mr-4">
                <img
                  src={"/images/terms_condition.png"}
                  alt="customer support"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">
                Terms & Conditions
              </p>
              <div className="ml-auto ">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div
              data-aos="flip-right"
              onClick={() => {
                navigate("/users/user/modify-password");
              }}
              className="bg-white  cursor-pointer hover:bg-sky-300 rounded-md p-3 shadow-md flex items-center"
            >
              <div className="rounded-full  mr-4">
                <img
                  src={"/images/modifypassword.png"}
                  alt="padlock"
                  className="w-10 h-10"
                />
              </div>
              <p className="text-gray-700 font-bold text-lg">
                Modify Sign in Password
              </p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div
              data-aos="flip-left"
              className="bg-white  rounded-md p-3 shadow-md  flex items-center  cursor-pointer hover:bg-sky-300 duration-200"
              onClick={handleLogout}
            >
              <div className="rounded-full  mr-4">
                <img
                  src={"/images/logout.png"}
                  alt="padlock"
                  className="w-10 h-10"
                />
              </div>
              <p className=" font-bold text-lg text-red-500 ">LogOut</p>
              <div className="ml-auto">
                <img
                  src={"/images/viewmore.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;
