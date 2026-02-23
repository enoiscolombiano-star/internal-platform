import { costs } from '../mocks/costs'  
  
export default function Costs() {  
  const totalDailyCost = costs.reduce((sum, cost) => sum + cost.dailyCost, 0)  
  const totalMonthlyCost = totalDailyCost * 30  
  const activeItems = costs.length  
  
  return (  
    <div className="space-y-6">  
      {/* Cards de métricas */}  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Custo Diário</h3>  
          <p className="text-3xl font-bold text-gray-900">  
            R$ {totalDailyCost.toFixed(2)}  
          </p>  
        </div>  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Custo Mensal Estimado</h3>  
          <p className="text-3xl font-bold text-gray-900">  
            R$ {totalMonthlyCost.toFixed(2)}  
          </p>  
        </div>  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-sm font-medium text-gray-600 mb-2">Itens Ativos</h3>  
          <p className="text-3xl font-bold text-gray-900">{activeItems}</p>  
        </div>  
      </div>  
  
      {/* Filtros */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  
          <div>  
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">  
              Buscar  
            </label>  
            <input  
              type="text"  
              id="search"  
              placeholder="Buscar por nome..."  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            />  
          </div>  
          <div>  
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">  
              Categoria  
            </label>  
            <select  
              id="category"  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            >  
              <option value="">Todas</option>  
              <option value="compute">Compute</option>  
              <option value="storage">Storage</option>  
              <option value="network">Network</option>  
              <option value="database">Database</option>  
            </select>  
          </div>  
          <div>  
            <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700 mb-2">  
              Periodicidade  
            </label>  
            <select  
              id="periodicity"  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
            >  
              <option value="">Todas</option>  
              <option value="hourly">Por hora</option>  
              <option value="daily">Diário</option>  
              <option value="monthly">Mensal</option>  
            </select>  
          </div>  
        </div>  
      </div>  
  
      {/* Tabela */}  
      <div className="bg-white rounded-lg shadow overflow-hidden">  
        <table className="min-w-full divide-y divide-gray-200">  
          <thead className="bg-gray-50">  
            <tr>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Nome  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Categoria  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Periodicidade  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Valor  
              </th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Custo Diário  
              </th>  
            </tr>  
          </thead>  
          <tbody className="bg-white divide-y divide-gray-200">  
            {costs.map((cost) => (  
              <tr key={cost.id} className="hover:bg-gray-50">  
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">  
                  {cost.name}  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                  {cost.category}  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                  {cost.periodicity}  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                  R$ {cost.value.toFixed(2)}  
                </td>  
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                  R$ {cost.dailyCost.toFixed(2)}  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  )  
}