import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function UseAllCategory() {
    function GetAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let response = useQuery({
           queryKey:['GetAllCategories'],
           queryFn:GetAllCategories,
           refetchOnMount:true,
           refetchOnWindowFocus:true,
           refetchInterval:6 * 60 * 60 * 1000,
           refetchIntervalInBackground:true,
           staleTime : 1 * 60 * 60 * 1000,
    })
  return response
}
