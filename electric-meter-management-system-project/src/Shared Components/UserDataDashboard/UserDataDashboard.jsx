/* eslint-disable no-unused-vars */
// import  { useState } from 'react'
// import './UserDataDashboard.css'
// import Tablerow from '../TablerowDashboard/Tablerow'
// import UserModal from '../UserModal/UserModal'

// const UserDataDashboard = () => {
//   const [users, setUsers] = useState(
//     [
//     { id: 1, username: 'john doe', useremail: 'john.doe@gmail.com', userphone: '9898989898', city: 'Mumbai', consumption: '200' },
//     { id: 2, username: 'sally jones', useremail: 'sally.jones@gmail.com', userphone: '8787879898', city: 'Pune', consumption: '300' },
//     { id: 3, username: 'alice smith', useremail: 'alice.smith@gmail.com', userphone: '9876543210', city: 'Delhi', consumption: '150' },
//     { id: 4, username: 'bob brown', useremail: 'bob.brown@gmail.com', userphone: '8765432109', city: 'Bangalore', consumption: '250' },
//     { id: 5, username: 'charlie green', useremail: 'charlie.green@gmail.com', userphone: '7654321098', city: 'Chennai', consumption: '350' },
//   ]
// )

//   const [searchQuery, setSearchQuery] = useState('')
//   const [isModalOpen, setModalOpen] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)
//   const [isEditMode, setEditMode] = useState(false)

//   const openModal = (user = null) => {
//     setCurrentUser(user)
//     setEditMode(!!user)
//     setModalOpen(true)
//   }

//   const closeModal = () => {
//     setModalOpen(false)
//     setCurrentUser(null)
//   }

//   const handleUserSubmit = (userData) => {
//     if (isEditMode) {
//       setUsers(users.map((user) => (user.id === currentUser.id ? { ...userData, id: currentUser.id } : user)))
//     } else {
//       setUsers([...users, { ...userData, id: Date.now() }])
//     }
//   }

//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id))
//   }

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value)
//   }

//   const filteredUsers = users.filter((user) =>
//     user.useremail.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const fetchAllUserData = async () => {

//     console.log('fetchAllUserData start ...')

//     const userToken = localStorage.getItem("token")
//     // console.log('userToken from local storage' , userToken)

//     const url = 'https://a399-103-22-140-65.ngrok-free.app/api/auth/admin-getAllUsers'

//     let response = await fetch(url, {
//       method: "GET",
//       headers:{
//         "Content-Type" : "application/json",
//         // Authorization : `Bearer ${userToken}` 
//         Authorization : 
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6MSwiaWF0IjoxNzMzMzIxNjUxfQ.8_RCPaSxVHzHtlghBGXS8kGFq2io5azN1ItofCrykdI'       
//       }, 
//     })

//     const data = await response.json()
//     // const data = JSON.parse(response)
//     console.log(data)

//     // if(data.ok){
//       // console.log(data)
//       // setUsers(data.users)
//     // }

//     console.log('fetchAllUserData end ...')

//   }

//   // fetchAllUserData()

//   return (  
//     <div className="userdata-container">
//       <div className="title-bar">
//         <div className='title-heading-wrapper'>
//           <span className="title">User Data</span>
//           <span className='title-description'>A list of all users with their details</span>
//         </div>
//           <div className="search-container">
//             <button className="add-user-button" onClick={() => openModal()}>Add User</button>
//             <div className="search-bar-wrapper">
//               <input 
//               className='search-bar'
//               type="text" 
//               placeholder='Search by email ...'
//               value={searchQuery}
//               onChange={handleSearchChange}/>

//               <div className='search-icon-wrapper'>
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </div>

//             </div>
//           </div>
//       </div>

//       <div className="table-wrapper">
//         <table className="userdata-table">
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email ID</th>
//               <th>Phone</th>
//               <th>City</th>
//               <th>Consumption</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody> 
//             {filteredUsers.map((user) => (
//               <Tablerow
//                 key={user.id}
//                 user={user}
//                 onEdit={() => openModal(user)}
//                 onDelete={() => handleDelete(user.id)}
//               />
//             ))}

//             {/* {users.map((user) => (
//               <Tablerow
//                 key={user.id}
//                 user={user}
//                 onEdit={() => openModal(user)}
//                 onDelete={() => handleDelete(user.id)}
//               />
//             ))} */}
//           </tbody>
//         </table>
//       </div>

//       {/* modal */}
//       <UserModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={handleUserSubmit}
//         initialData={currentUser}
//         isEditMode={isEditMode}
//       />
//     </div>
//   )
// }

// export default UserDataDashboard



import { useEffect, useState } from 'react';
import './UserDataDashboard.css';
import Tablerow from '../TablerowDashboard/Tablerow';
import UserModal from '../UserModal/UserModal';
import axios from 'axios';

