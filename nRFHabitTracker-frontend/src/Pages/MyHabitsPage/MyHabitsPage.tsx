import { Button } from '@/Components/shadcnComponents/button'
import HabitCard from '@/Components/habitCard/habitCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchHabits, Habit } from './api'

const MyHabitsPage: React.FC = () => {
  const [habitsData, setHabitsData] = useState<Habit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchHabits()
      .then((response: Habit[]) => {
        // Check if response is not empty
        if (response.length > 0) {
          // Transform the fetched data to match the structure expected by the component
          const transformedData: Habit[] = response.map((habit) => ({
            habitId: habit.habitId,
            habitName: habit.habitName,
            habitType: habit.habitType,
            deviceId: habit.deviceId,
          }))
          setHabitsData(transformedData)
        }
        setLoading(false)
      })
      .catch((error) => console.error('Error fetching habit data:', error))
  }, [])

  const handleHabitSelect = (id: number, name: string) => {
    navigate(`/my-habits/${id}`, { state: { name: name } })
  }

  return (
    <div style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
      <div className="h-10"></div>
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-4xl font-bold leading-tight">My Habits</h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2 bg-[black] text-white hover:bg-[#4A5568]"
          onClick={() => navigate('/add-habit')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add Habit
        </Button>
      </div>
      <div className="flex items-start h-auto flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          habitsData.map((habit, index) => (
            <HabitCard
              key={habit.habitId}
              id={habit.habitId.toString()}
              name={habit.habitName}
              bgColor={index % 2 === 0 ? 'bg-[#94A3B8]' : 'bg-[#CBD5E1]'}
              onClick={() => handleHabitSelect(habit.habitId, habit.habitName)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MyHabitsPage
