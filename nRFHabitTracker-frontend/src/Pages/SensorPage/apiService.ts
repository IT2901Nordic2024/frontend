// NOT USED

// Fetches data from AWS API Gateway for use in the SensorPage Page

export interface ApiResponse {
    device_id: string;
    dod_data: string;
    timestamp: number;
  }
  
  export async function fetchSensorData(): Promise<ApiResponse[]> {
    try {
      const response = await fetch('https://j0b6cnkanl.execute-api.eu-north-1.amazonaws.com/items');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data: ApiResponse[] = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with fetching from api:', error);
      throw error; 
    }
  }
  