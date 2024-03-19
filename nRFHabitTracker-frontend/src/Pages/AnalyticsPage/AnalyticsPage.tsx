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
import { Input } from '@/Components/shadcnComponents/input'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/shadcnComponents/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/shadcnComponents/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Defining form validation schema using zod
const formSchema = z.object({
  question: z.string().min(3, {
    message: 'Question must be at least 3 characters.',
  }),
  target: z.number().min(1, {
    message: 'Target must be 1 or higher.',
  }),
  unit: z.string({
    required_error: 'Please select a unit.',
  }),
  frequency: z.string({
    required_error: 'Please select a frequency.',
  }),
})

export default function AnalyticsPage() {
  // Get the current location
  const location = useLocation()

  // Destructure the 'name' from the location state
  const { name } = location.state as { name: string }

  // Temp variable for holding information about whether there exist a goal
  const [goalExist, setgoalExist] = useState<boolean>(false)

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  // Defines a submit handler function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Send these values to the backend
    console.log(values)
    setgoalExist(true)
  }

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
        {/* Popover for adding a goal */}
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
              {/* Form for adding a goal */}
              <Form {...form}>
                {/* Input for question */}
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex-col justify-start items-start gap-2 flex">
                        <FormLabel>Question</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g. How many hours did I sleep?" {...field} />
                      </FormControl>
                      {form.formState.errors.question && (
                        <FormMessage>{form.formState.errors.question.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                ></FormField>
                {/* Input for target */}
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex-col justify-start items-start gap-2 flex">
                        <FormLabel>Target</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 10"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) // Parse input value to a number
                            field.onChange(isNaN(value) ? '' : value) // If NaN, set empty string, otherwise set the parsed value
                          }}
                        />
                      </FormControl>
                      {form.formState.errors.target && (
                        <FormMessage>{form.formState.errors.target.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                ></FormField>
                {/* Select for unit */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex-col justify-start items-start gap-2 flex">
                        <FormLabel>Unit</FormLabel>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="pcs">Pcs</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.unit && <FormMessage>{form.formState.errors.unit.message}</FormMessage>}
                    </FormItem>
                  )}
                ></FormField>
                {/* Select for frequency */}
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex-col justify-start items-start gap-2 flex">
                        <FormLabel>Frequency</FormLabel>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="day">Every Day</SelectItem>
                          <SelectItem value="week">Every Week</SelectItem>
                          <SelectItem value="month">Every Month</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.frequency && (
                        <FormMessage>{form.formState.errors.frequency.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                ></FormField>
              </Form>
              {/* Button to add goal */}
              {/* TODO: Make sure the popover disappears when this button is clicked */}
              <div className="grid gap-2">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Button variant="secondary" className="w-full">
                    Add
                  </Button>
                </form>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
