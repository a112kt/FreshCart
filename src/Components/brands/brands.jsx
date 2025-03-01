import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'

export default function Brands() {

  function GetBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")

  }
 let {data,isLoading} = useQuery({
  queryKey:["getBrands"],
  queryFn:GetBrands,
 })
 console.log(data?.data?.data)
  return (
    <>
    <div className="mx-auto p-4">
      {isLoading?<Loader/>:
       <div className="flex flex-wrap">
       {data?.data?.data.map((brand)=><div className='p-2 w-1/2  md:w-1/4'>
       <div className="brand  p-2">
       <img src={brand.image} alt="brandimag" />
       <h2 className='text-center text-2xl text-green-700'>{brand.name}</h2>
       </div>

       </div>
      )}
      </div>
      }
     
    </div>
   
    </>
  )
}
