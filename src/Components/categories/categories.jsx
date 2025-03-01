import React, { useEffect, useState } from 'react'
import CateSlider from '../CateSlider/CateSlider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function categories() {
  const [Cates, setCates] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [error, seterror] = useState(false)

 async function GetCate(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
      console.log(data,"Caaaa")
      setCates(data?.data?.data)
      setisLoading(false)
    }).catch((err)=>{
      setisLoading(false)
      seterror(data?.error)
     
      
    })

  }
  useEffect(() => {
   GetCate()
  
    
  }, [])
  
 

  return (
    <>
       <div className="mx-auto p-4">
    {isLoading?<Loader/>:
    <div className="flex flex-wrap p-10 ">
    {Cates.map((brand)=><div className='w-1/2 p-2  md:w-1/4'>
    <div className="p-2 brand ">
   <Link to="/categoryDetails"> <img src={brand.image} className='h-[300px] w-full ' alt="brandimag" />
     <h2 className='text-center text-2xl text-green-700'>{brand.name}</h2>
</Link>
    </div>
    </div>
   )}
   </div>}
   
      
    </div>
  
    
    </>
    

  )
}

