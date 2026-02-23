interface BarChartProps {  
  data: { label: string; value: number }[]  
}  
  
export default function BarChart({ data }: BarChartProps) {  
  const maxValue = Math.max(...data.map(d => d.value))  
  
  return (  
    <div className="space-y-4">  
      {data.map((item) => {  
        const percentage = (item.value / maxValue) * 100  
  
        return (  
          <div key={item.label} className="space-y-2">  
            <div className="flex justify-between text-sm">  
              <span className="font-medium text-gray-700">{item.label}</span>  
              <span className="text-gray-900">R$ {item.value.toFixed(2)}</span>  
            </div>  
            <div className="w-full bg-gray-200 rounded-full h-4">  
              <div  
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"  
                style={{ width: `${percentage}%` }}  
              />  
            </div>  
          </div>  
        )  
      })}  
    </div>  
  )  
}