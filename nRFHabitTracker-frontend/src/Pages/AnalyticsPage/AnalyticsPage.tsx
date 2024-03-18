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
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/Components/shadcnComponents/popover'
import { Label } from '@/Components/shadcnComponents/label'
import { Input } from '@/Components/shadcnComponents/input'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/shadcnComponents/select'

// TODO: Add validation for fields

export default function AnalyticsPage() {
  // Get the current location
  const location = useLocation()

  // Destructure the 'name' from the location state
  const { name } = location.state as { name: string }

  // Temp variable for holding information about whether there exist a goal
  const [goalExist, setgoalExist] = useState<boolean>(false)

  const [question, setQuestion] = useState<string>('')
  const [target, setTarget] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const [validInputs, setValidInputs] = useState<boolean>(false)

  // Function to check if all input fields are filled
  const validateInputs = () => {
    if (question && target && unit && frequency) {
      setValidInputs(true)
    } else {
      setValidInputs(false)
    }
  }

  // Handlers for input changes
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
    validateInputs()
  }

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value)
    validateInputs()
  }

  const handleUnitChange = (value: string) => {
    setUnit(value)
    validateInputs()
  }

  const handleFrequencyChange = (value: string) => {
    setFrequency(value)
    validateInputs()
  }

  const handleAddGoal = () => {
    if (validInputs) {
      setgoalExist(true)
    }
  }

  const handleEditGoal = () => {
    // TODO: create function for editing a goal
  }

  const handleDeleteGoal = () => {
    setgoalExist(false)
  }

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">{name}</h1>
        <Popover>
          <PopoverTrigger>
            <Button className={`${goalExist ? 'hidden' : 'visible'}`}>Add Goal</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add a Goal</h4>
                <p className="text-sm text-muted-foreground">Add a goal for your habit</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    placeholder="e.g. How many hours did I sleep?"
                    className={`col-span-2 h-8`}
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </div>
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="target">Target</Label>
                  <Input
                    id="target"
                    placeholder="e.g. 10"
                    className={`col-span-2 h-8`}
                    value={target}
                    onChange={handleTargetChange}
                  />
                </div>
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="pcs">Pcs</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-rows-2 items-center">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="day">Every Day</SelectItem>
                        <SelectItem value="week">Every Week</SelectItem>
                        <SelectItem value="month">Every Month</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <PopoverClose>
                  <Button variant="secondary" onClick={handleAddGoal} className="w-full" disabled={!validInputs}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Card for displaying history chart */}
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
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>Just to show what is possible and how it will look</CardContent>
      </Card>
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>Just to show what is possible and how it will look</CardContent>
      </Card>
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>Just to show what is possible and how it will look</CardContent>
      </Card>
    </div>
  )
}
