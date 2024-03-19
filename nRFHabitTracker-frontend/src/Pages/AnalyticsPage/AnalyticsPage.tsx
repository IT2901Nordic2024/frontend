// Page for showing different analytics when clicking on a habit card

import Chart from '@/Components/Charts/Chart'
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

  // Destructure the 'name' from the location state
  const { name } = location.state as { name: string }

  const navigate = useNavigate()

  // Navigate to the "add goal" page
  function goToAddGoalPage() {
    // Functionality for sending the user to the page for adding goals
    navigate(`${location.pathname}/addGoal`, { state: { name: name } })
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
        <h1 className="text-4xl font-bold leading-tight text-slate-900">{name}</h1>
        <Button className={`${goalExist ? 'hidden' : 'visible'}`} onClick={goToAddGoalPage}>
          Add Goal
        </Button>
      </div>
      {/* Card for displaying goal chart */}
      <Card className={`w-[100%] mx-auto ${goalExist ? 'visible' : 'hidden'}`}>
        <CardHeader>
          <CardTitle>Goal</CardTitle>
          <CardDescription>Your goal for this habit</CardDescription>
        </CardHeader>
        <CardContent>GoalChart</CardContent>
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
    </div>
  )
}
