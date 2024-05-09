// Page for adding habit tracking to a user's device

import { Button } from '@/Components/shadcnComponents/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/shadcnComponents/card'
import { Input } from '@/Components/shadcnComponents/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/shadcnComponents/select'
import { addHabit } from '@/Api/api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/shadcnComponents/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import { useState } from 'react'
import Cookies from 'js-cookie'

// Defining form validation schema using zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(20, {
      message: 'Name can not be longer than 20 characters.',
    }),
  side: z.string({
    required_error: 'Please select a side.',
  }),
  type: z.string({
    required_error: 'Please select a type.',
  }),
})

export function AddHabitPage() {
  // States to track saving process and error handling
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Get the navigation function and current location
  const navigate = useNavigate()
  const location = useLocation()

  // Toast for user confirmation
  const { toast } = useToast()

  // Get userId from cookie
  const userId = Cookies.get('userId')

  // Destructure deviceId from the location state
  const { deviceId } = location.state as { deviceId: string }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  // Navigate back to the previous page
  function navigateBack() {
    navigate(-1)
  }

  // Function to handle adding a habit
  async function handleAdd(values: z.infer<typeof formSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      if (!userId) {
        // Redirect the user to the login page if userId is not found in cookies
        navigate('/')
        return // Exit early if userId is not available
      }

      // Call the addHabit function with form field values
      await addHabit(userId, deviceId, values.name, values.type, values.side)

      // Navigate back to the previous page
      navigateBack()

      // If successfull a confirmation toast will appear on the screen
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Your habit has been added.',
      })
    } catch (error) {
      // Set error for readability
      setErrorMessage('Failed to add habit. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}>
      {/* Card component for adding a new habit */}
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Add Habit</CardTitle>
          <CardDescription>Add a new habit tracking to your device</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Form for adding a new habit */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Name of your habit" value={field.value || ''} onChange={field.onChange} />
                  </FormControl>
                  {form.formState.errors.name && <FormMessage>{form.formState.errors.name.message}</FormMessage>}
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Side</FormLabel>
                  </div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="select-side-trigger">
                        <SelectValue placeholder="Select a side" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-scroll max-h-60">
                      <SelectItem value="0">Side 1</SelectItem>
                      <SelectItem value="1">Side 2</SelectItem>
                      <SelectItem value="2">Side 3</SelectItem>
                      <SelectItem value="3">Side 4</SelectItem>
                      <SelectItem className="select-side-5" value="4">
                        Side 5
                      </SelectItem>
                      <SelectItem value="5">Side 6</SelectItem>
                      <SelectItem value="6">Side 7</SelectItem>
                      <SelectItem value="7">Side 8</SelectItem>
                      <SelectItem value="8">Side 9</SelectItem>
                      <SelectItem value="9">Side 10</SelectItem>
                      <SelectItem value="10">Side 11</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.side && <FormMessage>{form.formState.errors.side.message}</FormMessage>}
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Type</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="select-type-trigger">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem className="select-count-trigger" value="count">
                        Count
                      </SelectItem>
                      <SelectItem value="time">Time</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.type && <FormMessage>{form.formState.errors.type.message}</FormMessage>}
                </FormItem>
              )}
            ></FormField>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          {/* Button to cancel adding a habit */}
          <Button variant="destructive" onClick={navigateBack}>
            Cancel
          </Button>
          {/* Conditionally render loading indicator */}
          {/* Button to add the habit */}
          {isLoading ? (
            <p>Adding habit...</p>
          ) : (
            <form onSubmit={form.handleSubmit(handleAdd)}>
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
