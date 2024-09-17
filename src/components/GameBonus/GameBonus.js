import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./GameBonus.css";
import axios from "axios";
import { toast } from "react-toastify";

const GameBonus = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // Updated state to hold user data
  const [activation, setActivation] = useState([]);  // State for activation array
  const [powerLeg, setPowerLeg] = useState([]);  // State for power leg array
  const [otherLeg, setOtherLeg] = useState([]);  // State for other leg array

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
      const userData = res.data;

      setUser(userData);  // Update the user data

      // Populate the activation, powerLeg, and otherLeg arrays
      setActivation(userData.weeklySalaryActivation || []);
      setPowerLeg(userData.powerLeg || []);
      setOtherLeg(userData.otherLeg || []);

      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout title={"Game Bonus - Earning Money"}>
      <div className="game-container">
        <div>
          <div className="flex justify-between p-5 bg-gradient-to-b from-purple-400 to-blue-500 text-white">
            <div
              className="cursor-pointer text-xl"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img
                src={"/images/back.png"}
                alt="right arrow"
                className="w-10 h-10"
              />
            </div>
            <div className="text-xl">Games Income</div>
            <div className="font-bold w-9"></div>
          </div>
          <img
            className="game-image"
            src={require("./spin-removebg-preview.png")}
            alt="Game Bonus"
          />
          <table className="w-[90%] m-auto bg-gradient-to-b from-green-400 to-blue-400">
            <thead>
              <tr>
                <th className="py-2">Sr#</th>
                <th className="py-2">Salary</th>
                <th className="py-2">Power Leg</th>
                <th className="py-2">Other Leg</th>
                <th className="py-2">Pending Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {user?.salary?.map((salary, index) => (
                <tr key={index}>
                  <th className="py-2">{index + 1}</th>
                  <th className="py-2">{(salary || 0).toLocaleString("en-IN")}</th>
                  <th className="py-2">{powerLeg[index] || 0}</th>
                  <th className="py-2">{otherLeg[index] || 0}</th>
                  <th className="py-2">0</th>
                  <th className="py-2">
                    {activation[index] ? "Success" : "Pending"}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default GameBonus;
