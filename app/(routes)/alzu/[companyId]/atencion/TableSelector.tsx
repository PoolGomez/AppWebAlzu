"use client"
import { useEffect, useState } from 'react';
import { Table } from '../mesas/table';

// interface TableSelectorProps {
//   onTableSelect: (table: Table) => void;
// }

export function TableSelector() {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const savedTables = localStorage.getItem('restaurantTables');
    if (savedTables) {
      setTables(JSON.parse(savedTables));
    }
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'bg-green-100 border-green-500',
      occupied: 'bg-red-100 border-red-500',
      reserved: 'bg-yellow-100 border-yellow-500',
      maintenance: 'bg-gray-100 border-gray-500',
    };
    return colors[status as keyof typeof colors] || colors.available;
  };

  const handleTableSelect = (table: Table) => {
    alert(`Selected ${table.name} (Status: ${table.status})`);
    // Here you can handle the table selection logic
    // For example, opening an order form or showing table details
  };

  const visibleTables = tables.filter(table => table.visible);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Table</h1>
          
          <div className="relative w-full h-[600px] border-2 border-gray-200 rounded-lg overflow-hidden">
            {visibleTables.map((table) => (
              <button
                key={table.id}
                onClick={() => handleTableSelect(table)}
                className="absolute transition-transform hover:scale-105"
                style={{
                  left: table.position.x,
                  top: table.position.y,
                  width: table.size.width,
                  height: table.size.height,
                }}
              >
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    table.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                  } ${getStatusColor(table.status)} border-2 hover:shadow-lg`}
                >
                  <span className="font-semibold">{table.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}