import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import "./TeamIncome.css"
import { useCurrencyAuth } from '../../context/currency';

const TeamIncome = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [teamIncomeList, setTeamIncomeList] = useState([])
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); 

  
      const getTeamIncomeList = async() => {
          const token = auth.token;
         try {
          const result = await axios.get(
              `${process.env.REACT_APP_API_URL}/user/level-income-list/${auth?.user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setTeamIncomeList(result.data);
            console.log(result);
            
         } catch (error) {
          console.log(error);
          
         }
      }
  
      useEffect(() => {
        getTeamIncomeList();
      },[])

  return (
    <Layout title={'Team Income - Earning Money'}>
    <div className='team-container'>
    <div className="flex justify-between p-5  bg-gradient-to-b from-purple-400 to-blue-500 text-white">
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
          <div className="text-xl">Level Commission</div>
          <div className="font-bold w-9"></div>
        </div>
        <img className="team-image" src="/images/team_income.png"/>
        <div className='table-list overflow-x-auto'>
        <table className="level-table table-auto text-sm">
      <thead>
        <tr className='tr-head'>
          <th >Date</th>
          <th>From ID</th>
          <th>Level</th>
          <th>Package</th>
          <th>Amount</th>
          <th>Net Income</th>
        </tr>
      </thead>
      <tbody>
      {teamIncomeList?.map((item, index) => {
                // Convert `createdAt` to a Date object if it's not already
                const createdAtDate = new Date(item.createdAt);
                const formattedDate = !isNaN(createdAtDate.getTime())
                  ? createdAtDate.toISOString().split("T")[0]
                  : "Invalid Date"; // Fallback if the date is invalid

                return (
                  <tr key={index}>
                    <td className=''>{`${new Date(item.createdAt).toLocaleDateString()}`}</td>
                    <td>{item.fromUser}</td>
                    <td>{item.level}</td>
                    <td>{item.package}</td>
                    <td>{currencyAuth === "INR" ? ` ${item.amount}` : `$ ${Math.floor(item.amount / 90)}`}</td>
                    <td>{currencyAuth === "INR" ? ` ${item.netIncome ? item.netIncome.toFixed(2) : "0.00"}` : `$ ${item.netIncome? Math.floor(item.netIncome / 90) : "0.00"}`}</td>
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

export default TeamIncome