// import { useState } from 'react';
// import './MeterDataDashboard.css';
// import TableRowMeterData from '../TablerowDashboard/TableRowMeterData';
// import MeterModal from '../UserModal/MeterModal';

// const MeterDataDashboard = () => {
//   const [meterData, setMeterData] = useState([
//     { id: 1, userId: 101, meterNumber: 'MTR001', reading: '150', date: '2024-12-01' },
//     { id: 2, userId: 102, meterNumber: 'MTR002', reading: '200', date: '2024-12-02' },
//     { id: 3, userId: 103, meterNumber: 'MTR003', reading: '180', date: '2024-12-03' },
//     { id: 4, userId: 104, meterNumber: 'MTR004', reading: '220', date: '2024-12-04' },
//     { id: 5, userId: 105, meterNumber: 'MTR005', reading: '250', date: '2024-12-05' },
//     { id: 6, userId: 106, meterNumber: 'MTR006', reading: '210', date: '2024-12-06' },
//     { id: 7, userId: 107, meterNumber: "MTR007", reading: "170", date: "2024-12-07" },
//     { id: 8, userId: 108, meterNumber: "MTR008", reading: "195", date: "2024-12-08" },
//     { id: 9, userId: 109, meterNumber: "MTR009", reading: "185", date: "2024-12-09" },
//     { id: 10, userId: 110, meterNumber: "MTR010", reading: "210", date: "2024-12-10" },
//     { id: 11, userId: 111, meterNumber: "MTR011", reading: "230", date: "2024-12-11" },
//     { id: 12, userId: 112, meterNumber: "MTR012", reading: "240", date: "2024-12-12" },
//     { id: 13, userId: 113, meterNumber: "MTR013", reading: "220", date: "2024-12-13" },
//     { id: 14, userId: 114, meterNumber: "MTR014", reading: "215", date: "2024-12-14" },
//     { id: 15, userId: 115, meterNumber: "MTR015", reading: "235", date: "2024-12-15" },
//     { id: 16, userId: 116, meterNumber: "MTR016", reading: "250", date: "2024-12-16" },
//     { id: 17, userId: 117, meterNumber: "MTR017", reading: "190", date: "2024-12-17" },
//     { id: 18, userId: 118, meterNumber: "MTR018", reading: "210", date: "2024-12-18" },
//     { id: 19, userId: 119, meterNumber: "MTR019", reading: "180", date: "2024-12-19" },
//     { id: 20, userId: 120, meterNumber: "MTR020", reading: "200", date: "2024-12-20" },
//     { id: 21, userId: 121, meterNumber: "MTR021", reading: "225", date: "2024-12-21" },
//     { id: 22, userId: 122, meterNumber: "MTR022", reading: "205", date: "2024-12-22" },
//     { id: 23, userId: 123, meterNumber: "MTR023", reading: "240", date: "2024-12-23" },
//     { id: 24, userId: 124, meterNumber: "MTR024", reading: "230", date: "2024-12-24" },
//     { id: 25, userId: 125, meterNumber: "MTR025", reading: "250", date: "2024-12-25" },
//     { id: 26, userId: 126, meterNumber: "MTR026", reading: "265", date: "2024-12-26" },
//     { id: 27, userId: 127, meterNumber: "MTR027", reading: "210", date: "2024-12-27" }
//     // Add more data as needed
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [currentMeter, setCurrentMeter] = useState(null);
//   const [isEditMode, setEditMode] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Set number of items per page

//   // Filtered data based on search
  // const filteredMeterData = meterData.filter((data) =>
  //   data.userId.toString().includes(searchQuery)
  // );

//   // Calculate current items for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredMeterData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Total pages
//   const totalPages = Math.ceil(filteredMeterData.length / itemsPerPage);

//   return (
//     <div className="meterdata-container">
//       <div className="title-bar">
//         <div className='title-heading-wrapper'>
//           <span className="title">Meter Data</span>
//           <span className='title-description'>A list of all meters with their details</span>
//         </div>

//         <div className="search-container">
//           <button className="add-meter-button" onClick={() => openModal()}>Add Meter Data</button>
//           <div className="search-bar-wrapper">
//             <input
//               className="search-bar"
//               type="text"
//               placeholder="Search by User ID..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className='search-icon-wrapper'>
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="table-wrapper">
//         <table className="meterdata-table">
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>Meter Number</th>
//               <th>Reading</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((data) => (
//               <TableRowMeterData
//                 key={data.id}
//                 meterData={data}
//                 onEdit={() => openModal(data)}
//                 onDelete={() => setMeterData(meterData.filter((item) => item.id !== data.id))}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => paginate(index + 1)}
//             className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       {/* Modal */}
//       <MeterModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={(meterDataEntry) => {
//           if (isEditMode) {
//             setMeterData(meterData.map((meter) =>
//               meter.id === currentMeter.id ? { ...meterDataEntry, id: currentMeter.id } : meter
//             ));
//           } else {
//             setMeterData([...meterData, { ...meterDataEntry, id: Date.now() }]);
//           }
//           setModalOpen(false);
//         }}
//         initialData={currentMeter}
//         isEditMode={isEditMode}
//       />
//     </div>
//   );
// };

