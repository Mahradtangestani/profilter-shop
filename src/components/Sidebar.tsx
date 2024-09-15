import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Products{
    category: string
}

interface FetchResponse{
    products: Products[]
}


const Sidebar = ()=>{
    
    const {searchQuery,
        setSearchQuery,
        selectCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword} = useFilter()

    const [categories , setCategories] = useState<string []>([])
    const [keywords] = useState<string []>([
        "Apple",
        "Watch",
        "Fation",
        "Trend",
        "Shoes",
        "Shirt",
    ])
     
    const fetchCategories = async ()=>{
        try {
            const response = await fetch("https://dummyjson.com/products")
            const data:FetchResponse = await response.json()
            const uniqueCategories = Array.from(new Set(data.products.map(product=>product.category)))
            
            setCategories(uniqueCategories)
            
        } catch (error) {
            console.log("Error Fetching Products" , error);
            
        }
    }

    useEffect(()=>{
        fetchCategories()
    } , [])
    
    // Min
    const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined)
    }
     
    // Max
    const handleMaxPriceChage = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined)
    }

    // Radio Button
    const handleRadioChangeCategory = (category:string)=>{
       setSelectedCategory(category)
    }
    
    // keyword
    
    const handleKeywordClick = (keyword:string)=>{
        setKeyword(keyword)
    }
    
    // reset filters
    
    const handleResetFilters = ()=>{
        setSearchQuery("")
        setSelectedCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword("")
    }

    return (
        <div className="w-64 p-5 h-screen">
            <h1 className="text-2xl font-bold mb-10 mt-4">Mahrad Store</h1>

            <section>
                <input type="text" className="border-2 rounded px-2 sm:mb-0" placeholder="Search Products..." 
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}/>
                <div className="flex justify-center items-center">
                    <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="Min" 
                    value={minPrice ?? ""}
                    onChange={handleMinPriceChange}/>
                    <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={handleMaxPriceChage}/>
                </div>
                <div className="mb-5">
                   <h2 className="text-xl font-semibold mb-3">Categories</h2>
                </div>
                <section>
                {categories.map((category , index)=>(
                    <label key={index} className="block mb-2">
                       <input type="radio" name="category" value={category}
                       onChange={()=>handleRadioChangeCategory(category)}
                       checked={selectCategory === category}
                       className="mr-2 w-[16px] h-[16px]"/>
                       {category.toUpperCase()}
                    </label>
                ))}
                </section>

                <div className="mb-2 mt-4">
                   <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                   <div>
                     {keywords.map((keyword,index)=>(
                        <button key={index} onClick={()=>handleKeywordClick(keyword)} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200">
                          {keyword.toUpperCase()}
                        </button>
                     ))}
                   </div>
                </div>

                <button onClick={handleResetFilters} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
                    Reset Filters
                </button>
            </section>
        </div>
    )
}

export default Sidebar;