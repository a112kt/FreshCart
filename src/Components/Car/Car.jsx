import React, { useContext, useEffect, useState } from 'react'
import style from './Car.module.css'
import { CartContext } from '../Context/CartContext'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Car() {
let {GetCartProducts,deleteProducts,totalPrice,UpdateProducts,clearCart} = useContext(CartContext)
const [IsLoading, setIsLoading] = useState(true)


const [Products, setProducts] = useState([])


useEffect(() => {
 GetProducts()
}, [])



async function GetProducts() {

 let res =  await GetCartProducts()
//  console.log(res?.data?.data?.products,"cart")
 setProducts(res?.data?.data?.products)
 setIsLoading(false)
  
}

async function deleteItem(id) {

  let res =  await deleteProducts(id)
//   console.log(res)
  setProducts(res?.data?.data?.products) 
  setIsLoading(false) 
 }
 
 async function Clear() {

  let res =  await clearCart()
//   console.log(res)
  setProducts([]) 
  setIsLoading(false) 
 }

 async function Update(id,count) {

  let res =  await UpdateProducts(id,count)
//   console.log(res)
  setProducts(res?.data?.data?.products) 
  setIsLoading(false) 
 }


  return (
   <>
   <div className="p-10">


{IsLoading?<Loader/>:<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total  Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {Products.map((item)=>
            <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <img  src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="item image"/>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               {item.product.title}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <button 
                    onClick={()=>{Update(item.product.id,item.count-1)}}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <div>
                      {}
                    </div>
                    {item.count}
                    <button 
                     onClick={()=>{Update(item.product.id,item.count+1)}}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               {item.price}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.count * item.price}
            </td>
            <td className="px-6 py-4">
                <a onClick={()=>deleteItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
            </td>
        </tr>
        )}
        </tbody>
    </table>
    <div className="p-2"><p className='text-3xl w-full text-green-700 font-semibold fa-sailboat'>Total Price : {totalPrice}</p>
        <div className="p-2 mt-5 mb-5">
      <button onClick={()=>{Clear()}} className="btn p-2 mx-auto text-2xl text-white bg-red-700 rounded-md">Clear the Cart</button>
    </div>
        </div>
        <div className="">
        <Link to="/payment" state={{type:"Online Payment"}} className="block w-1/3 lg:w-1/6   text-center ms-auto me-2 border-2 border-green-700 rounded-lg m-4  bg-green-700 px-5 py-2  text-white">Payment Online</Link>
        <Link to="/payment" state={{type:"Cash Payment"}} className="block w-1/3 lg:w-1/6 text-center ms-auto me-2 border-2 border-green-700 rounded-lg m-4  bg-green-700 px-5 py-2 text-white">Payment Cash</Link>
        </div>
      
   
</div>}
   </div>
   
   </>
  )
}
