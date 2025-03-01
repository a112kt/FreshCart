import React, { useContext, useEffect } from 'react'
import logo from './../../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContex'
import { CartContext } from '../Context/CartContext'

export default function Navbar() {
  let {Token , setToken} = useContext(TokenContext)
  let {NumOfItems,GetCartProducts} = useContext(CartContext)
  let navigate = useNavigate()

  function getCart(){
    GetCartProducts()

  }
  useEffect(() => {
    getCart()
  
    
  }, [])
  

  function Logout(){
    setToken(null);
    localStorage.removeItem("token")
    navigate("./login")
  }
  return (
    <>
<nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-400">
  <div className="ms-10 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Fresh cart Logo" />
    </NavLink>
    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-400 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-400">
     {Token?<> <li>
          <NavLink to="" className="block py-2 ms-2 md:p-0 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
        </li>
        <li>
          <NavLink to="cart" className="block relative py-2 px-3 md:p-0 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Cart
          <span className="absolute top-0 bg-green-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:text-green-300">{NumOfItems}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="products" className="block py-2 px-3 md:p-0 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
        </li>
        <li>
          <NavLink to="categories" className="block py-2 px-3 md:p-0 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
        </li>
        <li>
          <NavLink to="barands" className="block py-2 px-3 md:p-0 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Barands</NavLink>
        </li></>:"" }
     
      {Token?"":<><li>
          <NavLink to="register" className="block py-2 px-3   md:p-0 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        <li>
          <NavLink to="login" className="block py-2 px-3 md:p-0 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-400 dark:hover:text-white md:dark:hover:bg-transparent">LogIn</NavLink>
        </li></>}
     
        <li className='flex'>
          <div className='flex'>
          <i className="block py-2 ms-3 px-1 fa-brands fa-facebook"></i>
          <i className="block py-2 px-1 fa-brands fa-instagram"></i>
          <i className="block py-2 px-1 fa-brands fa-twitter"></i>
          <i className="block py-2 px-1 fa-brands fa-linkedin"></i>
          <i className=" block py-2 px-1 fa-solid fa-phone"></i>
          </div>
          {Token?<a href="" onClick={()=>Logout()} className='logOut block py-1 ms-3'>LogOut</a>:""}
        </li>
      </ul>
    </div>
  </div>
</nav>




    



    </>
  )
}
