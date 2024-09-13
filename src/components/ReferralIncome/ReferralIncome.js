import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import "./ReferralIncome.css"
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useCurrencyAuth } from '../../context/currency';

const ReferralIncome = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [referralIncomeList, setReferralIncomeList] = useState([])
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); 

      const getReferralIncomeList = async() => {
          const token = auth.token;
         try {
          const result = await axios.get(
              `${process.env.REACT_APP_API_URL}/user/referral-income-list/${auth?.user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setReferralIncomeList(result.data);
            console.log(result);
            
         } catch (error) {
          console.log(error);
          
         }
      }
  
      useEffect(() => {
        getReferralIncomeList();
      },[])
  return (
    <Layout title={'Rferral Income - Hype Drinks'}>
    <div className='referral-container'>
    <div className="flex justify-between p-5  bg-gradient-to-b from-green-400 to-blue-500 text-white">
          <div
            className="cursor-pointer text-xl"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                />
          </div>
          <div className="text-xl">Invitation Bonus</div>
          <div className="font-bold w-9"></div>
        </div>
        <img className="referral-image" src="/images/referral_logo.png"/>
        <div className='table-list'>
        <table className="package-table">
      <thead>
        <tr>
        <th>Date</th>
          <th>From ID</th>
          <th>Package</th>
          <th>Net Income</th>
        </tr>
      </thead>
      <tbody>
      {referralIncomeList?.map((item, index) => {
                // Convert `createdAt` to a Date object if it's not already
                const createdAtDate = new Date(item.createdAt);
                const formattedDate = !isNaN(createdAtDate.getTime())
                  ? createdAtDate.toISOString().split("T")[0]
                  : "Invalid Date"; // Fallback if the date is invalid

                return (
                  <tr key={index}>
                    <td>{formattedDate}</td>
                    <td>{item.fromUser}</td>
                    <td>{item.package}</td>
                    <td>
                    {currencyAuth === "INR" ? ` ${item.amount}` : `$ ${Math.floor(item.amount / 90)}`}
                    </td>
                  </tr>
                );
              })}
      </tbody>
    </table>
        </div>
    </div>
    </Layout>
  )
}

export default ReferralIncome