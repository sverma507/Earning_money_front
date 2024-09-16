import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import weakly1 from './gif 1.gif';
import weakly2 from './gif 2.gif';
import weakly3 from './gif 3.gif';
import { useAuth } from '../../context/auth';
import { useCurrencyAuth } from '../../context/currency';

function Tasks() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useCurrencyAuth();
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();


  const fetchProducts = async () => {
    try {
      const token=auth.token;      
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/home-products`);
      setProducts(result.data.products.slice(0, 2)); 
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='pb-16 text-white '>
     
      <div>
      </div>
      <div className="grid  grid-cols-2 gap-4 mx-auto m-4 p-4 mt-20">
        {products.map((item, idx) => (
          <div
            key={item._id}
            data-aos="fade-up-right"
            className=" hover:border-black cursor-pointer hover:shadow-2xl bg-gradient-to-tr hover:bg-gradient-to-b from-purple-400 to-blue-400 rounded-lg duration-500 hover:text-blue-700 shadow-red-000 flex flex-col justify-center items-center border"
          >
            <img
              className='h-[100px] w-[40%] rounded-lg sm:w-[50%] mt-4 sm:h-[150px]'
              src={item.img1}
              alt={item.name}
            />
            <div className='mt-3 font-bold ml-3'>{item.name}</div>
            <div className='flex gap-4'>
              {
                currency == 'INR' ? (
                  <p className='mt-1 font-bold ml-3'>Price: <span className='mt-1 font-normal'>Rs. {item.price}</span></p>
                ) : (
                  <p className='mt-1 font-bold ml-3'>Price: <span className='mt-1 font-normal'>${(item.price)/90}</span></p>
                )
              }
              
            </div>
            <div className="bg-yellow-500 text-white p-1 w-[60%] m-auto mt-4 mb-5 cursor-pointer rounded-lg shadow-md flex flex-col text-center" onClick={() => navigate('/users/user/single-product', { state: item })}>
                <div className='font-bold text-xl hover:shadow-lg'>Buy now</div>
            </div>
            <></>
            {/* <p className='mt-1 font-bold'>Total revenue: <span className='mt-1 font-normal'>Rs. {item.income * item.cycle}</span></p>
            <div className='text-sm mt-2'>{item.description.substring(0, 37)}...</div> */}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/users/user/all-products')}
          className="hover:bg-gradient-to-b duration-200 bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white text-white py-2 px-4 rounded-full "
        >
          View More
        </button>
      </div>
      <div  className='mt-4 p-4' >
        <div className='font-bold text-black'>NEWS Section:</div>
        <img src={require('./news.jpg')}/>
      </div>
    </div>
  );
}

export default Tasks;