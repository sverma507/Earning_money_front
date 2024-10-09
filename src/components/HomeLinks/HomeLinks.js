import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeLinks.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCurrencyAuth } from '../../context/currency';
import toast, { Toaster } from 'react-hot-toast';

function HomeLinks() {
  const navigate = useNavigate();
  const [currencyAuth, setCurrencyAuth] = useCurrencyAuth(); // Use the hook to get currency and setCurrency

  const data = [
    {
      img: require("./recharge.png"),
      name: "Recharge",
      link: '/users/user/recharge'
    },
    {
      img: require("./wallet.png"),
      name: "Wallet",
      link: '/users/user'
    },
    {
      img: require("./withdrawl.png"),
      name: "Withdrawl",
      link: '/users/user/withdrawl'
    },
    {
      img: require("./receive revenue.png"),
      name: "Receive Profit",
      link: '/users/user/my-products'
    },
    {
      img: require("./my-team.png"),
      name: "My Team",
      link: '/users/user/my-team'
    },
    {
      img: require("./invite.png"),
      name: "Invite",
      link: '/users/user/invitation'
    },
    {
      img: require("./total-earning.png"),
      name: "Total Earning",
      link: 'users/user/total-earnings'
    },
    {
      img: require("./reedem-bonus.png"),
      name: "Reedem Bonus",
      link: '/users/user/bonus'
    },
  ];

  const handleCurrency = (event) => {
    setCurrencyAuth(event.target.value); // Set the new currency value
    localStorage.setItem('currency', event.target.value); // Update local storage
  };

  const handleClick = (item) => {
    if (item.name === "Withdrawl") {
      toast.error("Technical issue. We are updating something for your better experience!");
    } else {
      navigate(item.link);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="homelinkbg  shadow-lg shadow-blue-500   p-4">
      <Toaster/>
      <div className='flex gap-2'>
        <div data-aos="flip-right" className='flex gap-1 w-[100%] text-black text-sm text-center mt-3 bg-slate-300 p-2 rounded'>
          📢 
          <div style={{ width: 'calc(100% - 24px)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <p style={{
              fontWeight: 'bold',
              display: 'inline-block',
              paddingLeft: '10%',
              animation: 'marquee 6s linear infinite',
              whiteSpace: 'nowrap'
            }}>
              Welcome to Earning Money, we are launching in Bengaluru, Karnataka, Hyderabad, Telangana, Chennai, Tamil Nadu, Kerala (state), Mumbai, Maharashtra, Delhi, Uttar Pradesh, Dehradun, Uttarakhand... 
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4'>
        {data.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => handleClick(item)} 
            className="flex cursor-pointer flex-col m-1 mt-6  items-center"
          >
            <img data-aos="fade-up-right"
              className="rounded-full bg-green-200 border-2  h-16" 
              src={item.img} 
              style={{ boxShadow: "0px 0px 3px 3px rgb(237, 234, 234)" }}
            />
            <p className="text-sm font-semibold text-center mt-2">{item.name}</p>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(20%);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default HomeLinks;
