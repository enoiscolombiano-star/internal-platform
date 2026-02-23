import { useLocation } from 'react-router-dom'  
  
export default function Topbar() {  
  const location = useLocation()  
    
  const getPageTitle = () => {  
    switch (location.pathname) {  
      case '/dashboard':  
        return 'Dashboard'  
      case '/costs':  
        return 'Custos'  
      default:  
        return 'Cost Manager'  
    }  
  }  
  
  return (  
    <header className="bg-white shadow-sm">  
      <div className="px-6 py-4">  
        <h2 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h2>  
      </div>  
    </header>  
  )  
}