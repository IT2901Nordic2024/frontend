// Main page that shows the user's tracked habits

// TODO: Make this page more responsive

import { Button } from "@/Components/shadcnComponents/button";
import mockData from "./mockData.json"; 
import HabitCard from "@/Components/habitCard/habitCard"; 
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Interface for habit data
interface HabitData {
  name: string;
  data: number[][];
}

const MyHabitsPage: React.FC = () => {

  // state to hold selected habit
  const [selectedHabit, setSelectedHabit] = useState<[number, number][] | null>(null);

  // react router navigate hook
  const navigate = useNavigate();

  // Function to handle selecting a habit
  const handleHabitSelect = (id: string) => {

    // Get habit data and name from mockData
    const habitData = mockData.Time[id]?.data;
    const habitName = mockData.Time[id]?.name;

    // If habit data exists, set selectedHabit and navigate to habit detail page
    if(habitData) {
    setSelectedHabit(habitData);
    navigate(`/my-habits/${id}`, { state: { data: habitData, name: habitName } });

    } else {
      // Log error if no data found and reset selectedHabit
      console.error('No data found');
      setSelectedHabit(null);
    }
  }

  return (
    <div style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
      {/* Vertical spacing */}
      <div className="h-10"></div>
      {/* Header with title and Add Habit button */}
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-4xl font-bold leading-tight">My Habits</h1>
        <Button 
          variant="secondary" 
          className="flex items-center gap-2 bg-[black] text-white hover:bg-[#4A5568] "
          onClick={() => navigate('/add-habit')} 
        >
          {/* Add Habit button icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add Habit
        </Button>
      </div>
      {/* Display habit cards */}
      <div className="flex items-start h-auto flex-wrap">
        {/* Map over mockData to render habit cards */}
        {Object.entries(mockData.Time).map(([id, habit], index) => (
          <HabitCard 
            key={id} 
            id={id}
            name={habit.name} 
            bgColor={index % 2 === 0 ? "bg-[#94A3B8]" : "bg-[#CBD5E1]"} 
            onClick={() => handleHabitSelect(id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MyHabitsPage;
