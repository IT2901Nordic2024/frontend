import {Calendar as CalenderComp} from "@/Components/shadcnComponents/calendar";
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
    // Grouping data by day for calender highlighting
    if(timerHabit){
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

    // Mark all unique days in the calender
    const highlightedDates = Array.from(uniqueDays).map((date) => new Date(date as string));

    return (
        <div>
            <CalenderComp selected={highlightedDates} />
        </div>
    );
};

export default Calendar;