import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContext";

export default function App(){
  return (
    <Router>
       <div className="flex h-screen">
          <Sidebar/>
          <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
               <Route path="/" element={<MainContent/>}/>
          </Routes>
       </div>
       </div>
       
    </Router>
  )
}
