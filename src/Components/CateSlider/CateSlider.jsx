import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import axios from 'axios';

export default function CateSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots:true,
  };


  function getCate(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")

  }

 let {data} = useQuery({
  queryKey:["CategorySlider"],
  queryFn:getCate
 }) 
//  console.log(data?.data?.data)

 
return (
  <>
  <div className="mx-auto container">
  <div className="p-5">
   <h2 className='text-green-500 p-2 font-serif text-xl font-bold font-serif mt-2'>Shop Popular Category</h2>
   <Slider {...settings}>
   {data?.data?.data.map((cat)=> <div key={cat._id} className='text-center h-20 '>
  <img className='h-[200px] w-[400px]' src={cat.image} alt="category image"/>
  <p className='text-green-500'>{cat.name}</p>
  </div>)}

    </Slider>
   </div>
  </div>
 
  </>
)
}