import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { toast, ToastContainer } from "react-toastify";

function Privacy_Policy() {
  const navigate = useNavigate();

  return (
    <Layout title={"Privacy Policy - Earning Money"}>
      <ToastContainer />
      <div className="container sm:w-[40%] m-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-b from-purple-600 to-blue-500 text-white shadow-lg rounded-md mb-5">
          {/* Back Button */}
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={"/images/back.png"}
              alt="Back"
              className="w-8 h-8"
            />
          </div>

          {/* Title */}
          <div className="text-xl font-semibold">
            Privacy & Policy
          </div>
          <div className="w-8"></div>
        </div>

        {/* Privacy Policy Content */}
        <div className="p-6 bg-white rounded-lg shadow-md sm:w-full">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Privacy Policy Overview
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We value your privacy and are committed to ensuring the security of your data. Please review our policies carefully.
          </p>
          
          <div className="text-gray-800 space-y-4">
            {/* Each policy item with a clear label and description */}
            <div>
              <h3 className="font-bold text-lg">Personal Information</h3>
              <p>We collect your name, email, phone number, and address for account setup and communication purposes.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Financial Information</h3>
              <p>Payment details such as bank account or payment method are collected for transactions and commission payouts.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Referral Information</h3>
              <p>We collect details of users referred by you, including their names and contact information.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Usage Data</h3>
              <p>Information about how you interact with our platform, including IP address, browser type, and device information, is collected for analytics and security purposes.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Third-Party Services</h3>
              <p>We may share data with trusted third-party service providers for payment processing, analytics, and other operational purposes.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-red-600">User Responsibility</h3>
              <p>
                By using this platform, you acknowledge that you are fully responsible for your investment decisions, profits, and losses. The Company is not liable for any financial losses incurred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Privacy_Policy;
