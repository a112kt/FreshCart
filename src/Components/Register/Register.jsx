import React, { useState } from 'react'
import style from './Register.module.css'
import {useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

 const [Msg, setMsg] = useState(null)
 const [isLoading, setisLoading] = useState(false)

 let navigate = useNavigate()
let mySchema = Yup.object({
  name: Yup.string().required("Name is Required").min(3,"Can't less than 3").max(10,"can't be more than 10"),
  email:Yup.string().required("Email is Required").email(),
  password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z@?0-9]{3,8}$/,"password not valid"),
  rePassword:Yup.string().required("rePassword is Required").oneOf([Yup.ref("password")],"not match password"),
  phone:Yup.string().required("Phone is Required").matches(/^(02)?01[0125][0-9]{8}$/)
})

async function registerForm(values){
  setisLoading(true)
 return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then((data)=>{
  console.log(data.data.message);
  setisLoading(false)
  navigate("/login")
 }).catch((err)=>{
  console.log(err.response.data.message);
  setMsg(err.response.data.message)
  setisLoading(false)

 })
}
  let formik = useFormik({
    initialValues :{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      registerForm(values)
      console.log(values)
    }
  })


  return (
   <>
    <div className="p-10">
    {Msg?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {Msg}
</div>:null}
      <h1 className='text-3xl text-green-500 font-bold pb-2'>Register Now : </h1>
    <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="John" required />
            {formik.touched.name && formik.errors.name?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.name}
</div>:""}
        </div>
        
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="john.doe@company.com"  />
        { formik.touched.email &&formik.errors.email?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>:""}
    </div> 
      
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} name='password' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••"/>
        {formik.touched.password && formik.errors.password?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.password}
</div>:""}
    </div> 
    <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} name='rePassword' type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••"  />
        {formik.touched.rePassword && formik.errors.rePassword?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.rePassword}
</div>:""}
    </div> 
    <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" />
            {formik.touched.phone && formik.errors.phone?<div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.phone}
</div>:""}
        </div> 
  
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" required />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-green-600 hover:underline dark:text-green-500">terms and conditions</a>.</label>
    </div>
    {isLoading? <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i className="fa fa-spin fa-spinner"></i></button>: <button type="submit" className="block ms-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled={!(formik.isValid && formik.dirty)}>Register</button>}
   
</form>


    </div>

    </>
  )
}

