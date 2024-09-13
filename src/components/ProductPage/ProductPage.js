import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../context/auth";
import { useCurrencyAuth } from "../../context/currency";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); // Access currency context

  const fetchProducts = async () => {
    const token = auth.token;
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(result.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  useEffect(() => {
    fetchProducts();
    AOS.init();
  }, []);

  return (
    <Layout title={"Packages - Hype Drinks"}>
      <div className="sm:w-2/5 mx-auto p-4 pb-16 min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
        <div className="flex justify-between">
          <div
            className="cursor-pointer"
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
          <div className="">All Products</div>
          <div className="font-bold w-9"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto m-4">
          {products.map((item) => (
            <div
              data-aos="flip-right"
              key={item._id}
              className="hover:shadow-2xl border hover:border-green-900 hover:shadow-green-900 hover:bg-gradient-to-b from-sky-400 to-green-300 rounded-lg duration-500 hover:text-blue-700 shadow-red-000 flex flex-col justify-center items-center border p-4"
            >
              {item.name === "E-5-11250" || item.name === "F-6-29250" ? (
                <img
                  className="h-[250px] w-[60%] rounded-lg sm:w-[90%] sm:h-[250px]"
                  src={item.img1}
                  alt={item.name}
                />
              ) : (
                <img
                  className="h-[250px] w-[40%] rounded-lg sm:w-[90%] sm:h-[250px]"
                  src={item.img1}
                  alt={item.name}
                />
              )}

              <div className="mt-3 text-lg font-bold"> {item.name}</div>
              <div className="">
                <p className="mt-1 font-bold">
                  Price:{" "}
                  <span className="mt-1  font-normal">
                    {currencyAuth === "INR" ? `Rs. ${item.price}`: `$ ${(item.price / 90).toFixed(2)}`}
                  </span>
                </p>
                <p className="mt-1 font-bold">
                  Cycle:{" "}
                  <span className="mt-1 font-normal">100 days</span>
                </p>
              </div>
              <p className="mt-1 text-sm font-bold">
                Total revenue:{" "}
                <span className="mt-1 font-normal">
                  {currencyAuth === "INR" ? `Rs. ${item.income *100}`: `$ ${((item.income *100) / 90).toFixed(2)}`}
                </span>
              </p>
              <div className="text-sm mt-2">
                {item.description.substring(0, 37)}...
              </div>
              <button
                className="mt-4 bg-gradient-to-r border-2 border-white from-yellow-400 to-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform"
                onClick={() =>navigate("/users/user/single-product", { state: item })}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
