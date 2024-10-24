export interface MaterialProps {
  id?: number;
  name: string;
  code: string;
  color: string;
  category: Category | null;  // Permite null en caso de que no haya categoría
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  description: string;
  actual_stock: number;
  price: number;
  last_stock_update?: string;
  observations: string;
}

  
 export interface Category {
    id: number;
    category_name: string;
    materials?: MaterialProps[];
  }
  