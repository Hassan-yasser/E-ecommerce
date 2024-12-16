import React, { useContext, useEffect } from 'react'
import { UserCart } from '../../Context/CaryContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import NoProducts from './NoProducts'
import { Helmet } from 'react-helmet'


export default function Cart() {
  let {State,GetUserCart,DeleteProduct,EditCountProduct,DeleteCart} = useContext(UserCart)
  console.log(State);
  
  useEffect(()=>{
    GetUserCart()
  },[])
  return <>
      <Helmet>
  <title>Fresh Cart</title>
  </Helmet>
     <div className='flex items-center gap-10'>
          <p className='relative before:bg-slate-800 before:absolute before:w-[3px] before:h-3/4 before:-right-4 before:top-1/2 before:-translate-y-1/2'><i className="fa-brands fa-opencart text-3xl text-gray-700"></i></p>
          <h1 className='text-gray-800 font-bold text-3xl'>Cart Shipping</h1>
     </div>
     {State === null ? <LoadingScreen/> : <>
     <section>
      {State.numOfCartItems === 0 ? <>
        <NoProducts/>
      </> : <>
      <div className='grid grid-cols-12 gap-5 bg-white mt-6'>
        {State.data.products.map((Product)=><CartItem EditCount={EditCountProduct} DeleteFn={DeleteProduct}  key={Product._id} ProductInfo={Product}/>)}
      </div>
      
      <div className='flex justify-between items-center mt-5'>
        <h6>Total Price : <span className='text-vip font-semibold'>{State.data.totalCartPrice} L.E</span></h6>
        <button onClick={()=>{
          DeleteCart()
        }} className='bg-red-500 hover:bg-red-600 transition-colors duration-500 py-2 rounded-md text-white px-2'>Delete Cart</button>
      </div>
      <Link to={"/checkout"} className='addBtn'>Pay Now</Link>
      
      </>}
     </section>
     
     
     </>}
  
  
  
  </>
}