// export default MeterDataDashboard;



import { useEffect, useState } from 'react';
import './MeterDataDashboard.css';
import TableRowMeterData from '../TablerowDashboard/TableRowMeterData';
import MeterModal from '../UserModal/MeterModal';
import axios from 'axios';

const MeterDataDashboard = () => {
  const [meterData, setMeterData] = useState([
    { id: 1, userId: 101, meterNumber: 'MTR001', reading: '150', date: '2024-12-01' },
    { id: 2, userId: 102, meterNumber: 'MTR002', reading: '200', date: '2024-12-02' },
    { id: 3, userId: 103, meterNumber: 'MTR003', reading: '180', date: '2024-12-03' },
    { id: 4, userId: 104, meterNumber: 'MTR004', reading: '220', date: '2024-12-04' },
    { id: 5, userId: 105, meterNumber: 'MTR005', reading: '250', date: '2024-12-05' },
    { id: 6, userId: 106, meterNumber: 'MTR006', reading: '210', date: '2024-12-06' },
    { id: 7, userId: 107, meterNumber: "MTR007", reading: "170", date: "2024-12-07" },
    { id: 8, userId: 108, meterNumber: "MTR008", reading: "195", date: "2024-12-08" },
    { id: 9, userId: 109, meterNumber: "MTR009", reading: "185", date: "2024-12-09" },
    { id: 10, userId: 110, meterNumber: "MTR010", reading: "210", date: "2024-12-10" },
    { id: 11, userId: 111, meterNumber: "MTR011", reading: "230", date: "2024-12-11" },
    { id: 12, userId: 112, meterNumber: "MTR012", reading: "240", date: "2024-12-12" },
    { id: 13, userId: 113, meterNumber: "MTR013", reading: "220", date: "2024-12-13" },
    { id: 14, userId: 114, meterNumber: "MTR014", reading: "215", date: "2024-12-14" },
    { id: 15, userId: 115, meterNumber: "MTR015", reading: "235", date: "2024-12-15" },
    { id: 16, userId: 116, meterNumber: "MTR016", reading: "250", date: "2024-12-16" },
    { id: 17, userId: 117, meterNumber: "MTR017", reading: "190", date: "2024-12-17" },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentMeter, setCurrentMeter] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModal = (meter = null) => {
    setCurrentMeter(meter);
    setEditMode(!!meter);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMeter(null);
  };

  const handleMeterSubmit = (meterDataEntry) => {
    if (isEditMode) {
      setMeterData(meterData.map((meter) =>
        meter.id === currentMeter.id ? { ...meterDataEntry, id: currentMeter.id } : meter
      )); 
    } else {
      setMeterData([...meterData, { ...meterDataEntry, id: Date.now() }]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredMeterData = meterData.filter((data) =>{
  //   data.userId.toString().includes(searchQuery)


  //   // const query = searchQuery.toLowerCase()

  //   // return (
  //   //   data.user_meter_map_id.user_id.toLowerCase().includes(query) ||
  //   //   data.user_meter_map_id.meter_id.toLowerCase().includes(query) ||
  //   //   data.consumption.toLowerCase().includes(query) || 
  //   //   data.created_at.substring(0,10).toLowerCase().includes(query)
  //   // )
  // }
  // );

  const filteredMeterData = meterData.filter((data) =>
    data.userId.toString().includes(searchQuery)
  );

  const handleDelete = (id) => {
    setMeterData(meterData.filter((data) => data.id !== id));
  };

  const handleEdit = (meter) => {
    openModal(meter);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMeterData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMeterData.length / itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // api call
  // const fetchAllMeterData = async () => {
  //   const userToken = localStorage.getItem('token')
  //   const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/admin-get-all-meter-readings'

  //   try{
  //     const response = await axios.get(url, {
  //       headers:{
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${userToken}`,
  //       'ngrok-skip-browser-warning': '6024',
  //       }
  //     })

  //     console.log(response.data.data)
  //     setMeterData(response.data.data)

  //   } catch(error) {
  //     console.log('Error:',error.message)
  //   }
  // }

  // useEffect(() => {
  //   fetchAllMeterData()
  // }, [])

  return (
    <div className="meterdata-container">
      <div className="title-bar">
        <div className='title-heading-wrapper'>
          <span className="title">Meter Data</span>
          <span className='title-description'>A list of all meters with their details</span>
        </div>

        <div className="search-container">
          <button className="add-meter-button" onClick={() => openModal()}>Add Meter Data</button>
          <div className="search-bar-wrapper">
            <input
              className="search-bar"
              type="text"
              placeholder="Search by User ID..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className='search-icon-wrapper'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="meterdata-table-wrapper">
        <table className="meterdata-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Meter Number</th>
              <th>Reading</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <TableRowMeterData
                key={data.id}
                meterData={data}
                onEdit={() => handleEdit(data)}
                onDelete={() => handleDelete(data.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        {/* <button onClick={prevPage} disabled={currentPage === 1}>Previous</button> */}
        <button onClick={prevPage}>Previous</button>


          {/* page buttons */}
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

      {/* modal */}
      <MeterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleMeterSubmit}
        initialData={currentMeter}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default MeterDataDashboard;

