import { Input } from '@/Components/shadcnComponents/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/shadcnComponents/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/shadcnComponents/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/Components/shadcnComponents/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/shadcnComponents/card'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { setHabitGoal } from '@/Api/api'

// Defining form validation schema using zod
const formSchema = z
  .object({
    question: z.string().optional(),
    target: z.number().optional(),
    unit: z.string().optional(),
    frequency: z.string().optional(),
  })
  .refine(
    (data) => {
      // Check if at least one field has a value
      return Object.values(data).some((value) => value !== null && value !== undefined && value !== '')
    },
    {
      // Custom error message if no field has been changed
      message: 'At least one field must be changed',
    }
  )

export default function AddGoalPage() {
  // State to track loading
  const [isLoading, setIsLoading] = useState(false)

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Get userId from cookie
  const userId = Cookies.get('userId')

  // Get the navigation function
  const navigate = useNavigate()

  // Navigate back to the previous page
  function navigateBack() {
    navigate(-1) // This navigates back to the previous page in the history
  }

  // Get the current location
  const location = useLocation()

  // Destructure the 'name' and habitId from the location state
  const { name, habitId, unit, question, target, frequency } = location.state as {
    name: string
    habitId: string
    unit: string
    question: string
    target: string
    frequency: string
  }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  // Defines a submit handler function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      // Set loading to true
      setIsLoading(true)

      if (!userId) {
        // Redirect the user to the login page if userId is not found in the cookie
        navigate('/')
        return // Exit early if userId is not available
      }

      // Set default values if not provided
      const questionValue = values.question || question
      const targetValue = values.target || target
      const unitValue = values.unit || unit
      const frequencyValue = values.frequency || frequency

      // Call the setHabitGoal function with form field values
      await setHabitGoal(userId, habitId, questionValue, Number(targetValue), unitValue, frequencyValue)

      // Navigate to the analytics page if goal is successfully edited
      navigate(`/my-habits/${habitId}`, { state: { id: habitId, name: name } })
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to add goal. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}>
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Edit the Goal for '{name}'</CardTitle>
          <CardDescription>
            Make changes to your goal. If you wish to keep a value as it is, leave the field empty.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Form for editing a goal */}
          <Form {...form}>
            {/* Input for question */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Current question: {question}</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. How many hours did I sleep"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
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
                    <FormLabel>Current target: {target}</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 10"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        field.onChange(isNaN(value) ? '' : value)
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.target && <FormMessage>{form.formState.errors.target.message}</FormMessage>}
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
                    <FormLabel>Current unit: {unit}</FormLabel>
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
                    <FormLabel>Current frequency: {frequency}</FormLabel>
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
                  {/* Display error message */}
                  {Object.keys(form.formState.errors).length > 0 && (
                    <p className="text-red-500">At least one field must be changed.</p>
                  )}
                </FormItem>
              )}
            ></FormField>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          {/* Button to cancel adding a goal */}
          <Button variant="destructive" onClick={navigateBack}>
            Cancel
          </Button>
          {/* Button to add goal */}
          {isLoading ? (
            <p>Saving changes...</p>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button variant="secondary">Save changes</Button>
            </form>
          )}
        </CardFooter>
        {/* Error message */}
        {!isLoading && errorMessage && <p className="text-red-500 flex justify-center mb-4">{errorMessage}</p>}
      </Card>
    </div>
  )
}