import {Calendar as CalenderComp} from "@/lib/utils/ui/calendar";
import { useState } from "react";

interface CalendarProps {
    events: Array<[number, number]>;
    timerHabit: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({ events, timerHabit }) => {
    
    if (!events || events.length === 0) {
        console.log('No data found');
    }

    const uniqueDays = new Set();

    if(timerHabit){
        console.log('Timer habit');
        events.forEach((event) => {
            const startDate = new Date(event[0]*1000);
            const endDate = new Date(event[1]*1000);
            for( let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1) ){
                const formattedDate = dt.toISOString().split('T')[0];
                uniqueDays.add(formattedDate);
        }
    });
    } else{
        events.forEach((event) => {
            const formattedDate = new Date(event[0]*1000).toISOString().split('T')[0];
            uniqueDays.add(formattedDate);
        });
    }

    const highlightedDates = Array.from(uniqueDays).map((date) => new Date(date));
    
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <CalenderComp />
        </div>
    );
};

export default Calendar;