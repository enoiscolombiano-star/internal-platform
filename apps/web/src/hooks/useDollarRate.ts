import { useState, useEffect } from 'react'  
import { fetchDollarRate } from '../services/dollarApi'  
import { DollarRate } from '../types'  
  
export function useDollarRate() {  
  const [dollarRate, setDollarRate] = useState<DollarRate>({  
    value: 5.0,  
    source: 'manual',  
    lastUpdated: new Date(),  
  })  
  
  const [isLoading, setIsLoading] = useState(true)  
  
  useEffect(() => {  
    loadDollarRate()  
  }, [])  
  
  const loadDollarRate = async () => {  
    setIsLoading(true)  
    const rate = await fetchDollarRate()  
      
    if (rate) {  
      setDollarRate({  
        value: rate,  
        source: 'api',  
        lastUpdated: new Date(),  
      })  
    }  
      
    setIsLoading(false)  
  }  
  
  const setManualRate = (value: number) => {  
    setDollarRate({  
      value,  
      source: 'manual',  
      lastUpdated: new Date(),  
    })  
  }  
  
  return {  
    dollarRate,  
    isLoading,  
    refreshRate: loadDollarRate,  
    setManualRate,  
  }  
}