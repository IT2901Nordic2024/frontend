// This page sign-up form for new users,
// It utilizes react-hook-form and zod for handling form state and validations, and navigates to the main page upon successful sign-up or to the login page for existing users.

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
import { UserRegistration } from '@/Api/api'
import { useState } from 'react'

// Define the password regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

// Defining form validation schema using zod
const signupSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters long.',
    }),
    email: z.string().email({
      message: 'Invalid email address.',
    }),
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters long.',
      })
      .refine((value) => passwordRegex.test(value), {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
      }),
    confirmPassword: z.string(),
    deviceid: z.string().min(6, {
      message: 'Device ID must be at least 6 characters long.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export function SignupPage() {
  // State to track loading
  const [isLoading, setIsLoading] = useState(false)

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('')

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      deviceid: '',
    },
  })
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      // Set loading to true
      setIsLoading(true)

      // Call the UserRegistration function with form field values
      await UserRegistration(values.username, values.email, values.deviceid, values.password)

      // Navigate to the verification page if user is successfully created
      navigate('/verify-user', { state: { username: values.username } })
    } catch (error) {
      // Set error for readability
      if (error instanceof Error) {
        if (error.message.includes('LimitExceededException')) {
          setErrorMessage('Failed to sign up due to too many tries today. Please try again later.')
        } else if (error.message.includes('UsernameExistsException')) {
          setErrorMessage('The chosen username already exists. Please choose another username.')
        } else {
          // Default error message for other types of errors
          setErrorMessage('Failed to sign up. Please try again.')
        }
      }
    } finally {
      // Set loading to false when the loading finishes (whether successful or not)
      setIsLoading(false)
    }
  }

  // Navigate to the login page
  function goToLoginPage() {
    navigate('/')
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: 'calc(100vh - 56px)', overflow: 'auto' }}
    >
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* Username Field */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  {form.formState.errors.username && (
                    <FormMessage>{form.formState.errors.username.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  {form.formState.errors.email && <FormMessage>{form.formState.errors.email.message}</FormMessage>}
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>{form.formState.errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Confirm Password Field */}
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  {form.formState.errors.confirmPassword && (
                    <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Device ID Field */}
            <FormField
              name="deviceid"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your device ID" {...field} />
                  </FormControl>
                  {form.formState.errors.deviceid && (
                    <FormMessage>{form.formState.errors.deviceid.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {isLoading ? (
            <p>Signing up...</p>
          ) : (
            <div className="flex flex-col gap-2">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button type="submit">Sign Up</Button>
              </form>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          )}
          <CardDescription style={{ cursor: 'pointer', marginTop: '20px' }} onClick={goToLoginPage}>
            Already have an account? <span style={{ textDecoration: 'underline' }}>Log in</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
