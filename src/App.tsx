import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContext";
import ProductPage from "./components/ProductPage";

export default function App(){
  return (
    <Router>
       <div className="flex h-screen bg-[#ffff]">
          <Sidebar/>
          <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
               <Route path="/" element={<MainContent/>}/>
               <Route path="/product/:id" element={<ProductPage/>}/>
          </Routes>
       </div>
       </div>
       
    </Router>
  )
}
