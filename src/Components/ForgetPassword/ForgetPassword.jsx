import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
   
   const [Err, setErr] = useState(null)
   const [msg, setmsg] = useState(null)
   const [isLoading, setisLoading] = useState(false)

   const [FormState, setFormState] = useState(true)

  let navigate = useNavigate()




  async function ForgetPassForm(values){
    setisLoading(true)
   return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values).then((data)=>{
    console.log(data)
    setisLoading(false)
    setmsg(data?.data?.message)
    if(data?.data?.statusMsg == "success"){
      setFormState(false)
    }
    console.log(data?.data?.statusMsg)
   }).catch((err)=>{
    console.log(err);
    setErr(err?.response?.data?.message)
    setisLoading(false)
   
    
  
   })
  }



  async function VriefyCode(values){
    setisLoading(true)
   return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values).then((data)=>{
    // console.log(data)
    setisLoading(false)
    setmsg(data?.data?.message)
    if(data.data.status=="Success"){
       navigate("/resetPassword")
    }
    console.log(data?.data?.statusMsg)
   }).catch((err)=>{
    // console.log(err);
    setErr(err?.response?.data?.message)
    setisLoading(false)
   
    
  
   })
  }

  let mySchema = Yup.object({
     
      email:Yup.string().required("Email is Required").email(),
     
    })

    let mySchema2 = Yup.object({
     
      resetCode:Yup.string().required("ResetCode is Required").matches(/^[0-9]{5,6}$/,"Enter a Valid Code"),
     
    })


    let formik = useFormik({
        initialValues :{
        email:"",
        },
        validationSchema:mySchema,
        onSubmit:(values)=>{
        ForgetPassForm(values)
  
        }
      })


      let formik2 = useFormik({
        initialValues :{
        resetCode:"",
        },
        validationSchema:mySchema2,
        onSubmit:(values)=>{
        console.log(values);
        VriefyCode(values)
        
  
        }
      })











  return (
    <>
      <div className="p-10">
     
    


   {FormState?<>
    <h1 className='text-3xl text-green-500 font-bold mb-5'>ForgetPassword </h1>
    {Err?<div className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {Err}
</div>:""}
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6 mt-10">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="john.doe@company.com"  />
        { formik.touched.email &&formik.errors.email?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>:""}
    </div> 
      

    {isLoading? <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i className="fa fa-spin fa-spinner"></i></button>: <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send</button>}
    
</form>
</>
:<>
 <h1 className='text-3xl text-green-500 font-bold mb-5'>Enter Code</h1>
 {Err?<div className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {Err}
</div>:""}



<form onSubmit={formik2.handleSubmit}>
      <div className="mb-6 mt-10">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Code</label>
        <input  onBlur={formik2.handleBlur} value={formik2.values.resetCode}  onChange={formik2.handleChange}  name='resetCode' type="resetCode" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="836267"  />
        { formik2.touched.email &&formik2.errors.email?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik2.errors.email}
</div>:""}
    </div> 
      
    {isLoading? <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i className="fa fa-spin fa-spinner"></i></button>: <button type="submit" disabled={!(formik2.isValid && formik2.dirty)} className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Vriefy</button>}
 
    
</form>
</>}


















    </div>
    </>
  )
}
