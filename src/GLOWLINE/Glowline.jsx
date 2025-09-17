import React from 'react'
import glowline from '../images/glowline.jpg'
const Glowline = () => {
  return (
    <div className=''>
      <div className="flex  flex-col items-center justify-center mt-4 mb-2">
        {/* <div style={{width:"50%" , height:"5px", backgroundColor:"#E50914", borderRadius:"100%" , boxShadow:"0px 0px 50px 20px red , 0px 0px 0px 0px white "}}></div> */}
        <img src={glowline} className='h-40 w-3/4'  />
     </div>
    </div>
  )
}

export default Glowline
