import React, { useState, useEffect } from 'react';
import Swipper from '../../components/swipper';
import HomeLinks from '../../components/HomeLinks/HomeLinks';
import Tasks from '../../components/Tasks/Tasks';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import ChatbotIcon from '../../components/chatbotIcon';
import Slider from '../../components/Slider/Slider';
import News from '../../components/news/news';
import { useCurrencyAuth } from '../../context/currency';

// Popup Component
function Popup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto">
  <div className="relative bg-black rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto">
    {/* Close button positioned at the top-right corner of the image */}
    <button
      className="absolute top-2 right-2 px-2 bg-orange-500 text-white rounded hover:bg-red-700"
      onClick={onClose}
    >
      &times;
    </button>

    {/* Image */}
    <img
      src={require("./earning_banner2.png")}
      alt="Promo"
      className="w-full h-[299px] rounded-t-lg object-contain"
    />
  </div>
</div>

  );
}

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown
    const popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
      // Show the popup if it hasn't been shown yet
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    // Close the popup and set the flag in localStorage
    setShowPopup(false);
    localStorage.setItem('popupShown', 'true');
  };

  return (
    <Layout title={"Home - Earning Money"}>
      <div className="sm:w-2/5 mx-auto bg-gradient-to-b from-purple-300 to-indigo-400  text-white pb-16">
      <div className='h-16 w-16  fixed z-50  top-28'>
        <div>
      <a href='#' target='_blank'>
        <img src='/images/tele.png' />
        </a>
        </div>
        <div>
        <a href='#' target='_blank'>
        <img className='mt-2' src='/images/whatsaap.png'/>
        </a> 
        </div>
      </div>
        <Swipper />
        <HomeLinks />
        <Slider />
        <Tasks />
        {/* <News /> */}
        <ChatbotIcon />
      </div>

      {/* Show the popup if it's not closed */}
      {showPopup && <Popup onClose={handleClosePopup} />}
    </Layout>
  );
}

export default Home;
