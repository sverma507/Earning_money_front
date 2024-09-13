import React from 'react'
import gift from './3.png'
import gift1 from './4.png'
import gift2 from './5.png'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout'
function Bonus() {
    const navigate=useNavigate()
    return (
        <Layout title={'Bonus - Earning Money'}>
        <div className="sm:w-2/5 mx-auto p-4 h-full  bg-gradient-to-b from-green-400 to-blue-400">
            <div className="flex justify-between ">
            <div className="cursor-pointer" onClick={() => {navigate(-1)}}><img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                /></div>                
            <div className='font-bold'>Bonus</div>
            <div> </div>
            </div>
            <div className="mt-4 flex justify-center">
                <div className=" ">
                    <img src={gift2} />
                </div>
            </div>

            <div className="flex flex-col mt-4  items-center">
                <div className="font-bold m-4">New Member Bonus</div>
                <div className="flex flex-col items-center">
                    <img src={gift1} className="h-60" />
                    <div className="my-4 text-center font-bold text-lg">INR: 120</div>
                    <div><button className="bg-red-900 w-full p-4 rounded-lg text-lg text-white">You Have Received </button></div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Bonus
