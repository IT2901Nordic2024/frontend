// Fetches data from AWS API Gateway for use in "MyHabitPage" and "AddHabitPage"

// Interface representing the structure of a Habit object
export interface Habit {
  habitName: string;
  habitId: number;
  habitType: string;
  deviceSide: string;
}

// Function to fetch habits data from an AWS API Gateway endpoint
export async function fetchHabits(userId: string): Promise<Habit[]> {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(`https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/habits/${userId}`);

    // Check if the response is ok
    if (!response.ok) {
        throw new Error('Failed to fetch habits');
    }

    // Parse the JSON response and extract the 'habits' array
    const data: { habits: Habit[] } = await response.json();
    return data.habits; // Return the array of habits
  } catch (error) {
    // Handle errors if any occur during the fetch operation
    console.error('There was a problem with fetching from api:', error);
    throw error; 
  }
}

// Function to add a new habit via AWS API Gateway
export async function addHabit(userId: string, deviceId: string, habitName: string, habitType: string, deviceSide: string): Promise<void> {
  try {
      const response = await fetch(`https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/createHabit/${userId}/${deviceId}/${habitName}/${habitType}/${deviceSide}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      // Check if the response is ok
      if (!response.ok) {
          throw new Error('Failed to add habit');
      }

      // TODO: Handle success response here
      console.log('Habit added successfully');
  } catch (error) {
      // Handle error here
      console.error('Error adding habit:', error);
      throw error;
  }
}

// Function to edit a habit via AWS API Gateway
export async function EditHabit(userId: string, deviceId: string, habitName: string, habitType: string, deviceSide: string, habitId: number): Promise<void> {
  // TODO: Add functionality once the API is set up by the backend
  console.log("Habit not changed. Currently: " + userId + deviceId + habitName + habitType + deviceSide + habitId);
}