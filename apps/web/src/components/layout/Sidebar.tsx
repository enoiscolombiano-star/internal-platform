import { NavLink } from 'react-router-dom'  
  
export default function Sidebar() {  
  const navItems = [  
    { name: 'Dashboard', path: '/dashboard' },  
    { name: 'Custos', path: '/costs' },  
    { name: 'Ferramentas', path: '/tools' },  
    { name: 'Produtos', path: '/products' },  
    { name: 'Funcionários', path: '/employees' },  
    { name: 'Campanhas', path: '/campaigns' },  
  ]  
  
  return (  
    <aside className="w-64 bg-gray-900 text-white">  
      <div className="p-6">  
        <h1 className="text-2xl font-bold">Cost Manager</h1>  
      </div>  
      <nav className="mt-6">  
        {navItems.map((item) => (  
          <NavLink  
            key={item.path}  
            to={item.path}  
            className={({ isActive }) =>  
              `block px-6 py-3 text-sm font-medium transition-colors ${  
                isActive  
                  ? 'bg-gray-800 text-white border-l-4 border-blue-500'  
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'  
              }`  
            }  
          >  
            {item.name}  
          </NavLink>  
        ))}  
      </nav>  
    </aside>  
  )  
}