import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import "./DailyIncome.css"
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import { useCurrencyAuth } from '../../context/currency';

const DailyIncome = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [dailiIncomeList, setDailyIncomeList] = useState([])
    const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); 



    const getDailyIncomeList     = async() => {
        const token = auth.token;
       try {
        const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/daily-income-list/${auth?.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDailyIncomeList(result.data);
          console.log(result);
          
       } catch (error) {
        console.log(error);
        
       }
    }

    useEffect(() => {
        getDailyIncomeList();
    },[])
  return (
    <Layout title={'Daily Income - Hype Drinks'}>
    <div className='daily-container'>
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
          <div className="text-xl">Revenue Bonus</div>
          <div className="font-bold w-9"></div>
        </div>
        <img className="daily-image" src="/images/daily_income.png"/>
        <div className='table-list'>
        <table className="package-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Package</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {dailiIncomeList?.map((item, index) => {
                // Convert `createdAt` to a Date object if it's not already
                const createdAtDate = new Date(item.createdAt);
                const formattedDate = !isNaN(createdAtDate.getTime())
                  ? createdAtDate.toISOString().split("T")[0]
                  : "Invalid Date"; // Fallback if the date is invalid

                return (
                  <tr key={index}>
                    <td>{formattedDate}</td>
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

export default DailyIncome