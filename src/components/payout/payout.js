import React, { useState } from 'react';
import Layout from '../Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Payout = () => {
    const [amount, setAmount] = useState('');
    const [beneficiaryIFSC, setBeneficiaryIFSC] = useState('');
    const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('IMPS');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handlePayout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/payout/payout-request`, {
                amount,
                beneficiaryIFSC,
                beneficiaryAccount,
                beneficiaryName,
                beneficiaryAddress,
                paymentMode,
                remarks
            });

            // Success toast
            console.log('res ==>',res.data);
            if(res.data.status){
                toast.success('Payout initiated successfully!');
            }else{
                toast.error(res.data.message);
            }
            

        } catch (error) {
            // Error toast
            toast.error('Payout initiation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // const handlePayoutStatus = async () => {
    //     try {
    //         const res = await axios.post('/payout/payout-status', {
    //             amount,
    //             orderid
    //         });
    //         setResponse(res.data);
    //     } catch (error) {
    //         setResponse(error.response?.data);
    //     }
    // };
    
    // const handleGetBalance = async () => {
    //     try {
    //         const res = await axios.post('/payout/payout-balance');
    //         setResponse(res.data);
    //     } catch (error) {
    //         setResponse(error.response?.data);
    //     }
    // };

    return (
        <Layout>
            <ToastContainer />
            <div className="w-full lg:w-[40%] max-w-full m-auto p-4 lg:p-10 bg-gradient-to-b from-green-400 to-blue-500">
                <div className="flex justify-between">
                    <div className="cursor-pointer" onClick={() => { navigate(-1) }}>
                        <img
                            src={"/images/back.png"}
                            alt="right arrow"
                            className="w-10 h-10"
                        />
                    </div>
                    <div className='text-white text-4xl'>Withdrawal</div>
                    <div className="font-bold w-9"></div>
                </div>

                <div className="mb-10 mt-4 lg:mt-[10px] p-4 lg:p-20">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary IFSC</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Beneficiary IFSC" value={beneficiaryIFSC} onChange={e => setBeneficiaryIFSC(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Account</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Beneficiary Account" value={beneficiaryAccount} onChange={e => setBeneficiaryAccount(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Name</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Beneficiary Name" value={beneficiaryName} onChange={e => setBeneficiaryName(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Address</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Beneficiary Address" value={beneficiaryAddress} onChange={e => setBeneficiaryAddress(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" value={paymentMode} onChange={e => setPaymentMode(e.target.value)}>
                                <option value="IMPS">IMPS</option>
                                <option value="NEFT">NEFT</option>
                                <option value="RTGS">RTGS</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500" placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
                        </div>

                        <button
                            className={`w-full text-white py-2 px-4 rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            onClick={handlePayout}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Initiate Payout'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payout;






