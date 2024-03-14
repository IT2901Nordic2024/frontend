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
import { useLocation } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/shadcnComponents/popover'
import { Label } from '@/Components/shadcnComponents/label'
import { Input } from '@/Components/shadcnComponents/input'
import { useState } from 'react'

export default function AnalyticsPage() {
  // Get the current location
  const location = useLocation()

  // Destructure the 'name' from the location state
  const { name } = location.state as { name: string }

  // State to toggle visibility of the "Goal" card
  const [showGoalCard, setShowGoalCard] = useState(false)

  // State to toggle visibility of the "Add Goal" button
  const [showGoalButton, setshowGoalButton] = useState(true)

  // State to toggle visibility of the popover
  const [showPopover, setShowPopover] = useState(true)

  const handleAddGoal = () => {
    setShowGoalCard(true)
    setshowGoalButton(false)
    setShowPopover(false)
  }

  const handleEditGoal = () => {
    // TODO: create function for editing a goal
  }

  const handleDeleteGoal = () => {
    setShowGoalCard(false)
    setshowGoalButton(true)
  }

  const handleShowPopover = () => {
    setShowPopover(true)
  }

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">{name}</h1>
        <Popover>
          <PopoverTrigger>
            <Button className={`${showGoalButton ? 'visible' : 'hidden'}`} onClick={handleShowPopover}>
              Add Goal
            </Button>
          </PopoverTrigger>
          <PopoverContent className={`${showPopover ? 'visible' : 'hidden'}`}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add a Goal</h4>
                <p className="text-sm text-muted-foreground">Add a goal for your habit</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="question">Question</Label>
                  <Input id="question" placeholder="e.g. How many hours did I sleep?" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="target">Target</Label>
                  <Input id="target" placeholder="e.g. 10" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="e.g. Hours" className="col-span-2 h-8" />
                </div>
                <Button variant="secondary" onClick={handleAddGoal}>
                  Add
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Card for displaying history chart */}
      <Card className={`w-[100%] mx-auto ${showGoalCard ? '' : 'hidden'}`}>
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
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Your history for this habit</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart></Chart>
        </CardContent>
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
