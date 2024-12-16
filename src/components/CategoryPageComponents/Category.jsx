import React from 'react'
import UseAllCategory from '../../CustomeHooks/UseAllCategory'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Category() {
  let {data} =  UseAllCategory()
  let Categoris = data?.data?.data
  
  return <>
    <Helmet>
    <title>Fresh Categories</title>
  </Helmet>
  
   <div className='grid grid-cols-12 gap-5'>

    {Categoris?.map((category)=>{
      return <Link className='relative group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 bg-slate-200 px-2 py-2 rounded-md'>
      <div className='flex justify-center items-center group-hover:opacity-70 transition-all duration-500 rounded-md absolute top-0 left-0 bottom-0 right-0 opacity-0 px-2 py-2 h-full w-full bg-slate-200'>
      </div>
      <Link to={`/category/${category.name}`} className='group-hover:opacity-100 transition-all duration-500 opacity-0 hover:bg-green-700 bg-vip px-5 py-2 text-white rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Show</Link>
      <img src={category.image} className='h-[300px] object-cover' alt="" />
      
      </Link>
    })}


  </div>
  </>
}
