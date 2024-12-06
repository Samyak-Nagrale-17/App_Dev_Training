/* eslint-disable react/prop-types */
import './TableRowMeterData.css'
// import './Tablerow.css';
const TableRowMeterData = ({ meterData, onEdit, onDelete }) => {
  return (
    <tr> 
      <td>{meterData.userId}</td>
      <td>{meterData.meterNumber}</td>
      <td>{meterData.reading} units</td>
      <td>{meterData.date}</td>
      <td className="actionRow">
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

export default TableRowMeterData;
