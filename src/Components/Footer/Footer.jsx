
import React from 'react'

import googlePlay from "./../../assets/googleplay-btn.svg"
import visa from "./../../assets/visa.svg"
import american_express from "./../../assets/american-express.svg"
import appstorebtn from "./../../assets/appstore-btn.svg"
import mastercard from "./../../assets/mastercard.svg"
import paypal from "./../../assets/paypal.svg"

export default function Footer() {
  return (
   <>
   <div className="w-full bottom-0 right-0 left-0 bg-gray-200 ">
 <div className=" p-10 font-serif text-green-700">
 <h2 className='text-3xl font-semibold fa-square-font-awesome'>Get the FreshCart app</h2>
  <p>we will send yiu a link open it on your phone to download the app</p>
 
 </div>

  <form className="flex items-center max-w-lg mx-auto">   
    <label htmlFor="voice-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input type="text" id="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Email" required />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
        </button>
    </div>
    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Share
    </button>
</form>


  <div className="lg:flex justify-between mt-4">
    <div className="flex">
    <p className='ms-4 lg:mt-3 text-green-700 text-2xl font-medium font-serif '>Payment Partners</p>
      <div className="ms-10 gap-2 flex lg:g-1">
      <img src={paypal} alt="paypal" />
      <img src={mastercard} alt="mastercard" />
      <img src={visa } alt="visa " />
      </div>
    </div>

    <div className="flex p-2 ms-4">
    <img src={appstorebtn} alt="appstorebtn" />
    <img src={googlePlay} alt="googlePlay" />
    </div>
   
  </div>
   </div>
   </>
  )
}
