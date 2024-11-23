import React from 'react'
const Footer = () => {
  return (
    <div className='bg-slate-800 h-[6vh] min-h-16 flex flex-col justify-center items-center text-white fixed bottom-0 w-full rounded-t-lg'>

      <div className='flex justify-center items-center'>
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        <p className='mx-1 text-xs'> [MongoDB]</p>
      </div>
      <h1>Created by Zeeshan-x01</h1>

    </div>
  )
}

export default Footer
