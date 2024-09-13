import React from 'react'
import "./news.css"

const News = () => {
  return (
    <div>
      <h3 style={{textAlign:"center",marginBottom:"20px",fontSize:"25px",fontFamily:"monospace",color:"white"}}>News</h3>
    <div className='newsContainer'>
      
        <div>
            <img src='/images/news1.png' alt='error'/>
            <p>Hype Energy launches in the United Kingdom</p>
        </div>
        <div>
        <img src='/images/news2.png' alt='error'/>
        <p>Buzz: Hype Energy’s answer to the mundane</p>
        </div>
        <div>
        <img src='/images/news3.png' alt='error'/>
        <p>Hype Energy Drinks returns to the paddock to energise the Nissan Formula E Team</p>
        </div>
        <div>
        <img src='/images/news4.png' alt='error'/>
        <p>Stay tuned for more content from Hype and the AFA !</p>
        </div>
    </div>
    </div>
  )
}

export default News