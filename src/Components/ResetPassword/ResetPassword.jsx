import React, { useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false)
  const [Error, setError] = useState(null)
 let navigate = useNavigate()




 let mySchema = Yup.object({
   
    email:Yup.string().required("Email is Required").email(),
    newPassword: Yup.string().required("Password is Required").matches(/^[A-Z][a-z@?0-9]{3,8}$/,"password not valid"),
   
  })

  let formik = useFormik({
    initialValues :{
    email:"",
    newPassword:"",
    },
    validationSchema:mySchema,
    onSubmit:Reset,
      

    
  })





  async function Reset(values){
    setisLoading(true)
   return await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values).then((data)=>{
    // console.log(data);
    navigate("/login")
   }).catch((err)=>{
    // console.log(err);
    setError(err.response.data.message)
    setisLoading(false)
    
  
   })
  }




  return (
    
  <>
     <div className="p-10">
     {Error?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {Error}
</div>:null}
      <h1 className='text-3xl text-green-500 font-bold pb-2'>Reset Password </h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6 mt-10">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="john.doe@company.com"  />
        { formik.touched.email &&formik.errors.email?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>:""}
    </div> 
      
    <div className="mb-6">
        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NewPassword</label>
        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} name='newPassword' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••"/>
        {formik.touched.newPassword && formik.errors.newPassword?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.newPassword}
</div>:""}
    </div> 

    {isLoading? <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i className="fa fa-spin fa-spinner"></i></button>: <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>}
    
</form>



    </div>
  </>
  )
}
