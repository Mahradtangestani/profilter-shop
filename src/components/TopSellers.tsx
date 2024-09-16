import { useEffect, useState } from "react";

interface Author{
    name:string
    isFollowing:boolean
    image:string
}

const TopSellers = ()=>{
    
    const [authors , setAuthors] = useState<Author[]>([])

    const fetchData = async()=>{
        try {
            const res = await fetch("https://randomuser.me/api/?results=5")
            const data = await res.json()

            const authorData : Author[] = data.results.map((user:any)=>({
                name: `${user.name.first} ${user.name.last}`,
                isFollowing: false,
                image: user.picture.medium

            })) 

            setAuthors(authorData)
        } catch (error) {
            console.error(`Error Fetching Authors${error}`);
            
        }
    }
     
    
    useEffect(()=>{
        fetchData()
    } ,[])


    const handleFollowChange = (index:number)=>{
       setAuthors(preAuthor => preAuthor.map((author , i) => i === index ? {...author , isFollowing: !author.isFollowing} : author))
    }

    return (
        <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
            <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

            <ul>
                {authors.map((author , index)=>(
                    <li key={index} className="mb-4 flex justify-between items-center">
                        <section className="flex justify-center items-center">
                            <img src={author.image} alt={author.name} className="w-[25%] h-[25%] justify-center rounded-full"/>
                            <span className="ml-4">{author.name}</span>
                            
                        </section>
                        <button onClick={()=>handleFollowChange(index)} className={`py-1 px-3 rounded ${author.isFollowing ? "bg-green-700 text-white" : "bg-red-600 text-white"}`}>{author.isFollowing ? "Unfollow" : "Follow"}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopSellers;