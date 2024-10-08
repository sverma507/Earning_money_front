import React, { useEffect, useState } from "react";
import "./SpinGame.css";
import Layout from "../Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCurrencyAuth } from "../../context/currency";

const SpinGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [auth] = useAuth();
  const [user, setUser] = useState(null);
  const [spin, setSpin] = useState(0);
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
        setUser(res.data);
        setSpin(res.data.spinCount);
      } else {
        toast.error("Failed to retrieve user profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Define prizes with different probabilities
  const prizes = [
    { name: 25, weight: 5 },
    { name: 20, weight: 2 }, // Smaller prize
    { name: 15, weight: 13 }, // Smaller prize
    { name: 10, weight: 30 }, // More common prize
    { name: 5, weight: 50 }, // Larger prize
  ];

  // Utility function to select a prize based on weights
  const selectPrize = () => {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    for (const prize of prizes) {
      if (random < prize.weight) {
        return prize.name;
      }
      random -= prize.weight;
    }
  };

  const spinWheel = async () => {
    if (isSpinning || spin === 0) return;

    setIsSpinning(true);

    // Deduct spin immediately after starting the spin
    setSpin((prev) => prev - 1);

    const selectedPrize = selectPrize();
    const randomIndex = prizes.findIndex(
      (prize) => prize.name === selectedPrize
    );
    const newRotation = rotation + 1440 + randomIndex * (360 / prizes.length);

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      showConfetti(selectedPrize);
    }, 3000); // Spin duration
  };

  const addPrize = async (selectedPrize) => {
    const token = auth?.token;
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/add-prizes`,
        {
          prize: selectedPrize,
          userId: auth?.user.id,
          game: "spin",
          type: "add",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response ==>", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showConfetti = (selectedPrize) => {
    const confettiContainer = document.getElementById("confetti");
    const congratsMessage = document.getElementById("congrats-message");

    if (selectedPrize > 0) {
      confettiContainer.style.display = "block";
      congratsMessage.innerText = `😃 Congratulations! You won ${selectedPrize}! Added to your wallet`;

      for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confettiContainer.appendChild(confettiPiece);
      }

      // Remove confetti and add prize after the animation
      setTimeout(() => {
        confettiContainer.style.display = "none";
        congratsMessage.style.display = "none";
        confettiContainer.innerHTML = ""; // Clear confetti pieces
        addPrize(selectedPrize);
      }, 4000);
    } else {
      congratsMessage.innerText = `Oops! Better luck next time.`;
      setTimeout(() => {
        addPrize(selectedPrize);
      }, 4000);
    }

    congratsMessage.style.display = "block";

    // Hide the congrats message after a few seconds
    setTimeout(() => {
      congratsMessage.style.display = "none";
    }, 3000);
  };

  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#FFBD33",
      "#75FF33",
      "#33FF57",
      "#33FFBD",
      "#3375FF",
      "#8C33FF",
      "#FF33BD",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Layout title={"Hype - Spin Profit"}>
      <div className="spin-game">
      <div className="flex justify-between w-[100%] p-5 bg-gradient-to-b from-purple-400 to-blue-500 text-white">
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
          <div className="text-xl">Business</div>
          <div className="font-bold w-9"></div>
        </div>
        <div className="text-center mt-10">
          <h1 className="text-4xl text-white text-center mb-10 font-serif">
            {spin > 0
              ? `You have ${spin} spins!`
              : "You don't have any spins for now"}
          </h1>
          <div
            className={`wheel ${isSpinning ? "spinning" : ""}`}
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={spinWheel}
          >
            <div className="wheel-inner">
              {prizes.map((prize, index) => (
                <div key={index} className="wheel-segment">
                  {prize.name}
                </div>
              ))}
            </div>
          </div>
          <button
            className="spin-button"
            onClick={spinWheel}
            disabled={spin === 0 || isSpinning}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel"}
          </button>
          <div id="confetti" className="confetti-container"></div>{" "}
          {/* Confetti container */}
          <div id="congrats-message" className="congrats-message"></div>{" "}
          {/* Congrats message */}
        </div>
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
                      {currencyAuth === "INR"
                        ? ` ${item.prize}`
                        : `$ ${(item.prize / 90).toFixed(2)}`}
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

export default SpinGame;
