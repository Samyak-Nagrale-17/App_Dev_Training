import './UserConsumptionDashboard.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import BASE_URL from '../../config/apiConfig';

Chart.register(CategoryScale);

const UserConsumptionDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [meterOptions, setMeterOptions] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState('');
  const [records, setRecords] = useState([]);

  const [averageConsumption, setAverageConsumption] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [highestConsumptionMonth, setHighestConsumptionMonth] = useState('');

  const fetchChartData = async () => {
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

      const data = response.data.data;
      console.log('Response: ', data);

      const uniqueMeters = data
        .map((record) => record.meter_number)
        .filter((value, index, self) => self.indexOf(value) === index);

      setMeterOptions(uniqueMeters);
      setRecords(data);

      updateCharts(data);
      updateKPIs(data);
    } catch (error) {
      console.error('Error: ', error.message || error.response);
    }
  };

  const updateCharts = (filteredData) => {
    setChartData(
      filteredData.length > 0
        ? {
            labels: filteredData.map((item) => item.reading_date.slice(0, 7)),
            datasets: [
              {
                label: 'Consumption',
                data: filteredData.map((item) => item.consumption),
                borderColor: 'black',
                borderWidth: 2,
              },
            ],
          }
        : null
    );

    setBarChartData(
      filteredData.length > 0
        ? {
            labels: filteredData.map((item) => item.reading_date.slice(0, 7)),
            datasets: [
              {
                label: 'Bill amount',
                data: filteredData.map((item) => item.bill_amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }
        : null
    );
  };

  const updateKPIs = (filteredData) => {
    if (filteredData.length > 0) {
      const total = filteredData.reduce((sum, record) => sum + record.consumption, 0);
      const average = total / filteredData.length;
      const highest = filteredData.reduce((prev, current) =>
        prev.consumption > current.consumption ? prev : current
      );

      setTotalConsumption(total);
      setAverageConsumption(average.toFixed(2));
      setHighestConsumptionMonth(highest.reading_date.slice(0, 7));
    } else {
      setTotalConsumption(0);
      setAverageConsumption(0);
      setHighestConsumptionMonth('N/A');
    }
  };

  const handleMeterChange = (e) => {
    const selected = e.target.value;
    setSelectedMeter(selected);

    if (selected) {
      const filteredData = records.filter((record) => record.meter_number === selected);
      updateCharts(filteredData);
      updateKPIs(filteredData);
    } else {
      updateCharts(records);
      updateKPIs(records);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="userconsumption-container">
      <div className="meter-dropdown-consumption">
        <label>Select Meter:</label>
        <select name="meter-select" value={selectedMeter} onChange={handleMeterChange}>
          {meterOptions.length > 0 ? (
            meterOptions.map((meter) => (
              <option key={meter} value={meter}>
                {meter}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No meters available
            </option>
          )}
        </select>
      </div>

      <div className="card-wrapper">
        <div className="card">
          <div className="icon-wrapper-consumption">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="text-wrapper">
            <p className="text-title">Average Consumption</p>
            <p className="text-value">{averageConsumption} units</p>
          </div>
        </div>

        <div className="card">
          <div className="icon-wrapper-consumption">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="text-wrapper">
            <p className="text-title">Total Consumption</p>
            <p className="text-value">{totalConsumption} units</p>
          </div>
        </div>

        <div className="card">
          <div className="icon-wrapper-consumption">
            <i className="fa-regular fa-calendar-days"></i>
          </div>
          <div className="text-wrapper">
            <p className="text-title">Highest Consumption Month</p>
            <p className="text-value">{highestConsumptionMonth}</p>
          </div>
        </div>
      </div>

      <div className="chart-wrapper">
        {chartData && barChartData ? (
          <>
            <div className="chart">
              <LineChart chartData={chartData} />
            </div>

            <div className="chart">
              <BarChart chartData={barChartData} />
            </div>
          </>
        ) : (
          <p className="no-data-message">No data found</p>
        )}
      </div>
    </div>
  );
};

export default UserConsumptionDashboard;
