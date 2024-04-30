// Page for showing different analytics when clicking on a habit card

import GoalsChart from '@/Components/Charts/GoalsChart/GoalsChart'
import { Button } from '@/Components/shadcnComponents/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/Components/shadcnComponents/card'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeleteHabit, FetchHabit, getHabitGoal } from '@/Api/api'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import { ToastAction } from '@/Components/shadcnComponents/toast'
import TimeChart from '@/Components/Charts/TimeChart'
import CountChart from '@/Components/Charts/CountChart'
import Calendar from '@/Components/Calender/Calender'
import Summary from '@/Components/Summary/Summary'
import Cookies from 'js-cookie'

interface Habit {
  habitId: number
  userId: number
  habitEvents: Array<[number, number]>
}

interface Goal {
  question: string
  target: string
  frequency: string
}

export default function AnalyticsPage() {
  // States to track saving process, error handling, Habit object and Goal object
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [habit, setHabit] = useState<Habit | null>(null)
  const [goal, setGoal] = useState<Goal | null>(null)

  // Get the navigation function and current location
  const navigate = useNavigate()
  const location = useLocation()

  // Toast for user confirmation
  const { toast } = useToast()

  // Get userId from cookie
  const userId = Cookies.get('userId')

  // Destructure the values from the location state
  const { id, name, side, type, deviceId } = location.state as {
    id: number
    name: string
    side: string
    type: string
    deviceId: string
  }

  // Function for deleting a habit
  async function deleteHabit(userId: string, habitId: number) {
    try {
      // Set loading to true
      setIsDeleting(true)

      // API function
      await DeleteHabit(userId, habitId)

      // Navigate back to the main page
      navigate(`/my-habits`)

      // If successfull a confirmation toast will appear on the screen
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Your habit has been deleted.',
      })
    } catch (error) {
      // Set error for readability
      setErrorMessage('Failed to delete habit. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsDeleting(false)
    }
  }

  // Function for fetching habit data
  async function fetchHabitData(userId: string, habitId: number) {
    try {
      const habitData = await FetchHabit(userId, habitId)
      setHabit(habitData)
    } catch (error) {
      throw error
    }
  }

  // Function for fetching habit goal data
  async function fetchHabitGoal(userId: string, habitId: string) {
    try {
      const goalData = await getHabitGoal(userId, habitId)
      if (goalData) {
        setGoal(goalData as Goal)
      }
    } catch (error) {
      throw error
    }
  }

  // UseEffect for fetching habit and goal data if there exist a userId in cookies
  useEffect(() => {
    if (userId) {
      fetchHabitData(userId, id)
      fetchHabitGoal(userId, String(id))
    } else {
      navigate('/')
    }
  }, [id, userId, navigate])

  // Navigation function to the "edit habit" page with needed state variables
  function goToEditHabitPage() {
    navigate(`${location.pathname}/editHabit`, { state: { id: id, name: name, side: side, deviceId: deviceId } })
  }

  // Navigation function to the "add goal" page with needed state variables
  function goToAddGoalPage() {
    navigate(`${location.pathname}/addGoal`, { state: { name: name, habitId: id } })
  }

  // Navigation function to the "edit goal" page with needed state variables
  function goToEditGoalPage() {
    if (goal) {
      navigate(`${location.pathname}/editGoal`, {
        state: {
          name: name,
          habitId: id,
          question: goal.question,
          target: goal.target,
          frequency: goal.frequency,
        },
      })
    }
  }

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight overflow-hidden text-slate-900">{name}</h1>
        {/* Button to delete habit */}
        {isDeleting ? (
          <p>Deleting habit...</p>
        ) : (
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                variant: 'destructive',
                title: 'Confirm your action',
                description: 'Are you sure you want to delete your habit forever?',
                action: (
                  <ToastAction
                    altText="Yes"
                    onClick={() => {
                      if (userId) {
                        deleteHabit(userId, id)
                      }
                    }}
                  >
                    Yes
                  </ToastAction>
                ),
              })
            }}
          >
            Delete Habit
          </Button>
        )}
      </div>
      {/* Card for displaying goal chart */}
      <Card className={`w-[100%] mx-auto ${goal ? 'visible' : 'hidden'}`}>
        <CardHeader>
          <CardTitle>Goal ⭐</CardTitle>
          <CardDescription>Your goal for this habit</CardDescription>
        </CardHeader>
        {/* Sample data => to be replaced */}
        <CardContent>
          {goal ? (
            <GoalsChart
              events={habit ? habit.habitEvents : []}
              type={type}
              target={Number(goal.target)}
              question={goal.question + '?'}
              frequency={goal.frequency}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="secondary" onClick={goToEditGoalPage}>
            Edit
          </Button>
        </CardFooter>
      </Card>
      {/* Card for displaying history chart */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>History 📜</CardTitle>
          <CardDescription>Your history for this habit</CardDescription>
        </CardHeader>
        {/*if type is time, use TimeChart, else use CountChart*/}
        <CardContent>
          {habit ? (
            type === 'time' ? (
              <TimeChart events={habit.habitEvents} />
            ) : (
              <CountChart events={habit.habitEvents} />
            )
          ) : (
            <p>Loading data...</p>
          )}
        </CardContent>
      </Card>
      {/* Analytics section */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Analytics 🔎</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {habit ? (
            type === 'time' ? (
              <div className="flex-1">
                <Calendar events={habit.habitEvents} timerHabit={true} />
              </div>
            ) : (
              <div className="flex-1">
                <Calendar events={habit.habitEvents} timerHabit={false} />
              </div>
            )
          ) : (
            <p>Loading data...</p>
          )}

          <div className="flex-1">
            {habit ? (
              type === 'time' ? (
                <div className="flex-1">
                  <Summary events={habit.habitEvents} timerHabit={true} />
                </div>
              ) : (
                <div className="flex-1">
                  <Summary events={habit.habitEvents} timerHabit={false} />
                </div>
              )
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Error message */}
      {errorMessage && <p className="text-red-500 m-5">{errorMessage}</p>}
      <div className="flex justify-between">
        {/* Button to edit habit */}
        <Button onClick={goToEditHabitPage}>Edit Habit</Button>
        {/* Button to add goal */}
        <Button className={`ml-4 ${goal ? 'hidden' : 'visible'}`} onClick={goToAddGoalPage}>
          Add Goal
        </Button>
      </div>
    </div>
  )
}
