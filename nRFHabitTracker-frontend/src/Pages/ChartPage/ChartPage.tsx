// Page for showing charts when clicking on a habit card

import Chart from "@/Components/Charts/Chart"
import { useNavigate } from 'react-router-dom';

export default function ChartPage() {
    const navigate = useNavigate();
    return (
        <div style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
            {/* Vertical spacing */}
            <div className="h-10"></div>
            {/* Button to navigate back to '/my-habits' */}
            <button onClick={() => navigate('/my-habits')} className="bg-[#334155] text-white px-4 py-2 rounded-md ml-4">Go back</button>
            {/* TODO: Should be updated to show different kinds of charts */}
            <Chart></Chart>
        </div>
    )
}