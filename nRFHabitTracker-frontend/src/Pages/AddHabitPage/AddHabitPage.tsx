// Page for addin habits to their device

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
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/Components/shadcnComponents/use-toast'
import { useState } from 'react'

export function AddHabitPage() {
  // State to track saving process
  const [isLoading, setIsLoading] = useState(false) // State to track loading

  // Toast for user confirmation
  const { toast } = useToast()

  // Function to handle adding a habit
  async function handleAdd(values: z.infer<typeof formSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      // TODO: Replace the user ID with the actual user ID when users are implemented as well as device ID
      const userId = '0'
      const deviceId = 'MyIotThing'

      // Call the addHabit function with form field values
      await addHabit(userId, deviceId, values.name, values.type, values.side)

      // Navigate back to the previous page
      navigateBack()
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to add habit. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  // Defining form validation schema using zod
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    side: z.string({
      required_error: 'Please select a side.',
    }),
    type: z.string({
      required_error: 'Please select a type.',
    }),
  })

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  // Get the navigation function
  const navigate = useNavigate()

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Navigate back to the previous page
  function navigateBack() {
    navigate(-1) // This navigates back to the previous page in the history

    // If successfull as confirmation toast will appear on the screen
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Your habit has been added.',
    })
  }

  return (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
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
                    <FormLabel>Type</FormLabel>
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
        <CardFooter>
          {/* Conditionally render loading indicator */}
          {/* Button to add the habit */}
          {isLoading ? (
            <p>Adding habit...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <form onSubmit={form.handleSubmit(handleAdd)}>
                <Button variant="secondary">Add</Button>
              </form>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
