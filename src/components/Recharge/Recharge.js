import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout from '../Layout';
import QRCode from 'qrcode.react';
import { useCurrencyAuth } from '../../context/currency';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recharge = () => {
  const amounts = [500,2500,5000,7500,10000,25000,50000,100000,500000,1000000,2500000,5000000];
  const [formData, setFormData] = useState({
    userId: '',
    userCode: '',
    amount: '',
    utrNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [auth] = useAuth();
  const [currencyAuth] = useCurrencyAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]); // To store transaction history

  // const UPI_ID = '9084407032@ptaxis'; // Replace with actual UPI ID
  const UPI_ID = 'sagfjshjsbsvaj@axl'; // Replace with actual UPI ID

  // Function to fetch user transaction history
  const getQrTransactions = async () => {
    try {
      const { id } = auth.user;
      const token = auth.token;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/qr-transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.success) {
        setTransactions(res.data.data);
      } else {
        toast.error('Failed to load transaction history');
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      toast.error('Failed to load transaction history');
    }
  };

  useEffect(() => {
    getQrTransactions();
  }, []);

  const handleAmountClick = (amount) => {
    setFormData((prevState) => ({
      ...prevState,
      amount: amount.toString(),
    }));
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    let isValid = true;

    // Validation checks
    if (parseFloat(formData.amount) < 100) {
      setErrorMessage('The minimum amount of recharge is 100 Rs.');
      isValid = false;
    }
    if (!formData.utrNumber) {
      setErrorMessage('UTR number is required for verification.');
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true); 
        const { id } = auth.user;
        const token = auth.token;

        // Retrieve user details
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.data) {
          formData.userId = res.data._id;
          formData.userCode = res.data.referralCode;

          // Submit payment request
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/add-qr-payment`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Show success toast and navigate
          toast.success(response.data.message);
          // navigate('/users/user/all-transaction-details'); 
          getQrTransactions();
          setFormData({
            userId: '',
            userCode: '',
            amount: '',
            utrNumber: '',
          })

        } else {
          toast.error('Failed to retrieve user data');
        }
      } catch (err) {
        console.log('Recharge API error:', err);
        toast.error('There was an issue processing your request. Please try again.');
      } finally {
        setLoading(false); 
      }
    }
  };

  const generateUPILink = (amount) => {
    return `upi://pay?pa=${UPI_ID}&pn=YourName&am=${amount}&cu=INR`;
  };

  return (
    <Layout title={'Recharge - Earning Money'}>
      <ToastContainer />
      <div className="bg-gradient-to-b from-purple-400 to-blue-500 pb-20 min-h-screen sm:w-2/5 mx-auto shadow-xl p-6">
        <header className="flex justify-between items-center p-4 shadow-lg rounded-t-lg bg-white">
          <div
            className="cursor-pointer font-bold text-lg text-blue-700"
            onClick={() => navigate(-1)}
          >
            <img src="/images/back.png" alt="right arrow" className="w-10 h-10" />
          </div>
          <h1 className="font-bold text-2xl text-gray-800">Recharge</h1>
          <div></div>
        </header>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Select Amount</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className="bg-gradient-to-r w-32 from-purple-400 to-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform"
              >
                {currencyAuth === 'INR' ? amount : `$${(amount / 90).toFixed(2)}`}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter a custom amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`mt-4 p-2 bg-gray-200 border rounded-lg w-full ${errorMessage.includes('amount') ? 'border-red-500' : ''}`}
          />
          {errorMessage.includes('amount') && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        {formData.amount && parseFloat(formData.amount) >= 100 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <QRCode value={generateUPILink(formData.amount)} size={200} className="mx-auto" />
            <div className="mt-4 text-gray-800">
              <h3 className="text-lg font-semibold">QR Code Payment Instructions</h3>
              <ol className="list-decimal list-inside">
                <li>Scan the QR code with any payment app like PhonePe, Google Pay, or Paytm.</li>
                <li>Enter the amount and complete the payment.</li>
              </ol>
            </div>
          </div>
        )}

        {formData.amount && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Enter UTR Number</h3>
            <input
              type="text"
              required
              placeholder="UTR Number"
              name="utrNumber"
              value={formData.utrNumber}
              onChange={handleChange}
              className={`mt-2 p-2 bg-gray-200 border rounded-lg w-full ${errorMessage.includes('UTR') ? 'border-red-500' : ''}`}
            />
            {errorMessage.includes('UTR') && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full transform hover:scale-105 transition-transform"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
          {transactions.length > 0 ? (
            <table className="w-full mt-4 bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4">Sr No.</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{index+1}</td>
                    <td className="py-2 px-4">
        {new Date(transaction.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })}
      </td>
                    {/* <td className="py-2 px-4">{transaction.createdAt}</td> */}
                    <td className="py-2 px-4">{transaction.amount} INR</td>
                    <td className="py-2 px-4">{transaction.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Recharge;
