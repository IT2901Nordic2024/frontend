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
import { EditHabit } from '../../Api/api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/shadcnComponents/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EditHabitPage() {
  // Function to handle adding a habit
  async function handleSave(values: z.infer<typeof formSchema>) {
    try {
      // TODO: Replace the user ID with the actual user ID when users are implemented as well as device ID
      const userId = '0'
      const deviceId = 'firmwareSimulatorThing'

      // Call the addHabit function with form field values
      await EditHabit(userId, deviceId, values.name, values.type, values.side, id)

      // Navigate back to the previous page
      navigateBack()
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to edit habit. Please try again.')
    }
  }

  // Defining form validation schema using zod
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    side: z.string(),
    type: z.string(),
  })

  // Get the navigation function
  const navigate = useNavigate()

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Navigate back to the previous page
  function navigateBack() {
    navigate(-1) // This navigates back to the previous page in the history
  }

  // Get the current location
  const location = useLocation()

  // Destructure values from the location state
  const { id, name, side, type } = location.state as { id: number; name: string; side: number; type: string }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
      {/* Card component for changing a habit */}
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Edit '{name}'</CardTitle>
          <CardDescription>
            Make changes to your habit. If you wish to keep a value as it is, fill in the old one as you can see above the field.
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
                    <FormLabel>Current side: {side || 'None'}</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a side" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-scroll max-h-60">
                      <SelectItem value="1">Side 1</SelectItem>
                      <SelectItem value="2">Side 2</SelectItem>
                      <SelectItem value="3">Side 3</SelectItem>
                      <SelectItem value="4">Side 4</SelectItem>
                      <SelectItem value="5">Side 5</SelectItem>
                      <SelectItem value="6">Side 6</SelectItem>
                      <SelectItem value="7">Side 7</SelectItem>
                      <SelectItem value="8">Side 8</SelectItem>
                      <SelectItem value="9">Side 9</SelectItem>
                      <SelectItem value="10">Side 10</SelectItem>
                      <SelectItem value="11">Side 11</SelectItem>
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
                    <FormLabel>Current type: {type}</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="count">Count</SelectItem>
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
          {/* Button to save the changes */}
          <form onSubmit={form.handleSubmit(handleSave)}>
            <Button variant="secondary">Save changes</Button>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {/* Button to cancel changing the habit */}
          <Button variant="destructive" onClick={navigateBack}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
