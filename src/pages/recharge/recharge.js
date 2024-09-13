import { Button } from "@headlessui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const RechargeDummy = () => {
  const [name, setName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [ifsc, setifsc] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [auth, setAuth] = useAuth();


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("recharge auth=>", auth);
    try {
        
        const token = auth.token;
        const id = auth?.user.id;
  
        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}/payment/recharge-wallet`,
          { customAmount, id, name, bankNumber, ifsc }, // This is the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("result recharge=>", result.data.data.data.transaction_id);
        if(result.data.data.status){
            let transactionId = result.data.data.data.transaction_id;
            let paymentReferNo = result.data.data.data.PaymentReferenceNo;
            let paymentToken = result.data.paymentToken;
            let userId = auth?.user.id;
            try {
                let paymentResponse = await axios.post(
                    `${process.env.REACT_APP_API_URL}/payment/verify-wallet-recharge`,
                    { transactionId, paymentReferNo, paymentToken, userId }, // This is the request body
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  console.log(paymentResponse);
                  
            } catch (error) {
                console.log(error);
                
            }
        }

      } catch (error) {
          toast.error(error.response.data.message || "Something went wrong. Please try again.");
      }
  }
  

  return (
    <div>
      <h1>Recharge Dummy</h1>
      <input
        type={"text"}
        placeholder={"custom-amount"}
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        className="border border-slate-900"
      />
      <input
        type={"text"}
        placeholder={"accountNumber"}
        value={bankNumber}
        onChange={(e) => setBankNumber(e.target.value)}
        className="border border-slate-900"
      />
      <input
        type={"text"}
        placeholder={"ifscCode"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-slate-900"
      />
      <input
        type={"text"}
        placeholder={"name"}
        value={ifsc}
        onChange={(e) => setifsc(e.target.value)}
        className="border border-slate-900"
      />

      <button onClick={(e) => {handleSubmit(e)}}>Submit</button>
    </div>
  );
};

export default RechargeDummy;
