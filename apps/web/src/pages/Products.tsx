import { useState } from 'react'  
import { useApp } from '../contexts/AppContext'  
  
export default function Products() {  
  const { products, addProduct, addProductURL, dollarRate, isLoadingDollar, refreshDollarRate, setManualDollarRate } = useApp()  
  
  const [showProductForm, setShowProductForm] = useState(false)  
  const [productForm, setProductForm] = useState({  
    platform: 'ClickBank' as 'ClickBank' | 'Cartpanda',  
    name: '',  
  })  
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)  
  const [urlForm, setUrlForm] = useState({  
    description: '',  
    url: '',  
    valueUSD: '',  
  })  
  
  const [manualDollarInput, setManualDollarInput] = useState('')  
  
  const handleCreateProduct = () => {  
    if (!productForm.name.trim()) {  
      alert('Digite um nome para o produto')  
      return  
    }  
  
    addProduct({  
      platform: productForm.platform,  
      name: productForm.name,  
      urls: [],  
    })  
  
    setProductForm({ platform: 'ClickBank', name: '' })  
    setShowProductForm(false)  
  }  
  
  const handleAddURL = () => {  
    if (!selectedProductId || !urlForm.description || !urlForm.url || !urlForm.valueUSD) {  
      alert('Preencha todos os campos da URL')  
      return  
    }  
  
    addProductURL(selectedProductId, {  
      description: urlForm.description,  
      url: urlForm.url,  
      valueUSD: parseFloat(urlForm.valueUSD),  
    })  
  
    setUrlForm({ description: '', url: '', valueUSD: '' })  
    setSelectedProductId(null)  
  }  
  
  const handleSetManualDollar = () => {  
    const value = parseFloat(manualDollarInput)  
    if (isNaN(value) || value <= 0) {  
      alert('Digite um valor válido para o dólar')  
      return  
    }  
    setManualDollarRate(value)  
    setManualDollarInput('')  
  }  
  
  return (  
    <div className="space-y-6">  
      {/* Cotação do dólar */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cotação do Dólar</h3>  
        <div className="flex items-center gap-4">  
          <div className="flex-1">  
            <p className="text-sm text-gray-600 mb-1">  
              Cotação atual: <span className="font-bold text-gray-900">R$ {dollarRate.value.toFixed(2)}</span>  
            </p>  
            <p className="text-xs text-gray-500">  
              Fonte: {dollarRate.source === 'api' ? 'API (atualizada automaticamente)' : 'Manual'}  
            </p>  
          </div>  
          <button  
            onClick={refreshDollarRate}  
            disabled={isLoadingDollar}  
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"  
          >  
            {isLoadingDollar ? 'Atualizando...' : 'Atualizar'}  
          </button>  
        </div>  
        <div className="mt-4 flex gap-2">  
          <input  
            type="number"  
            step="0.01"  
            value={manualDollarInput}  
            onChange={(e) => setManualDollarInput(e.target.value)}  
            placeholder="Definir cotação manual"  
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
          />  
          <button  
            onClick={handleSetManualDollar}  
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"  
          >  
            Definir Manual  
          </button>  
        </div>  
      </div>  
  
      {/* Criar produto */}  
      <div className="bg-white rounded-lg shadow p-6">  
        <div className="flex justify-between items-center mb-4">  
          <h3 className="text-lg font-semibold text-gray-800">Produtos</h3>  
          <button  
            onClick={() => setShowProductForm(!showProductForm)}  
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
          >  
            {showProductForm ? 'Cancelar' : '+ Cadastrar Produto'}  
          </button>  
        </div>  
  
        {showProductForm && (  
          <div className="border-t pt-4 space-y-4">  
            <div className="grid grid-cols-2 gap-4">  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma</label>  
                <select  
                  value={productForm.platform}  
                  onChange={(e) => setProductForm({ ...productForm, platform: e.target.value as any })}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                >  
                  <option value="ClickBank">ClickBank</option>  
                  <option value="Cartpanda">Cartpanda</option>  
                </select>  
              </div>  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto</label>  
                <input  
                  type="text"  
                  value={productForm.name}  
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                />  
              </div>  
            </div>  
            <button  
              onClick={handleCreateProduct}  
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"  
            >  
              Criar Produto  
            </button>  
          </div>  
        )}  
      </div>  
  
      {/* Lista de produtos */}  
      {products.length === 0 ? (  
        <div className="bg-white rounded-lg shadow p-12 text-center">  
          <p className="text-gray-500">Nenhum produto cadastrado ainda</p>  
        </div>  
      ) : (  
        <div className="space-y-6">  
          {products.map((product) => (  
            <div key={product.id} className="bg-white rounded-lg shadow p-6">  
              <div className="flex justify-between items-start mb-4">  
                <div>  
                  <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>  
                  <p className="text-sm text-gray-500">{product.platform}</p>  
                </div>  
                <button  
                  onClick={() => setSelectedProductId(selectedProductId === product.id ? null : product.id)}  
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"  
                >  
                  {selectedProductId === product.id ? 'Cancelar' : '+ Adicionar URL'}  
                </button>  
              </div>  
  
              {selectedProductId === product.id && (  
                <div className="border-t pt-4 mb-4 space-y-4">  
                  <div className="grid grid-cols-3 gap-4">  
                    <div>  
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>  
                      <input  
                        type="text"  
                        value={urlForm.description}  
                        onChange={(e) => setUrlForm({ ...urlForm, description: e.target.value })}  
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                      />  
                    </div>  
                    <div>  
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>  
                      <input  
                        type="url"  
                        value={urlForm.url}  
                        onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}  
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                      />  
                    </div>  
                    <div>  
                      <label className="block text-sm font-medium text-gray-700 mb-2">Valor (USD)</label>  
                      <input  
                        type="number"  
                        step="0.01"  
                        value={urlForm.valueUSD}  
                        onChange={(e) => setUrlForm({ ...urlForm, valueUSD: e.target.value })}  
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"  
                      />  
                    </div>  
                  </div>  
                  <button  
                    onClick={handleAddURL}  
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"  
                  >  
                    Adicionar URL  
                  </button>  
                </div>  
              )}  
  
              {product.urls.length === 0 ? (  
                <p className="text-gray-500 text-sm">Nenhuma URL cadastrada</p>  
              ) : (  
                <div className="space-y-2">  
                  {product.urls.map((url) => (  
                    <div key={url.id} className="border rounded p-3 bg-gray-50">  
                      <div className="flex justify-between items-start">  
                        <div className="flex-1">  
                          <p className="font-medium text-gray-900">{url.description}</p>  
                          <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">  
                            {url.url}  
                          </a>  
                        </div>  
                        <div className="text-right">  
                          <p className="text-sm text-gray-600">USD ${url.valueUSD.toFixed(2)}</p>  
                          <p className="text-lg font-bold text-gray-900">R$ {(url.valueUSD * dollarRate.value).toFixed(2)}</p>  
                        </div>  
                      </div>  
                    </div>  
                  ))}  
                </div>  
              )}  
            </div>  
          ))}  
        </div>  
      )}  
    </div>  
  )  
}