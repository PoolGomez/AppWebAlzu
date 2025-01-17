"use client"
import React, { useState, useEffect } from 'react';

const PrinterConfig = () => {
  const [printerName, setPrinterName] = useState('');
  const [paperWidth, setPaperWidth] = useState('80');
  const [margin, setMargin] = useState('10');
  const [printers, setPrinters] = useState<string[]>([]);

  // Cargar impresoras disponibles (simulado)
  useEffect(() => {
    // Simulación: Aquí puedes cargar las impresoras disponibles usando QZ Tray o un plugin avanzado.
    const availablePrinters = ['Ticketera 1', 'Impresora Predeterminada', 'Ticketera USB'];
    setPrinters(availablePrinters);

    // Cargar configuraciones guardadas
    const savedConfig = JSON.parse(localStorage.getItem('printerConfig') || '{}');
    setPrinterName(savedConfig.printerName || '');
    setPaperWidth(savedConfig.paperWidth || '80');
    setMargin(savedConfig.margin || '10');
  }, []);

  // Guardar configuración
  const saveConfig = () => {
    const config = { printerName, paperWidth, margin };
    localStorage.setItem('printerConfig', JSON.stringify(config));
    alert('Configuración guardada');
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Configuración de Ticketera</h2>

      <div className="mb-4">
        <label className="block font-medium">Impresora</label>
        <select
          value={printerName}
          onChange={(e) => setPrinterName(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Selecciona una impresora</option>
          {printers.map((printer, index) => (
            <option key={index} value={printer}>
              {printer}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Ancho del papel (mm)</label>
        <input
          type="number"
          value={paperWidth}
          onChange={(e) => setPaperWidth(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Márgenes (mm)</label>
        <input
          type="number"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={saveConfig}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar Configuración
      </button>
    </div>
  );
};

export default PrinterConfig;