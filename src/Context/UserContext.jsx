import React, { createContext, useState } from 'react'
export const user = createContext()
export default function UserContext({children}) {
   const [token,setToken] = useState(localStorage.getItem("token"))
  function LogOut() {
    setToken(null)
    localStorage.removeItem("token")
  }


  return <user.Provider value={{token,setToken,LogOut}}>
   {children}
  </user.Provider>
}
