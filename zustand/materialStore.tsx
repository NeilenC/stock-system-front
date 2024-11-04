import { create } from 'zustand';
import { Category, MaterialProps } from '../components/Materials/materialsProps';

interface MaterialState {
  material: MaterialProps;
  materials: MaterialProps[];
  categories: Category[];
  setMaterial: (material: MaterialProps) => void;
  setCategories: (categories: Category[]) => void;
  fetchMaterialData: (materialId: number) => Promise<void>;
  fetchMaterials: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createMaterial: (formData: MaterialProps) => Promise<void>;
  resetMaterial: () => void;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  material: {
    name: "",
    code: "",
    color: "",
    category: { id: 0, category_name: "" },
    width: 0,
    depth: 0,
    weight: 0,
    description: "",
    height: 0,
    actual_stock: 0,
    price: 0,
    observations: "",
    image_url: null, // default empty string or a placeholder URL
    last_stock_update: new Date(), // default to current date
    is_active: true, // default to true or false as required
  },
  materials: [],
  categories: [],
  setMaterial: (material) => set({ material }),
  setCategories: (categories) => set({ categories }),

  fetchMaterialData: async (materialId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching material data");
      }
      const data = await response.json();
      set({ material: data });
    } catch (error) {
      console.error("Failed to fetch material data:", error);
    }
  },

  fetchMaterials: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`);
      if (!response.ok) {
        throw new Error("Error fetching materials");
      }
      const data: MaterialProps[] = await response.json();
      const activeMaterials = data.filter((material: MaterialProps) => material.is_active);

      set({ materials: activeMaterials });
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch("http://localhost:8080/materials-category");
      const data: Category[] = await response.json();
      set({ categories: data });
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  },
  
  createMaterial: async (formData: MaterialProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
      } else {
        const errorResponse = await response.json();
        console.error("Error al crear el material:", errorResponse);
        throw new Error("Error al crear el material");
      }
    } catch (error) {
      console.error("Error creando material:", error);
    }
  },

  resetMaterial: () =>
    set({
      material: {
        name: "",
        code: "",
        color: "",
        category: { id: 0, category_name: "" },
        width: 0,
        depth: 0,
        weight: 0,
        description: "",
        height: 0,
        actual_stock: 0,
        price: 0,
        observations: "",
        image_url: null, // reset to default or empty string
        last_stock_update: new Date(), // reset to current date
        is_active: true, // reset as appropriate
      },
    }),
}));
