// Fetches data from AWS API Gateway for use in "MyHabitPage" and "AddHabitPage"

// Interface representing the structure of a Habit object
export interface Habit {
  habitName: string
  habitId: number
  habitType: string
  side: number
}

export interface HabitEvents {
  habitId: number
  userId: number
  habitEvents: Array<[number, number]>
}

export interface LoginResponse {
  userId: string;
}

// Interface representing the structure of user information
export interface UserInformation {
  username: string
  email: string
  password: string
}

// API-ID for editing, adding, fetching and deleting habits
const apiID = "prg7rbhyt8"

//API-ID for fetching habit events
const apiID2 = "4lze1bagzk"

//API-ID for user functionality
const apiID3 = "mg7sr4uvql"

// Function to fetch habits data from an AWS API Gateway endpoint
export async function fetchHabits(userId: string): Promise<{ habits: Habit[], deviceId: string }> {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(`https://${apiID}.execute-api.eu-north-1.amazonaws.com/habits/${userId}`)

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch habits')
    }

    // Parse the JSON response and extract the 'habits' array
    const data: { username: string, deviceId: string, habits: Habit[] } = await response.json()
    return { habits: data.habits, deviceId: data.deviceId }; // Return the array of habits and deviceId
  } catch (error) {
    // Handle errors if any occur during the fetch operation
    console.error('There was a problem with fetching from api:', error)
    throw error
  }
}

// Function to add a new habit via AWS API Gateway
export async function addHabit(
  userId: string,
  deviceId: string,
  habitName: string,
  habitType: string,
  side: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://${apiID}.execute-api.eu-north-1.amazonaws.com/createHabit/${userId}/${deviceId}/${habitName}/${habitType}/${side}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to add habit')
    }

    // TODO: Handle success response here
    console.log('Habit added successfully')
  } catch (error) {
    // Handle error here
    console.error('Error adding habit:', error)
    throw error
  }
}

// Function to edit a habit via AWS API Gateway
export async function EditHabit(
  userId: string,
  deviceId: string,
  habitName: string,
  side: string,
  habitId: number
): Promise<void> {
  try {
    const response = await fetch(
      `https://${apiID}.execute-api.eu-north-1.amazonaws.com/editHabit/${userId}/${deviceId}/${habitId}/${habitName}/${side}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to edit habit')
    }

    // TODO: Handle success response here
    console.log('Habit added successfully')
  } catch (error) {
    // Handle error here
    console.error('Error adding habit:', error)
    throw error
  }
}

// Function to delete a habit via AWS API Gateway
export async function DeleteHabit(
  userId: string,
  habitId: number
): Promise<void> {
  try {
    const response = await fetch(
      `https://${apiID}.execute-api.eu-north-1.amazonaws.com/deleteHabit/${userId}/${habitId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to delete habit')
    }

    // TODO: Handle success response here
    console.log('Habit deleted successfully')
  } catch (error) {
    // Handle error here
    console.error('Error deleting habit:', error)
    throw error
  }
}
export async function FetchHabit(userId: string, habitId: number): Promise<HabitEvents> {
  try {
    const response = await fetch(`https://${apiID2}.execute-api.eu-north-1.amazonaws.com/getHabitEvents/${userId}/${habitId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch habit')
    }

    const data: HabitEvents = await response.json()
    return data
  } catch (error) {
    console.error('There was a problem with fetching from api:', error)
    throw error
  }
}

// Function for user registration
export async function UserRegistration(
  username: string,
  email: string,
  deviceId: string,
  password: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://${apiID3}.execute-api.eu-north-1.amazonaws.com/signup/${username}/${email}/${deviceId}/${password}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    // TODO: Handle success response here
    console.log('User created successfully')
  } catch (error) {
    // Handle error here
    console.error('Error creating user:', error)
    throw error
  }
}

// Function for user verification
export async function VerifyUser(
  username: string,
  confirmationCode: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://${apiID3}.execute-api.eu-north-1.amazonaws.com/verifyUser/${username}/${confirmationCode}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to verify user')
    }

    // TODO: Handle success response here
    console.log('User verified successfully')
  } catch (error) {
    // Handle error here
    console.error('Error verifying user:', error)
    throw error
  }
}

// Function for user login
export async function Login(
  username: string,
  password: string
): Promise<{ userId: string }> {
  try {
    const response = await fetch(
      `https://${apiID3}.execute-api.eu-north-1.amazonaws.com/login/${username}/${password}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to login')
    }
    
    const data = await response.json();
    return data
  } catch (error) {
    // Handle error here
    console.error('Error:', error)
    throw error
  }
}

// Function to get user information
export async function getUserInformation(userId: string): Promise<UserInformation> {
  try {
    // // TODO: Currently not connected to an actual API, add this connection
    // const response = await fetch(`https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/userInformation/${userId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    // // Check if the response is ok
    // if (!response.ok) {
    //   throw new Error('Failed to retrieve user information')
    // }

    // // Parse the JSON response and extract the user information
    // const userData: UserInformation = await response.json()

    console.log(userId)

    // Dummy user data
    const userData: UserInformation = {
      username: 'dummy_user',
      email: 'dummy@example.com',
      password: '********', // You might want to handle passwords differently in production
    }

    return userData
  } catch (error) {
    // Handle error here
    console.error('Error retrieving user information:', error)
    throw error
  }
}
