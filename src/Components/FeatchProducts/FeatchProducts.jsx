import { data } from 'autoprefixer'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'





export default function FeatchProducts() {
    // const [Products, setProducts] = useState([])
    // const [Name, setName] = useState("")
    // const [Loading, setLoading] = useState(true)
    // async function getProducts(){
    //     return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
    //         console.log(data.data.data)
    //         setProducts(data.data.data)
    //         setLoading(false)
    //     }).then((data) => {
    //         let formattedName =data.data.title.split(" ").slice(0, 3).join(" ");
    //         setName(formattedName);}).catch((err)=>{
    //         console.log(err)
    //         setLoading(false)
    //     })

    // }
    // useEffect(()=>{
    //     getProducts()
    // },[])

    const [wishList, setWishList] = useState({});
    const toggleWish = (productId) => {
      setWishList((prevState) => ({
        ...prevState,
        [productId]: !prevState[productId], // قلب الحالة بين true و false
      }));
    }
 

    let {addProductToCart,IsLoading} = useContext(CartContext);
    

 
    async function addToCart(id) {

      let response = await addProductToCart(id)
      // console.log(response)
      
    }



 
    function getFeatchProducts(){    //use react Query to fetch data
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

    let {data, error,isError,isLoading} = useQuery({
        queryKey : ["featch data"],
        queryFn:getFeatchProducts
    })
    // console.log(data?.data?.data,"x")
    // console.log(error)

  return (
   <>
   
   <div className="">
    {isLoading?<Loader/>:
     <div className="flex flex-wrap p-10 ">
     {data?.data?.data.map((Product)=><div key={Product.id} className="product relative p-4 w-1/2 md:w-1/4  lg:w-1/6">
     <div className="absolute right-4"> <i
              onClick={() =>{toggleWish(Product.id)}}
              className={`heart fa-solid fa-heart text-3xl cursor-pointer ${
                wishList[Product.id] ? "text-red-700" : "text-green-700"
              }`}
            ></i></div>
       <Link to={`/productDetails/${Product.id}/${Product.category?.name}`}>
       <img className='border rounded-xl' src={Product.imageCover} alt="" />
         <p className='py-2 text-green-500 text-xl font-bold font-serif mt-2'>{Product.category.name}</p>
         <p>{Product.title.split(" ").splice(0,2).join(" ")}</p>
        <div className="flex py-1 justify-between font-serif">
        <p>Price : {Product.price}</p>
         <p className=''>⭐ {Product.ratingsAverage}</p>
        </div>
       </Link>

        <div className="mt-4"><button onClick={()=>addToCart(Product.id)} className="btn block mx-auto text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled={IsLoading}>Add To Cart</button>
        </div>
         </div>)}
     </div>
    }
   
   </div>
   
   </>
  )
}


