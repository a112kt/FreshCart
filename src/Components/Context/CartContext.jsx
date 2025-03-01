import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export let CartContext = createContext();

export default function CartContextProvider(props){
    const [IsLoading, setisLoading] = useState(false)
    const [totalPrice, settotalPrice] = useState(0)
    const [NumOfItems, setNumOfItems] = useState(0)
    const [CartId, setCartId] = useState(null)

   
    let headers ={
        token : localStorage.getItem("token") 
    }

  async function addProductToCart(productId){
    setisLoading(true)

    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
        productId
    },{
        headers
    }).then((res)=>{
        console.log(res)
        toast.success(res.data.message)
        setCartId(res?.data?.data?._id)
        settotalPrice(res.data.data.totalCartPrice)
        setNumOfItems(res?.data?.numOfCartItems)
        setisLoading(false)
        return res
    }).catch((err)=>{
        console.log(err)
        toast.error(err.data.message)
        setisLoading(false)
        return err
    })

    }

    async function GetCartProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        }).then((res)=>{
            // console.log(res)
             settotalPrice(res.data.data.totalCartPrice)
            setNumOfItems(res?.data?.numOfCartItems)
            setCartId(res?.data?.data?._id)
            return res
        }).catch((err)=>{
            // console.log(err)
            return err;
        })
        
    }

    async function deleteProducts(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((res)=>{
            // console.log(res)
            settotalPrice(res.data.data.totalCartPrice)
            setNumOfItems(res?.data?.numOfCartItems)
            setCartId(res?.data?.data?._id)
            return res
        }).catch((err)=>{
            // console.log(err)
            return err;
        })
        
    }

    async function clearCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{
            headers
        }).then((res)=>{
            console.log(res)
            setNumOfItems(0)
            settotalPrice(0)
            return res
        }).catch((err)=>{
            console.log(err)
            return err;
        })
        
    }
    async function UpdateProducts(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers
        }).then((res)=>{
            // console.log(res)
            settotalPrice(res.data.data.totalCartPrice)
            setNumOfItems(res?.data?.numOfCartItems)
            setCartId(res?.data?.data?._id)
            return res
        }).catch((err)=>{
            // console.log(err)
            return err;
        })
        
    }
    

    async function OnlinePayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5173/`,{
            shippingAddress
        },{
            headers
        }).then((res)=>{
            // console.log(res)
            window.location.href = res.data.session.url
            settotalPrice(res.data.data.totalCartPrice)
            setNumOfItems(res?.data?.numOfCartItems)
            return res
        }).catch((err)=>{
            // console.log(err)
            return err;
        })

    }
    async function CashPayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,{
            shippingAddress
        },{
            headers
        }).then((res)=>{
            // console.log(res)
            settotalPrice(res.data.data.totalCartPrice)
            setNumOfItems(res?.data?.numOfCartItems)
            window.location.href = "http://localhost:5173/"
            return res
        }).catch((err)=>{
            // console.log(err)
            return err;
        })


        
        
    }
    
    

    return <CartContext.Provider value={{clearCart,CashPayment,OnlinePayment,totalPrice,NumOfItems,IsLoading,addProductToCart,GetCartProducts,deleteProducts,UpdateProducts}}>{props.children}</CartContext.Provider>
}