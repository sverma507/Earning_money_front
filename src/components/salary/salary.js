import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import "./salary.css";
import { useCurrencyAuth } from '../../context/currency';

const Salary = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth();
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const userId = auth?.user?.id; // Get the logged-in user ID
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/salary/${userId}`);
        console.log(data.levels);
        
        setSalaryData(data.levels); // Store the salary data in state
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    };

    if (auth?.user) {
      fetchSalaryData();
    }
  }, [auth?.user]);

  return (
    <Layout title={'Team Income - Earning Money'}>
      <div className='team-container'>
        <div className="flex justify-between p-5 bg-gradient-to-b from-purple-400 to-blue-500 text-white">
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
          <div className="text-xl">Business</div>
          <div className="font-bold w-9"></div>
        </div>
        <img className="team-image" src="/images/team_income.png" />
        <div className='table-list overflow-x-auto'>
          <table className="package-table table-auto">
            <thead>
              <tr className='tr-head'>
                <th>Level</th>
                <th>Members</th>
                <th>Power Leg</th>
                <th>Other Leg</th>
                <th>Total Business</th>
              </tr>
            </thead>
            <tbody>
  {salaryData?.map((level, index) => (
    <tr key={index} className='text-sm'>
      <td>{level.level}</td> {/* Display the level number */}
      <td>{level.totalMembers}</td> {/* Display the number of members in this level */}
      <td>{(level.powerLeg || 0).toLocaleString("en-IN")}</td> {/* Display the power leg business */}
      <td>{(level.singleLeg || 0).toLocaleString("en-IN")}</td> {/* Display the single leg business */}
      <td>{(level.totalBusiness || 0).toLocaleString("en-IN")}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Salary;
