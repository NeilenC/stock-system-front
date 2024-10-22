export interface Material {
    id: number;
    name: string;
    code: string;
    color: string;
    width: number;
    depth: number;
    actual_stock: number;
    price: number;
    last_stock_update: string;
    observations: string;
  }
  
 export interface Category {
    id: number;
    category_name: string;
    materials: Material[];
  }
  