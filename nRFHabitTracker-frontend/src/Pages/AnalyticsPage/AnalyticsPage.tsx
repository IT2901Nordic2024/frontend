// Page for showing different analytics when clicking on a habit card

//import Chart from '@/Components/Charts/Chart'
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
import { useState } from 'react'

export default function AnalyticsPage() {
  // Get the current location
  const location = useLocation()

  // Destructure the values from the location state
  const { id, name, side, type } = location.state as { id: number; name: string; side: string; type: string }

  const navigate = useNavigate()

  // Navigate to the "add goal" page
  function goToAddGoalPage() {
    // Functionality for sending the user to the page for adding goals
    navigate(`${location.pathname}/addGoal`, { state: { name: name } })
  }

  // Navigate to the "edit habit" page
  function goToEditHabitPage() {
    // Functionality for sending the user to the page for changing their habit
    navigate(`${location.pathname}/editHabit`, { state: { id: id, name: name, side: side, type: type } })
  }

  // Temp variable for holding information about whether there exist a goal
  const [goalExist, setgoalExist] = useState<boolean>(true)

  // Function to handle editing a goal
  const handleEditGoal = () => {
    // TODO: create function for editing a goal
  }

  // Function to handle deleting a goal
  const handleDeleteGoal = () => {
    setgoalExist(false)
    // TODO: create function for deleting the goal in backend
  }

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight overflow-hidden text-slate-900">{name}</h1>
        <Button className={`ml-4 ${goalExist ? 'hidden' : 'visible'}`} onClick={goToAddGoalPage}>
          Add Goal
        </Button>
      </div>
      {/* Card for displaying goal chart */}
      <Card className={`w-[100%] mx-auto ${goalExist ? 'visible' : 'hidden'}`}>
        <CardHeader>
          <CardTitle>Goal</CardTitle>
          <CardDescription>Your goal for this habit</CardDescription>
        </CardHeader>
        {/* Sample data => to be replaced */}
        <CardContent>{<GoalsChart today={1} week={7} target={14} question={'How many hours did i hug threes?'} frequency={'week'}/>}</CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Button variant="secondary" onClick={handleEditGoal}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteGoal}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      {/* Card for displaying history chart */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Your history for this habit</CardDescription>
        </CardHeader>
        <CardContent>{/* <Chart></Chart> */}</CardContent>
      </Card>
      {/* Example card */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>Just to show what is possible and how it will look</CardContent>
      </Card>
      <div className="flex justify-between">
        {/* Button to edit habit */}
        <Button onClick={goToEditHabitPage}>Edit Habit</Button>
        {/* Button to delete habit */}
        {/* TODO: Make this functional */}
        <Button variant="destructive">Delete Habit</Button>
      </div>
    </div>
  )
}
