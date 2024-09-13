import React from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import "./TotalEarnings.css";

const TotalEarnings = () => {
  const navigate = useNavigate();

  return (
    <Layout title={'Total Earning - Earning Money'}>
    <div className="total-earning">
  <div className="flex justify-between p-5 bg-gradient-to-b from-purple-400 to-blue-500 text-white header-3d">
  <div className="cursor-pointer font-bold text-lg text-white" onClick={() => navigate(-1)}><img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                /></div>
    <div className="text-xl">All Earnings</div>
    <div className="font-bold w-9"></div>
  </div>
  <img className="income-image" src="/images/income_logo.png" />
  <div className="earnings-list">
    {/* <div
      className="earning-item"
      onClick={() => {
        navigate("/users/user/bonus-earnings");
      }}
    >
      Activation Bonus
    </div> */}
    <div
      className="earning-item"
      onClick={() => {
        navigate("/users/user/daily-income");
      }}
    >
      Product Bonus
    </div>
    <div
      className="earning-item"
      onClick={() => {
        navigate("/users/user/referral-income");
      }}
    >
      Salary 
    </div>
    <div
      className="earning-item"
      onClick={() => {
        navigate("/users/user/team-income");
      }}
    >
      Level Commission
    </div>
    <div
      className="earning-item"
      onClick={() => {
        navigate("/users/user/game-bonus");
      }}
    >
      Game Income
    </div>
  </div>
</div>

    </Layout>
  );
};

export default TotalEarnings;
