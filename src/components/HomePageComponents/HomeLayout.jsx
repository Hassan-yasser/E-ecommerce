import React from 'react'
import ProductsHome from './Products'

import {Helmet} from "react-helmet";
import MainSlider from './HomeSliders';
export default function HomeLayout() {
  return <>
  <Helmet>
    <title>Fresh Home</title>
  </Helmet>
  <MainSlider/>
  <ProductsHome/>
  
  </>
}
