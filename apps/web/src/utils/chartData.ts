import { Cost } from '../mocks/costs'  
  
export function getCostsByCategory(costs: Cost[]) {  
  const categoryMap = new Map<string, number>()  
  
  costs.forEach((cost) => {  
    const current = categoryMap.get(cost.category) || 0  
    categoryMap.set(cost.category, current + cost.dailyCost)  
  })  
  
  return Array.from(categoryMap.entries())  
    .map(([label, value]) => ({ label, value }))  
    .sort((a, b) => b.value - a.value)  
}  
  
export function getMonthlyTrend() {  
  // Dados mockados de tendência mensal (últimos 6 meses)  
  return [  
    { label: 'Set', value: 250 },  
    { label: 'Out', value: 280 },  
    { label: 'Nov', value: 265 },  
    { label: 'Dez', value: 290 },  
    { label: 'Jan', value: 310 },  
    { label: 'Fev', value: 325 },  
  ]  
}