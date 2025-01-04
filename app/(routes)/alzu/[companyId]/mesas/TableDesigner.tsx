"use client"
import React, { useState, useEffect } from 'react';
import { Square, Circle, Save, Plus } from 'lucide-react';

import { TableForm } from './TableForm';
import { TableList } from './TableList';
import { Table, TableFormData } from './table';

export function TableDesigner() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const layoutRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTables = localStorage.getItem('restaurantTables');
    if (savedTables) {
      setTables(JSON.parse(savedTables));
    }
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (layoutRef.current) {
        const container = layoutRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const contentWidth = Math.max(...tables.map(t => t.position.x + t.size.width), 600);
        const contentHeight = Math.max(...tables.map(t => t.position.y + t.size.height), 600);
        
        const scaleX = containerWidth / contentWidth;
        const scaleY = containerHeight / contentHeight;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [tables]);

  const handleAddTable = (formData: TableFormData) => {
    const newTable: Table = {
      id: Date.now().toString(),
      ...formData,
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
    };
    setTables([...tables, newTable]);
    setShowForm(false);
  };

  const handleEditTable = (formData: TableFormData) => {
    if (!editingTable) return;
    
    setTables(tables.map(table => 
      table.id === editingTable.id
        ? { ...table, ...formData }
        : table
    ));
    setEditingTable(null);
  };

  const handleDragTable = (e: React.DragEvent, tableId: string) => {
    if (isResizing) return;
    
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        const container = layoutRef.current?.getBoundingClientRect();
        if (container) {
          const x = (e.clientX - container.left) / scale - table.size.width / 2;
          const y = (e.clientY - container.top) / scale - table.size.height / 2;
          return { ...table, position: { x, y } };
        }
      }
      return table;
    });
    setTables(updatedTables);
  };

  const handleResizeStart = (e: React.MouseEvent, table: Table) => {
    e.stopPropagation();
    setIsResizing(true);
    setSelectedTable(table.id);
    setStartSize(table.size);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleResizeMove = (e: React.MouseEvent) => {
    if (!isResizing || !selectedTable) return;

    const deltaX = (e.clientX - startPosition.x) / scale;
    const deltaY = (e.clientY - startPosition.y) / scale;

    setTables(tables.map(table => {
      if (table.id === selectedTable) {
        return {
          ...table,
          size: {
            width: Math.max(50, startSize.width + deltaX),
            height: Math.max(50, startSize.height + deltaY),
          },
        };
      }
      return table;
    }));
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const handleSave = () => {
    localStorage.setItem('restaurantTables', JSON.stringify(tables));
    alert('Layout saved successfully!');
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(table => table.id !== tableId));
    setSelectedTable(null);
  };

  const startEditingTable = (table: Table) => {
    setEditingTable(table);
    setSelectedTable(table.id);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Table Layout Designer</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <Plus className="w-4 h-4" />
                  Add Table
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  <Save className="w-4 h-4" />
                  Save Layout
                </button>
              </div>
            </div>

            <div 
              ref={layoutRef}
              className="relative w-full h-[calc(100vh-280px)] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
              onMouseMove={handleResizeMove}
              onMouseUp={handleResizeEnd}
              onMouseLeave={handleResizeEnd}
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                {tables.map((table) => (
                  <div
                    key={table.id}
                    draggable={!isResizing}
                    onDragEnd={(e) => handleDragTable(e, table.id)}
                    onClick={() => setSelectedTable(table.id)}
                    className={`absolute cursor-move ${
                      selectedTable === table.id ? 'ring-2 ring-blue-500' : ''
                    }`}
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
                      } ${
                        selectedTable === table.id
                          ? 'bg-blue-100 border-blue-500'
                          : table.visible
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                      } border-2`}
                    >
                      <span className="font-semibold">{table.name}</span>
                    </div>
                    {selectedTable === table.id && (
                      <div
                        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize"
                        onMouseDown={(e) => handleResizeStart(e, table)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-80">
          <TableList
            tables={tables}
            selectedTableId={selectedTable}
            onSelect={setSelectedTable}
            onEdit={startEditingTable}
            onDelete={handleDeleteTable}
          />
        </div>
      </div>

      {showForm && (
        <TableForm
          mode="add"
          onSubmit={handleAddTable}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTable && (
        <TableForm
          mode="edit"
          initialData={editingTable}
          onSubmit={handleEditTable}
          onCancel={() => setEditingTable(null)}
        />
      )}
    </div>
  );
}