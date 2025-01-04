export interface Table {
    id: string;
    name: string;
    shape: 'square' | 'circle';
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    position: { x: number; y: number };
    size: { width: number; height: number };
    visible: boolean;
  }
  
  export interface TableFormData {
    name: string;
    shape: 'square' | 'circle';
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    visible: boolean;
  }