import { useState } from 'react'  
import { useNavigate } from 'react-router-dom'  
import { useApp } from '../contexts/AppContext'  
  
export default function Campaigns() {  
  const { campaigns, products, addCampaign } = useApp()  
  const navigate = useNavigate()  
  const [showForm, setShowForm] = useState(false)  
  const [formData, setFormData] = useState({  
    name: '',  
    productId: '',  
  })  
  
  const handleCreateCampaign = () => {  
    if (!formData.name.trim() || !formData.productId) {  
      alert('Preencha nome e selecione um produto')  
      return  
    }  
  
    addCampaign(formData.name, formData.productId)  
    setFormData({ name: '', productId: '' })  
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
          {showForm ? 'Cancelar' : '+ Criar Nova Campanha'}  
        </button>  
      </div>  
  
      {/* Formulário */}  
      {showForm && (  
        <div className="bg-white rounded-lg shadow p-6">  
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nova Campanha</h3>  
          <div className="space-y-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Campanha</label>  
              <input  
                type="text"  
                value={formData.name}  
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>  
              <select  
                value={formData.productId}  
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              >  
                <option value="">Selecione um produto</option>  
                {products.map((product) => (  
                  <option key={product.id} value={product.id}>  
                    {product.name}  
                  </option>  
                ))}  
              </select>  
            </div>  
            <button  
              onClick={handleCreateCampaign}  
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"  
            >  
              Criar Campanha  
            </button>  
          </div>  
        </div>  
      )}  
  
      {/* Lista de campanhas */}  
      {campaigns.length === 0 ? (  
        <div className="bg-white rounded-lg shadow p-12 text-center">  
          <p className="text-gray-500">Nenhuma campanha criada ainda</p>  
        </div>  
      ) : (  
        <div className="bg-white rounded-lg shadow overflow-hidden">  
          <table className="min-w-full divide-y divide-gray-200">  
            <thead className="bg-gray-50">  
              <tr>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Nome da Campanha  
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Produto  
                </th>  
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Registros  
                </th>  
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">  
                  Ações  
                </th>  
              </tr>  
            </thead>  
            <tbody className="bg-white divide-y divide-gray-200">  
              {campaigns.map((campaign) => {  
                const product = products.find(p => p.id === campaign.productId)  
                return (  
                  <tr key={campaign.id} className="hover:bg-gray-50">  
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">  
                      {campaign.name}  
                    </td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                      {product?.name || 'Produto não encontrado'}  
                    </td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                      {campaign.records.length} registro(s)  
                    </td>  
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">  
                      <button  
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}  
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
                      >  
                        Abrir  
                      </button>  
                    </td>  
                  </tr>  
                )  
              })}  
            </tbody>  
          </table>  
        </div>  
      )}  
    </div>  
  )  
}