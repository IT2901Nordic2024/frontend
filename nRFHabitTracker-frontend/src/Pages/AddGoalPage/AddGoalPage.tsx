// Page for adding a goal to a habit

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
import { useToast } from '@/Components/shadcnComponents/use-toast'

// Defining form validation schema using zod
const formSchema = z.object({
  question: z.string().min(1, {
    message: 'Question must be at least 1 character.',
  }),
  target: z.number().min(1, {
    message: 'Target must be 1 or higher.',
  }),
  frequency: z.string({
    required_error: 'Please select a frequency.',
  }),
})

export default function AddGoalPage() {
  // States to track loading and error handling
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Toast for user confirmation
  const { toast } = useToast()

  // Get userId from cookie
  const userId = Cookies.get('userId')

  // Get the navigation function and current location
  const navigate = useNavigate()
  const location = useLocation()

  // Destructure the name and habitId from the location state
  const { name, habitId } = location.state as { name: string; habitId: string }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  })

  // Navigate back to the previous page in the history
  function navigateBack() {
    navigate(-1)
  }

  // Defines a submit handler function for setting a habit goal
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      if (!userId) {
        // Redirect the user to the login page if userId is not found in cookies
        navigate('/')
        return // Exit early if userId is not available
      }

      // Call the setHabitGoal function with form field values
      await setHabitGoal(userId, habitId, values.question, values.target, values.frequency)

      // Navigate to the analytics page if goal is successfully added
      navigate(`/my-habits/${habitId}`, { state: { id: habitId, name: name } })

      // If successfull a confirmation toast will appear on the screen
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Your goal has been added.',
      })
    } catch (error) {
      // Set a user friendly error message
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
          <CardTitle>Add a Goal for '{name}'</CardTitle>
          <CardDescription>Add a goal for your habit</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
                    <FormLabel>Target</FormLabel>
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
                      <SelectTrigger className="select-frequency-trigger">
                        <SelectValue placeholder="Select a frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="select-frequency-day" value="day">
                        Every Day
                      </SelectItem>
                      <SelectItem value="week">Every Week</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.frequency && (
                    <FormMessage>{form.formState.errors.frequency.message}</FormMessage>
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
            <p>Adding goal...</p>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button variant="secondary">Add</Button>
            </form>
          )}
        </CardFooter>
        {/* Error message */}
        {!isLoading && errorMessage && <p className="text-red-600 flex justify-center mb-4">{errorMessage}</p>}
      </Card>
    </div>
  )
}
