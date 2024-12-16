import React from 'react'
import { Link } from 'react-router-dom'

export default function NoProducts() {
  return <>
            <div className='mt-5 p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center gap-5'>
              <h1>Oops ! Your Cart is Empty . please Back To Home to Add Products</h1>
              <Link to={"/"} className='text-white bg-vip px-10 py-2 rounded-md'>Back To Home </Link>
            </div>
  
  
  </>
}
