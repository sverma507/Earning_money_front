import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upi.css";
import { useAuth } from "../../context/auth";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentForm = () => {
  const location = useLocation();
  const amount = location.state.data;
  const [txnAmount, setTxnAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [clientId, setClientId] = useState();
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);
  const [auth, setAuth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(()=>{
  //   setTxnAmount(amount);
  // },[amount])
  useEffect(() => {
    let intervalId;

    const checkPaymentStatus = async () => {
      try {
        if (!clientId) return; // Do not proceed if clientId is not set

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/upi-payment/check-status`,
          {
            params: {
              client_txn_id: clientId,
              userId: auth?.user.id,
              amount: txnAmount,
            },
          }
        );

        const status = response.data.status;
        setTransactionStatus(status);

        // Clear interval if the status is 'success' or any other final state
        if (status === "success" || status === "failed") {
          clearInterval(intervalId); // Clear the interval
          setHasCheckedOnce(true); // Set flag to avoid further checks
        }
      } catch (error) {
        console.error("Error checking payment status", error);
      }
    };

    if (paymentData && clientId && !hasCheckedOnce) {
      // Check if it has not been checked before
      intervalId = setInterval(checkPaymentStatus, 60000); // Poll every second
    }

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [paymentData, clientId, hasCheckedOnce, auth?.user.id, txnAmount]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentData(null);
    setTransactionStatus("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upi-payment/initiate-payment`,
        {
          txnAmount,
          customerName:'abc',
          customerMobile:"1122334455",
          customerEmail:"xyz@gmail.com",
          userId: auth?.user.id, // Replace this with actual user ID
        }
      );

      if (response.data) {
        console.log(" res ==>", response.data);

        setPaymentData(response.data.paymentData);
        setClientId(response.data.client_txn_id);
        setIsProcessing(false);
      } else {
        alert("Payment initiation failed");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error initiating payment", error);
      alert("Error initiating payment");
      setIsProcessing(false);
    }
  };

  const getTransactions = async () => {
    try {
        const userId = auth?.user.id;
        const endpoint = `/upi-payment/transactions/${userId}`;

        const result = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("transactions=>", result.data);

        setTransactions(result.data);
        setLoading(false);
    } catch (err) {
        console.log("Error while getting the transactions", err);
        setLoading(false);
    }
};


useEffect(() => {
   getTransactions();
},[])

  return (
    <Layout>
      <div className="upi-container">
        <header className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-b from-green-400 to-blue-500">
          <div className="cursor-pointer font-bold text-lg text-blue-700" onClick={() => navigate(-1)}>
            <img src={"/images/back.png"} alt="right arrow" className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="font-bold text-xl md:text-2xl text-white">Wallet Payment</h1>
          <div></div>
        </header>
        
        {paymentData ? (
           <div className="mt-4">
           <h3></h3>
           <h4 className="text-xl text-white mt-10">Request has been {transactionStatus}</h4>
           <a href={`${paymentData.payment_url}`} target="_blank">
           <button className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 mt-10 mb-20 rounded-lg text-white">Scan And Pay</button>
           </a>
         </div>
        ) : (
          <div>
          <div className="upi-form-deposite">
            <span className="text-white text-2xl">Fill Payment Detail and Pay</span>
            <hr />
            <form onSubmit={handlePayment}>
              {/* form elements */}
              <h4>Amount:</h4>
              <input
                type="number"
                value={txnAmount}
                className="form-control"
                placeholder="Enter Txn Amount"
                onChange={(e) => setTxnAmount(e.target.value)}
              />
              <br />
              {/* <h4>Name:</h4>
              <input
                type="text"
                placeholder="Enter Customer Name"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <br />
              <h4>Mobile:</h4>
              <input
                type="text"
                placeholder="Enter Customer Mobile"
                maxLength="10"
                className="form-control"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
                required
              />
              <br />
              <h4>Email:</h4>
              <input
                type="email"
                placeholder="Enter Customer Email"
                className="form-control"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              /> */}
              <br />
              <input
                type="submit"
                value={isProcessing ? "Processing..." : "Pay"}
                className="deposite-btn"
                disabled={isProcessing}
              />
            </form>
            
          </div>
          <div className='mt-10'>
          <h2 className='text-center text-white'>Recharge Hoistory</h2>
          {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <table className="min-w-full bg-gradient-to-b mt-6 from-green-400 to-blue-400">
                        <thead>
                            <tr>
                                <th className="py-2">Sr#</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={transaction._id}>
                                        <td className="py-2 text-center">{index + 1}</td>
                                        <td className="py-2 text-center">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 text-center">{transaction.txnAmount}</td>
                                        <td className="py-2 text-center">{transaction.status === 'created' ? 'Processing' : transaction.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
        </div>
          </div>
          
        )}
      </div>
    </Layout>
  );
};

export default PaymentForm;
