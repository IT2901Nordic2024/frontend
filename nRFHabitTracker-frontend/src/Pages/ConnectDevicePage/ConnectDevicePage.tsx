// Page that alloww users to connect a device to their account

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

// Defining form validation schema using zod
const formSchema = z.object({
  deviceCode: z.string().min(2, {
    message: 'Invalid code.',
  }),
})

export function ConnectDevicePage() {
  // Defines form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceCode: '',
    },
  })

  // Defines a submit handler function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values, for example, submit to server
    console.log(values)
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}
    >
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Connect a device</CardTitle>
          <CardDescription>Use your devide ID to connect a device</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form component for handling form submission */}
          <Form {...form}>
            {/* Form field for device code input */}
            <FormField
              control={form.control}
              name="deviceCode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex-col justify-start items-start gap-[7px] flex">
                    <FormLabel>Device ID</FormLabel>
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
        <CardFooter>
          {/* Footer with a Connect button */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type="submit">Connect</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
