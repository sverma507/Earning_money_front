import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../../context/adminAuth';
import axios from 'axios';
import Sidebar from '../AdminSidebar/Sidebar';
import { toast, ToastContainer } from 'react-toastify';

const AllCryptoTransaction = () => {
    const [adminAuth] = useAdminAuth();
    const [transactions, setTransactions] = useState([]); // Initialize with an empty array
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const token = adminAuth.token;

    // Fetch withdrawal requests from the API

    const getTransactions = async () => {
        // const member_id = memberId;
        // console.log(member_id);
        
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/coin-payments/all-transactions`);
           console.log('res ==> ',response.data);
           return response.data; 
        } catch (error) {
          console.error('Error fetching transactions:', error);
          throw error;
        }
      };


      useEffect(() => {
        fetchTransactions();
        const pollingInterval = setInterval(fetchTransactions, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(pollingInterval);
    }, []);


    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            toast.error('Failed to fetch transactions.');
        }
      };




    return (
      <div className="flex min-h-screen gap-6">
        {/* Sidebar */}
        <Sidebar className="fixed w-60 h-full" />
      
        {/* Main content */}
        <ToastContainer/>
        <div className="ml-60 p-4 flex-1">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Crypto Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">User ID</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Transaction ID</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Coin Type</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Amount</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Status</th>
                  <th className="px-2 py-1 md:px-4 md:py-2">Date</th>
                  {/* <th className="px-2 py-1 md:px-4 md:py-2">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <tr key={tx.txn_id} className="text-center border-b">
                      <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2 break-all">{tx.userCode}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2 break-all">{tx.txn_id}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2">{tx.type}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2">$ {tx.amount}</td>
                      <td className="px-2 py-1 md:px-4 md:py-2 capitalize">
                        <span className="text-green-600 font-semibold">{tx.status_text}</span>
                      </td>
                      <td className="px-2 py-1 md:px-4 md:py-2">{new Date(tx.date_time).toLocaleString()}</td>
                      {/* <td className="px-2 py-1 md:px-4 md:py-2">
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
                      </td> */}
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
    );
};

export default AllCryptoTransaction;