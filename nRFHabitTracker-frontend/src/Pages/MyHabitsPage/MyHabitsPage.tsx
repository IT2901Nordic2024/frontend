import { Button } from "../../Components/button";
import mockData from "./mockData.json"; 
import HabitCard from "../../Components/habitCard/habitCard"; 

const MyHabitsPage: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>  
      <div className="h-10"></div>
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
        {Object.entries(mockData.count).map(([id, item], index) => (
          <HabitCard 
            key={id} 
            id={id} 
            name={item.name} 
            bgColor={index % 2 === 0 ? "bg-[#94A3B8]" : "bg-[#CBD5E1]"} //alternating background colors
          />
        ))}
      </div>
    </div>
  );
};

export default MyHabitsPage;
