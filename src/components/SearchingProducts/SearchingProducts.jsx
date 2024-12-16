import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UseAllProducts from '../../CustomeHooks/UseAllProducts'
import NoBrandWithThisName from './NoBrandWithThisName'
import { UserCart } from '../../Context/CaryContext'
import { WishlistContext } from '../../Context/Wishlist'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function SearchingProducts() {
     let {Products} =  useParams()
     let {data,isLoading}  = UseAllProducts()
         let {AddToCart} = useContext(UserCart)
         let {DeleteProductFromFev,AddProductToFev} = useContext(WishlistContext)
    let Searching = data?.data?.data?.filter((products)=>products.title.toLowerCase().includes(Products.toLowerCase())  )
    console.log(Searching);
    
    if (isLoading) return <LoadingScreen/>
     else return <>
    
     {Searching?.length  >= 1 ? <>
         <div className='grid grid-cols-12 gap-5 mt-10'>
     {
       Searching?.map((product)=>{
         const isFavorite = localStorage.getItem("Best")?.includes(product.id)
         return <div key={product.id} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 relative shadow-md rounded-sm overflow-hidden'>
           <div className='relative rounded-md overflow-hidden group'>
             <img src={product.imageCover} className='w-full object-cover' alt="" />
             <div className='flex justify-center items-center gap-5 absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-0 group-hover:opacity-95 transition-all duration-500 cursor-pointer'>
                 <Link to={`/ProductsDetails/${product.id}/${product.category.name}`}><span className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-eye text-white"></i></span></Link>
                 <span onClick={()=>{AddToCart(product.id)}} className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i class="fa-solid fa-cart-arrow-down text-white"></i></span>
                 {isFavorite? <>
                     <span onClick={()=>{
                       DeleteProductFromFev(product.id)
                     }} className='flex justify-center items-center w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-500'><i className="fa-solid fa-bookmark text-white"></i></span>
                   
                   </> : <>
                   
                     <span onClick={()=>{
                       AddProductToFev(product.id)
                     }} className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-bookmark text-white"></i></span>
                   </>}
             </div>
           </div>
             <div className='px-3 flex flex-col '>
             <div className=''><span className='font-semibold text-sm text-vip '>{product.category.name}</span></div>
             <div className=''><span className='font-semibold text-lg line-clamp-1'>{product.title}</span></div>
             </div>
             <div className='flex flex-wrap justify-between px-3'>
             <p className=' font-bold'><span className='text-vip font-semibold'>{product.price}</span> EGP</p>
             <p className='font-semibold'><i className='fa-solid fa-star text-yellow-400'></i> {product.ratingsAverage}</p>
             </div>
             <span className='block ps-3 text-sm mb-3 text-gray-600 '>{new Date(product.createdAt).toDateString()}</span>
 
         </div>
       })
     }
 
    </div>
 
     </> : <NoBrandWithThisName/>}
     
     </>
    




}
