import { useState } from "react";
import { categories } from "../../database/mocks/db";
import { Filter } from "lucide-react";

const Sidebar = () => {

     const [selectedCategory, setSelectedCategory] = useState('todos');

    return (
         <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
    );
}

export default Sidebar;