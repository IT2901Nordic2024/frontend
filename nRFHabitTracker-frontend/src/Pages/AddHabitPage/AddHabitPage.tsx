// Page for addin habits to their device

import { Button } from "@/Components/shadcnComponents/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/shadcnComponents/card"
import { Input } from "@/Components/shadcnComponents/input"
import { Label } from "@/Components/shadcnComponents/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/shadcnComponents/select"

export function AddHabitPage() {
    // Function to handle adding a habit
    const handleAdd = () => {
        // Submit values to AWS API gateway 
    }

  return (
    <div className="flex justify-center items-center h-screen" style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
    {/* Card component for adding a new habit */}
    <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
      <CardHeader>
        <CardTitle>Add Habit</CardTitle>
        <CardDescription>Add a new habit tracking to your device</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form for adding a new habit */}
        <form>
          {/* Grid layout for form elements */}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {/* Label and input for habit name */}
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your habit"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              {/* Label and select dropdown for habit side */}
              <Label htmlFor="side">Side</Label>
              <Select>
                <SelectTrigger id="side">
                  <SelectValue placeholder="Choose side" />
                </SelectTrigger>
                {/* Select content with options for habit side */}
                <SelectContent position="popper" className="overflow-y-scroll max-h-60 shadow-lg">
                  <SelectItem value="Side 1">Side 1</SelectItem>
                  <SelectItem value="Side 2">Side 2</SelectItem>
                  <SelectItem value="Side 3">Side 3</SelectItem>
                  <SelectItem value="Side 4">Side 4</SelectItem>
                  <SelectItem value="Side 5">Side 5</SelectItem>
                  <SelectItem value="Side 6">Side 6</SelectItem>
                  <SelectItem value="Side 7">Side 7</SelectItem>
                  <SelectItem value="Side 8">Side 8</SelectItem>
                  <SelectItem value="Side 9">Side 9</SelectItem>
                  <SelectItem value="Side 10">Side 10</SelectItem>
                  <SelectItem value="Side 11">Side 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              {/* Label and select dropdown for habit type */}
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Choose type" />
                </SelectTrigger>
                {/* Select content with options for habit type */}
                <SelectContent position="popper">
                  <SelectItem value="Counter">Counter</SelectItem>
                  <SelectItem value="Timer">Timer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {/* Button to add the habit */}
        <Button onClick={handleAdd}>Add</Button>
      </CardFooter>
    </Card>
    </div>
  )
}