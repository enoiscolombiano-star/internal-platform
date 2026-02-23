export async function fetchDollarRate(): Promise<number | null> {  
  try {  
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')  
    if (!response.ok) throw new Error('Failed to fetch')  
      
    const data = await response.json()  
    return data.rates.BRL || null  
  } catch (error) {  
    console.error('Error fetching dollar rate:', error)  
    return null  
  }  
}