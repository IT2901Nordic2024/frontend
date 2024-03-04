import { Button } from "../../Components/button";
import mockData from "./mockData.json"; 
import HabitCard from "../../Components/habitCard/habitCard"; 
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface HabitData {
  name: string;
  data: number[][];
}

const MyHabitsPage: React.FC = () => {

  // state to hold selected habit
  const [selectedHabit, setSelectedHabit] = useState<[number, number][] | null>(null);

  // react router navigate hook
  const navigate = useNavigate();

  const handleHabitSelect = (id: string) => {

    const habitData = mockData.Time[id]?.data;

    if(habitData) {
    setSelectedHabit(habitData);
    navigate(`/my-habits/${id}`, { state: { data: habitData } });

    } else {
      setSelectedHabit(null);
    }
  }

  return (
    <div>  
      <div className="h-20"></div>
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-4xl font-bold leading-tight">My Habits</h1>
        <Button 
          variant="secondary" 
          className="flex items-center gap-2 bg-[black] text-white hover:bg-[#4A5568]" 
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add Habit
        </Button>
      </div>
      <div className="flex items-start h-auto flex-wrap">
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
