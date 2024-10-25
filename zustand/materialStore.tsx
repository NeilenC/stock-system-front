  import { create } from 'zustand';
  import { Category, MaterialProps } from '../components/Materials/materialsProps';

  interface MaterialState {
    material: MaterialProps;
    categories: Category[];
    setMaterial: (material: MaterialProps) => void;
    setCategories: (categories: Category[]) => void;
    fetchMaterialData: (materialId: number) => Promise<void>;
    fetchCategories: () => Promise<void>;
    createMaterial: (formData: MaterialProps) => Promise<void>; // Add this line
  }



  export const useMaterialStore = create<MaterialState>((set) => ({
    material: {
      name: "",
      code: "",
      color: "",
      category: { id: 0, category_name: "" } ,
      width: 0,
      depth: 0,
      weight: 0,
      description: "",
      height: 0,
      actual_stock: 0,
      price: 0,
      observations: "",
    },
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
        const formDataToSend = new FormData(); // Crea un nuevo FormData
    
        // Añade todas las propiedades del objeto formData a formDataToSend
        Object.entries(formData).forEach(([key, value]) => {
          // Si category es un número, se puede añadir directamente
          formDataToSend.append(key, value === null ? "" : String(value));
        });
    
        console.log("formDataToSend", formData.category);
        console.log("Tipo de category:", typeof formData.category);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/materials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Envía el JSON completo
          }
        );
        
    
        if (response.ok) {
          console.log("Material creado exitosamente");
        } else {
          const errorResponse = await response.json();
          console.error("Error al crear el material:", errorResponse);
          throw new Error("Error al crear el material");
        }
      } catch (error) {
        console.error("Error creando material:", error);
      }
    }
    
    
    
  }));
