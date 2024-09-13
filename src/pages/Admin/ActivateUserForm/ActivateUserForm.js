import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAdminAuth } from "../../../context/adminAuth";

function ActivateUserForm() {
  const [referralCode, setRefferalCode] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [products, setProducts] = useState([]);
  const [adminAuth, setAdminAuth] = useAdminAuth();
  const [activationList, setActivationList] = useState([]);
  const [isActivating, setIsActivating] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/products`
      );
      setProducts(result.data.products);
    } catch (err) {
      toast.error("Error fetching products");
    }
  };

  const getActivationList = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/activation-list`
      );
      setActivationList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserIdChange = (event) => {
    setRefferalCode(event.target.value);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    setIsActivating(true); // Set the button to "activating" state

    try {
      const token = adminAuth?.token;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/activate-user`,
        {
          referralCode: referralCode,
          packageId: selectedPackage,
        }
      );

      toast.success(response.data.message);
      setRefferalCode(""); // Clear the input fields
      setSelectedPackage("");
    } catch (error) {
      toast.error("Error activating user");
    } finally {
      setIsActivating(false); // Reset the button state
    }
  };

  useEffect(() => {
    getData();
    getActivationList();
  }, []);

  return (
    <div className="flex min-h-screen gap-4">
    {/* Sidebar */}
    <Sidebar className="fixed w-60 h-full" />
  
    {/* Main Content */}
    <div className="ml-60 container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-[50px] w-[50%] max-w-[800px] mx-auto">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-6 text-center">
            Activate / Upgrade Package Now
          </h2>
          <form onSubmit={handleActivate}>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                User Id
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Valid User ID"
                value={referralCode}
                onChange={handleUserIdChange}
                disabled={isActivating} // Disable input during activation
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="package"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select Package
              </label>
              <select
                id="package"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={selectedPackage}
                onChange={handlePackageChange}
                disabled={isActivating} // Disable input during activation
              >
                <option value="">Select a package</option>
                {products.map((product) => (
                  <option key={product.id} value={product._id}>
                    {product.name} ({product.price})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`${
                  isActivating ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
                } text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300`}
                disabled={isActivating} // Disable button during activation
              >
                {isActivating ? "Activating..." : "Activate Now"}
              </button>
            </div>
          </form>
        </div>

        {/* Latest Activated User Table */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-[90%] mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">
            Activated User Id
          </h3>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">User Id</th>
                <th className="py-2 px-4 border-b text-left">Mobile Number</th>
                <th className="py-2 px-4 border-b text-left">Activated By</th>
                <th className="py-2 px-4 border-b text-left">Package</th>
                <th className="py-2 px-4 border-b text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {activationList.map((activation, index) => (
                <tr key={activation.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{activation.user}</td>
                  <td className="py-2 px-4 border-b">{activation.mobileNumber}</td>
                  <td className="py-2 px-4 border-b">{activation.activateBy}</td>
                  <td className="py-2 px-4 border-b">{activation.package}</td>
                  <td className="py-2 px-4 border-b"> 
                    {new Date(activation.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActivateUserForm;
