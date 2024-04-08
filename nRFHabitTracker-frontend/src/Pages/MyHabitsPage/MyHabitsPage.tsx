// The main page for the website, where the user see all their habits

import { Button } from '@/Components/shadcnComponents/button'
import HabitCard from '@/Components/habitCard/habitCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchHabits, Habit } from '../../Api/api'

export default function MyHabitsPage() {
  // State variables to hold habits data and loading status
  const [habitsData, setHabitsData] = useState<Habit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  // TODO: Replace the user ID with the actual user ID when users are implemented as well as device ID
  const userId = '0'

  // Effect hook to fetch habits data when the component mounts
  useEffect(() => {
    fetchHabits(userId)
      .then((response: Habit[]) => {
        // Check if response is not empty
        if (response.length > 0) {
          // Transform the fetched data to match the structure expected by the component
          const transformedData: Habit[] = response.map((habit) => ({
            habitId: habit.habitId,
            habitName: habit.habitName,
            habitType: habit.habitType,
            side: habit.side,
          }))
          setHabitsData(transformedData) // Set the transformed data to state
        }
        setLoading(false) // Set loading status to false after fetching data
      })
      .catch((error) => console.error('Error fetching habit data:', error))
  }, []) // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle selecting a habit card
  const handleHabitSelect = (id: number, name: string, side: number, type: string) => {
    navigate(`/my-habits/${id}`, { state: { id: id, name: name, side: side, type: type } })
  }

  return (
    <div className="m-5">
      {/* Heading and Add Habit button */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">My Habits</h1>
        <Button onClick={() => navigate('/add-habit')}>
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
      {/* Habit cards */}
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
              onClick={() => handleHabitSelect(habit.habitId, habit.habitName, habit.side, habit.habitType)}
            />
          ))
        )}
      </div>
    </div>
  )
}
