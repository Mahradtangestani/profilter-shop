import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


interface Product{
    id:string,
    title:string
    description:string
    price:number
    rating:number
    images:string[]
}


const ProductPage = ()=>{

    const {id} = useParams<{id:string}>()
    const navigate = useNavigate()

    const [product , setProdut] = useState<Product | null>(null)

    useEffect(()=>{
      
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then(res=>{
                setProdut(res.data)
            }).catch(error=>{
                console.error(`Error Fetching Product Data${error}`)
            })
        }

    } , [id])


    if(!product){
        return <div className="loader"></div>
    }

    return (
        <div className="p-5 w-[60%]">
            <button onClick={()=>navigate(-1)} className="mb-5 px-4 py-2 bg-gray-700 hover:bg-white hover:text-black hover:right-2 hover:ring-2 hover:ring-offset-gray-800 text-white rounded">
                Back
            </button>
            <img src={product.images[0]} alt={product.title} className="w-[50%] h-auto mb-5"/>
            <h1 className="text-2xl text-gray-800 mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
            <div className="flex">
               <p className="font-medium">Price: ${product.price}</p>
               <p className="ml-10 font-medium"> Rating: {product.rating}</p>
            </div>
        </div>
    )
}

export default ProductPage;