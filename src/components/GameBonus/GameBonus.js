import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./GameBonus.css";
import axios from "axios";
import { useCurrencyAuth } from "../../context/currency";

const GameBonus = () => {
  const [auth, setAuth] = useAuth();
  const [gameBonusList, setGameBonusList] = useState([]);
  const navigate = useNavigate();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); 

  const getGameIncomeList = async () => {
    const token = auth.token;
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/game-income-list/${auth?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGameBonusList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameIncomeList();
  }, []);

  return (
    <Layout title={"Game Bonus - Hype Drinks"}>
      <div className="game-container">
        <div className="flex justify-between p-5  bg-gradient-to-b from-green-400 to-blue-500 text-white">
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
        <img className="game-image" src="/images/spin.gif" />
        <div className="table-list">
          <table className="package-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Game</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {gameBonusList?.map((item, index) => {
                // Convert `createdAt` to a Date object if it's not already
                const createdAtDate = new Date(item.createdAt);
                const formattedDate = !isNaN(createdAtDate.getTime())
                  ? createdAtDate.toISOString().split("T")[0]
                  : "Invalid Date"; // Fallback if the date is invalid

                // Determine the sign and style based on item.type
                const sign =
                  item.type === "add" ? "+" : item.type === "deduct" ? "-" : "";
                const signStyle = {
                  color:
                    item.type === "add"
                      ? "green"
                      : item.type === "deduct"
                      ? "red"
                      : "inherit",
                };

                return (
                  <tr key={index}>
                    <td>{formattedDate}</td>
                    <td>{item.game}</td>
                    <td>
                      <span style={signStyle}>{sign}</span>
                      {currencyAuth === "INR" ? ` ${item.prize}` : `$ ${(item.prize / 90).toFixed(2)}`}

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default GameBonus;
