import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLocation, useNavigate } from 'react-router-dom';

const Chart: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Effect to check if there's no data in the location state, and navigate to '/my-habits' if true    
    useEffect(() => {
        if (!location.state) {
            console.log('No data found');
            navigate('/my-habits');
        }
    }, [location, navigate]);

    // If there's no data in the location state, return null
    if(!location.state) return null;

    // Destructure data and name from the location state
    const { data } = location.state as { data: [number, number][] };
    const {name} = location.state as { name: string };

    // Format data into series for ApexCharts
    const series = [{
        name: 'Habit Data',
        data: data.map(item => ({ x: item[0], y: item[1] })),
    }];

    // Options for ApexCharts
    const options = {
        chart: {
            type: 'line' as const, // Set chart type to line
            toolbar: {
                show: true // Show chart toolbar
            }
        },
        xaxis: {
            type: 'datetime' as const, // Set x-axis type to datetime
        },
        stroke: {
            curve: 'stepline' as const, // Set stroke curve type to stepline
        },
        title: {
            text: name, // Set chart title to the name received from location state
            align: 'center' as const, // Align chart title to center
        }
    };

    return (
        <div>
            {/* Render ApexChart component with options and series */}
            <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
        
    );
};

export default Chart;