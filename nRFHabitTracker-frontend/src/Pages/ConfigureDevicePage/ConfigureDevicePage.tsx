import { Button } from "../../Components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/card"
import { Input } from "../../Components/input"
import { Label } from "../../Components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/select"
 
export function ConfigureDevicePage() {
    const handleCancel = () => {
        // reset form and redirect to main page
    }
    const handleDeploy = () => {
        // Sumbit values to aws API gateway 
    }

  return (
    <div className="flex justify-center items-center h-screen">
    <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
      <CardHeader>
        <CardTitle>Configure Habit</CardTitle>
        <CardDescription>Deploy your new habit</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your habit" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="side">Side</Label>
              <Select>
                <SelectTrigger id="side">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="overflow-y-scroll max-h-60 bg-blue-100 shadow-lg">
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
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Counter">Counter</SelectItem>
                  <SelectItem value="Timer">Timer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDeploy}>Deploy</Button>
      </CardFooter>
    </Card>
    </div>
  )
}