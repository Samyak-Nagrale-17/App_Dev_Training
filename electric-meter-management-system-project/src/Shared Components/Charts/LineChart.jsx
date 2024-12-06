/* eslint-disable react/prop-types */
// components/LineChart.js
import { Line } from "react-chartjs-2";
import './LineChart.css'


function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2>Line Chart</h2>
      <Line
        className="line-chart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          },
          scales:{
            x:{
                title:{
                    display:true,
                    text:'Year'
                }
            },
            y:{
                title:{
                    display:true,
                    text:'User count'
                }
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;
