import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "./context/AuthContext"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Profile from "./pages/Profile"
import CourseDetails from "./pages/CourseDetails"
import MyCourses from "./pages/MyCourses"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"

function App(){

const { user } = useAuth()

const [darkMode,setDarkMode] = useState(false)

useEffect(()=>{
if(darkMode){
document.body.classList.add("dark-mode")
}else{
document.body.classList.remove("dark-mode")
}
},[darkMode])

return(

<div>

<Routes>

{/* ✅ LOGIN PAGE */}
<Route 
  path="/" 
  element={!user ? <Login /> : <Navigate to="/dashboard" />} 
/>

<Route 
  path="/login" 
  element={!user ? <Login /> : <Navigate to="/dashboard" />} 
/>

{/* 🔐 PROTECTED ROUTES */}
<Route 
  path="/*" 
  element={
    user ? (
      <div style={{display:"flex"}}>

        <Sidebar/>

        <div style={{flex:1, marginLeft:"220px"}}>

          <Topbar toggleTheme={()=>setDarkMode(!darkMode)}/>

          <div style={{padding:"20px"}}>

            <Routes>

              <Route path="/" element={<Navigate to="/dashboard"/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/courses" element={<Courses darkMode={darkMode}/>}/>
              <Route path="/profile" element={<Profile darkMode={darkMode}/>}/>
              <Route path="/my-courses" element={<MyCourses darkMode={darkMode}/>}/>
              <Route path="/course/:id" element={<CourseDetails darkMode={darkMode}/>}/>

            </Routes>

          </div>

        </div>

      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>

{/* ❌ REMOVE SIGNUP COMPLETELY */}

</Routes>

</div>

)

}

export default App