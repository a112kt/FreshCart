import React, { useContext, useEffect, useState } from 'react'
import style from './Payment.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../Context/CartContext'
import { Navigate, useLocation } from 'react-router-dom'

export default function Payment() {

   const [isLoading, setisLoading] = useState(false)

   let {OnlinePayment,CashPayment} =useContext(CartContext)
  let {state} = useLocation()
  console.log(state.type)

  const [PayType, setPayType] = useState(null)

  useEffect(() => {
    setPayType(state.type)
},[])
  

  async function pay(values){
   if(PayType=="Online Payment"){
      await OnlinePayment(values)
   }else{
    await CashPayment(values)
    
   }
   }


  

  let formik = useFormik({
    initialValues :{
      details: "",
      phone: "",
      city: ""
    },
    onSubmit:(values)=>{
      console.log(values)
      pay(values)
    }
  })
return (
   <>
    <div className="w-1/2 mx-auto mb-4">
    <h1 className='text-green-500  font-serif text-2xl mt-4 font-bold font-serif'>{PayType}</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6 mt-4">
        <label htmlFor="details" className="block mb-2 text-sm font-medium text-green-700 dark:text-white">Details</label>
        <input onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} name='details' type="string" id="details" className="bg-gray-50 border border-gray-300 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="cairo street name"  />
        { formik.touched.details &&formik.errors.details?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.details}
</div>:""}
    </div> 
    <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-green-700 dark:text-white">Phone number</label>
            <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" />
            {formik.touched.phone && formik.errors.phone?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.phone}
</div>:""}
        </div> 

        <div className="mb-6">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-green-700 dark:text-white">City</label>
            <input onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} name='city' type="text" id="city" className="bg-gray-50 border border-gray-300 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Tanta" />
            {formik.touched.city && formik.errors.city?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.city}
</div>:""}
        </div> 
      
      
  
 
    {isLoading? <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i className="fa fa-spin fa-spinner"></i></button>: <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Contain</button>}
   
</form>
    </div>
    
    </>
  )
}
