import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import UseAllProducts from '../../CustomeHooks/UseAllProducts'
import axios from 'axios'
import EmptyCategory from './EmptyCategory'
import { UserCart } from '../../Context/CaryContext'
import { WishlistContext } from '../../Context/Wishlist'
import { Helmet } from 'react-helmet'

export default function BestCategory() {
  let {AddToCart} = useContext(UserCart)
         let {CategoryName} = useParams()
         let {data} = UseAllProducts()
           let {AddProductToFev,DeleteProductFromFev} = useContext(WishlistContext)
         let CategoryProducts = data?.data?.data?.filter((product)=>product.category.name == CategoryName)
         
         
  return <>
  <Helmet>
    <title>Fresh {CategoryName}</title>
  </Helmet>
  {CategoryProducts?.length > 0 ?  <>
  <section className='grid grid-cols-12 gap-5'>
     <div className='col-span-12 text-center flex justify-center'><h1 className='text-2xl font-bold pb-1 w-fit relative before:absolute before:bottom-0 before:w-1/2 before:left-1/2 before:-translate-x-1/2 before:h-[4px] before:bg-vip rounded-md'>{CategoryName} Products</h1></div>
       {CategoryProducts.map((product)=>{
                  const isFavorite = localStorage.getItem("Best")?.includes(product?.id)
        return <div className='sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 relative shadow-md rounded-sm overflow-hidden'>
        <div className='relative rounded-md overflow-hidden group'>
          <img src={product.imageCover} className='w-full object-cover' alt="" />
          <div className='flex justify-center items-center gap-5 absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-0 group-hover:opacity-95 transition-all duration-500 cursor-pointer'>
              <Link to={`/ProductsDetails/${product.id}/${product.category.name}`}><span className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-eye text-white"></i></span></Link>
              <span onClick={()=>{AddToCart(product.id)}} className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-cart-arrow-down text-white"></i></span>
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
       })}
  </section>
  
  
  </> : <EmptyCategory/>}
  
  </>
}
