import { FormEvent, useState } from "react";
import { Table, TableFormData } from "./table";


interface TableFormProps {
  onSubmit: (data: TableFormData) => void;
  onCancel: () => void;
  initialData?: Table;
  mode?: 'add' | 'edit';
}

export function TableForm({ onSubmit, onCancel, initialData, mode = 'add' }: TableFormProps) {
  const [formData, setFormData] = useState<TableFormData>({
    name: initialData?.name || '',
    shape: initialData?.shape || 'square',
    status: initialData?.status || 'available',
    visible: initialData?.visible ?? true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'add' ? 'Add New Table' : 'Edit Table'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Table Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Shape</label>
            <select
              value={formData.shape}
              onChange={(e) => setFormData({ ...formData, shape: e.target.value as 'square' | 'circle' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="visible"
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="visible" className="ml-2 block text-sm text-gray-700">
              Visible in Table Selector
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {mode === 'add' ? 'Add Table' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}