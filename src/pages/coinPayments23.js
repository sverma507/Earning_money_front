import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createDeposit, getTransactions } from './coinPayments'; // Adjust the path as needed
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';

const DepositForm = () => {
    const location = useLocation();
    const amountBack = location.state.data;
    const [toggle, setToggle] = useState(false);
    const [amount, setAmount] = useState((parseFloat(amountBack) / 92).toFixed(2))
    const [currency, setCurrency] = useState('USDT.BEP20');
    const [inrAmount, setInrAmount] = useState('');
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy Address');
    const [transactions, setTransactions] = useState([]);
    const [memberId, setMemberId] = useState();
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
  
    const conversionRate = 92; // Example conversion rate (1 USD = 92 INR)

    useEffect(() => {
      if (amount) {
        const convertedAmount = (parseFloat(amount) * conversionRate).toFixed(2);
        setInrAmount(convertedAmount);
      } else {
        setInrAmount('');
      }
      setMemberId(auth?.user.id);
    }, [amount]);

    useEffect(() => {
        fetchTransactions();
        const pollingInterval = setInterval(fetchTransactions, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(pollingInterval);
    }, []);

    const fetchTransactions = async () => {
      const memberid = auth?.user.id;
      try {
          const data = await getTransactions(memberid);
          setTransactions(data);
      } catch (error) {
          toast.error('Failed to fetch transactions.');
      }
    };

    const handleRecharge = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
          const transaction = await createDeposit(Number(amount), currency, memberId);
          setTransactionDetails(transaction);
          setToggle(true); // Open the modal after getting transaction details
          toast.success('Request created successfully');
          setAmount(0);
          setCurrency('USDT.BEP20');
          setInrAmount('');
          fetchTransactions(); // Refresh the transaction list
      } catch (error) {
          console.error('Deposit Error:', error);
  
          // Check if the error response exists and includes a message
          if (error.response && error.response.data && error.response.data.message) {
              // Show the message sent from the backend
              toast.error(error.response.data.message);
          } else {
              // Fallback to a generic error message if no specific message is provided
              toast.error('Failed to create deposit. Please try again.');
          }
      } finally {
          setLoading(false);
      }
  };

    const handleCopyAddress = () => {
      if (transactionDetails && transactionDetails.address) {
          navigator.clipboard.writeText(transactionDetails.address);
          setCopyButtonText('Copied');
          toast.success('Address copied to clipboard!');
          setTimeout(() => {
              setCopyButtonText('Copy Address');
          }, 2000); // Reset the button text after 2 seconds
      }
    };

    const handlePayFunds = (transaction) => {
      console.log(transaction);
      
      setTransactionDetails(transaction);
      setToggle(true); // Open the modal with the transaction details
    };

    return (
      <Layout title={'Crypto Payment - Hype Drinks'}>
      <div className="relative min-h-screen sm:w-2/5 mx-auto bg-gradient-to-b from-green-400 to-blue-500">
        <header className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-b from-green-400 to-blue-500">
          <div className="cursor-pointer font-bold text-lg text-blue-700" onClick={() => navigate(-1)}>
            <img src={"/images/back.png"} alt="right arrow" className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="font-bold text-xl md:text-2xl text-white">Crypto Payment</h1>
          <div></div>
        </header>
        {toggle && transactionDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-md mx-auto">
              <button
                onClick={() => setToggle(false)}
                className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300"
              >
                &times;
              </button>
              {transactionDetails.qrcode_url && (
                <div className="mt-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">Scan the QR Code to Deposit</h4>
                  <img src={transactionDetails.qrcode_url} className="w-24 md:w-32 mx-auto" alt="QR Code" />
                </div>
              )}
              <div className="flex flex-col md:flex-row items-center justify-between m-auto rounded-md mt-4 p-2 bg-green-500">
                <p className="text-sm break-all">{transactionDetails.address}</p>
                <button
                  onClick={handleCopyAddress}
                  className="bg-blue-500 text-sm text-white py-1 px-3 mt-2 md:mt-0 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  {copyButtonText}
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
        <form onSubmit={handleRecharge} className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md mx-auto mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Recharge</h2>
          <input
            type="number"
            placeholder="Amount in USDT"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            step="0.01"
          />
          {/* <input
            type="text"
            placeholder="Amount in INR"
            value={inrAmount}
            readOnly
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg bg-gray-100"
          /> */}
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            required 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Coin</option>
            <option value="USDT.BEP20">USDT BEP-20</option>
            {/* <option value="DAI.BEP20">DAI BEP-20</option> */}
            {/* Add more currencies as needed */}
          </select>
          <button
            type='submit'
            disabled={loading}
            className={`block mx-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Recharge'}
          </button>
        </form>
        {/* Transactions Table */}
        <div className="mt-8 w-[90%] max-w-screen-lg mx-auto bg-gray-300 p-6 rounded-lg text-center shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Transaction ID</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Coin Type</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Amount</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Status</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Date</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <tr key={tx.txn_id} className="text-center border-b">
                      <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2 break-all">{tx.txn_id}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2">{tx.type}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2">$ {tx.amount}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2 capitalize">
                        <span className="text-green-600 font-semibold">{tx.status_text}</span>
                      </td>
                      <td className="px-2 py-1 md:px-4 md:py-2">{new Date(tx.date_time).toLocaleString()}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2">
                        {tx.status_text === 'pay funds' ? (
                          <button
                            onClick={() => handlePayFunds(tx)}
                            className="bg-yellow-500 text-white py-1 px-2 md:py-1 md:px-3 rounded-lg hover:bg-yellow-600 focus:outline-none"
                          >
                            Pay Funds
                          </button>
                        ) : (
                          <a 
                            href={tx.status_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                          >
                            View
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-2 py-1 md:px-4 md:py-2 text-center">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> 
      </Layout>
    );
};

export default DepositForm;
