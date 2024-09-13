import React from 'react';
import {useNavigate} from 'react-router-dom'

const UserInfoModal = ({ newUserInfo, setShowModal }) => {
  const navigate=useNavigate()
  return (
    <div className="z-30 md:p-24 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-200 rounded-lg p-6 shadow-lg md:w-2/5  mx-auto relative">
        <h2 className="text-xl font-bold mb-4">Registration Successful</h2>
        <div className="mb-2">
          <strong>Mobile No:</strong> <span>{newUserInfo?.mobileNumber}</span>
        </div>
        <div className="mb-2">
          <strong>Email id:</strong> <span>{newUserInfo?.email}</span>
        </div>
        <div className="mb-4">
          <strong>Password:</strong> <span>{newUserInfo?.password}</span>
        </div>
        <button 
          onClick={() =>{ setShowModal(false);navigate("/login");}} 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
          OK
        </button>
      </div>
    </div>
  );
};

export default UserInfoModal;
