/*
This page allows users to connect a device to their account for tracking habits. 
It provides a form where users can input a device code to establish a connection. 
The form includes validation for the device code input field, ensuring it meets the required criteria.

The page layout consists of a Card component containing a header, content section, and footer. 
The header displays a title and description of the page. 
The content section includes a form with an input field for the device code. 
Validation messages are displayed if the user enters an invalid device code.
The footer contains "Cancel" and "Connect" buttons. 
Clicking the "Cancel" button cancels the operation, while clicking the "Connect" button submits the form data.

Imports:
- zodResolver, useForm from react-hook-form for form handling and validation
- z from zod for defining form validation schema
- Button component from custom button module
- Form-related components (Form, FormControl, FormField, FormItem, FormLabel, FormMessage) from custom form module
- Input component from custom input module
- Card-related components (Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle) from custom card module

Functions:
- onSubmit(values): Handles form submission.
- onCancel(): Handles cancel action, placeholder for redirecting or resetting the form.

Page Structure:
- Card component with minWidth set to ensure a minimum width.
- CardHeader displaying the title and description of the page.
- CardContent containing the form for connecting a device.
- Form component containing form elements, including input field for device code.
- CardFooter with "Cancel" and "Connect" buttons, each with respective event handlers.
*/

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../Components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/form"
import { Input } from "../../Components/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/card"

// Defining form validation schema using zod
const formSchema = z.object({
  deciveCode: z.string().min(2, {
    message: "Invalid code.",
  }),
})

export function ConnectDevicePage() {
  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deciveCode: "",
    },
  })
  
  // Defines a submit handler function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values, for example, submit to server
    console.log(values)
  }

  // Defines a cancel action handler function
  function onCancel() {
    // Handle cancel action here, for example, redirect to another page or reset form
  }

  return (
    <div className="flex justify-center items-center h-screen">
    <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
      <CardHeader>
        <CardTitle>Connect a device</CardTitle>
        <CardDescription>Connect a device to start tracking your habits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <FormField
              control={form.control}
              name="deciveCode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-[7px] flex">
                    <FormLabel>Device code</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </Form>
      </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type="submit">Connect</Button>
          </form>        
        </CardFooter>
    </Card>
    </div>
  )
}
