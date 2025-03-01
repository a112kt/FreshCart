import React from 'react'
import style from './Home.module.css'
import FeatchProducts from '../FeatchProducts/FeatchProducts'
import CateSlider from '../CateSlider/CateSlider'
import img1 from './.././../assets/menu-banner.jpg'
import img2 from './.././../assets/product-img-11.jpg'
import img3 from './.././../assets/banner-deal.jpg'



export default function Home() {
  return (
    <>
    <div className="mt-4">
      <div className="w-full flex flex-wrap  justify-center items-center  ">
      <img src={img1} className='w-[400px] h-[300px]' alt="menu-banner" />
    <div className="flex flex-col">
    <img src={img2} className=' w-[200px] h-[150px]' alt="product-img" />
    <img src={img3} className='w-[200px] h-[150px]' alt="banner-deal" />
    </div>
      </div>
    </div>

 <CateSlider/>
    <FeatchProducts/>
    </>
    
  )
}
