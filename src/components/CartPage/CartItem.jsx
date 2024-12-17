import React from 'react'
import { Link } from 'react-router-dom'

export default function CartItem({ProductInfo,DeleteFn,EditCount}) {
    let {count,price,product} = ProductInfo
    let {imageCover,title,id,ratingsAverage} = product
  return <>
    <div  className='col-span-12 md:col-span-11 grid grid-cols-12 overflow-hidden bg-slate-100 hover:bg-slate-200 duration-500 transition-colors rounded-lg'>
         <div className='col-span-12 md:col-span-3'>
            <img src={imageCover} className='w-full object-none md:mx-auto md:w-32 md:h-32 md:rounded-full md:object-cover' alt="" />
         </div>
         <div className='col-span-12 md:col-span-5 flex items-center justify-between px-2 line-clamp-1 mt-3'>
            <h2 className='text-lg font-black'>{title}</h2>
            <h3 className='text-gray-600'>{product.category.name}</h3>
         </div>
         
         <div className='flex  justify-between items-center  md:justify-center col-span-12 md:col-span-2 mt-3'>
            <div className='text-end md:flex-grow '><h4 className='hidden md:inline-block ms-auto'>{count}</h4></div>
            <div className='flex md:flex-col justify-between items-center md:justify-start  flex-grow gap-2 px-2'>
                <div onClick={()=>{EditCount({ id: id , count : count - 1 })}} className='flex justify-center items-center cursor-pointer'><i className="fa-solid fa-circle-minus text-gray-400 text-xl hover:text-gray-600 duration-300 transition-colors"></i></div>
                <h4 className='md:hidden'>{count}</h4>
                <div onClick={()=>{EditCount({ id: id , count : count + 1 })}} className='flex justify-center items-center cursor-pointer'><i className="fa-solid fa-circle-plus text-gray-400 text-xl hover:text-gray-600 duration-300 transition-colors"></i></div>
            </div>
         </div>
         <div className='col-span-12 mt-3 md:col-span-1 flex items-center md:gap-5 justify-between  md:justify-center'>
            <div className='flex gap-1  md:justify-center items-center'>
            <h5 className=" flex-grow">{price}</h5>
            <span className='text-vip'>L.E</span>
            </div>
         </div>
         <button onClick={()=>{
            DeleteFn(id)
        }} className='bg-red-500 hover:bg-red-600 transition-colors duration-500 py-2 mt-3 col-span-12 text-white  rounded-md md:hidden'>Remove</button>
        <Link to={`/ProductsDetails/${id}/${product.category.name}`} className="relative col-span-12 addBtn text-center mt-2 py-2 md:hidden">Show </Link> 
    </div>
    <div className='col-span-1 flex-col hidden md:flex'>
         <button onClick={()=>{
            DeleteFn(id)
         }} className=' flex-grow rounded-md md:flex justify-center items-center bg-slate-100 hover:bg-slate-200 duration-500 transition-colors'>
            <i className='fa-solid fa-xmark text-gray-800'></i>
         </button>
         <Link to={`/ProductsDetails/${id}/${product.category.name}`} className="relative addBtn text-center mt-2 py-2 px-2 "><span className='flex justify-center items-center  bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-eye text-white"></i></span></Link> 

    </div>
  
  
  </>
}
