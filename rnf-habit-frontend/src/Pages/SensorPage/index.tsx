import React, { useEffect, useState } from 'react';
import { NavBar } from "../../Components/NavBar";
import './index.css';
import { fetchTimesInvoked } from './apiService';
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner";

interface SensorData {
  id: number;
  timesInvoked: number;
}

function SensorPage() {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimesInvoked()
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
    <div className="sensor-page">
      <NavBar />
      <h1 className="sensor-type">Sensor Data</h1>
      <div className="sensor-data-box flex justify-center items-center"> {/* Added flex utilities for centering */}
        {isLoading ? (
          <LoadingSpinner />
        ) : data.length > 0 ? (
          data.map(sensor => (
            <p key={sensor.id} className="sensor-data">
              Sensor ID: {sensor.id}, Times Invoked: {sensor.timesInvoked}
            </p>
          ))
        ) : (
          <p className="sensor-data">No data found</p>
        )}
      </div>
    </div>
  );
}

export default SensorPage;
