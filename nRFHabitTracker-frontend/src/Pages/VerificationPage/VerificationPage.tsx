// This is a verification page for new users after signing up. The user writes in the verification code they were emailed after signing up to be able to then log in.

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/Components/shadcnComponents/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/shadcnComponents/form'
import { Input } from '@/Components/shadcnComponents/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/shadcnComponents/card'
import { useLocation, useNavigate } from 'react-router-dom'
import { VerifyUser } from '@/Api/api'
import { useState } from 'react'

// Defining form validation schema using zod
const confirmationSchema = z.object({
  confirmationcode: z.string().min(1, {
    message: 'Confirmation code must be entered.',
  }),
})

export default function VerificationPage() {
  // State variables to track loading and error handling
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Get the navigation function and current location
  const navigate = useNavigate()
  const location = useLocation()

  // Destructure username from the location state
  const { username } = location.state as { username: string }

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof confirmationSchema>>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      confirmationcode: '',
    },
  })

  // Function to navigate back to the previous page
  function navigateBack() {
    navigate(-1)
  }

  // Funtion for handling the verification form
  async function verification(values: z.infer<typeof confirmationSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      // Call the VerifyUser function with input field value
      await VerifyUser(username, values.confirmationcode)

      // Navigate to login page
      navigate('/')
    } catch (error) {
      // Set error for readability
      setErrorMessage('Failed to verify user. Please try again.')
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}
    >
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Confirm your Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* confirmationcode Field */}
            <FormField
              name="confirmationcode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the code sent to your email" {...field} />
                  </FormControl>
                  {form.formState.errors.confirmationcode && (
                    <FormMessage>{form.formState.errors.confirmationcode.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {isLoading ? (
            <p>Confirming...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <form onSubmit={form.handleSubmit(verification)}>
                <Button type="submit">Confirm</Button>
              </form>
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
          )}
          <CardDescription style={{ cursor: 'pointer', marginTop: '20px' }} onClick={navigateBack}>
            Did you not get a confirmation code? <span style={{ textDecoration: 'underline' }}>Try again</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
