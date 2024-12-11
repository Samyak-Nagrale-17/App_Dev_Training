/* eslint-disable react/prop-types */
import './TableRowMeterData.css'
const TableRowMeterData = ({ meterData, onEdit, onDelete }) => {
  return (
    <tr> 
      <td>{meterData.user_meter_map_id.user_id}</td>
      <td>{meterData.username}</td>
      <td>{meterData.meter_number}</td>
      <td>{meterData.reading_date.split('T')[0]}</td>
      <td>{meterData.consumption} units</td>
      <td>${meterData.bill_amount}</td>
      <td>{meterData.is_bill_paid ? 'Paid' : 'Pending'}</td>
      {/* <td>{meterData.reading_date.split('T')[0]}</td> */}

      <td className="actionRow">
          <button className='tableButton' id='addMeterButton' onClick = {onEdit}>
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
