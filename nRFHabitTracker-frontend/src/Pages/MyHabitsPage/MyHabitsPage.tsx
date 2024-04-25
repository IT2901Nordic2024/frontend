// The main page for the website, where the user see all their habits

import { Button } from '@/Components/shadcnComponents/button'
import HabitCard from '@/Components/habitCard/habitCard'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchHabits, Habit } from '@/Api/api'
import { LoadingSpinner } from '@/Components/LoadingSpinner/LoadingSpinner'

export default function MyHabitsPage() {
  // State variables to hold habits data and loading status
  const [habitsData, setHabitsData] = useState<Habit[]>([])
  const [deviceId, setDeviceId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  // Get the current location
  const location = useLocation()

  // Destructure values from the location state
  const { userId } = location.state as { userId: string }

  // Effect hook to fetch habits data when the component mounts
  useEffect(() => {
    fetchHabits(userId)
      .then((response: { habits: Habit[]; deviceId: string }) => {
        // Check if response is not empty
        if (response.habits.length > 0) {
          // Transform the fetched data to match the structure expected by the component
          const transformedData: Habit[] = response.habits.map((habit) => ({
            habitId: habit.habitId,
            habitName: habit.habitName,
            habitType: habit.habitType,
            side: habit.side,
          }))
          setHabitsData(transformedData) // Set the transformed data to state
          setDeviceId(response.deviceId) // Set device ID
        }
        setLoading(false) // Set loading status to false after fetching data
      })
      .catch((error) => console.error('Error fetching habit data:', error))
  }, []) // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle selecting a habit card
  const handleHabitSelect = (id: number, name: string, side: number, type: string, deviceId: string) => {
    navigate(`/my-habits/${id}`, { state: { id: id, name: name, side: side, type: type, deviceId: deviceId } })
  }

  return (
    <div className="m-5">
      {/* Heading and Add Habit button */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">My Habits</h1>
        <Button onClick={() => navigate(`${location.pathname}/add-habit`, { state: { deviceId: deviceId } })}>
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
      <div className="flex items-start h-auto flex-wrap mt-10">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full fixed top-0 left-0">
            <LoadingSpinner />
          </div>
        ) : habitsData.length > 0 ? (
          habitsData.map((habit, index) => (
            <HabitCard
              key={habit.habitId}
              id={habit.habitId.toString()}
              name={habit.habitName}
              bgColor={index % 2 === 0 ? 'bg-[#94A3B8]' : 'bg-[#CBD5E1]'}
              onClick={() => handleHabitSelect(habit.habitId, habit.habitName, habit.side, habit.habitType, deviceId)}
            />
          ))
        ) : (
          // Display message if no habits have been created
          <p>No habits have been created yet. Start by adding a new habit!</p>
        )}
      </div>
    </div>
  )
}
