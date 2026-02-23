import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  
import Layout from './components/layout/Layout'  
import Dashboard from './pages/Dashboard'  
import Costs from './pages/Costs'  
  
function App() {  
  return (  
    <BrowserRouter>  
      <Routes>  
        <Route path="/" element={<Layout />}>  
          <Route index element={<Navigate to="/dashboard" replace />} />  
          <Route path="dashboard" element={<Dashboard />} />  
          <Route path="costs" element={<Costs />} />  
        </Route>  
      </Routes>  
    </BrowserRouter>  
  )  
}  
  
export default App