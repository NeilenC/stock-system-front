export const fetchMaterialsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`);
      if (!response.ok) throw new Error("Failed to fetch materials");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const createMaterial = async (formData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Error creating material");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const updateMaterial = async (materialId: number, updatedMaterial: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMaterial),
      });
  
      if (!response.ok) throw new Error("Error updating material");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const deleteMaterial = async (materialId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: false }),
      });
  
      if (!response.ok) throw new Error("Error deleting material");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  