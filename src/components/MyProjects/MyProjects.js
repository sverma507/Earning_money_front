import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useCurrencyAuth } from "../../context/currency";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { toast, ToastContainer } from "react-toastify";

function MyProjects() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [claimingIndex, setClaimingIndex] = useState(null); // New state for tracking the claiming process
  const navigate = useNavigate();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth();
  const [user, setUser] = useState();
  const [totalPrice, setPrice] = useState(0);

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
      setUser(res.data);
      console.log("auth=>", auth);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getMyProjects = async () => {
    const id = auth.user.id;
    const token = auth.token;
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/my-products/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user-projects=>", result.data.products);
      setProducts(result.data.products);
      setTotalPrice(result.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const setTotalPrice = (data) => {
    let pr = 0;
    for (let i = 0; i < data.length; i++) {
      pr += Number(data[i].price);
    }
    setPrice(pr);
  };

  const handleClaimBonus = async (id, index, price) => {
    const token = auth.token;
    console.log("data ==>", id, index, price);

    setClaimingIndex(index); // Set the claiming index to show "Claiming..." on the button

    try {
      const result = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/claim-profit`,
        {
          userId: auth?.user.id,
          packageId: id,
          amount: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prevUser) => {
        const updatedUser = { ...prevUser };
        updatedUser.claimBonus[index] = false; // Mark bonus as claimed
        return updatedUser;
      });

      getMyProjects();

      toast("Bonus Claimed");
      console.log("Bonus Claimed ==>", result);
    } catch (error) {
      console.error("Error in claiming Bonus:", error);
    } finally {
      setClaimingIndex(null); // Reset claiming index after claim process
    }
  };

  useEffect(() => {
    getMyProjects();
    getUser();
  }, []);

  return (
    <Layout title={"My Packages - Earning Money"}>
      <ToastContainer />
      <div className="container sm:w-[40%] m-auto">
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
          <div className="text-xl">My Products</div>
          <div className="font-bold w-9"></div>
        </div>

        <div className="grid grid-cols-1 mx-auto sm:w-2/9 pb-[200px] p-6 bg-gradient-to-b from-purple-300 to-blue-300">
          <div className="text-center">
            Total Summary:{"  "}
            {currencyAuth === "INR"
              ? `Rs.${totalPrice}`
              : `$ ${(totalPrice / 90).toFixed(2)}`}
          </div>
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={item._id}
                className="bg-white bg-gradient-to-t m-4 border-2 border-white hover:bg-gradient-to-br from-purple-300 to-blue-500 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  className="h-48 w-full object-contain"
                  src={item.img1}
                  alt={item.name}
                />
                <h2 className="text-center text-red-700 text-sm mt-3">
                  Total Revenue:{" "}
                  {currencyAuth === "INR"
                    ? `Rs. ${user?.myRoi[index]}`
                    : `$ ${(user?.myRoi[index] / 90).toFixed(2)}`}
                </h2>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    Price:{" "}
                    {currencyAuth === "INR"
                      ? `Rs. ${item.price}`
                      : `$ ${(item.price / 90).toFixed(2)}`}
                  </p>
                  <p className="text-gray-600">Cycle: {item.cycle} days</p>
                  <p className="text-gray-600">
                    Total revenue:{" "}
                    {currencyAuth === "INR"
                      ? `Rs. ${item.income * item.cycle}`
                      : `$ ${((item.income * item.cycle) / 90).toFixed(2)}`}
                  </p>
                  <button
                    className={`mt-4 w-full border-2 ${
                      user?.claimBonus[index]
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                        : "bg-gray-400"
                    } text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform`}
                    onClick={() => {
                      handleClaimBonus(item._id, index, item.price);
                    }}
                    disabled={
                      !user?.claimBonus[index] || claimingIndex !== null
                    } // Disable during claiming
                  >
                    {claimingIndex === index
                      ? "Claiming..."
                      : user?.claimBonus[index]
                      ? "Claim Your Bonus"
                      : "Recieved"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white text-4xl col-span-full mt-10">
              No products available
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyProjects;
