import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlogs = ()=>{
    const blogs = [
        {
            title: "My Amazing blog title 1",
            author:"Jorda",
            likes: 142,
            comments:44
        },
        {
            title: "My Amazing blog title 2",
            author:"John",
            likes: 153,
            comments:25
        },
        {
            title: "My Amazing blog title 4",
            author:"Mahrad",
            likes: 50,
            comments:14
        },

    ]

    return (
        <div className="bg-white p-5 w-[23rem] mt-4 border ml-4 rounded">
            <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
            <ul>
                {blogs.map((blog , index)=>(
                    <li key={index} className="mb-4">
                       <div className="flex justify-between items-center"> 
                           <span className="font-bold mb-2">{blog.title}</span>
                       </div>
                       <span className="text-gray-600">Published By {blog.author}</span>
                       <div className="flex items-center mt-5">
                          <MessageCircle size={16} className="text-blue-500"/>
                          <span className="text-gray-700 mr-5 ml-1">{blog.likes}</span>
                          <ThumbsUp size={16} className="text-green-500"/>
                          <span className="text-gray-700 mr-2 ml-1">{blog.comments}</span>
                       </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PopularBlogs;