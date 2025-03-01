import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import { CartContext } from '../Context/CartContext'


export default function FeatchProductDetails() {

 

let {addProductToCart,IsLoading} = useContext(CartContext);
async function addToCart(ProductId) {

 await addProductToCart(ProductId)
 
  
}





  const [ProductDetails, setProductDetails] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [error, seterror] = useState(null)
  const [RelatedProducts, setRelatedProducts] = useState([])
  let {id,category} = useParams()
  console.log(category)

 

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots:true,
  };
 

 async function getDetalis(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
    console.log(data?.data)
   setProductDetails(data?.data?.data)
    setisLoading(false)

  }).catch((err)=>{
    console.log(err)
    setisLoading(false)
    seterror(err.message)
  })
  }

  async function getRelatedProducts(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data)=>{
      console.log(data?.data?.data,"related")
      let relatedProducts = data?.data?.data;
      relatedProducts = relatedProducts.filter((product)=>product.category.name==category)
     console.log(relatedProducts)
     setRelatedProducts(relatedProducts)
     setisLoading(false)
  
    }).catch((err)=>{
      console.log(err)
  
    })
    }
let navigate = useNavigate()

 useEffect(() => {
 getDetalis(),
 getRelatedProducts()
 }, [])
 
 useEffect(()=>{
 getDetalis()
 },[id])

  return (
   <>
  <div className="mx-auto ">
    {isLoading?<Loader/>:
     <div className="flex p-4">
     <div className="lg:w-1/4 mt-10">
     <Slider {...settings}>
    {ProductDetails.images.map((src)=><img src={src} className='border rounded-xl'  alt="Cover image" /> 
      )} 
    </Slider>
    {/* <img src={ProductDetails.imageCover}  alt="Cover image" /> */}
     
     </div>
       <div className="lg:w-3/4 mt-10 px-4 mx-6">
       <h1 className='text-green-500 font-serif text-xl font-bold font-serif mt-2'>{ProductDetails?.title}</h1>
       <h3 className='py-2 font-serif'>{ProductDetails.description}</h3>
       <p  className='py-4 font-serif'>{ProductDetails?.category?.name}</p>
       <div className="flex font-serif justify-between items-center">
         <p>{ProductDetails.price}EGP</p>
         <p>⭐ {ProductDetails.ratingsQuantity}</p>
       </div>
       <div className="text-center mt-8">
        <button onClick={()=>addToCart(ProductDetails.id)}  disabled={IsLoading} className="btn p-2 w-full mx-auto text-white bg-green-700 rounded-md">Add To Cart</button>
        </div>
       </div>
      
     </div>
     
    }
   
   

  </div>

  <div className="">
    {isLoading?<Loader/>:
    <>
      <h1 className='text-green-500 p-2 font-serif text-xl font-bold font-serif text-center'>Related Products</h1>
      <div className="flex flex-wrap p-10 ">
     {RelatedProducts.map((Product)=><div key={Product.id} className="product relative p-4 w-1/2 md:w-1/4  lg:w-1/6">
     <div className="absolute right-4"><i className="heart fa-solid fa-heart text-green-700 text-3xl"></i></div>
       <Link to={`/productDetails/${Product.id}/${Product.category?.name}`}>
       <img className='border rounded-xl' src={Product.imageCover} alt="" />
         <p className='py-2 text-green-500 text-xl font-bold font-serif mt-2'>{Product.category.name}</p>
         <p>{Product.title.split(" ").splice(0,2).join(" ")}</p>
        <div className="flex py-1 justify-between font-serif">
        <p>Price : {Product.price}</p>
         <p className=''>⭐ {Product.ratingsAverage}</p>
        </div>
       </Link>

       <div className="mt-4"><button  disabled={IsLoading}  onClick={()=>addToCart(Product.id)} className="btn block mx-auto text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add To Cart</button></div>
       </div>)
        }
     </div>
    </>
   
    }
   
   </div>
   
   </>
  )
}
