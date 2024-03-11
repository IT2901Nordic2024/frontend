// NOT USED

// Displays the sensor data fetched from the API

import { useEffect, useState } from 'react';

import { fetchSensorData } from './apiService';
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/shadcnComponents/card";
import { ApiResponse } from './apiService';

function SensorPage() {
  const [data, setData] = useState<ApiResponse[]>([]); // State to store fetched sensor data
  const [isLoading, setIsLoading] = useState(true);    // State to manage loading state

  useEffect(() => {
    fetchSensorData() // Calling the fetch function on component mount
      .then(fetchedData => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch sensor data: ", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen" style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
      <Card style={{ minWidth: '350px' }} className="w-[30%] mx-auto">
        <CardHeader>
          <CardTitle>Sensor Data</CardTitle>
          <CardDescription>Overview of data fetched from the API.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : data.length > 0 ? (
            data.map(sensor => (
              <div key={sensor.device_id} className="sensor-data">
                Sensor ID: {sensor.device_id}, Dod_data: {sensor.dod_data}, Timestamp: {sensor.timestamp}
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SensorPage;
