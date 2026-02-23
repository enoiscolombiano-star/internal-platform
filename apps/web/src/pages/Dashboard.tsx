import { useState } from 'react'  
import { useApp } from '../contexts/AppContext'  
  
export default function Dashboard() {  
  const { campaigns, tools, employees, products } = useApp()  
  const [dateRange, setDateRange] = useState({  
    startDate: '',  
    endDate: '',  
  })  
  
  const activeTools = tools.filter(t => t.isActive)  
  const activeEmployees = employees.filter(e => e.isActive)  
  
  // Filtrar registros por intervalo de datas  
  const filteredRecords = campaigns.flatMap(c =>  
    c.records  
      .filter(r => {  
        if (!dateRange.startDate || !dateRange.endDate) return true  
        return r.date >= dateRange.startDate && r.date <= dateRange.endDate  
      })  
      .map(r => ({ ...r, campaignId: c.id, productId: c.productId }))  
  )  
  
  // Calcular totais  
  const totalRevenue = filteredRecords.reduce((sum, r) => sum + r.revenue, 0)  
  const totalAdSpend = filteredRecords.reduce((sum, r) => sum + r.adSpend, 0)  
  const totalTax = filteredRecords.reduce((sum, r) => sum + r.tax, 0)  
  
  // Calcular custos de ferramentas (estimativa mensal)  
  const toolsCost = activeTools.reduce((sum, tool) => sum + tool.monthlyCost, 0)  
  
  // Calcular custos de funcionários (estimativa mensal)  
  const employeesCost = activeEmployees.reduce((sum, emp) => sum + emp.monthlySalary, 0)  
  
  const totalCosts = totalAdSpend + totalTax + toolsCost + employeesCost  
  const netProfit = totalRevenue - totalCosts  
  
  // Agrupar por produto  
  const productStats = new Map<string, { revenue: number; costs: number; profit: number }>()  
  
  filteredRecords.forEach(record => {  
    const existing = productStats.get(record.productId) || { revenue: 0, costs: 0, profit: 0 }  
    existing.revenue += record.revenue  
    existing.costs += record.adSpend + record.tax  
    productStats.set(record.productId, existing)  
  })  
  
  // Calcular lucro por produto  
  productStats.forEach((stats, productId) => {  
    stats.profit = stats.revenue - stats.costs  
  })  
  
  const hasData = campaigns.length > 0 || tools.length > 0 || employees.length > 0  
  
  if (!hasData) {  
    return (  
      <div className="bg-white rounded-lg shadow p-12">  
        <div className="text-center">  
          <h3 className="text-2xl font-bold text-gray-800 mb-4">  
            Nenhum dado registrado ainda  
          </h3>  
          <p className="text-gray-600 text-lg mb-2">  
            Cadastre produtos, ferramentas, funcionários e campanhas para visualizar resultados  
          </p>  
          <p className="text-gray-500 text-sm">  
            Use o menu lateral para começar  
          </p>  
        </div>  
      </div>  
    )  
  }  
  
  return (  
    <div className="space-y-6">  
      {/* Filtro de datas */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar por Período</h3>  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>  
            <input  
              type="date"  
              value={dateRange.startDate}  
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>  
            <input  
              type="date"  
              value={dateRange.endDate}  
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
        </div>  
        {dateRange.startDate && dateRange.endDate && (  
          <button  
            onClick={() => setDateRange({ startDate: '', endDate: '' })}  
            className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"  
          >  
            Limpar filtro  
          </button>  
        )}  
      </div>  
  
      {/* Cards de métricas */}  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Receita Total</h3>  
          <p className="text-3xl font-bold text-gray-900">  
            R$ {totalRevenue.toFixed(2)}  
          </p>  
        </div>  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Custos Totais</h3>  
          <p className="text-3xl font-bold text-red-600">  
            R$ {totalCosts.toFixed(2)}  
          </p>  
        </div>  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Lucro Líquido Total</h3>  
          <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>  
            R$ {netProfit.toFixed(2)}  
          </p>  
        </div>  
      </div>  
  
      {/* Tabela por produto */}  
      {productStats.size > 0 && (  
        <div className="bg-white rounded-lg shadow overflow-hidden">  
          <div className="px-6 py-4 border-b border-gray-200">  
            <h3 className="text-lg font-semibold text-gray-800">Resultados por Produto</h3>  
          </div>  
          <div className="overflow-x-auto">  
            <table className="min-w-full divide-y divide-gray-200">  
              <thead className="bg-gray-50">  
                <tr>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                    Produto  
                  </th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                    Receita  
                  </th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                    Custos  
                  </th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                    Lucro Líquido  
                  </th>  
                </tr>  
              </thead>  
              <tbody className="bg-white divide-y divide-gray-200">  
                {Array.from(productStats.entries()).map(([productId, stats]) => {  
                  const product = products.find(p => p.id === productId)  
                  return (  
                    <tr key={productId} className="hover:bg-gray-50">  
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">  
                        {product?.name || 'Produto desconhecido'}  
                      </td>  
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                        R$ {stats.revenue.toFixed(2)}  
                      </td>  
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                        R$ {stats.costs.toFixed(2)}  
                      </td>  
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">  
                        <span className={stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}>  
                          R$ {stats.profit.toFixed(2)}  
                        </span>  
                      </td>  
                    </tr>  
                  )  
                })}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      )}  
    </div>  
  )  
}