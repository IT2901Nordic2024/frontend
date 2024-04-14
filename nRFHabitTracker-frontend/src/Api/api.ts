// Fetches data from AWS API Gateway for use in "MyHabitPage" and "AddHabitPage"

// Interface representing the structure of a Habit object
export interface Habit {
  habitName: string
  habitId: number
  habitType: string
  side: number
}

// Interface representing the structure of user information
export interface UserInformation {
  username: string
  email: string
  password: string
  profilePicture: string
}

// Function to fetch habits data from an AWS API Gateway endpoint
export async function fetchHabits(userId: string): Promise<Habit[]> {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(`https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/habits/${userId}`)

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch habits')
    }

    // Parse the JSON response and extract the 'habits' array
    const data: { habits: Habit[] } = await response.json()
    return data.habits // Return the array of habits
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
      `https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/createHabit/${userId}/${deviceId}/${habitName}/${habitType}/${side}`,
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
      `https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/editHabit/${userId}/${deviceId}/${habitId}/${habitName}/${side}`,
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
      profilePicture: 'https://dummyimage.com/300', // Placeholder URL for profile picture
    }

    return userData
  } catch (error) {
    // Handle error here
    console.error('Error retrieving user information:', error)
    throw error
  }
}
