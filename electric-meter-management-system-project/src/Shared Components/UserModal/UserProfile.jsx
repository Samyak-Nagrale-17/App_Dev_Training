/* eslint-disable react/prop-types */
import './UserProfile.css'; 

const UserProfile = ({ profileData, onClose }) => {
  return (
    <div className="userProfileCard">
      <div className="userProfileHeader">
        <h3>User Profile</h3>
        <button className="closeButton" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="userProfileBody">
        <p><strong>Username:</strong> {profileData.username}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Address:</strong> {profileData.address}</p>
        <p><strong>Pincode:</strong> {profileData.pincode}</p>
      </div>
    </div>
  );
};

export default UserProfile;
