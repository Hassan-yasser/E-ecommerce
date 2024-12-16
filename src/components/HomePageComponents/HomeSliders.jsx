import React from 'react'
import slide1 from '../../assets/imgs/slider-image-1.jpeg'
import slide2 from '../../assets/imgs/slider-image-2.jpeg'
import slide3 from '../../assets/imgs/slider-image-3.jpeg'
import static1 from '../../assets/imgs/grocery-banner.png'
import static2 from '../../assets/imgs/grocery-banner-2.jpeg'
import UseAllCategory from '../../CustomeHooks/UseAllCategory'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'


export default function MainSlider() {
  let {data,isLoading} = UseAllCategory()
  //  console.log(data);
   
  
  return <>
   <div className='grid grid-cols-12 h-[400px ] mb-5 '>
        <div className='col-span-12 sm:col-span-12 md:col-span-8 h-[400px]'>
<swiper-container className="overflow-hidden" loop={true}>

  <swiper-slide><img src={slide2} className='h-[400px] w-full object-cover cursor-grab' alt="" /></swiper-slide>
  <swiper-slide><img src={slide3} className='h-[400px] w-full object-cover cursor-grab' alt="" /></swiper-slide>

</swiper-container>
        </div>
        <div className='col-span-12 sm:col-span-12 md:col-span-4 hidden flex-col  sm:flex'>
             <div><img src={static1} className='h-[200px] w-full' alt="" /></div>
             <div><img src={static2} className='h-[200px] w-full' alt="" /></div>
        </div>

   </div>

  <div className='mt-5'>
    <h2 className='mb-3 text-2xl font-bold capitalize'>Shop pupolar Category</h2>
  <swiper-container className="overflow-hidden"   slides-per-view={4} loop={true}>
  { data?.data?.data? <>
  {data?.data?.data?.map((slide)=>{
    return  <swiper-slide key={slide.id}><Link to={`/Category/${slide.name}`}><img  src={slide.image} className='h-[300px] w-full object-cover cursor-grab' alt={slide.name} /></Link></swiper-slide>  
  })}

  </> : 
      <LoadingScreen/>}
  </swiper-container>
  </div>
  </>
}
