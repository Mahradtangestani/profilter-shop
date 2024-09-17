import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContext";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";

export default function App(){
  return (
    <Router>
       <div className="flex gap-0 h-screen">
          <Sidebar/>
          <div className="rounded w-full flex justify-center flex-wrap">
          <Routes>
               <Route path="/" element={<MainContent/>}/>
               <Route path="/product/:id" element={<ProductPage/>}/>
          </Routes>
          <div>
             <TopSellers/>
             <PopularBlogs/>
          </div>
       </div>
       </div>
       
    </Router>
  )
}
