import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const ContackManager = () => {
  const navigate = useNavigate();
  return (
    <Layout title={"Contact - Earning Money"}>
  <div className="bg-gradient-to-b w-full md:w-[40%] m-auto from-green-400 to-blue-500 min-h-screen grid place-items-center">
  <div className="w-full text-center flex flex-col items-center">
    <div
      className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-fit p-3 rounded-lg"
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
    <h1 className="text-4xl text-white">
      For any support join our WhatsApp group:-{" "}
    </h1>
    <a href="https://wa.me/447402850739" target="_blank">
      <h3 className="text-3xl mt-7">
        👉 <span className="hover:text-blue-900 hover:underline underline-offset-1">+447402850739</span>
      </h3>
    </a>
  </div>
</div>

    </Layout>
  );
};

export default ContackManager;
