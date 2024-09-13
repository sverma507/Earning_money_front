
import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useCurrencyAuth } from "../../context/currency";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Deposite = () => {
  const amounts = [540, 1350, 3150, 6750, 11250, 29250];
  const [amount, setAmount] = useState(0);
  const [auth] = useAuth();
  const [currencyAuth] = useCurrencyAuth();
  const navigate = useNavigate();

  return (
    <Layout title={"Recharge - Earning Money"}>
      <div className="bg-gradient-to-b from-green-400 to-blue-500 pb-20 min-h-screen sm:w-2/5 mx-auto shadow-xl p-6">
        <header className="flex justify-between items-center p-4 shadow-lg rounded-t-lg bg-white">
          <div
            className="cursor-pointer font-bold text-lg text-blue-700"
            onClick={() => navigate(-1)}
          >
            <img
              src={"/images/back.png"}
              alt="back arrow"
              className="w-10 h-10"
            />
          </div>
          <h1 className="font-bold text-2xl text-gray-800">Recharge</h1>
          <div></div>
        </header>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Choose Payment Channel
          </h2>

          {/* Payment Buttons */}
          <div className="flex justify-between mt-4 gap-3">
            <button
              onClick={() =>
                navigate('/users/user/coin-deposite', { state: { data: amount } })
              }
              className="flex-1 p-4 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-lg shadow-md transform hover:scale-105 transition-transform"
            >
              Crypto
            </button>

            <button
              onClick={() =>
                navigate('/users/user/upi-deposite', { state: { data: amount } })
              }
              className="flex-1 p-4 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-lg shadow-md transform hover:scale-105 transition-transform"
            >
              UPI
            </button>

            <button
              onClick={() =>
                navigate('/users/user/qr-deposite', { state: { data: amount } })
              }
              className="flex-1 p-4 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-lg shadow-md transform hover:scale-105 transition-transform"
            >
              QRCode
            </button>
          </div>
          </div>
          {/* Payment Instructions */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700">Instructions:</h3>

            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Crypto Payment:</strong>
                <ul className="list-decimal pl-4 mt-1">
                  <li>Ensure you have a valid cryptocurrency wallet.</li>
                  <li>Transfer the exact amount to the provided wallet address.</li>
                  <li>Wait for confirmation of the transaction on the blockchain.</li>
                </ul>
              </li>

              <li className="mt-4">
                <strong>UPI Payment:</strong>
                <ul className="list-decimal pl-4 mt-1">
                  <li>Open your UPI app and scan the provided UPI ID.</li>
                  <li>Ensure the amount matches the selected recharge value.</li>
                  <li>Confirm the transaction once the UPI request is sent.</li>
                </ul>
              </li>

              <li className="mt-4">
                <strong>QRCode Payment:</strong>
                <ul className="list-decimal pl-4 mt-1">
                  <li>Use your mobile banking app to scan the provided QR code.</li>
                  <li>Verify the transaction details before proceeding.</li>
                  <li>Wait for the confirmation from your bank or payment provider.</li>
                </ul>
              </li>
            </ul>

            {/* Transaction Issue Notice */}
            <p className="text-red-600 mt-6 text-center">
              If there is any issue related to the transaction, please go to the "Contact Manager" section in the "My Profile" page. Contact the admin, and your issue will be resolved within 24 to 48 working hours.
            </p>
          </div>
        </div>
        </div>
    </Layout>
  );
};

export default Deposite;
