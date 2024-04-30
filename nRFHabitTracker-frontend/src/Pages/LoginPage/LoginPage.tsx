// This page represents a login page where users can input their credentials to log in.

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
import { useNavigate } from 'react-router-dom'
import { Login } from '@/Api/api'
import { useState } from 'react'
import Cookies from 'js-cookie'

// Defining form validation schema using zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'A valid username must be entered.',
  }),
  password: z.string().min(6, {
    message: 'A valid password must be entered.',
  }),
})

export function LoginPage() {
  // State to track loading and error handling
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // Get the navigation function
  const navigate = useNavigate()

  // Function for sending the user to the signup page
  function goToSignupPage() {
    navigate('/signup')
  }

  // Defines a submit handler function for logging in
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      // Call the Login function with form field values
      const response = await Login(values.username, values.password)
      const userId = response.userId

      // Save userId in a cookie
      Cookies.set('userId', userId, { expires: 1 }) // Expires in 1 day

      // Navigate to the main page if user is successfully logged in
      navigate('/my-habits')
    } catch (error) {
      // Set error for readability
      setErrorMessage('Failed to log in. Please try again.')
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
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-[7px] flex">
                    <FormLabel>Username</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  {form.formState.errors.username && (
                    <FormMessage>{form.formState.errors.username.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div style={{ marginBottom: '20px' }} />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-[7px] flex">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>{form.formState.errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {isLoading ? (
            <p>Logging in...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button type="submit">Login</Button>
              </form>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          )}
          <div style={{ marginBottom: '20px' }} />
          <CardDescription style={{ cursor: 'pointer' }} onClick={goToSignupPage}>
            Don't have an account? <span style={{ textDecoration: 'underline' }}>Sign up</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
