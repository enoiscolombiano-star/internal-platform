import { useState, useEffect } from 'react'  
import { useApp } from '../../contexts/AppContext'  
  
interface CommissionModalProps {  
  employeeId: string  
  onClose: () => void  
}  
  
export default function CommissionModal({ employeeId, onClose }: CommissionModalProps) {  
  const { employees, products, updateEmployeeCommission } = useApp()  
  
  const employee = employees.find(e => e.id === employeeId)  
  
  const [percentage, setPercentage] = useState(employee?.commissionPercentage || 0)  
  const [selectedProducts, setSelectedProducts] = useState<string[]>(employee?.selectedProductIds || [])  
  
  useEffect(() => {  
    if (employee) {  
      setPercentage(employee.commissionPercentage)  
      setSelectedProducts(employee.selectedProductIds)  
    }  
  }, [employee])  
  
  const handleToggleProduct = (productId: string) => {  
    setSelectedProducts(prev =>  
      prev.includes(productId)  
        ? prev.filter(id => id !== productId)  
        : [...prev, productId]  
    )  
  }  
  
  const handleSave = () => {  
    updateEmployeeCommission(employeeId, percentage, selectedProducts)  
    onClose()  
  }  
  
  if (!employee) return null  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">  
        <h3 className="text-xl font-bold text-gray-900 mb-4">  
          Configurar Comissão - {employee.name}  
        </h3>  
  
        <div className="space-y-4">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">  
              Percentual de Comissão (%)  
            </label>  
            <input  
              type="number"  
              step="0.1"  
              min="0"  
              max="100"  
              value={percentage}  
              onChange={(e) => setPercentage(parseFloat(e.target.value) || 0)}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">  
              Produtos para Comissão  
            </label>  
            {products.length === 0 ? (  
              <p className="text-sm text-gray-500">Nenhum produto cadastrado</p>  
            ) : (  
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-3">  
                {products.map((product) => (  
                  <label key={product.id} className="flex items-center space-x-2 cursor-pointer">  
                    <input  
                      type="checkbox"  
                      checked={selectedProducts.includes(product.id)}  
                      onChange={() => handleToggleProduct(product.id)}  
                      className="rounded text-blue-600 focus:ring-blue-500"  
                    />  
                    <span className="text-sm text-gray-900">{product.name}</span>  
                  </label>  
                ))}  
              </div>  
            )}  
          </div>  
        </div>  
  
        <div className="flex gap-3 mt-6">  
          <button  
            onClick={onClose}  
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"  
          >  
            Cancelar  
          </button>  
          <button  
            onClick={handleSave}  
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
          >  
            Salvar  
          </button>  
        </div>  
      </div>  
    </div>  
  )  
}