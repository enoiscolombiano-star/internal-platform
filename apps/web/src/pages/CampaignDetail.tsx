import { useState } from 'react'  
import { useParams, useNavigate } from 'react-router-dom'  
import { useApp } from '../contexts/AppContext'  
  
export default function CampaignDetail() {  
  const { id } = useParams<{ id: string }>()  
  const navigate = useNavigate()  
  const { campaigns, addCampaignRecord } = useApp()  
  
  const campaign = campaigns.find(c => c.id === id)  
  
  const [formData, setFormData] = useState({  
    date: '',  
    adSpend: '',  
    tax: '',  
    sales: '',  
    revenue: '',  
    observation: '',  
  })  
  
  if (!campaign) {  
    return (  
      <div className="bg-white rounded-lg shadow p-12 text-center">  
        <p className="text-gray-500">Campanha não encontrada</p>  
        <button  
          onClick={() => navigate('/campaigns')}  
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
        >  
          Voltar para Campanhas  
        </button>  
      </div>  
    )  
  }  
  
  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault()  
  
    if (!formData.date || !formData.adSpend || !formData.tax || !formData.sales || !formData.revenue) {  
      alert('Preencha todos os campos obrigatórios')  
      return  
    }  
  
    addCampaignRecord(campaign.id, {  
      date: formData.date,  
      adSpend: parseFloat(formData.adSpend),  
      tax: parseFloat(formData.tax),  
      sales: parseInt(formData.sales),  
      revenue: parseFloat(formData.revenue),  
      observation: formData.observation,  
    })  
  
    setFormData({  
      date: '',  
      adSpend: '',  
      tax: '',  
      sales: '',  
      revenue: '',  
      observation: '',  
    })  
  }  
  
  return (  
    <div className="space-y-6">  
      {/* Header */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <div className="flex justify-between items-center">  
          <div>  
            <h3 className="text-2xl font-bold text-gray-900">{campaign.name}</h3>  
            <p className="text-sm text-gray-500 mt-1">{campaign.records.length} registro(s)</p>  
          </div>  
          <button  
            onClick={() => navigate('/campaigns')}  
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"  
          >  
            Voltar  
          </button>  
        </div>  
      </div>  
  
      {/* Formulário de registro */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Registro</h4>  
        <form onSubmit={handleSubmit} className="space-y-4">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">Data *</label>  
            <input  
              type="date"  
              value={formData.date}  
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
            />  
          </div>  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Gastos com Anúncio (R$) *</label>  
              <input  
                type="number"  
                step="0.01"  
                value={formData.adSpend}  
                onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Imposto (R$) *</label>  
              <input  
                type="number"  
                step="0.01"  
                value={formData.tax}  
                onChange={(e) => setFormData({ ...formData, tax: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  
          </div>  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Vendas (quantidade) *</label>  
              <input  
                type="number"  
                value={formData.sales}  
                onChange={(e) => setFormData({ ...formData, sales: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Receita do Dia (R$) *</label>  
              <input  
                type="number"  
                step="0.01"  
                value={formData.revenue}  
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}  
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              />  
            </div>  
          </div>  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2">Observação</label>  
            <textarea  
              value={formData.observation}  
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
              rows={3}  
            />  
          </div>  
          <button  
            type="submit"  
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
          >  
            Adicionar Registro  
          </button>  
        </form>  
      </div>  
  
      {/* Lista de registros */}  
      {campaign.records.length === 0 ? (  
        <div className="bg-white rounded-lg shadow p-12 text-center">  
          <p className="text-gray-500">Nenhum registro adicionado ainda</p>  
        </div>  
      ) : (  
        <div className="bg-white rounded-lg shadow overflow-hidden">  
          <div className="px-6 py-4 border-b border-gray-200">  
            <h4 className="text-lg font-semibold text-gray-800">Registros da Campanha</h4>  
          </div>  
          <div className="overflow-x-auto">  
            <table className="min-w-full divide-y divide-gray-200">  
              <thead className="bg-gray-50">  
                <tr>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gastos Anúncio</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imposto</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receita</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observação</th>  
                </tr>  
              </thead>  
              <tbody className="bg-white divide-y divide-gray-200">  
                {campaign.records.map((record) => (  
                  <tr key={record.id} className="hover:bg-gray-50">  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                      {new Date(record.date).toLocaleDateString('pt-BR')}  
                    </td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {record.adSpend.toFixed(2)}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {record.tax.toFixed(2)}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.sales}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {record.revenue.toFixed(2)}</td>  
                    <td className="px-6 py-4 text-sm text-gray-500">{record.observation || '-'}</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      )}  
    </div>  
  )  
}