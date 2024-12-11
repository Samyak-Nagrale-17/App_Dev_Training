/* eslint-disable react/prop-types */
import './BarChart.css'
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Bar
        className='bar-chart'
        data={chartData}
        // data={{
        //   ...chartData,
        //   datasets: chartData.datasets.map(dataset => ({
        //     ...dataset,
        //     backgroundColor: 'rgba(75, 192, 192, 0.6)'  
        //   }))
        // }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Bill Amount Trend"
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Bill amount (in $)'
              }
            }
          }
        }}
      />
    </div>
  );
}

export default BarChart;
