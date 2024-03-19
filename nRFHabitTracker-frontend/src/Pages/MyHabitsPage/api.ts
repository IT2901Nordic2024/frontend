// Fetches data from AWS API Gateway for use in the SensorPage Page

export interface Habit {
  habitName: string;
  habitId: number;
  habitType: string;
  deviceId: string;
}
export async function fetchHabits(): Promise<Habit[]> {
  try {
    const response = await fetch('https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/habits/0');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: { habits: Habit[] } = await response.json();
    return data.habits;
  } catch (error) {
    console.error('There was a problem with fetching from api:', error);
    throw error; 
  }
}