export interface ProductURL {  
  id: string  
  description: string  
  url: string  
  valueUSD: number  
}  
  
export interface Product {  
  id: string  
  platform: 'ClickBank' | 'Cartpanda'  
  name: string  
  urls: ProductURL[]  
}  
  
export interface Tool {  
  id: string  
  name: string  
  periodicity: 'Mensal' | 'Trimestral' | 'Anual'  
  value: number  
  url: string  
  username: string  
  password: string  
  observation: string  
  isActive: boolean  
  dailyCost: number  
  monthlyCost: number  
}  
  
export interface Employee {  
  id: string  
  name: string  
  role: string  
  monthlySalary: number  
  isActive: boolean  
  commissionPercentage: number  
  selectedProductIds: string[]  
}  
  
export interface Campaign {  
  id: string  
  name: string  
  productId: string  
  records: CampaignRecord[]  
}  
  
export interface CampaignRecord {  
  id: string  
  date: string  
  adSpend: number  
  tax: number  
  sales: number  
  revenue: number  
  observation: string  
}  
  
export interface DollarRate {  
  value: number  
  source: 'api' | 'manual'  
  lastUpdated: Date  
}