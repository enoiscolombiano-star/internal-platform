import { useState } from 'react'  
import { useApp } from '../contexts/AppContext'  
  
export default function Costs() {  
  const { tools, campaigns, employees, products } = useApp()  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])  
  
  const activeTools = tools.filter(t => t.isActive)  
  const activeEmployees = employees.filter(e => e.isActive)  
  
  // Filtrar registros do dia selecionado  
  const recordsOfDay = campaigns.flatMap(c =>   
    c.records.filter(r => r.date === selectedDate).map(r => ({ ...r, campaignId: c.id, productId: c.productId }))  
  )  
  
  // Calcular totais de campanhas do dia  
  const totalAdSpend = recordsOfDay.reduce((sum, r) => sum + r.adSpend, 0)  
  const totalTax = recordsOfDay.reduce((sum, r) => sum + r.tax, 0)  
  const totalRevenue = recordsOfDay.reduce((sum, r) => sum + r.revenue, 0)  
  const totalSales = recordsOfDay.reduce((sum, r) => sum + r.sales, 0)  
  
  // Calcular custo diário de ferramentas  
  const daysInMonth = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate()  
  const toolsDailyCost = activeTools.reduce((sum, tool) => {  
    let dailyCost = 0  
    switch (tool.periodicity) {  
      case 'Mensal':  
        dailyCost = tool.value / daysInMonth  
        break  
      case 'Trimestral':  
        dailyCost = tool.value / 90  
        break  
      case 'Anual':  
        dailyCost = tool.value / 365  
        break  
    }  
    return sum + dailyCost  
  }, 0)  
  
  // Calcular custo diário de funcionários  
  const employeesDailyCost = activeEmployees.reduce((sum, emp) => sum + (emp.monthlySalary / daysInMonth), 0)  
  
  // Calcular lucro líquido por produto (antes de comissões)  
  const productProfits = new Map<string, number>()  
  recordsOfDay.forEach(record => {  
    const current = productProfits.get(record.productId) || 0  
    const profit = record.revenue - record.adSpend - record.tax  
    productProfits.set(record.productId, current + profit)  
  })  
  
  // Calcular comissões  
  let totalCommissions = 0  
  const commissionsDetail: { employeeName: string; amount: number }[] = []  
  
  activeEmployees.forEach(emp => {  
    if (emp.commissionPercentage > 0 && emp.selectedProductIds.length > 0) {  
      let empCommission = 0  
      emp.selectedProductIds.forEach(productId => {  
        const productProfit = productProfits.get(productId) || 0  
        if (productProfit > 0) {  
          empCommission += productProfit * (emp.commissionPercentage / 100)  
        }  
      })  
      if (empCommission > 0) {  
        totalCommissions += empCommission  
        commissionsDetail.push({ employeeName: emp.name, amount: empCommission })  
      }  
    }  
  })  
  
  // Recalcular lucro líquido por produto (após comissões)  
  const finalProductProfits = new Map<string, number>()  
  productProfits.forEach((profit, productId) => {  
    let productCommissions = 0  
    activeEmployees.forEach(emp => {  
      if (emp.commissionPercentage > 0 && emp.selectedProductIds.includes(productId)) {  
        productCommissions += profit * (emp.commissionPercentage / 100)  
      }  
    })  
    finalProductProfits.set(productId, profit - productCommissions)  
  })  
  
  // Custo total do dia  
  const totalDayCost = totalAdSpend + totalTax + toolsDailyCost + employeesDailyCost + totalCommissions  
  
  // Lucro líquido do dia  
  const netProfit = totalRevenue - totalDayCost  
  
  return (  
    <div className="space-y-6">  
      {/* Seletor de data */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o Dia</label>  
        <input  
          type="date"  
          value={selectedDate}  
          onChange={(e) => setSelectedDate(e.target.value)}  
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
        />  
      </div>  
  
      {/* Campanhas do dia */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campanhas do Dia</h3>  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">  
          <div>  
            <p className="text-sm text-gray-600">Total Gastos Anúncios</p>  
            <p className="text-2xl font-bold text-gray-900">R$ {totalAdSpend.toFixed(2)}</p>  
          </div>  
          <div>  
            <p className="text-sm text-gray-600">Total Imposto</p>  
            <p className="text-2xl font-bold text-gray-900">R$ {totalTax.toFixed(2)}</p>  
          </div>  
          <div>  
            <p className="text-sm text-gray-600">Total Receita</p>  
            <p className="text-2xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</p>  
          </div>  
          <div>  
            <p className="text-sm text-gray-600">Total Vendas</p>  
            <p className="text-2xl font-bold text-gray-900">{totalSales}</p>  
          </div>  
        </div>  
      </div>  
  
      {/* Ferramentas do dia */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ferramentas do Dia</h3>  
        {activeTools.length === 0 ? (  
          <p className="text-gray-500 text-sm">Nenhuma ferramenta ativa</p>  
        ) : (  
          <>  
            <div className="space-y-2 mb-4">  
              {activeTools.map(tool => {  
                let dailyCost = 0  
                switch (tool.periodicity) {  
                  case 'Mensal':  
                    dailyCost = tool.value / daysInMonth  
                    break  
                  case 'Trimestral':  
                    dailyCost = tool.value / 90  
                    break  
                  case 'Anual':  
                    dailyCost = tool.value / 365  
                    break  
                }  
                return (  
                  <div key={tool.id} className="flex justify-between items-center border-b pb-2">  
                    <span className="text-sm text-gray-700">{tool.name}</span>  
                    <span className="text-sm font-medium text-gray-900">R$ {dailyCost.toFixed(2)}</span>  
                  </div>  
                )  
              })}  
            </div>  
            <div className="border-t pt-2">  
              <div className="flex justify-between items-center">  
                <span className="font-medium text-gray-700">Total Ferramentas</span>  
                <span className="text-xl font-bold text-gray-900">R$ {toolsDailyCost.toFixed(2)}</span>  
              </div>  
            </div>  
          </>  
        )}  
      </div>  
  
      {/* Funcionários do dia */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Funcionários do Dia</h3>  
        {activeEmployees.length === 0 ? (  
          <p className="text-gray-500 text-sm">Nenhum funcionário ativo</p>  
        ) : (  
          <>  
            <div className="space-y-2 mb-4">  
              {activeEmployees.map(emp => {  
                const dailyCost = emp.monthlySalary / daysInMonth  
                return (  
                  <div key={emp.id} className="flex justify-between items-center border-b pb-2">  
                    <div>  
                      <span className="text-sm text-gray-700">{emp.name}</span>  
                      <span className="text-xs text-gray-500 ml-2">({emp.role})</span>  
                    </div>  
                    <span className="text-sm font-medium text-gray-900">R$ {dailyCost.toFixed(2)}</span>  
                  </div>  
                )  
              })}  
            </div>  
            <div className="border-t pt-2">  
              <div className="flex justify-between items-center">  
                <span className="font-medium text-gray-700">Total Funcionários</span>  
                <span className="text-xl font-bold text-gray-900">R$ {employeesDailyCost.toFixed(2)}</span>  
              </div>  
            </div>  
          </>  
        )}  
      </div>  
  
      {/* Comissões do dia */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comissões do Dia</h3>  
        {commissionsDetail.length === 0 ? (  
          <p className="text-gray-500 text-sm">Nenhuma comissão calculada</p>  
        ) : (  
          <>  
            <div className="space-y-2 mb-4">  
              {commissionsDetail.map((comm, idx) => (  
                <div key={idx} className="flex justify-between items-center border-b pb-2">  
                  <span className="text-sm text-gray-700">{comm.employeeName}</span>  
                  <span className="text-sm font-medium text-gray-900">R$ {comm.amount.toFixed(2)}</span>  
                </div>  
              ))}  
            </div>  
            <div className="border-t pt-2">  
              <div className="flex justify-between items-center">  
                <span className="font-medium text-gray-700">Total Comissões</span>  
                <span className="text-xl font-bold text-gray-900">R$ {totalCommissions.toFixed(2)}</span>  
              </div>  
            </div>  
          </>  
        )}  
      </div>  
  
      {/* Resumo do dia */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Dia</h3>  
        <div className="space-y-3">  
          <div className="flex justify-between items-center text-lg">  
            <span className="text-gray-700">Total de Custos do Dia</span>  
            <span className="font-bold text-red-600">R$ {totalDayCost.toFixed(2)}</span>  
          </div>  
          <div className="flex justify-between items-center text-lg border-t pt-3">  
            <span className="text-gray-700">Lucro Líquido do Dia</span>  
            <span className={`font-bold text-2xl ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>  
              R$ {netProfit.toFixed(2)}  
            </span>  
          </div>  
        </div>  
  
        {/* Lucro líquido por produto */}  
        {finalProductProfits.size > 0 && (  
          <div className="mt-6 border-t pt-4">  
            <h4 className="font-medium text-gray-800 mb-3">Lucro Líquido por Produto</h4>  
            <div className="space-y-2">  
              {Array.from(finalProductProfits.entries()).map(([productId, profit]) => {  
                const product = products.find(p => p.id === productId)  
                return (  
                  <div key={productId} className="flex justify-between items-center">  
                    <span className="text-sm text-gray-700">{product?.name || 'Produto desconhecido'}</span>  
                    <span className={`text-sm font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>  
                      R$ {profit.toFixed(2)}  
                    </span>  
                  </div>  
                )  
              })}  
            </div>  
          </div>  
        )}  
      </div>  
    </div>  
  )  
}