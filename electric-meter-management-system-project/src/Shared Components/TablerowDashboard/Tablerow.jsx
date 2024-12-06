/* eslint-disable react/prop-types */
// import './Tablerow.css'
// const Tablerow = ({username, useremail, userphone, city, consumption}) => {
//   return(
//     <tr>
//           <td>{username}</td>
//           <td>{useremail}</td>
//           <td>{userphone}</td>
//           <td>{city}</td>
//           <td>{consumption} units</td>
//           <td className='actionRow'>
//             <tr className='buttonContainer'>
//               <td><button className='tableButton' id='editButton'><i className="fa-solid fa-pen-to-square"></i></button></td>
//               <td><button className='tableButton' id='removeButton'><i className="fa-solid fa-trash-can"></i></button></td>
//             </tr>
//           </td>
//     </tr>
//   )
// }
// export default Tablerow




import './Tablerow.css';

const Tablerow = ({ user, onEdit, onDelete }) => {
  return (
    <tr className='button-row'>
      <td>{user.username}</td> 
      <td>{user.email}</td> 
      {/* <td>{user.userphone}</td> */}
      <td>{user.address}</td>
      <td>{user.pincode}</td>
      {/* <td>{user.consumption} units</td> */}
      <td className="action-row">
        <button className="table-button" id='edit-table-button' onClick={onEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="table-button" id='delete-table-button' onClick={onDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};

export default Tablerow;
