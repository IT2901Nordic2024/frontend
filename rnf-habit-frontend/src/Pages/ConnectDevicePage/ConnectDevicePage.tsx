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

const formSchema = z.object({
  deciveCode: z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
})

export function ConnectDevicePage() {
  // Defines form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deciveCode: "",
    },
  })
  
  // Defines a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    console.log(values)
  }

  return (
    <div className="w-[298px] h-[170px] p-6 bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-start gap-[22px] inline-flex">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
          <Button type="submit">Connect</Button>
        </form>
      </Form>
    </div>
  )
}
