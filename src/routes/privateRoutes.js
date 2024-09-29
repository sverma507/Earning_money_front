import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner';

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Ensure auth is used correctly
  const navigate = useNavigate(); // In case we need to redirect
  
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`, // Send token in Authorization header
            },
          }
        );
        
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate('/login'); // Redirect to login if not authorized
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setOk(false);
        navigate('/login'); // Redirect on error
      }
    };

    if (auth?.token) {
      authCheck(); // Only check if token exists
    } else {
      setOk(false);
      navigate('/login'); // Redirect if no token found
    }
  }, [auth?.token, navigate]); // Use navigate in dependency array to avoid missing hook errors

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
