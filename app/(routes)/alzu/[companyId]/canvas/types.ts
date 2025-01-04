export type ElementType = 'circle' | 'rectangle';

export interface LayoutElement {
  id: string;
  type: ElementType;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  color: string;
  label?: string;
}