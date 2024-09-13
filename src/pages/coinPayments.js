import axios from 'axios';
import Login from './login/Login';

// const API_URL = 'http://localhost:5000/api/v1/coin-payments';

export const createDeposit = async ( amount, currency, memberId) => {
 console.log(memberId);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/coin-payments/deposit`, {
      member_id:memberId,
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    console.error('Deposit Creation Error:', error);
    throw error;
  }
};


export const getTransactions = async (memberId) => {
  const member_id = memberId;
  console.log(member_id);
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/coin-payments/transactions/${member_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};