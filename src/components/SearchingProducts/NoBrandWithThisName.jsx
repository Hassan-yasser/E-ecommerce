import React from 'react'
import { Link } from 'react-router-dom'
import slide1 from '../../assets/imgs/error.svg'
export default function NoBrandWithThisName() {
  return <>
  <div className='bg-white rounded-lg shadow-xl container   max-h-screen py-20'>
        <h1 className='text-gray-600 font-bold text-3xl text-center '>No Product Found with this Name .</h1>
        <img src={slide1} className='mx-auto' alt="" />
        <Link to={"/"} className='block text-center text-sm underline font-semibold mt-5'>Back To Home</Link>
  </div>
  
  </>
}
