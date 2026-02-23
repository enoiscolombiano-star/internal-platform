import { useState } from 'react'  
import { useApp } from '../contexts/AppContext'  
  
export default function Tools() {  
  const { tools, addTool, toggleToolStatus } = useApp()  
  
  const [formData, setFormData] = useState({  
    name: '',  
    periodicity: 'Mensal' as 'Mensal' | 'Trimestral' | 'Anual',  
    value: '',  
    url: '',  
    username: '',  
    password: '',  
    observation: '',  
  })  
  
  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault()  
      
    if (!formData.name || !formData.value) {  
      alert('Preencha nome e valor')  
      return  
    }  
  
    addTool({  
      name: formData.name,  
      periodicity: formData.periodicity,  
      value: parseFloat(formData.value),  
      url: formData.url,  
      username: formData.username,  
      password: formData.password,  
      observation: formData.observation,  
      isActive: true,  
    })  
  
    setFormData({  
      name: '',  
      periodicity: 'Mensal',  
      value: '',  
      url: '',  
      username: '',  
      password: '',  
      observation: '',  
    })  
  }  
  
  return (  
    <div className="space-y-6">  
      {/* Formulário de cadastro */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cadastrar Nova Ferramenta</h3>  
        <form onSubmit={handleSubmit} className="space-y-4">  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Nome da Ferramenta *  
              </label>  
              <input  
                type="text"  
                value={formData.name}  
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
                placeholder="Ex: Canva Pro"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Periodicidade *  
              </label>  
              <select  
                value={formData.periodicity}  
                onChange={(e) => setFormData({ ...formData, periodicity: e.target.value as any })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              >  
                <option value="Mensal">Mensal</option>  
                <option value="Trimestral">Trimestral</option>  
                <option value="Anual">Anual</option>  
              </select>  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Valor *  
              </label>  
              <input  
                type="number"  
                step="0.01"  
                value={formData.value}  
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
                placeholder="0.00"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                URL do Site  
              </label>  
              <input  
                type="url"  
                value={formData.url}  
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
                placeholder="https://..."  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Usuário  
              </label>  
              <input  
                type="text"  
                value={formData.username}  
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">  
                Senha  
              </label>  
              <input  
                type="password"  
                value={formData.password}  
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              />  
            </div>  
          </div>  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">  
              Observação  
            </label>  
            <textarea  
              value={formData.observation}  
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              rows={3}  
            />  
          </div>  
          <button  
            type="submit"  
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"  
          >  
            Cadastrar Ferramenta  
          </button>  
        </form>  
      </div>  
  
      {/* Lista de ferramentas */}  
      {tools.length === 0 ? (  
        <div className="bg-white rounded-lg shadow p-12 text-center">  
          <p className="text-gray-500">Nenhuma ferramenta cadastrada ainda</p>  
        </div>  
      ) : (  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
          {tools.map((tool) => (  
            <div key={tool.id} className="bg-white rounded-lg shadow p-6">  
              <div className="flex justify-between items-start mb-4">  
                <h4 className="text-lg font-semibold text-gray-900">{tool.name}</h4>  
                <button  
                  onClick={() => toggleToolStatus(tool.id)}  
                  className={`px-3 py-1 rounded-full text-xs font-medium ${  
                    tool.isActive  
                      ? 'bg-green-100 text-green-800'  
                      : 'bg-gray-100 text-gray-800'  
                  }`}  
                >  
                  {tool.isActive ? 'Ativa' : 'Inativa'}  
                </button>  
              </div>  
              <div className="space-y-2 text-sm">  
                <div className="flex justify-between">  
                  <span className="text-gray-600">Periodicidade:</span>  
                  <span className="font-medium text-gray-900">{tool.periodicity}</span>  
                </div>  
                <div className="flex justify-between">  
                  <span className="text-gray-600">Valor:</span>  
                  <span className="font-medium text-gray-900">R$ {tool.value.toFixed(2)}</span>  
                </div>  
                <div className="flex justify-between">  
                  <span className="text-gray-600">Custo mensal:</span>  
                  <span className="font-medium text-gray-900">R$ {tool.monthlyCost.toFixed(2)}</span>  
                </div>  
                {tool.url && (  
                  <div className="pt-2 border-t">  
                    <a  
                      href={tool.url}  
                      target="_blank"  
                      rel="noopener noreferrer"  
                      className="text-blue-600 hover:underline text-xs"  
                    >  
                      Acessar site  
                    </a>  
                  </div>  
                )}  
              </div>  
            </div>  
          ))}  
        </div>  
      )}  
    </div>  
  )  
}