// Page for updating user information

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
import { Label } from '@/Components/shadcnComponents/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/shadcnComponents/tabs'
import { UserInformation, getUserInformation } from '@/Api/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/Components/shadcnComponents/use-toast'

export function AccountPage() {
  // State to store user data
  const [userData, setUserData] = useState<UserInformation | null>(null)

  // Toast for user confirmation
  const { toast } = useToast()

  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserData = async () => {
      try {
        const userInfo = await getUserInformation('0') // TODO: replace '0' with the actual user ID
        setUserData(userInfo)
      } catch (error) {
        // TODO: Handle errors
        console.error('Error fetching user information:', error)
      }
    }
    fetchUserData() // Call the function to fetch user information
  }, []) // Empty dependency array ensures useEffect runs only once

  function saveChanges() {
    // TODO: Add functionality for saving changes to the account
    // For now a toast will appear
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to save changes.',
    })
  }

  function savePassword() {
    // TODO: Add functionality for saving password changes
    // For now a toast will appear
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to save changes.',
    })
  }

  function signOut() {
    // TODO: Add functionality for signing out
    // For now a toast will appear
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to sign out.',
    })
  }

  return (
    <div className="flex flex-col h-screen" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Heading and sign out button */}
      <div className="flex justify-between p-5">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">My Account</h1>
        <Button onClick={signOut}>Sign out</Button>
      </div>

      <div className="flex flex-grow justify-center items-center p-5">
        <div className="flex flex-col w-full max-w-lg">
          {/* Tabs component for switching between account and password sections */}
          <Tabs defaultValue="account">
            {/* TabsList to display tab triggers */}
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            {/* TabsContent for the account section */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here. Click save when you are done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Input for username */}
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder={userData ? userData.username : 'Trouble fetching your information...'}
                    />
                  </div>
                  {/* Input for email */}
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder={userData ? userData.email : 'Trouble fetching your information...'}
                    />
                  </div>
                </CardContent>
                {/* Button to save changes */}
                <CardFooter>
                  {/* TODO: Add functionality when clicking button */}
                  <Button onClick={saveChanges}>Save changes</Button>
                </CardFooter>
              </Card>
              {/* TabsContent for the password section */}
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Input for current password */}
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  {/* Input for new password */}
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                {/* Button to save password */}
                <CardFooter>
                  {/* TODO: Add functionality when clicking button */}
                  <Button onClick={savePassword}>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
