import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function UseAllBrands() {
    function GetAllBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let response = useQuery({
        queryKey:['GetAllBrands'],
        queryFn:GetAllBrands,
        refetchOnMount:true,
        refetchOnWindowFocus:true,
        refetchInterval:6 * 60 * 60 * 1000,
        refetchIntervalInBackground:true,
        staleTime : 1 * 60 * 60 * 1000,
    })
  return response
}
