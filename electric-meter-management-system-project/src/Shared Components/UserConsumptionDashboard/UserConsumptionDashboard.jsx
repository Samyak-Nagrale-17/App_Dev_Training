/* eslint-disable no-unused-vars */
import './UserConsumptionDashboard.css'

// chart import
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from '../../utils/Data';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';


const UserConsumptionDashboard = () => {

// chart setup
const [chartData, setChartData] = useState({
  labels: Data.map((data) => data.year), 
  datasets: [
    {
      label: "Users Gained ",
      data: Data.map((data) => data.userGain),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ]
});

  return (
    <div className='userconsumption-container'>
        <div className="card-wrapper">
          <div className="card">
            <div className="icon-wrapper">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div className="text-wrapper">
              <p className='text-title'>Current Month Consumption</p>
              <p className='text-value'>70 units</p>
            </div>
          </div>

          <div className="card">
            <div className="icon-wrapper">
              <i className="fa-regular fa-calendar-days"></i>
            </div>
            <div className="text-wrapper">
              <p className='text-title'>Previous Month Consumption</p>
              <p className='text-value'>90 units</p>
            </div>
          </div> 
        </div>


        {/* charts */} 
        <div className='chart-wrapper'>
          <div className='chart'>
            <PieChart chartData={chartData} />
          </div>

          <div className='chart'>
            <LineChart chartData={chartData}/>
          </div>
        </div>


    </div>
  )
}

export default UserConsumptionDashboard