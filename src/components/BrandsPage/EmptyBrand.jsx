import React from 'react'
import { Link } from 'react-router-dom'
export default function EmptyBrand() {
  return <>
  <div className='mt-5 p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center gap-5'>
  <h1>Oops ! No Products In this Brand Choose Another Brand </h1>
  <Link to={"/Brands"} className='text-white bg-vip px-10 py-2 rounded-md transition-colors hover:bg-green-700 duration-500'>Back To Brands </Link>
</div>

</>
}
