import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotIcon from "../chatbotIcon";
import home from "./home.png";
import allProducts from "./allProducts.png";
import myProducts from "./myProduct.png";
import viewPdf from "./viewPlains.png";
import profile from "./profile.png";
import spin from "./spin.gif";
import spin2 from "./spin2.png";
import rocket from "./rocket.png";
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
          <div
            id="tooltip-new"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Buy New Product
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            onClick={()=>{window.open('https://hypedrinks.pro/uploads/pdfs/hype_pdf.pdf', '_blank');}}
            data-tooltip-target="tooltip-settings"
            type="button"
            className="inline-flex flex-col items-center rounded-full justify-center px-5 group"
          >
          
            <img src={viewPdf} className="" />
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
            {/* <svg
                        className="w-5 h-5 mb-1 text-black group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 12.65a8.013 8.013 0 0 1-6.988-3.951c.034-1.998 4-3.089 6.988-3.089s6.954 1.091 6.988 3.089A8.013 8.013 0 0 1 10 17.65Z" />
                    </svg> */}
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
