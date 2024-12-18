/* eslint-disable react/prop-types */
import { Pie } from "react-chartjs-2";
import './PieChart.css'


function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2>Pie Chart</h2>
      <Pie 
        className="pie"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}

export default PieChart;