const UserDataDashboard = () => {
  const [users, setUsers] = useState([
    // { id: 1, username: 'john doe', useremail: 'john.doe@gmail.com', city: 'Pune', pincode: '411058' },
    
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10; 

  const openModal = (user = null) => {
    setCurrentUser(user);     
    setEditMode(!!user);      
    setModalOpen(true);       
  };

  const closeModal = () => {
    setModalOpen(false);       
    setCurrentUser(null);      
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);         
  };

  const filteredUsers = users.filter((user) => {
    // user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const query = searchQuery.toLowerCase()

    return ( 
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.address.toLowerCase().includes(query) ||
      user.pincode.toLowerCase().includes(query) 
    ) 
  }
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };


  const handleUserSubmit = (userData) => {
    // edit user data
    if (isEditMode) {
      setUsers(users.map((user) => (user.id === currentUser.id ? { ...userData, id: currentUser.id } : user)))
    } 
      // add new user
    else { 
      setUsers([...users, { ...userData, id: Date.now() }])
    }
  }

  // 
  const handleDelete = (user_id) => {
    // setUsers(users.filter((user) => user.id !== id))
    console.log('inside handleDelete: ', user_id)
    deleteUser(user_id);  
  }


  // api call to get all users data
  // const fetchAllUserData =  async () => {
  //   console.log('fetchAllUserData start ...')
  //   const userToken = localStorage.getItem("token")

  //   console.log('userToken from local storage' , userToken)

  //   const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/admin-getAllUsers'

  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers:{
  //       "Content-Type" : "application/json",
  //       "Authorization" : `Bearer ${userToken}`,  
  //       "ngrok-skip-browser-warning":"6024"    
  //     }, 
  //   })

  //   // console.log(response)
  //   const data = await response.json()
  //   console.log(data.users)
  //   setUsers(data.users)

  //   console.log('fetchAllUserData end ...')
  // }


const fetchAllUserData = async () => {
  console.log('fetchAllUserData start ...');
  const userToken = localStorage.getItem('token');

  console.log('userToken from local storage:', userToken);

  const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/admin-getAllUsers';

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        'ngrok-skip-browser-warning': '6024',
      },
    });

    console.log(response.data.users);
    setUsers(response.data.users);  
    console.log('fetchAllUserData end ...');
  } catch (error) {
    console.error('Error:', error.message || error.response);
  }
}



  useEffect(() => {
    fetchAllUserData()
  },[]) 

  // fetchAllUserData()



  // delete user api
  const deleteUser = async (user_id) => {

    // console.log('deleteUser called with userId:', user_id);  
  
    // if (!user_id) {
    //   console.error('user id is missing!');
    //   return;
    // }
    const userToken = localStorage.getItem('token'); 
    const url = `https://a612-103-22-140-65.ngrok-free.app/api/auth/admin-deleteUser/${user_id}`;
  
    try {
      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });
  
      // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      // console.log('User deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting user:', error.message || error.response);
    }
  };
  
  
  return (
    <div className="userdata-container">
      <div className="title-bar">
        <div className='title-heading-wrapper'>
          <span className="title">User Data</span>
          <span className='title-description'>A list of all users with their details</span>
        </div>

        <div className="search-container">
          <button className="add-user-button" onClick={() => openModal()}>Add User</button>
          <div className="search-bar-wrapper">
            <input 
              className='search-bar'
              type="text" 
              placeholder='Search by email ...'
              value={searchQuery}
              onChange={handleSearchChange}
            /> 
            <div className='search-icon-wrapper'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>


        {/* change this */}
        {/* <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="search-icon-wrapper">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div> */}
      </div>

      <div className="userdata-table-wrapper">
        <table className="userdata-table">
          <thead>
            <tr> 
              <th>Username</th>
              <th>Email ID</th>
              {/* <th>Phone</th> */}
              {/* <th>City</th> */}
              <th>Address</th>
              <th>Pincode</th>
              {/* <th>Consumption</th> */}
              <th>Action</th>
            </tr> 
          </thead>
          <tbody>  
            {currentUsers.map((user) => (
              <Tablerow
                // key={user.id}
                key={user.user_id}
                user={user}
                onEdit={() => openModal(user)}     
                onDelete={() => handleDelete(user.user_id)}  
              />
            ))}
          </tbody>
        </table>
      </div>


      <div className="pagination-controls">
        {/* <button onClick={prevPage} disabled={currentPage === 1}>Previous</button> */}
        <button onClick={prevPage}>Previous</button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* <button onClick={nextPage} disabled={currentPage >= totalPages}>Next</button> */}
        <button onClick={nextPage}>Next</button>
      </div>

      {/*modal*/}
      <UserModal  
        isOpen={isModalOpen}
        onClose={closeModal}   
        onSubmit={handleUserSubmit}     
        initialData={currentUser}       
        isEditMode={isEditMode}         
      />
    </div>
  );
};

export default UserDataDashboard;

