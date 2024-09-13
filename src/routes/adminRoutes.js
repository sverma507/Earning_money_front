import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner';
import { useAdminAuth } from '../context/adminAuth';

 const AdminRoute = () => {

   const [ok, setOk] = useState(false);
   const [adminAuth, setAdminAuth] = useAdminAuth();
   const navigate=useNavigate()

   useEffect(() => {
    // console.log("API URL: ", process.env.REACT_APP_API);
    const authCheck = async() => {
        // console.log("calleadmin [private routed]");
        // console.log("admin auth=>",auth);
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/admin-auth`);
        if(res.data.ok){
            setOk(true);
        } else {
            navigate('/admin/login');
            setOk(false);
        }
    }
    if(adminAuth?.token) authCheck();
}, [adminAuth?.token, navigate]);


  return ok ? <Outlet/> : <Spinner path={'admin/login'}/>
}

export default AdminRoute