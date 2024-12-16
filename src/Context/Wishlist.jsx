import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { user } from './UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserCart } from './CaryContext'
export let WishlistContext = createContext()
export default function Wishlist({children}) {
    let {token} = useContext(user)
    let {State} = useContext(UserCart)
    // console.log(State.cartId);
    let [Best,setBest] = useState(null)
    
  async function AddProductToFev(id) {
    const toastId = toast.loading("Adding Product To Wishlist...")
    try {
        const option = {
            url : "https://ecommerce.routemisr.com/api/v1/wishlist",
            method:"POST",
            headers : {
                token
            },
            data : {
                productId : id
            }
        }
        let {data} = await axios.request(option)
        console.log(data?.data);
        setBest(data?.data)
        localStorage.setItem("Best",data?.data)
        toast.success("Product Has Been Added")
        
       } catch (error) {
        toast.error("Product Has Been Not Added")
       } finally {
        toast.dismiss(toastId)
       }
  }
  async function DeleteProductFromFev(id) {
    const toastId = toast.loading("Removing Product From Wishlist...")
    try {
        const option = {
            url : `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            method:"DELETE",
            headers : {
                token
            },
        }
        let {data} = await axios.request(option)
        console.log(data?.data);
        localStorage.setItem("Best",data?.data)
        setBest(data?.data)
        toast.success("Product Has Been Removd")
        
       } catch (error) {
        toast.error("Product Has Been Not Removed")
       } finally {
        toast.dismiss(toastId)
       }
  }



  return <WishlistContext.Provider value={{AddProductToFev,Best,DeleteProductFromFev}}>
     {children}
  </WishlistContext.Provider>
}
