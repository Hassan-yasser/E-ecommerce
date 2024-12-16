import React from 'react'
import { Helmet } from 'react-helmet'

export default function LoadingScreen() {
  return ( <>
  
  
    <Helmet>
    <title>Fresh Loading</title>
  </Helmet>
    <div className='flex justify-center items-center z-50 fixed top-0 left-0 right-0 bottom-0 bg-slate-50'>
      <div class="loader"></div>
    </div>
  </>
  )
}
