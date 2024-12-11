/* eslint-disable react/prop-types */
import './TablerowRecord.css'

const TablerowRecord = ({record}) => {

  const formattedDate = new Date(record.reading_date).toISOString().split('T')[0];


  return (
    <tr>
        {/* <td>{record.date}</td>
        <td>{record.reading} units</td>
        <td>{record.amount}</td>
        <td>{(record.billStatus) ? 'Paid' : 'Pending'}</td> */}

        {/* <td>{record.reading_date}</td> */}
        <td>{formattedDate}</td>
        <td>{record.consumption} units</td>
        <td>${record.bill_amount}</td>
        <td>{ (record.is_bill_paid === 0) ? 'Pending' : 'Paid' }</td>
    </tr>
  )
}

export default TablerowRecord