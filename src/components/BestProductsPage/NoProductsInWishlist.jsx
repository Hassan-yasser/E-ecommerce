import React from 'react'

export default function NoProductsInWishlist() {
  return            <div className='mt-5 p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center gap-5'>
  <h1>Oops ! Your WishList is Empty . please Back To Home to Add Products to WishList</h1>
  <Link to={"/"} className='text-white bg-vip px-10 py-2 rounded-md'>Back To Home </Link>
</div>
}
