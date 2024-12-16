import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import UseAllProducts from '../../CustomeHooks/UseAllProducts'
import { WishlistContext } from '../../Context/Wishlist'
import { UserCart } from '../../Context/CaryContext'

export default function ProductDetails() {
  let {AddToCart} = useContext(UserCart)
  let {DeleteProductFromFev,AddProductToFev,Best} = useContext(WishlistContext)
  let {id,category} = useParams()
  let [product,setProduct] = useState(null)
  let {data} = UseAllProducts()
  let products = data?.data?.data.filter((product)=>product.category.name == category) 
   console.log(products);
   
  function GetProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((Resolved)=>{
console.log(Resolved?.data?.data);
setProduct(Resolved?.data?.data)

    })
    .catch((Rejected)=>{
      console.log(Rejected);
    })
  }
  useEffect(()=>{
    GetProduct(id)
  },[id])

  
  const isFavorite = localStorage.getItem("Best")?.includes(product?.id)
   

  return <>
    <Helmet>
      <title>Fresh Product</title>
    </Helmet>
  {
      product !== null ? <>
            <div className='grid sm:grid-cols-12 gap-5'>
          <div className='sm:col-span-12 md:col-span-6 xl:col-span-4'><img src={product.imageCover} alt="" /></div>
          <div className='sm:col-span-12 md:col-span-6 xl:col-span-8 overflow-hidden'>
            <h1 className='text-3xl font-bold text-gray-500'>{product.title}</h1>
            <p className='text-black opacity-80 mt-5 '>{product.description}</p>
            <div className='flex justify-between mt-4'>
            {product.priceAfterDiscount ? <>
           
            <span className='flex gap-3 items-center'>
            <span className='font-black'>Discount</span> :
              <i class="fa-solid fa-tags text-green-600 mt-1"></i>
              <span className='font-bold text-green-500'>{product.priceAfterDiscount} EGP</span>
              <del className='text-red-600'>{product.price}</del> 
            </span>
            
            </> :               <p className='font-bold text-gray-600'>{product.price} EGP</p>}

              <p className='text-gray-600'><i className='fa-solid fa-star text-yellow-500'></i> {product.ratingsAverage}</p>
            </div>

            <div className='flex gap-5 mt-5'>
              <button className='addBtn px-5' onClick={()=>{AddToCart(product?.id)}}>Add To Cart</button>
              {isFavorite? <><button onClick={()=>{DeleteProductFromFev(product?.id)}} className='addBtn bg-red-600 hover:bg-red-700 px-10'><i class="fa-solid fa-bookmark"></i></button></> :<><button onClick={()=>{AddProductToFev(product?.id)}} className='addBtn px-10'><i class="fa-solid fa-bookmark"></i></button></>}
              
            </div>
            <div className=' h-[200px] mt-5'>
              <swiper-container className="" loop={true} slides-per-view={2}>
                {product.images.map((slide)=>{
                  return  <swiper-slide className=""><img src={slide} className=' cursor-grab object-cover' alt="" /></swiper-slide>

                })}
              </swiper-container>
              </div>
          </div>
      </div>
      
      </> : <LoadingScreen/>
  }
  {
    <div className='grid grid-cols-12 gap-5 mt-10  pt-10 border-t-2 rounded-md border-t-vip border-0 border-opacity-90'>
     <div className='col-span-12 flex justify-center'> <h1 className='text-gray-800 font-black  text-center text-4xl relative before:absolute before:w-full before:bg-vip before:h-1 before:bottom-0 pb-1 before:rounded-md'>Related Products</h1></div>
{
        products?.map((product)=>{
          const isFavorite = localStorage.getItem("Best")?.includes(product.id)
          return <div key={product.id} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 relative shadow-md rounded-sm overflow-hidden'>
            <div className='relative rounded-md overflow-hidden group'>
              <img src={product.imageCover} className='w-full object-cover' alt="" />
              <div className='flex justify-center items-center gap-5 absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-0 group-hover:opacity-95 transition-all duration-500 cursor-pointer'>
                  <Link to={`/ProductsDetails/${product.id}/${product.category.name}`}><span className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-eye text-white"></i></span></Link>
                  <span className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500' onClick={()=>{AddToCart(product.id)}}><i className="fa-solid fa-cart-arrow-down text-white"></i></span>
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
   
  }

  
   </>
}

