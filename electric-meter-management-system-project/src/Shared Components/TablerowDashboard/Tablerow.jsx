
/* eslint-disable react/prop-types */
import './Tablerow.css';

const Tablerow = ({ user, onEdit, onDelete, onClickMeter }) => {
  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.username}</td> 
      <td>{user.email}</td> 
      <td>{user.address}</td>
      <td>{user.pincode}</td>
      <td className="actionRow">
        

        <button className="tableButton" id='addMeterButton' onClick={onClickMeter}>
          <i className="fa-regular fa-square-plus"></i>
        </button>

        <button className="tableButton" id='editTableButton' onClick={onEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button className="tableButton" id='deleteTableButton' onClick={onDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};

export default Tablerow;
