import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../Components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/form";
import { Input } from "../../Components/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/card";
import { useNavigate } from "react-router-dom";

// Defining form validation schema using zod
const signupSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters long.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], 
});

export function SignupPage() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
    // TODO: Implement your signup logic
    //placeholder for actual login logic
    navigate('/sensor-data'); 
  }

  // Navigate to the login page
  function goToLoginPage() {
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* Username Field */}
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                {form.formState.errors.username && (
                  <FormMessage>{form.formState.errors.username.message}</FormMessage>
                )}
              </FormItem>
            )} />
            {/* Email Field */}
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>{form.formState.errors.email.message}</FormMessage>
                )}
              </FormItem>
            )} />
            {/* Password Field */}
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage>{form.formState.errors.password.message}</FormMessage>
                )}
              </FormItem>
            )} />
            {/* Confirm Password Field */}
            <FormField name="confirmPassword" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                {form.formState.errors.confirmPassword && (
                  <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>
                )}
              </FormItem>
            )} />
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type="submit">Sign Up</Button>
          </form>
          <CardDescription style={{ cursor: "pointer", marginTop: '20px' }} onClick={goToLoginPage}>
            Already have an account? <span style={{ textDecoration: "underline" }}>Log in</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}