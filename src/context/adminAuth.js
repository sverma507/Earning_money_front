import axios from "axios";
import { useState, useContext,useEffect, createContext } from "react";

const AuthContext = createContext()

const AdminAuthProvider = ({children}) => {
    const [AdminAuth, setAdminAuth] = useState({
        user: null,
        token: "",
    });

    axios.defaults.headers.common['Authorization'] = AdminAuth?.token

    useEffect(() => {

       const data = localStorage.getItem("AdminAuth");
       if(data){
        const parsData = JSON.parse(data);
        // console.log("parsedata=>",parsData);
        
        setAdminAuth({
            user:parsData.user,
            token:parsData.token
        })
        
       }
       
       // eslint-disable-next-line
    },[])
    // console.log(auth);

    return (
        <AuthContext.Provider value={[AdminAuth,setAdminAuth]}>{children}</AuthContext.Provider>
    )
}

const useAdminAuth = () => useContext(AuthContext);

export { useAdminAuth, AdminAuthProvider}