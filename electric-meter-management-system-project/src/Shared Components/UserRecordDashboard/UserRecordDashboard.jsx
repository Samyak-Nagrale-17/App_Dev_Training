
import { useEffect, useState } from 'react';
import './UserRecordDashboard.css';
import TablerowRecord from '../TablerowDashboard/TablerowRecord';
import UserDetailsModal from '../UserModal/UserDetailsModal';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';

const UserRecordDashboard = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [meterOptions, setMeterOptions] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setCurrentRecord(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecord(null);
  };

  const handleSaveRecord = () => {
    fetchAllUserRecords();
    closeModal();
  };

  const fetchAllUserRecords = async () => {
    const userToken = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('current_login_user_id');
    const url = `${BASE_URL}/api/auth/user-dashboard-readings/${currentUserId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });

      const responseData = response.data.data;

      const seenRecords = {};
      const uniqueRecords = responseData.filter((record) => {
        const key = `${record.user_meter_map_id}-${record.reading_date}`;
        if (!seenRecords[key]) {
          seenRecords[key] = true;
          return true;
        }
        return false;
      });

      const uniqueMeters = uniqueRecords
        .map((record) => record.meter_number)
        .filter((value, index, self) => self.indexOf(value) === index);

      setRecords(uniqueRecords);
      setMeterOptions(uniqueMeters);
      setFilteredRecords(uniqueRecords);
    } catch (error) {
      console.error('Error: ', error.message || error.response);
    }
  };

  const handleMeterChange = (e) => {
    const selectedMeter = e.target.value;
    setSelectedMeter(selectedMeter);

    if (selectedMeter) {
      setFilteredRecords(
        records.filter((record) => record.meter_number === selectedMeter)
      );
    } else {
      setFilteredRecords(records);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = records.filter((record) => {
      const formattedDate = new Date(record.reading_date)
        .toISOString()
        .split('T')[0]
        .toLowerCase();
      const consumption = record.consumption.toString().toLowerCase();
      const billAmount = record.bill_amount.toString().toLowerCase();
      const paymentStatus = (record.is_bill_paid === 0 ? 'pending' : 'paid').toLowerCase();
      return (
        formattedDate.includes(query) ||
        consumption.includes(query) ||
        billAmount.includes(query) ||
        paymentStatus.includes(query)
      );
    });
    setFilteredRecords(filtered);
  };

  useEffect(() => {
    fetchAllUserRecords();
  }, []);

  return (
    <div className="userrecord-container">
      <div className="title-bar">
        <div className="title-heading-wrapper">
          <span className="title">Your Records</span>
          <span className="title-description">
            A list of electricity consumption records
          </span>
        </div>
        <div className="search-container">
          <button className="add-user-button-record" onClick={openModal}>
            Add record
          </button>

          <div className="meter-dropdown">
            <label>Select meter</label>
            <select
              name="meter-select"
              value={selectedMeter}
              onChange={handleMeterChange}
            >
              {meterOptions.map((meter) => (
                <option key={meter} value={meter}>
                  {meter}
                </option>
              ))}
            </select>
          </div>

          <div className="search-bar-wrapper">
            <input
              className="search-bar"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
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
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <TablerowRecord
                key={`${record.user_meter_map_id}-${record.reading_date}`}
                record={record}
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
        selectedMeter={selectedMeter}
      />
    </div>
  );
};

export default UserRecordDashboard;
