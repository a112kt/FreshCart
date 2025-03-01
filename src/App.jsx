import { useState } from 'react'
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Car from './Components/Car/Car'
import Categories from './Components/categories/categories'
import Products from './Components/products/products'
import Brands from './Components/brands/brands'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
import NotFound from './Components/NotFound/NotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FeatchProductDetails from './Components/FeatchProductDetails/FeatchProductDetails'
import { Toaster } from 'react-hot-toast';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import Payment from './Components/Payment/Payment';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';





function App() {


  const [count, setCount] = useState(0)
  const queryclient = new QueryClient()
   
  const routes = createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"register",element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"login" ,element:<ProtectedAuth> <Login/></ProtectedAuth>},
      {path:"forgetPassword" ,element:<ProtectedAuth> <ForgetPassword/></ProtectedAuth>},
      {path:"resetPassword" ,element:<ProtectedAuth> <ResetPassword/></ProtectedAuth>},
      {path:"cart",element:<ProtectedRoutes><Car/></ProtectedRoutes>},
      {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"barands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"productDetails/:id/:category",element:<ProtectedRoutes> <FeatchProductDetails/> </ProtectedRoutes>},
      {path:"categoryDetails",element:<ProtectedRoutes><CategoryDetails/> </ProtectedRoutes>},
      {path:"payment",element:<ProtectedRoutes><Payment/> </ProtectedRoutes>},
       {path:"*",element:<NotFound/>}

    ]
  }])

  return (
    <>
   
    <QueryClientProvider client={queryclient}>
    <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
    <Toaster/>
   
   

    
   
    
    </>
  )
}

export default App
