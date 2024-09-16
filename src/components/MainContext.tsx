import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = ()=>{
    
    const {searchQuery, selectCategory, maxPrice, minPrice, keyword} = useFilter()

    const [products , setProducts] = useState<any[]>([])
    const [filter , setFilter] = useState("all")
    const [currentPage , setCurrentPage] = useState(1)
    const [dropDownOpen , setDropDownOpen] = useState(false)
    const ItemsPerPage = 12;

    useEffect(()=>{
       let url = `https://dummyjson.com/products?limit=${ItemsPerPage}&skip=${(currentPage - 1) * ItemsPerPage}`;
       
       if(keyword){
          url = `https://dummyjson.com/products/search?q=${keyword}`
       }

       axios.get(url).then(response=>{
        setProducts(response.data.products)
        
       }).catch((error)=>{
        console.error("Error Fetching Data" , error)
       })

    } , [currentPage , keyword])


    const getFilteredProducts = ()=>{
        let filteredProducts = products;

        if(selectCategory){
            filteredProducts = filteredProducts.filter(products => products.category === selectCategory)
        }

        if(minPrice !== undefined){
            filteredProducts = filteredProducts.filter(product=>product.price >= minPrice)
        }
        if(maxPrice !== undefined){
            filteredProducts = filteredProducts.filter(product=>product.price <= maxPrice)
        }
        if(searchQuery){
            filteredProducts = filteredProducts.filter(product=>product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        
        switch (filter) {
            case "Expensive":
                return filteredProducts.sort((a , b)=> b.price - a.price)
                
            case "Cheap":
                return filteredProducts.sort((a , b)=> a.price - b.price)
                
            case "Popular":
                return filteredProducts.sort((a , b)=> b.rating - a.rating)
                
        
            default:
                return filteredProducts;
        }
        
    }

    const filteredProducts = getFilteredProducts()
    
    

    // Pagination *****
    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / ItemsPerPage)

    const handlePageChange = (page:number)=>{
         if(page > 0 && page <= totalPages){
            setCurrentPage(page)
         }
    }

    const getPaginationButton = ()=>{
        const buttons:number[] = []

        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, currentPage + 2 )

        if(currentPage - 2 < 1){
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
        }
        if(currentPage + 2 > totalPages){
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage))
        }

        for(let page = startPage; page <= endPage; page++){
            buttons.push(page)
        }

        return buttons;
    }
    

    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                     <div className="relative mb-5 mt-5">
                        <button onClick={()=>setDropDownOpen(!dropDownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                            <Tally3 className="mr-2"/>
                            {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1) }
                        </button>

                        {dropDownOpen && (
                            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={()=>setFilter("Cheap")} className="px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Cheap
                                </button>
                                <button onClick={()=>setFilter("Expensive")} className="px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Expensive
                                </button>
                                <button onClick={()=>setFilter("Popular")} className="px-4 py-2 w-full text-left hover:bg-gray-200">
                                    Popular
                                </button>
                            </div>
                        )}
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
                    {filteredProducts.map(product=>(
                        <BookCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.thumbnail}
                        price={product.price}
                        />
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    <button onClick={()=>handlePageChange(currentPage - 1)} className="border px-0 py-2 mx-2 rounded-full" disabled={currentPage === 1}>
                        Previous
                    </button>
                    
                    <div className="flex flex-wrap justify-center">
                       {getPaginationButton().map(page=>(
                           <button key={page} onClick={()=>handlePageChange(page)} className={`py-2 px-4 border mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}>
                              {page}
                           </button>
                       ))}
                    </div>

                    <button onClick={()=>handlePageChange(currentPage + 1)} className="border px-0 py-2 mx-2 rounded-full" disabled={currentPage === totalPages}
                        >Next
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MainContent;