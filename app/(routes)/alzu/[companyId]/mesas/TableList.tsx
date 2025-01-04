import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Table } from './table';

interface TableListProps {
  tables: Table[];
  selectedTableId: string | null;
  onSelect: (tableId: string) => void;
  onEdit: (table: Table) => void;
  onDelete: (tableId: string) => void;
}

export function TableList({ tables, selectedTableId, onSelect, onEdit, onDelete }: TableListProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-red-100 text-red-800',
      reserved: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.available;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-280px)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Tables</h2>
      <div className="space-y-2">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => onSelect(table.id)}
            className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
              selectedTableId === table.id ? 'bg-blue-50 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${
                table.shape === 'circle' ? 'rounded-full' : 'rounded-sm'
              } ${table.visible ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">{table.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                {table.status}
              </span>
              {table.visible ? (
                <Eye className="w-4 h-4 text-green-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(table);
                }}
                className="p-1 text-gray-500 hover:text-blue-500"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(table.id);
                }}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}