import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title,
    Tooltip, Legend
} from 'chart.js'
import lineChartData from '../../utils/FakeData'



ChartJS.register(CategoryScale, LinearScale,
    PointElement, LineElement, Title,
    Tooltip, Legend)


export const LineChart2 = () => {
    
    const options = {
           
    }
    return(
       <Line options={options} data={lineChartData}/>
    )
}