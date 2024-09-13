import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotIcon from "../chatbotIcon";
import home from "./home.png";
import allProducts from "./all-product-removebg-preview.png";
import myProducts from "./my-product.png";
// import viewPdf from "./viewPlains.png";
import profile from "./my-profile-removebg-preview.png";
import spin from "./spin-removebg-preview.png";
// import spin2 from "./spin2.png";
// import rocket from "./rocket.png";
const BottomNav = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="relative">
      <div className="fixed z-50 w-full sm:w-2/5 h-16 -translate-x-1/2 border-2 border-gray-100 rounded-t-full bottom-0 left-1/2 backdrop-blur-lg bg-white/30">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/users/user/spin-game")}
              type="button"
              className="inline-flex items-center justify-center w-16 h-16 font-medium group"
            >
              <img src={spin} alt="Games" />
              <span className="sr-only">Games</span>
            </button>
          </div>
          

          <button
            onClick={() => {
              navigate("/users/user/all-products");
            }}
            data-tooltip-target="tooltip-wallet"
            type="button"
            className="inline-flex flex-col items-center rounded-full justify-center px-5 group"
          >
            <img src={allProducts} className="" />
            <span className="sr-only">All Products</span>
          </button>
          <div
            id="tooltip-wallet"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Wallet
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            onClick={() => {
              navigate("/");
            }}
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex  flex-col items-center justify-center px-5 rounded-full group"
          >
            <img src={home} className="" />
            <span className="sr-only">Home</span>
          </button>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div
            id="tooltip-new"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Buy New Product
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            onClick={() => {
              navigate("/users/user/my-products");
            }}
            data-tooltip-target="tooltip-settings"
            type="button"
            className="inline-flex flex-col items-center rounded-full justify-center px-5 group"
          >
            <img src={myProducts} className="" />
            <span className="sr-only">Plans</span>
          </button>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Settings
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            onClick={() => {
              navigate("/users/user");
            }}
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-full group"
          >
            <img src={profile} className="" />
            <span className="sr-only">Profile</span>
          </button>
          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
