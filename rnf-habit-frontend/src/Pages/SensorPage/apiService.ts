
interface ApiResponse {
    id: number;
    timesInvoked: number;
  }
  
  export async function fetchTimesInvoked(): Promise<ApiResponse[]> {
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
  