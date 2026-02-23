import { createContext, useContext, useState, ReactNode } from 'react'  
import { Tool, Campaign, CampaignRecord, Product, ProductURL, Employee } from '../types'  
import { useDollarRate } from '../hooks/useDollarRate'  
  
interface AppContextType {  
  tools: Tool[]  
  campaigns: Campaign[]  
  products: Product[]  
  employees: Employee[]  
  dollarRate: ReturnType<typeof useDollarRate>['dollarRate']  
  isLoadingDollar: boolean  
  refreshDollarRate: () => Promise<void>  
  setManualDollarRate: (value: number) => void  
  addTool: (tool: Omit<Tool, 'id' | 'dailyCost' | 'monthlyCost'>) => void  
  toggleToolStatus: (id: string) => void  
  addCampaign: (name: string, productId: string) => void  
  addCampaignRecord: (campaignId: string, record: Omit<CampaignRecord, 'id'>) => void  
  addProduct: (product: Omit<Product, 'id'>) => void  
  addProductURL: (productId: string, url: Omit<ProductURL, 'id'>) => void  
  addEmployee: (employee: Omit<Employee, 'id'>) => void  
  toggleEmployeeStatus: (id: string) => void  
  updateEmployeeCommission: (id: string, percentage: number, productIds: string[]) => void  
}  
  
const AppContext = createContext<AppContextType | undefined>(undefined)  
  
export function AppProvider({ children }: { children: ReactNode }) {  
  const [tools, setTools] = useState<Tool[]>([])  
  const [campaigns, setCampaigns] = useState<Campaign[]>([])  
  const [products, setProducts] = useState<Product[]>([])  
  const [employees, setEmployees] = useState<Employee[]>([])  
    
  const { dollarRate, isLoading: isLoadingDollar, refreshRate, setManualRate } = useDollarRate()  
  
  const calculateCosts = (periodicity: Tool['periodicity'], value: number) => {  
    let dailyCost = 0  
    let monthlyCost = 0  
  
    switch (periodicity) {  
      case 'Mensal':  
        monthlyCost = value  
        dailyCost = value / 30  
        break  
      case 'Trimestral':  
        monthlyCost = value / 3  
        dailyCost = value / 90  
        break  
      case 'Anual':  
        monthlyCost = value / 12  
        dailyCost = value / 365  
        break  
    }  
  
    return { dailyCost, monthlyCost }  
  }  
  
  const addTool = (toolData: Omit<Tool, 'id' | 'dailyCost' | 'monthlyCost'>) => {  
    const { dailyCost, monthlyCost } = calculateCosts(toolData.periodicity, toolData.value)  
      
    const newTool: Tool = {  
      ...toolData,  
      id: Date.now().toString(),  
      dailyCost,  
      monthlyCost,  
    }  
  
    setTools(prev => [...prev, newTool])  
  }  
  
  const toggleToolStatus = (id: string) => {  
    setTools(prev =>  
      prev.map(tool =>  
        tool.id === id ? { ...tool, isActive: !tool.isActive } : tool  
      )  
    )  
  }  
  
  const addCampaign = (name: string, productId: string) => {  
    const newCampaign: Campaign = {  
      id: Date.now().toString(),  
      name,  
      productId,  
      records: [],  
    }  
  
    setCampaigns(prev => [...prev, newCampaign])  
  }  
  
  const addCampaignRecord = (campaignId: string, recordData: Omit<CampaignRecord, 'id'>) => {  
    const newRecord: CampaignRecord = {  
      ...recordData,  
      id: Date.now().toString(),  
    }  
  
    setCampaigns(prev =>  
      prev.map(campaign =>  
        campaign.id === campaignId  
          ? { ...campaign, records: [...campaign.records, newRecord] }  
          : campaign  
      )  
    )  
  }  
  
  const addProduct = (productData: Omit<Product, 'id'>) => {  
    const newProduct: Product = {  
      ...productData,  
      id: Date.now().toString(),  
    }  
  
    setProducts(prev => [...prev, newProduct])  
  }  
  
  const addProductURL = (productId: string, urlData: Omit<ProductURL, 'id'>) => {  
    const newURL: ProductURL = {  
      ...urlData,  
      id: Date.now().toString(),  
    }  
  
    setProducts(prev =>  
      prev.map(product =>  
        product.id === productId  
          ? { ...product, urls: [...product.urls, newURL] }  
          : product  
      )  
    )  
  }  
  
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {  
    const newEmployee: Employee = {  
      ...employeeData,  
      id: Date.now().toString(),  
    }  
  
    setEmployees(prev => [...prev, newEmployee])  
  }  
  
  const toggleEmployeeStatus = (id: string) => {  
    setEmployees(prev =>  
      prev.map(emp =>  
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp  
      )  
    )  
  }  
  
  const updateEmployeeCommission = (id: string, percentage: number, productIds: string[]) => {  
    setEmployees(prev =>  
      prev.map(emp =>  
        emp.id === id  
          ? { ...emp, commissionPercentage: percentage, selectedProductIds: productIds }  
          : emp  
      )  
    )  
  }  
  
  return (  
    <AppContext.Provider  
      value={{  
        tools,  
        campaigns,  
        products,  
        employees,  
        dollarRate,  
        isLoadingDollar,  
        refreshDollarRate: refreshRate,  
        setManualDollarRate: setManualRate,  
        addTool,  
        toggleToolStatus,  
        addCampaign,  
        addCampaignRecord,  
        addProduct,  
        addProductURL,  
        addEmployee,  
        toggleEmployeeStatus,  
        updateEmployeeCommission,  
      }}  
    >  
      {children}  
    </AppContext.Provider>  
  )  
}  
  
export function useApp() {  
  const context = useContext(AppContext)  
  if (!context) {  
    throw new Error('useApp must be used within AppProvider')  
  }  
  return context  
}