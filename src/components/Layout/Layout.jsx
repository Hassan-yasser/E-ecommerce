import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../static/Navbar'
import Footer from '../static/Footer'
import { user } from '../../Context/UserContext'

export default function Layout() {
  let {token} = useContext(user)
  return <>
  <Nav/>
  <div className='px-6 mt-28 container'>
  <Outlet/>

  </div>
  {token ?    <Footer/> : ""}

  </>
}
