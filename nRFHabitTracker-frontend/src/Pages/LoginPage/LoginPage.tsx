// This page represents a login page where users can input their credentials to log in.
// It utilizes React hooks and form handling using react-hook-form and zod for validation.

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

// Defining form validation schema using zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters long.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
})

export function LoginPage() {
  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  // Defines a submit handler function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values, for example, check if the information match a user on the server
    console.log(values)
    //placeholder for actual login logic
    navigate('/my-habits')
  }

  // Navigate to the signup page
  function goToSignupPage() {
    // Functionality for sending the user to the signup page
    navigate('/signup')
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type="submit">Login</Button>
          </form>
          <div style={{ marginBottom: '20px' }} />
          <CardDescription style={{ cursor: 'pointer' }} onClick={goToSignupPage}>
            Don't have an account? <span style={{ textDecoration: 'underline' }}>Sign up</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
