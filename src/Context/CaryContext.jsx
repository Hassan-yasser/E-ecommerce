import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { user } from './UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'
export let UserCart = createContext()


export default function CartContext(props) {
    let {token} = useContext(user)
    const [State,setState] = useState(null)
    const [id,setId] = useState(localStorage.getItem("userID"))
    const [NumOfItems,setNumOfItems] = useState(localStorage.getItem("numOfCartItems"))


    // add to cart fn --------------- 
    async function AddToCart(id) {
        let toastId = toast.loading("Adding Product To Cart ...")
       const options = {
        url:"https://ecommerce.routemisr.com/api/v1/cart",
        method:"POST",
        headers: {
            token
        },
        data : {
            productId : id
        },
       }
       try {
        let {data} = await axios.request(options)
        // console.log(data?.data?.cartOwner);
        setId(data?.data?.cartOwner)
        localStorage.setItem("userID",data?.data?.cartOwner)
        setNumOfItems(data.numOfCartItems)
        localStorage.setItem("numOfCartItems",data.numOfCartItems)
        toast.success("Product Has Been Added")
    } catch (error) {
        // console.log(error);  
        toast.error("oops! Can't Add Product to Cart")
    } finally {
        toast.dismiss(toastId)
    }
}
   // Get cart fn --------------- 
async function GetUserCart() {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
            token
        }
    }
    try {
        let {data} = await axios.request(options)
        // console.log(data?.data?.cartOwner);
        setId(data?.data?.cartOwner)
        localStorage.setItem("userID",data?.data?.cartOwner)
        setNumOfItems(data.numOfCartItems)
        localStorage.setItem("numOfCartItems",data.numOfCartItems)
        setState(data)
    } catch (error) {
        console.log(error);
    }
}
   // delete product fn --------------- 
async function DeleteProduct(id) {
    let toastId = toast.loading("Removing Product ...")
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
            token
        },
    }
    try {
        let {data} = await axios.request(options)
        // console.log(data);
        GetUserCart()
        localStorage.setItem("userID",data?.data?.cartOwner)
        setId(data?.data?.cartOwner)
        toast.success("Product Has Been Removed Successfully")
    } catch (error) {
        GetUserCart()
        // console.log(error);
        toast.error("Product Has Not Been Removed Successfully")
    } finally {
        toast.dismiss(toastId)
    }
}
   // edit amount fn --------------- 
async function EditCountProduct({id , count}) {
    let toastId = toast.loading("Updeting Amount Product ...")
    
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
            token
        },
        data: {
            count
        }
    }
    try {
        let {data} = await axios.request(options)
        GetUserCart()
        localStorage.setItem("userID",data?.data?.cartOwner)
        setId(data?.data?.cartOwner)
        // console.log(data);
        toast.success("Product Amount Has been updated Successfully")
    } catch (error) {
        GetUserCart()
        // console.log(error);
        toast.error("Product Amount Has Not been Updated Successfully")
    } finally {
        toast.dismiss(toastId)
    }
}
   // delete cart fn --------------- 
   async function DeleteCart() {
    let toastId = toast.loading("Removing Cart ...")
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
            token
        },

    }
    try {
        let {data} = await axios.request(options)
        GetUserCart()
        console.log(data);
        
        toast.success("Cart Has Been Deleted Successfully")
    } catch (error) {
        GetUserCart()
        console.log(error);
        toast.error("Cart Has not Been Deleted Successfully")
    } finally {
        toast.dismiss(toastId)
    }
   }
   
    return <UserCart.Provider value={{id,AddToCart,State,GetUserCart,DeleteProduct,EditCountProduct,DeleteCart,NumOfItems}}>
           {props.children}
    </UserCart.Provider>
}
