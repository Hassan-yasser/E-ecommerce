import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function UseAllProducts() {
    function GetAllProducts () {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let resonse = useQuery({
        queryKey:['GetAllProducts'],
        queryFn: GetAllProducts,
        refetchOnMount:true,
        refetchOnWindowFocus:true,
        refetchInterval:6 * 60 * 60 * 1000,
        refetchIntervalInBackground:true,
        staleTime : 1 * 60 * 60 * 1000,
    })
  return resonse
}
