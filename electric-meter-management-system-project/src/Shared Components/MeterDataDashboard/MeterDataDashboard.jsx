  import { useEffect, useState } from 'react';
  import './MeterDataDashboard.css';
  import TableRowMeterData from '../TablerowDashboard/TableRowMeterData';
  import MeterModal from '../UserModal/MeterModal';
  import BASE_URL from '../../config/apiConfig';
  import axios from 'axios';
  import { toast } from 'react-toastify';

  const MeterDataDashboard = () => {
    const [meterData, setMeterData] = useState([]);
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

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); 
    };

    // const filteredMeterData = meterData.filter((data) => {
    //   const query = searchQuery.toLowerCase();
    //   return (
    //     data.user_meter_map_id.user_id.toString().toLowerCase().includes(query) ||
    //     data.user_meter_map_id.username.toLowerCase().includes(query) ||
    //     data.meter_number.toString().toLowerCase().includes(query) ||
    //     data.reading.toString().toLowerCase().includes(query) ||
    //     new Date(data.date).toLocaleDateString().toLowerCase().includes(query)
    //   );
    // });

    const filteredMeterData = meterData.filter((data) => {
      const query = searchQuery.toLowerCase();
    
      const userId = data.user_meter_map_id && data.user_meter_map_id.user_id
        ? data.user_meter_map_id.user_id.toString().toLowerCase()
        : '';
      const username = data.username ? data.username.toLowerCase() : '';
      const meterNumber = data.meter_number ? data.meter_number.toLowerCase() : '';
      const reading = data.consumption ? data.consumption.toString().toLowerCase() : '';
    
      const readingDate = data.reading_date
        ? new Date(data.reading_date).toISOString().split('T')[0].toLowerCase() 
        : '';
    
      return (
        userId.includes(query) ||
        username.includes(query) ||
        meterNumber.includes(query) ||
        reading.includes(query) ||
        readingDate.includes(query) 
      );
    });
    


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

    const fetchAllMeterData = async () => {
      const userToken = localStorage.getItem('token');
      const url = `${BASE_URL}/api/auth/admin-get-all-meter-readings`;

      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
            // "ngrok-skip-browser-warning": "69420",
            "ngrok-skip-browser-warning": "6024",
          },
        });

        console.log(response.data.data)
        setMeterData(response.data.data);
      } catch (error) {
        console.log('Error: ', error.message || error.response);
      }
    };

    useEffect(() => {
      fetchAllMeterData();
    }, []);

    const deleteMeterData = async (reading_id) => {
      if (!reading_id) {
        toast.error('Error: Reading ID is missing!', { position: "top-right", autoClose: 3000 });
        return;
      }

      const userToken = localStorage.getItem('token');
      const url = `${BASE_URL}/api/auth/admin-delete-meter-reading/${reading_id}`;

      try {
        await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'ngrok-skip-browser-warning': '6024',
          },
        });

        toast.success('Data deleted successfully!', { position: "top-right", autoClose: 3000 });
        // call after delete
        fetchAllMeterData(); 
      } catch (error) {
        toast.error(error.response.data.message || 'Failed to delete data. Please try again.', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

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
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className='search-icon-wrapper'>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="meterdata-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Meter Number</th>
                <th>Date</th>
                <th>Reading</th>
                <th>Bill Amount</th>
                <th>Payment Status</th>
                {/* <th>Date</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <TableRowMeterData
                  key={data.reading_id} 
                  meterData={data}
                  onEdit={() => openModal(data)}
                  onDelete={() => deleteMeterData(data.reading_id)}
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

        {/* <MeterModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          initialData={currentMeter}
          isEditMode={isEditMode}
        /> */}
        <MeterModal
          isOpen={isModalOpen}
          onClose={closeModal}
          initialData={currentMeter}
          isEditMode={isEditMode}
          onSubmit={fetchAllMeterData} 
        />

        
      </div>
    );
  };

  export default MeterDataDashboard;

