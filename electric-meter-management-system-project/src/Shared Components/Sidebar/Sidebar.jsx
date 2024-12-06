import './Sidebar.css'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const Sidebar = () => {

    const navigate = useNavigate()

    // mark button as selected
    const [isMarked, setIsMarked] = useState(0)

    const handleUserDataButtonClick = () => {
        setIsMarked(!isMarked)
        navigate('/admindashboard/userdata')
    }

    const handleMeterDataButtonClick = () => {
        setIsMarked(!isMarked)
        navigate('/admindashboard/meterdata')
    }

    const handleFileUploadButtonClick = () => {
        navigate('/admindashboard/fileupload')
    }

    return (
        <div className="container">
            <button className = {'sidebar-button '} onClick={handleUserDataButtonClick} >
            {/* <button className = {'sidebar-button ' + (isMarked) ?'button-active' : ''} onClick={handleUserDataButtonClick} > */}
            <i className="fa-solid fa-server"></i>
                User Data
            </button>
            
            <button className= {'sidebar-button '} onClick={handleMeterDataButtonClick} >
            <i className="fa-solid fa-gauge-simple"></i>    
                Meter Data
            </button>

            <button className= {'sidebar-button '} onClick={handleFileUploadButtonClick} >
            <i className="fa-solid fa-file-arrow-up"></i>  
                File Upload
            </button>

        </div>
    )
}

export default Sidebar



// import './Sidebar.css'
// import { useNavigate } from 'react-router'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Sidebar = () => {

//     // const navigate = useNavigate()

//     // // mark button as selected
//     // const [isMarked, setIsMarked] = useState(0)

//     // const handleUserDataButtonClick = () => {
//     //     setIsMarked(!isMarked)
//     //     navigate('/admindashboard/userdata')
//     // }

//     // const handleMeterDataButtonClick = () => {
//     //     setIsMarked(!isMarked)
//     //     navigate('/admindashboard/meterdata')
//     // }

//     // const handleFileUploadButtonClick = () => {

//     // }

//     return (
//         <div className="container">
//             {/* <button className = {'sidebar-button '} onClick={handleUserDataButtonClick} >
//             <i className="fa-solid fa-server"></i>
//                 User Data
//             </button>
            
//             <button className= {'sidebar-button '} onClick={handleMeterDataButtonClick} >
//             <i className="fa-solid fa-gauge-simple"></i>    
//                 Meter Data
//             </button>

//             <button className= {'sidebar-button '} onClick={handleFileUploadButtonClick} >
//             <i className="fa-solid fa-file-arrow-up"></i>  
//                 File Upload
//             </button> */}
//             <li>
//                 <Link className='sidebar-button' to='user-data'>
//                 <i className="fa-solid fa-server"></i>
//                     User Data
//                 </Link>
//             </li>

//             <li>
//                 <Link className='sidebar-button' to='meter-data'>
//                     <i className="fa-solid fa-gauge-simple"></i>    
//                     Meter Data
//                 </Link>
//             </li>

//         </div>
//     )
// }

// export default Sidebar



