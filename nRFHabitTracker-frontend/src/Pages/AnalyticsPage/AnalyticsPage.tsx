// Page for showing different analytics when clicking on a habit card

import Chart from "@/Components/Charts/Chart";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/Components/shadcnComponents/card";
import { useLocation } from "react-router-dom";

export default function AnalyticsPage() {
  // Get the current location
  const location = useLocation();

  // Destructure the 'name' from the location state
  const { name } = location.state as { name: string };

  return (
    <div className="flex flex-col m-5">
      {/* Heading with the habit's name */}
      <h1 className="text-4xl font-bold leading-tight text-slate-900">
        {name}
      </h1>
      {/* Card for displaying history chart */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart></Chart>
        </CardContent>
      </Card>
      {/* Example card 1 */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>
          Just to show what is possible and how it will look
        </CardContent>
      </Card>
      {/* Example card 2 */}
      <Card className="w-[100%] mx-auto">
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>
          Just to show what is possible and how it will look
        </CardContent>
      </Card>
    </div>
  );
}
