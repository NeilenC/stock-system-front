export interface MaterialProps {
    id: number;
    name: string;
    code: string;
    color: string;
    width: number;
    depth: number;
    description:string;
    height: number;
    actual_stock: number;
    price: number;
    last_stock_update: string;
    observations: string;
  }
  
 export interface Category {
    id: number;
    category_name: string;
    materials: MaterialProps[];
  }
  