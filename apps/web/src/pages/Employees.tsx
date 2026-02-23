import { useState } from 'react'  
import { useApp } from '../contexts/AppContext'  
import CommissionModal from '../components/modals/CommissionModal'  
  
export default function Employees() {  
  const { employees, products, addEmployee, toggleEmployeeStatus } = useApp()  
  
  const [showForm, setShowForm] = useState(false)  
  const [formData, setFormData] = useState({  
    name: '',  
    role: '',  
    monthlySalary: '',  
  })  
  
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)  
  
  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault()  
  
    if (!formData.name || !formData.role || !formData.monthlySalary) {  
      alert('Preencha todos os campos')  
      return  
    }  
  
    addEmployee({  
      name: formData.name,  
      role: formData.role,  
      monthlySalary: parseFloat(formData.monthlySalary),  
      isActive: true,  
      commissionPercentage: 0,  
      selectedProductIds: [],  
    })  
  
    setFormData({ name: '', role: '', monthlySalary: '' })  
    setShowForm(false)  
  }  
  
  return (  
    <div className="space-y-6">  
      {/* Botão criar */}  
      <div className="flex justify-end">  
        <button  
          onClick={() => setShowForm(!showForm)}  
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
        >  
          {showForm ? 'Cancelar' : '+ Cadastrar Funcionário'}  
        </button>  
      </div>  
  
      {/* Formulário */}  
      {showForm && (  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Novo Funcionário</h3>  
          <form onSubmit={handleSubmit} className="space-y-4">  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>  
                <input  
                  type="text"  
                  value={formData.name}  
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                />  
              </div>  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Função</label>  
                <input  
                  type="text"  
                  value={formData.role}  
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                />  
              </div>  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Salário Mensal (R$)</label>  
                <input  
                  type="number"  
                  step="0.01"  
                  value={formData.monthlySalary}  
                  onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                />  
              </div>  
            </div>  
            <button  
              type="submit"  
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"  
            >  
              Cadastrar  
            </button>  
          </form>  
        </div>  
      )}  
  
      {/* Lista de funcionários */}  
      {employees.length === 0 ? (  
        <div className="bg-white rounded-lg shadow p-12 text-center">  
          <p className="text-gray-500">Nenhum funcionário cadastrado ainda</p>  
        </div>  
      ) : (  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
          {employees.map((employee) => (  
            <div key={employee.id} className="bg-white rounded-lg shadow p-6">  
              <div className="flex justify-between items-start mb-4">  
                <div>  
                  <h4 className="text-lg font-bold text-gray-900">{employee.name}</h4>  
                  <p className="text-sm text-gray-500">{employee.role}</p>  
                </div>  
                <button  
                  onClick={() => toggleEmployeeStatus(employee.id)}  
                  className={`px-3 py-1 rounded-full text-xs font-medium ${  
                    employee.isActive  
                      ? 'bg-green-100 text-green-800'  
                      : 'bg-gray-100 text-gray-800'  
                  }`}  
                >  
                  {employee.isActive ? 'Ativo' : 'Inativo'}  
                </button>  
              </div>  
              <div className="space-y-2 text-sm mb-4">  
                <div className="flex justify-between">  
                  <span className="text-gray-600">Salário mensal:</span>  
                  <span className="font-medium text-gray-900">R$ {employee.monthlySalary.toFixed(2)}</span>  
                </div>  
                <div className="flex justify-between">  
                  <span className="text-gray-600">Comissão:</span>  
                  <span className="font-medium text-gray-900">{employee.commissionPercentage}%</span>  
                </div>  
                {employee.selectedProductIds.length > 0 && (  
                  <div className="text-xs text-gray-500 pt-2 border-t">  
                    {employee.selectedProductIds.length} produto(s) selecionado(s)  
                  </div>  
                )}  
              </div>  
              <button  
                onClick={() => setSelectedEmployeeId(employee.id)}  
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"  
              >  
                Configurar Comissão  
              </button>  
            </div>  
          ))}  
        </div>  
      )}  
  
      {/* Modal de comissão */}  
      {selectedEmployeeId && (  
        <CommissionModal  
          employeeId={selectedEmployeeId}  
          onClose={() => setSelectedEmployeeId(null)}  
        />  
      )}  
    </div>  
  )  
}