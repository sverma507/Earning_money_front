// PaymentStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentStatus = ({ clientTxnId }) => {
    const [status, setStatus] = useState('');
    const [txnData, setTxnData] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/upi-payment/check-status?client_txn_id=${clientTxnId}`);
                setStatus(response.data.status);
                setTxnData(response.data.data);
            } catch (error) {
                console.error("Error fetching payment status", error);
            }   
        };

        fetchStatus();
    }, [clientTxnId]);

    return (
        <div className="container p-5">
            <h2>Response</h2>
            <p>Payment Gateway - Test Response</p>
            <div className="alert alert-danger"> Transaction Status : {status}</div>
            {txnData && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(txnData).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentStatus;
