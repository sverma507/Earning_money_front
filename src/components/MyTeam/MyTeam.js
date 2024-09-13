import React, { useEffect, useState } from "react";
import "./MyTeam.css";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const MyTeam = () => {
  const [levelMembers, setLevelMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [activeMember, setActiveMember] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Determine the filter text based on the activeMember state
  const filterText = activeMember ? "Active Members" : "Unrecharged Members";

  // Function to get members for a specific level
  const getLevelMembers = async (level) => {
    const id = auth?.user.id;
    const token = auth.token;

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/team-members/${id}/${level}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLevelMembers(result.data);
    } catch {
      console.log("Error while fetching team members for level");
    }
  };

  // Function to get all members across all levels
  const getAllMembers = async () => {
    const id = auth?.user.id;
    const token = auth.token;

    try {
      const allLevelsResult = await Promise.all(
        [1, 2, 3, 4, 5].map((level) =>
          axios.get(
            `${process.env.REACT_APP_API_URL}/user/team-members/${id}/${level}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      // Combine results from all levels
      const combinedResults = allLevelsResult.flatMap((result) => result.data);
      setAllMembers(combinedResults);
      setTotalMembers(combinedResults.length);
    } catch {
      console.log("Error while fetching all team members");
    }
  };

  useEffect(() => {
    getLevelMembers(currentLevel);
    getAllMembers(); // Fetch all members on component mount
  }, [currentLevel]);

  const filteredTeamMembers = levelMembers.filter(
    (member) => member.active === activeMember
  );

  return (
    <Layout title={'My Team - Earning Money'}>
      <div className="myTeamContainer sm:w-2/5 bg-gradient-to-b from-purple-400 to-blue-400">
        <div className="teamHeader bg-gradient-to-b from bg-purple-400 to-blue-600">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={"/images/back.png"}
              alt="back arrow"
              className="w-10 h-10"
            />
          </div>
          <h1>My Teams</h1>
        </div>
        <div className="memberStatus p-4 gap-2">
          
          <button
            onClick={() => setActiveMember(true)}
            className={activeMember ? "activeButton" : ""}
          >
            Active Member
          </button>
          <button
            onClick={() => setActiveMember(false)}
            className={!activeMember ? "activeButton" : ""}
          >
            Unrecharged Member
          </button>
        </div>
       <div className="px-4 flex flex-col justify-center items-center">
       <h2>Total Members: {totalMembers}</h2>
       <h2>{filterText}: {filteredTeamMembers.length}</h2>
       </div>
        <div className="actMemb gap-4 p-4">
          <button
            onClick={() => setCurrentLevel(1)}
            className={currentLevel === 1 ? "activeButton" : ""}
          >
            B 10% (Level B)
          </button>
          <button
            onClick={() => setCurrentLevel(2)}
            className={currentLevel === 2 ? "activeButton" : ""}
          >
            C 5% (Level C)
          </button>
          <button
            onClick={() => setCurrentLevel(3)}
            className={currentLevel === 3 ? "activeButton" : ""}
          >
            D 2% (Level D)
          </button>
          <button
            onClick={() => setCurrentLevel(4)}
            className={currentLevel === 4 ? "activeButton" : ""}
          >
            E 1% (Level E)
          </button>
          <button
            onClick={() => setCurrentLevel(5)}
            className={currentLevel === 5 ? "activeButton" : ""}
          >
            F 1% (Level F)
          </button>
        </div>
        <div className="teamTable">
          <table>
            <thead>
              <tr className="headTeamTH">
                <th>Phone No</th>
                <th>Registered At</th>
                <th>Packages</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeamMembers.map((member) => (
                <tr className="thteamInvite" key={member._id}>
                  <td>{member.mobileNumber}</td>
                  <td>{moment(member.createdAt).format("YYYY-MM-DD")}</td>
                  <td>
                    {member.active && member.packages.length > 0 ? (
                      member.packages.map((pkg, index) => (
                        <div key={index}>
                          <strong>{pkg.name}</strong> (₹{pkg.price})
                        </div>
                      ))
                    ) : (
                      "No Packages"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MyTeam;
