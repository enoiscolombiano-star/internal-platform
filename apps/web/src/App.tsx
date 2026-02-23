import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  
import { AppProvider } from './contexts/AppContext'  
import Layout from './components/layout/Layout'  
import Dashboard from './pages/Dashboard'  
import Tools from './pages/Tools'  
import Products from './pages/Products'  
import Employees from './pages/Employees'  
import Campaigns from './pages/Campaigns'  
import CampaignDetail from './pages/CampaignDetail'  
import Costs from './pages/Costs'  
  
function App() {  
  return (  
    <AppProvider>  
      <BrowserRouter>  
        <Routes>  
          <Route path="/" element={<Layout />}>  
            <Route index element={<Navigate to="/dashboard" replace />} />  
            <Route path="dashboard" element={<Dashboard />} />  
            <Route path="tools" element={<Tools />} />  
            <Route path="products" element={<Products />} />  
            <Route path="employees" element={<Employees />} />  
            <Route path="campaigns" element={<Campaigns />} />  
            <Route path="campaigns/:id" element={<CampaignDetail />} />  
            <Route path="costs" element={<Costs />} />  
          </Route>  
        </Routes>  
      </BrowserRouter>  
    </AppProvider>  
  )  
}  
  
export default App