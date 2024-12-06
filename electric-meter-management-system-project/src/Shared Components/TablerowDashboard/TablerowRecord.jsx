/* eslint-disable react/prop-types */
import './TablerowRecord.css'

const TablerowRecord = ({record}) => {
  return (
    <tr>
        <td>{record.date}</td>
        <td>{record.reading} units</td>
        <td>{record.amount}</td>
        <td>{(record.billStatus) ? 'Paid' : 'Pending'}</td>
    </tr>
  )
}

export default TablerowRecord