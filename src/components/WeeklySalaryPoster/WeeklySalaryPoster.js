import React from 'react'
import wposter from './weekly.png'
import { useNavigate } from 'react-router-dom'
function WeeklySalaryPoster() {
    const navigate=useNavigate()
    return (
        <div className=' sm:w-2/5 mx-auto p-4 bg-orange-300'>
                <div className="cursor-pointer h-[60%]" onClick={() => {navigate(-1)}}><img
                  src={"/images/back.png"}
                  alt="right arrow"
                  className="w-10 h-10"
                /></div>
            <div>
                <img src={wposter} />
            </div>
        </div>
    )
}

export default WeeklySalaryPoster

