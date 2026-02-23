interface LineChartProps {  
  data: { label: string; value: number }[]  
}  
  
export default function LineChart({ data }: LineChartProps) {  
  const maxValue = Math.max(...data.map(d => d.value))  
  const minValue = Math.min(...data.map(d => d.value))  
  const range = maxValue - minValue  
  
  const points = data.map((item, index) => {  
    const x = (index / (data.length - 1)) * 100  
    const y = 100 - ((item.value - minValue) / range) * 100  
    return `${x},${y}`  
  }).join(' ')  
  
  return (  
    <div className="space-y-4">  
      <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">  
        {/* Grid lines */}  
        <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />  
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />  
        <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />  
          
        {/* Line */}  
        <polyline  
          points={points}  
          fill="none"  
          stroke="#2563eb"  
          strokeWidth="2"  
          vectorEffect="non-scaling-stroke"  
        />  
          
        {/* Area under line */}  
        <polygon  
          points={`0,100 ${points} 100,100`}  
          fill="#2563eb"  
          fillOpacity="0.1"  
        />  
      </svg>  
  
      {/* Labels */}  
      <div className="flex justify-between text-xs text-gray-600">  
        {data.map((item) => (  
          <div key={item.label} className="text-center">  
            <div className="font-medium">{item.label}</div>  
            <div className="text-gray-900">R$ {item.value.toFixed(0)}</div>  
          </div>  
        ))}  
      </div>  
    </div>  
  )  
}