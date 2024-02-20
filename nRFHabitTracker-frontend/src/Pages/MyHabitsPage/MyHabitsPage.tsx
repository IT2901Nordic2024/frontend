import HabitCard from "../../Components/habitCard/habitCard"; 
import mockData from "./mockData.json"; 

const MyHabitsPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-wrap">
      {Object.entries(mockData.count).map(([id, item]) => (
        <HabitCard key={id} id={id} name={item.name} />
      ))}
    </div>
  );
};

export default MyHabitsPage;