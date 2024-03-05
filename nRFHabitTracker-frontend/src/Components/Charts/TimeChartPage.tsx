import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLocation, useNavigate } from 'react-router-dom';

const TimeChartPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            console.log('No data found');
            navigate('/my-habits');
        }
    }, [location, navigate]);

    if(!location.state) return null;

    const { data } = location.state as { data: [number, number][] };
    const {name} = location.state as { name: string };

    const series = [{
        name: 'Habit Data',
        data: data.map(item => ({ x: item[0], y: item[1] })),
    }];

    const options = {
        chart: {
            type: 'line' as const,
            toolbar: {
                show: true
            }
        },
        xaxis: {
            type: 'datetime' as const, 
        },
        stroke: {
            curve: 'stepline' as const, 
        },
        title: {
            text: name,
            align: 'center' as const, 
        }
    };

    return (
        <div>
            <div className="h-5"></div>
            <button onClick={() => navigate('/my-habits')} className="bg-[#334155] text-white px-4 py-2 rounded-md ml-4">Go back</button>
            <ReactApexChart options={options} series={series} type="line" height={350} />;
        </div>
        
    );
};

export default TimeChartPage;