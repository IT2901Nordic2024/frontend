// Page for changing an exisiting habit

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
import { EditHabit } from '@/Api/api'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/shadcnComponents/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import Cookies from 'js-cookie'

export default function EditHabitPage() {
  // State to track saving process
  const [isLoading, setIsLoading] = useState(false) // State to track loading

  // Toast for user confirmation
  const { toast } = useToast()

  // Function to handle adding a habit
  async function handleSave(values: z.infer<typeof formSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      const userId = Cookies.get('userId') // Get userId from cookie

      if (!userId) {
        // Redirect the user to the login page if userId is not found in the cookie
        navigate('/')
        return // Exit early if userId is not available
      }

      // Set default values if not provided
      const habitName = values.name || 'noChange'
      const side = values.side || 'noChange'

      // Call the EditdHabit function with form field values
      await EditHabit(userId, deviceId, habitName, side, id)

      // Navigate back to the previous page
      navigateBackAfterSave({ id: id, name: habitName, side: side })
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to edit habit. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  // Defining form validation schema using zod
  const formSchema = z
    .object({
      name: z.string().optional(),
      side: z.string().optional(),
    })
    .refine((data) => {
      // Check if either name or side is different from initial values and not empty
      const nameChanged = data.name !== undefined && data.name !== '' && data.name !== name
      const sideChanged = data.side !== undefined && data.side !== '' && data.side !== String(side)

      return nameChanged || sideChanged
    })

  // Get the navigation function
  const navigate = useNavigate()

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Navigate back to the previous page
  function navigateBack() {
    navigate(-1) // This navigates back to the previous page in the history
  }

  // Navigate back to the analytics page with updated values
  function navigateBackAfterSave(updatedValues: { id: number; name?: string; side?: string }) {
    // Define an object to hold the updated values
    const updatedState: { id: number; name?: string; side?: string } = { id }

    // Check if there's a change in the name, if yes, update the name field
    if (updatedValues.name && updatedValues.name !== 'noChange') {
      updatedState.name = updatedValues.name
    } else {
      updatedState.name = name // If no change, keep the original name
    }

    // Check if there's a change in the side, if yes, update the side field
    if (updatedValues.side && updatedValues.side !== 'noChange') {
      updatedState.side = updatedValues.side
    } else {
      updatedState.side = String(side) // If no change, keep the original side
    }

    // Navigate back to the previous page with the updated state
    navigate(`/my-habits/${id}`, { state: updatedState })

    // If successfull as confirmation toast will appear on the screen
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Your changes have been saved.',
    })
  }

  // Get the current location
  const location = useLocation()

  // Destructure values from the location state
  const { id, name, side, deviceId } = location.state as { id: number; name: string; side: string; deviceId: string }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}>
      {/* Card component for changing a habit */}
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Edit '{name}'</CardTitle>
          <CardDescription>
            Make changes to your habit. If you wish to keep a value as it is, leave the field empty.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Form for changing the habit */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Current name: {name}</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="New name of your habit" value={field.value || ''} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <FormLabel>Current side: {parseInt(side) + 1 || 'None'}</FormLabel>
                  </div>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a side" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-scroll max-h-60">
                      <SelectItem value="0">Side 1</SelectItem>
                      <SelectItem value="1">Side 2</SelectItem>
                      <SelectItem value="2">Side 3</SelectItem>
                      <SelectItem value="3">Side 4</SelectItem>
                      <SelectItem value="4">Side 5</SelectItem>
                      <SelectItem value="5">Side 6</SelectItem>
                      <SelectItem value="6">Side 7</SelectItem>
                      <SelectItem value="7">Side 8</SelectItem>
                      <SelectItem value="8">Side 9</SelectItem>
                      <SelectItem value="9">Side 10</SelectItem>
                      <SelectItem value="10">Side 11</SelectItem>
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
          {/* Button to cancel changing the habit */}
          <Button variant="destructive" onClick={navigateBack}>
            Cancel
          </Button>
          {/* Conditionally render loading indicator */}
          {/* Button to save the changes */}
          {isLoading ? (
            <p>Saving changes...</p>
          ) : (
            <form onSubmit={form.handleSubmit(handleSave)}>
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
