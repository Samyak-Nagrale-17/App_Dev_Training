import { useEffect, useState } from 'react';
import './UserDataDashboard.css';
import Tablerow from '../TablerowDashboard/Tablerow';
import UserModal from '../UserModal/UserModal';
import AddMeterModal from '../UserModal/AddMeterModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/apiConfig';

const UserDataDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMeterModalOpen, setMeterModalOpen] = useState(false); 
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

  const openMeterModal = (user) => {
    setCurrentUser(user); 
    setMeterModalOpen(true);  
  };

  const closeMeterModal = () => {
    setMeterModalOpen(false); 
    setCurrentUser(null);  
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);         
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.address.toLowerCase().includes(query) ||
      user.pincode.toLowerCase().includes(query)
    );
  });

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

  const handleDelete = (user_id) => {
    deleteUser(user_id);  
  };

  const fetchAllUserData = async () => {
    const userToken = localStorage.getItem('token');
    const url = `${BASE_URL}/api/auth/admin-getAllUsers`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
        withCredentials:true,
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error:', error.message || error.response);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const deleteUser = async (user_id) => {
    const userToken = localStorage.getItem('token');
    const url = `${BASE_URL}/api/auth/admin-deleteUser/${user_id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });

      toast.success('User deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
      });

      fetchAllUserData();
    } catch (error) {
      toast.error('Failed to delete user. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
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
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchChange}
            /> 
          </div> 
        </div>
      </div>

      <div className="table-wrapper">
        <table className="userdata-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email ID</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>  
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <Tablerow
                key={user.user_id}
                user={user}
                onEdit={() => openModal(user)}     
                onDelete={() => handleDelete(user.user_id)}  
                onClickMeter={() => openMeterModal(user)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={closeModal}   
        initialData={currentUser}       
        isEditMode={isEditMode}         
      /> 

      <AddMeterModal
      isOpen={isMeterModalOpen}
      onClose={closeMeterModal}
      user={currentUser}
      /> 
      

    </div>
  );
};

export default UserDataDashboard;
