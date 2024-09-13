import React from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const Dashboard = () => {
  // State for statistics
  const [registerUser, setRegisterUser] = useState(0);
  const [paidUser, setPaidUser] = useState(0);
  const [unpaidUser, setUnpaidUser] = useState(0);
  const [paidUsersLastMonth, setPaidUsersLastMonth] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [rupeeTotal, setRupeeTotal] = useState();
  const [TotalPaymentInINR, setTotalPaymentInINR] = useState("");
  const [lastWithDrawl, setLastWithdrawl] = useState([]);
  const [activeAdminTotal, setActiveAdminTotal] = useState(0);
  const [activeUserTotal, setActiveUserTotal] = useState(0);
  const [todayAdminActivateTotal, setTodayAdminActivateTotal] = useState(0);
  const [todayUserActivateTotal, setTodayUserActivateTotal] = useState(0);
  const [totalEarningWallet, setEarningWallet] = useState(0);
  const [totalRechargeWallet, setRechargeWallet] = useState(0);
  const [totalDepositsToday, setTotalDepositsToday] = useState(0);

  const getData = async () => {
    let pd = [];
    let unpd = [];
    let earningWallet = 0;
    let rechargeWallet = 0;

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/all-users`
      );
      setUsers(result.data);
      setRegisterUser(result.data.length);
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].active == true) {
          pd.push(result.data[i]);
        } else {
          unpd.push(result.data[i]);
        }
        earningWallet += result.data[i].wallet;
        rechargeWallet += result.data[i].rechargeWallet;
      }
      setPaidUser(pd.length);
      setUnpaidUser(unpd.length);
      setRechargeWallet(rechargeWallet);
      setEarningWallet(earningWallet);
      console.log(users);
    } catch (err) {
      console.log("error while getting all users ", err);
    }
  };


  const getAllRequests = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/upi-payment/all-transactions`
      );

      const today = new Date().toLocaleDateString();

      const totalDeposits = result.data
        .filter(
          (txn) =>
            new Date(txn.createdAt).toLocaleDateString() === today
        )
        .reduce((total, txn) => total + txn.txnAmount, 0);

        setTotalDepositsToday(totalDeposits);
      console.log("transactions=>", result.data);
      setTransactions(result.data);
      getINRamount(result.data);
    } catch (err) {
      console.log("Error while getting the transactions", err);
    }
  };


  const getINRamount = (trans) => {
    console.log(trans);

    let val = 0;
    for (let i = 0; i < trans.length; i++) {
      console.log("trnas ==>", trans[i]);
      if (trans[i].status == "success") {
        val += trans[i].txnAmount;
      }
    }
    setRupeeTotal(val);
    console.log(val);
  };

  const getWithdrawalRequests = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/withdrawal-requests`
      );
      setLastWithdrawl(result.data || []); // Ensure data is an array
    } catch (err) {
      console.log("Error while getting the withdrawal requests", err);
    }
  };

  const getActivationList = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/activation-list`
      );
      // setActivationList(result.data);
      let count1 = 0;
      let count2 = 0;
      let todayCount1 = 0;
      let todayCount2 = 0;

      const today = new Date().toISOString().slice(0, 10);

      console.log(result.data);
      for (let i = 0; i < result.data.length; i++) {
        const activationDate = new Date(result.data[i].createdAt)
          .toISOString()
          .slice(0, 10);

        if (result.data[i].activateBy == "admin") {
          count1 += Number(result.data[i].package.substring(4));
          if (activationDate === today) {
            todayCount1 += Number(result.data[i].package.substring(4)); // Increment today's admin activation count
          }
        } else {
          count2 += Number(result.data[i].package.substring(4));
          if (activationDate === today) {
            todayCount2 += Number(result.data[i].package.substring(4)); // Increment today's user activation count
          }
        }
      }
      setActiveAdminTotal(count1);
      setActiveUserTotal(count2);
      setTodayAdminActivateTotal(todayCount1);
      setTodayUserActivateTotal(todayCount2);
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotalUSDCollection = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/admin/total-usd-collection`
  //     );

  //     if (result && result.data) {
  //       console.log("result =>", result.data);

  //       // Calculate the total of txnAmount
  //       const totalTxnAmount = result.data.reduce((total, transaction) => {
  //         return total + transaction.amount;
  //       }, 0);

  //       setUSDTotal(totalTxnAmount);

  //       // console.log("Total txnAmount =>", );
  //     }
  //   } catch (err) {
  //     console.log("Error while getting total collection", err);
  //   }
  // };

  useEffect(() => {
    getData();
    // getTotalRupeePayment();
    getAllRequests();
    getWithdrawalRequests();
    getActivationList();
    // getTotalINRCollection();
    // getTotalUSDCollection();
  }, []);

  return (
    <div className="flex min-h-screen gap-6 bg-gradient-to-b from-green-400 to-blue-500">
      {/* Sidebar */}
      <Sidebar className="fixed w-60 h-full" />

      {/* Main content */}
      <div className="ml-60 p-4 flex-1 bg-gradient-to-b from-green-400 to-blue-500">
        <div className="flex gap-8">
          {/* Revenue Chart Section */}
          <div className="bg-slate-300 w-[60%] text-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Revenue Stats */}
              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400  p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Total Collection</h3>
                <p className="text-sm">
                  Rs.{" "}
                  {(rupeeTotal || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Total INR Collection</h3>
                <p className="text-sm">
                  Rs. {(rupeeTotal || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Last Payout</h3>
                <p className="text-sm">
                  Rs.{" "}
                  {(
                    lastWithDrawl[lastWithDrawl.length - 1]?.amount || 0
                  ).toLocaleString("en-IN")}{" "}
                  {lastWithDrawl[lastWithDrawl.length - 1]?.userName}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 p-4 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Today Deposite</h3>
                <p className="text-sm">
                  Rs.{" "}
                  {(
                    totalDepositsToday || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* User Statistics */}
          <div className="w-[40%] bg-gradient-to-t from-yellow-400  via-yellow-500 to-orange-400 p-6 rounded-lg">
            <h2 className="text-xl text-white text-center font-bold mb-8">
              User Statistics
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2 ">Register User</h3>
                <CircularProgressbar
                  value={registerUser}
                  maxValue={1000}
                  text={`${registerUser}`}
                  styles={buildStyles({
                    pathColor: `#3b82f6`,
                    textColor: "#3b82f6",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2">Paid User</h3>
                <CircularProgressbar
                  value={paidUser}
                  maxValue={1000}
                  text={`${paidUser}`}
                  styles={buildStyles({
                    pathColor: `#10b981`,
                    textColor: "#10b981",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2">Unpaid User</h3>
                <CircularProgressbar
                  value={unpaidUser}
                  maxValue={1000}
                  text={`${unpaidUser}`}
                  styles={buildStyles({
                    pathColor: `#ef4444`,
                    textColor: "#ef4444",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px] ">
                <h3 className="mb-2">Paid Users Last Month</h3>
                <CircularProgressbar
                  value={paidUsersLastMonth}
                  maxValue={1000}
                  text={`${paidUsersLastMonth}`}
                  styles={buildStyles({
                    pathColor: `#8b5cf6`,
                    textColor: "#8b5cf6",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 p-6 border  rounded-xl bg-white">
          <h2 className="text-xl font-bold mb-8">Available Wallet</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">E-wallet</h3>
              <p className="text-lg">
                Rs. {(totalEarningWallet || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">R-wallet</h3>
              <p className="text-lg">
                Rs. {(totalRechargeWallet || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 p-6 border  rounded-xl bg-white">
          <h2 className="text-xl font-bold mb-8">Activation Details</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Today Active By User</h3>
              <p className="text-lg">
                Rs. {(todayUserActivateTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Today Active By Admin</h3>
              <p className="text-lg">
                Rs. {(todayAdminActivateTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Total Active By User</h3>
              <p className="text-lg">
                Rs. {(activeUserTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Total Active By Admin</h3>
              <p className="text-lg">
                Rs. {(activeAdminTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
