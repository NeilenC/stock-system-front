import { File } from "buffer";
import { SectorProps } from "../../hooks/useSectors";

export interface MaterialProps {
  id?: number  | null;
  name: string;
  code: string;
  color: string;
  category: Category | null;  // Permite null en caso de que no haya categoría
  weight: number;
  image_url: File | null; 
  width: number;
  height: number;
  depth: number;
  description: string;
  actual_stock: number;
  price: number;
  last_stock_update: Date;
  observations: string;
  is_active: boolean;
  sector_id?: SectorProps | undefined; // Relación con el tipo Sector
  storaged_stock?: number; 
}

  
 export interface Category {
    id: number;
    category_name: string;
    materials?: MaterialProps[];
  }
  