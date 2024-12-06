// import { useState } from 'react'
// import './UserRecordDashboard.css'
// import TablerowRecord from '../TablerowDashboard/TablerowRecord'

// const UserRecordDashboard = () => {

//   const [records, setRecords] = useState([
//     {id:1, date:'2024-12-2', reading: 100, amount:'$100',billStatus: 0},
//     {id:2, date:'2024-11-12',reading: 120, amount:'$110',billStatus: 0},
//     {id:3, date:'2024-10-14', reading: 92,amount:'$90',billStatus: 1},
//     {id:4, date:'2024-09-10', reading: 101,amount:'$104',billStatus: 1},
//     {id:5, date:'2024-08-4', reading: 93,amount:'$96',billStatus: 1},

//   ])

//   return (
//     <div className='userrecord-container'>
//       <div className="title-bar">


//         <div className='title-heading-wrapper'>
//           <span className="title">Your records</span>
//           <span className='title-description'>A list of electricity consumption records</span>
//         </div>


//         <div className="search-container">
//           <button className="add-user-button" onClick={() => openModal()}>Add Record</button>

//           <div className="search-bar-wrapper">
//           <input 
//               className='search-bar'
//               type="text" 
//               // placeholder='Search by email ...'
//           />
//               <div className='search-icon-wrapper'>
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </div>
//           </div>
//         </div>
//       </div>

//       <div className='table-wrapper'>
//         <table className='userrecord-table'>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Consumption</th>
//               <th>Bill Amount</th>
//               <th>Payment Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((record) => (
//               <TablerowRecord
//                 key={record.id}
//                 record={record}
//                 onEdit={''}
//                 onDelete={''}
//               />
//             ))} 
//           </tbody>
//         </table>
//       </div>

//     </div>
//   )
// }

// export default UserRecordDashboard







// import { useState } from 'react';
// import './UserRecordDashboard.css';
// import TablerowRecord from '../TablerowDashboard/TablerowRecord';
// // import RecordModal from '../RecordModal/RecordModal'; // Import the new modal component
// import UserDetailsModal from '../UserModal/UserDetailsModal';

// const UserRecordDashboard = () => {
//   const [records, setRecords] = useState([
//     { id: 1, date: '2024-12-02', reading: 100, amount: '$100', billStatus: 0 },
//     { id: 2, date: '2024-11-12', reading: 120, amount: '$110', billStatus: 0 },
//     { id: 3, date: '2024-10-14', reading: 92, amount: '$90', billStatus: 1 },
//     { id: 4, date: '2024-09-10', reading: 101, amount: '$104', billStatus: 1 },
//     { id: 5, date: '2024-08-04', reading: 93, amount: '$96', billStatus: 1 },
//   ]);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null); // To handle edit functionality

//   const openModal = (record = null) => {
//     setCurrentRecord(record);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setCurrentRecord(null);
//   };

//   const handleSaveRecord = (newRecord) => {
//     if (newRecord.id) {
//       // Edit existing record
//       setRecords(records.map((rec) => (rec.id === newRecord.id ? newRecord : rec)));
//     } else {
//       // Add new record
//       const newId = records.length > 0 ? Math.max(...records.map((rec) => rec.id)) + 1 : 1;
//       setRecords([...records, { ...newRecord, id: newId }]);
//     }
//     closeModal();
//   };

//   return (
//     <div className="userrecord-container">
//       <div className="title-bar">
//         <div className="title-heading-wrapper">
//           <span className="title">Your Records</span>
//           <span className="title-description">A list of electricity consumption records</span>
//         </div>

//         <div className="search-container">
//           <button className="add-user-button" onClick={() => openModal()}>Add Record</button>
//           <div className="search-bar-wrapper">
//             <input className="search-bar" type="text" placeholder="Search by date ..." />
//             <div className="search-icon-wrapper">
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="table-wrapper">
//         <table className="userrecord-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Consumption</th>
//               <th>Bill Amount</th>
//               <th>Payment Status</th>
//               {/* <th>Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((record) => (
//               <TablerowRecord
//                 key={record.id}
//                 record={record}
//                 onEdit={() => openModal(record)}
//                 onDelete={() => setRecords(records.filter((r) => r.id !== record.id))}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <UserDetailsModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSave={handleSaveRecord}
//         initialData={currentRecord}
//       />
//     </div>
//   );
// };

// export default UserRecordDashboard;



import { useState } from 'react';
import './UserRecordDashboard.css';
import TablerowRecord from '../TablerowDashboard/TablerowRecord';
import UserDetailsModal from '../UserModal/UserDetailsModal';

const UserRecordDashboard = () => {
  const [records, setRecords] = useState([
    { id: 1, date: '2024-12-02', reading: 100, amount: '$100', billStatus: 0 },
    { id: 2, date: '2024-11-12', reading: 120, amount: '$110', billStatus: 0 },
    { id: 3, date: '2024-10-14', reading: 92, amount: '$90', billStatus: 1 },
    { id: 4, date: '2024-09-10', reading: 101, amount: '$104', billStatus: 1 },
    { id: 5, date: '2024-08-04', reading: 93, amount: '$96', billStatus: 1 },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openModal = () => {
    setCurrentRecord(null); 
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecord(null); 
  };



  //updated handleSaveRecord:
  const handleSaveRecord = (newRecord) => {
    if (newRecord.id) {
      setRecords(records.map((rec) => (rec.id === newRecord.id ? newRecord : rec)));
    } else {
      const newId = records.length > 0 ? Math.max(...records.map((rec) => rec.id)) + 1 : 1;
      const recordToAdd = {
        ...newRecord,
        amount: newRecord.billAmount, 
        reading: newRecord.consumption, 
        billStatus: newRecord.paymentStatus === 'Paid' ? 1 : 0,
      };
      setRecords([...records, { ...recordToAdd, id: newId }]);
    }
    closeModal();
  };
  


  return (
    <div className="userrecord-container">
      <div className="title-bar">
        <div className="title-heading-wrapper">
          <span className="title">Your Records</span>
          <span className="title-description">A list of electricity consumption records</span>
        </div>
        <div className="search-container">
          <button className="add-user-button" onClick={openModal}>Add Record</button>
          <div className="search-bar-wrapper">
            <input className="search-bar" type="text" placeholder="Search by date ..." />
            <div className="search-icon-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="userrecord-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Consumption</th>
              <th>Bill Amount</th>
              <th>Payment Status</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <TablerowRecord
                key={record.id}
                record={record}
                onEdit={() => openModal(record)}
                onDelete={() => setRecords(records.filter((r) => r.id !== record.id))}
              />
            ))}
          </tbody>
        </table>
      </div>

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveRecord}
        initialData={currentRecord}
      />
    </div>
  );
};

export default UserRecordDashboard;
