import './UserRecordDashboard.css'

const UserRecordDashboard = () => {
  return (
    <div className='userrecord-conainer'>
      <div className="title-bar">
        <span className="title">Your records</span>
        <div className="search-container">
          {/* <button className="add-meter-button" onClick={() => openModal()}>Add Meter Data</button> */}
          <div className="search-bar-wrapper">
            <input
              className="search-bar"
              type="text"
              // placeholder="Search by User ID..."
              // value={searchQuery}
              // onChange={handleSearchChange}
            />
            <button className="searchButton">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className='table-wrapper'>
        <table className='userrecord-table'>
          <thead>
            <tr>
              <th>Consumption</th>
              <th>Date</th>
              <th>Bill Amount</th>
              <th>Payment status</th>
            </tr>
          </thead>
        </table>
      </div>

    </div>
  )
}

export default UserRecordDashboard