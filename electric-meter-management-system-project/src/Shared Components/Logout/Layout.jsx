// import React from 'react'
import { useNavigate } from "react-router-dom"
const Layout = ({children}) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
    <>
    <button onClick={handleLogout} >Logout</button>    
    <div>
        {children}
    </div>
    </>
)
}

export default Layout