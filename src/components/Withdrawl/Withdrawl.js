import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import SubmittingButton from '../SubmittingButton/SubmittingButton';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrencyAuth } from '../../context/currency';

const WithdrawalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [data, setData] = useState({
    accountNumber: '',
    ifscCode: '',
    userName: '',
    amount: '',
  });
  const [loading,setLoading] = useState(false);
  const [buttonState, setButtonState] = useState('');
  const [auth] = useAuth();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const token = auth?.token;
  const [popUp, setPopUp] = useState(false);
  const [hide,setHide]=useState(false);
  const [swallet,setSWallet]=useState('');
  // const [wallet,setWallet]=useState(0);
  const location = useLocation();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth();

  const getAccountDetails = async () => {
    setButtonState('loading');
    const token = auth.token;
    const userId = auth?.user.id;

    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/get/account-details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("reult.wallet=>",result.data);
      
      // setWallet(result.data.wallet||0);
      setData((prev) => ({
        ...prev,
        accountNumber: result.data.accountNumber || '',
        ifscCode: result.data.ifscCode || '',
        userName: result.data.userName || '',
      }));

      setSWallet(result.data.wallet||0)

      if (!result.data.accountNumber) {
        setIsOpen(true); // Open the modal if no account details are found
      }
      setButtonState('');
    } catch (error) {
      toast.error('Failed to fetch account details');
      setButtonState('');
    }
  };


  const getTransactions = async () => {
    try {
        const userId = auth?.user.id;
        const endpoint = `/user/withdraw-transactions/${userId}`;

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
    getAccountDetails();
    getTransactions();
  }, []);

  const onClose = () => setIsOpen(false);
  const onClosePopUp = () => setPopUp(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault(); 
    setButtonState('loading');
    const token = auth.token;
    const userId = auth?.user.id;

    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/update/account-details/${userId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.message || 'Account details updated successfully');
      setButtonState('validate');
      setTimeout(() => {
        setButtonState('');
        setIsOpen(false); 
      }, 1250);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update account details');
      setButtonState('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(swallet <= 0){
       toast('Insufficient Balance');
    }
    
    else{
      if (!data.accountNumber || !data.ifscCode || !data.userName) {
        setIsOpen(true); // Open the modal to bind bank details
      } else if (!data.amount) {
        toast.error('Please enter the withdrawal amount');
      } else {
        const token = auth.token;
        const userId = auth?.user.id;
        const allData = { ...data, userId };
        setLoading(true);
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/withdrw-payment-request`,
            allData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          toast.success(response.data.message || 'Withdrawal request submitted successfully');
          setLoading(false);
          setPopUp(true);
        } catch (error) {
          toast.error(error.response?.data?.error || 'Failed to submit withdrawal request');
          setLoading(false);
        }
      }
    }
    
  };

  return (
    <Layout title={'Withdrawl - Earning Money'}>
      <ToastContainer/>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm p-4">
          <div className="bg-yellow-300 bg-opacity-50 backdrop-blur-2xl text-white rounded-lg shadow-lg w-full sm:w-2/6">
            <form onSubmit={handleBankDetailsSubmit}>
              <div className="border-b border-gray-700 p-4 text-lg font-semibold">
                Bank Account Details
                <button
                  onClick={onClose}
                  className="float-right text-white hover:text-gray-400"
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-4">
                    Account Number <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    name="accountNumber"
                    value={data.accountNumber}
                    required
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 rounded-md text-white px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    IFSC Code <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    name="ifscCode"
                    value={data.ifscCode}
                    required
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 rounded-md text-white px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Bank Account User Name <span className="text-red-500 text-lg">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    name="userName"
                    value={data.userName}
                    required
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 rounded-md text-white px-3 py-2"
                  />
                </div>
              </div>
              <div className="border-t border-gray-700 p-4">
                <SubmittingButton buttonState={buttonState} />
              </div>
            </form>
          </div>
        </div>
      )}

       {popUp && (
        <div className="fixed md:w-[40%] m-auto inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm p-4">
           <div className='md:w-[80%] text-center text-white m-auto border bg-black p-10'>
            <button
                  onClick={onClosePopUp}
                  className="float-right text-white hover:text-gray-400 bg-gray-600 p-2"
                >
                  X
                </button>
            <h2 className='text-center mt-[70px] text-white'>Withdrawl Request Created</h2>
            <p className='mt-4'>Your withdrawal amount will be credit to your account within 24-72 hours</p>
           </div>
        </div>
      )}


      <div className="sm:w-2/5 mx-auto text-white min-h-screen pb-16 bg-gradient-to-b from-purple-500 to-blue-400 p-6 rounded-md shadow-md">
        <header className="flex justify-between items-center p-2 rounded-t-lg">
          <div className="cursor-pointer font-bold text-lg" onClick={() => navigate(-1)}><img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                /></div>
          <h1 className="font-bold text-2xl font-serif">Withdraw</h1>
          <div></div>
        </header>
        {/* <div>{wallet}</div> */}
        <div>Available Wallet Ballance:{currencyAuth==='INR' ? `Rs.${swallet}` :`$${Math.floor(swallet/90)}`}</div>
        <div className='text-sm'><span className='text-red-700 text-lg'>Note:</span>You can only withdrawl the amount like 100, 200, 300,.....100X</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2 mt-4">Bank account</label>
            <input
              type="text"
              name="accountNumber"
              value={data.accountNumber}
              disabled
              className="w-full text-white px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Real Name</label>
            <input
              type="text"
              name="userName"
              value={data.userName}
              disabled
              className="w-full text-white px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={data.ifscCode}
              disabled
              className="w-full text-white px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Amount</label>
            <input
              required
              type="text"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 border rounded-md"
              placeholder="Please enter the amount"
            />
          </div>
          <div className="mb-4">
            {data.accountNumber ? ""
             : (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Bind Bank Details
              </button>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md"
            >
              {loading ? 'Processing...' : 'Withdraw Now'}
            </button>
          </div>
        </form>
        <div className='mt-10'>
          <h2 className='text-center text-white'>Withdrawl Hoistory</h2>
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
                                        <td className="py-2 text-center">{transaction.amount}</td>
                                        <td className="py-2 text-center">{transaction.paymentStatus}</td>
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
    </Layout>
  );
};

export default WithdrawalForm;
