

import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCurrencyAuth } from '../../context/currency';

const Transaction = () => {
    const [auth] = useAuth();
    const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); 
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transactionType, setTransactionType] = useState('add-fund');
    const token = auth.token;
    const navigate = useNavigate();

    const getTransactions = async () => {
        try {
            const userId = auth?.user.id;
            let endpoint = '';

            if (transactionType === 'add-fund') {
                endpoint = `/upi-payment/transactions/${userId}`;
            } else if (transactionType === 'withdraw') {
                endpoint = `/user/withdraw-transactions/${userId}`;
            }

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
    }, [transactionType]);

    return (
        <Layout title={'Transactions - Earning Money'}>
            <div className="sm:w-2/5 mx-auto text-white min-h-screen bg-gradient-to-b from-green-400 to-blue-400 p-6 rounded-md shadow-md">
                <header className="flex justify-between items-center p-4 rounded-t-lg">
                    <div className="cursor-pointer font-bold text-lg text-white" onClick={() => navigate(-1)}>
                        <img src={"/images/back.png"} alt="back arrow" className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl text-white font-bold mb-4">All Transactions</h2>
                    <div></div>
                </header>

                {/* Buttons to toggle transaction type */}
                <div className="mb-4 flex justify-evenly">
                    <button
                        onClick={() => setTransactionType('add-fund')}
                        className={`py-2 px-4 mr-2 ${transactionType === 'add-fund' ? 'bg-blue-600' : 'bg-blue-400'} text-white rounded`}
                    >
                        Add Fund Requests
                    </button>
                    <button
                        onClick={() => setTransactionType('withdraw')}
                        className={`py-2 px-4 ${transactionType === 'withdraw' ? 'bg-blue-600' : 'bg-blue-400'} text-white rounded`}
                    >
                        Withdraw Requests
                    </button>
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <table className="min-w-full bg-gradient-to-b from-green-400 to-blue-400">
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
                                        <td className="py-2 text-center">
                                            {transactionType === 'add-fund' ? `Rs. ${transaction.txnAmount}` : transaction.amount}
                                        </td>
                                        <td className="py-2 text-center">
                                            {transactionType === 'add-fund' ? 
                                                (transaction.status === 'created' ? 'Processing' : transaction.status) : 
                                                transaction.paymentStatus}
                                        </td>
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
        </Layout>
    );
};

export default Transaction;
