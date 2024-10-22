import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import MaterialsComponent from "../../../components/Materials/MaterialsComponent";
import { Category, Material } from "../../../components/Materials/materialsProps";
import ModalMaterial from "../../../components/Materials/Modal/ModalMaterial";

const StoragePage = () => {
  const router = useRouter();
  const { option } = router.query;
  const [open, setOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/materials-category");
        const data: Category[] = await response.json(); // Tipamos la respuesta de la API
        setCategories(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchCategories();
  }, []);

  // Manejador para abrir el modal y pasar el material seleccionado
  const handleEditMaterial = (materialId: number) => {
    console.log("materialId -------", materialId)
    const materialToEdit = categories
      .flatMap(category => category.materials)
      .find(material => material.id === materialId);
    
    if (materialToEdit) {
      setSelectedMaterial(materialToEdit);
      setOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedMaterial(null);
  };

    const handleSaveMaterial = async (updatedMaterial: Material, file: File | null) => {
      try {
        const formData = new FormData();
    
        // Agregar los datos del material como JSON
        const materialData = JSON.stringify(updatedMaterial);
        formData.set('updateMaterialsDto', materialData);
    
        // Agregar la imagen si existe
        if (file) {
          formData.set('image', file); // El campo 'image' debe coincidir con lo que espera tu backend
        }
    
        // Verifica si los datos se han agregado correctamente
        console.log("Material Data:", materialData);
        console.log("Archivo:", file);
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/${updatedMaterial.id}`, {
          method: 'PATCH',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Error al actualizar el material');
        }
    
        const data = await response.json();
        console.log('Material actualizado:', data);
    
        // Actualizar el material en las categorías después de la respuesta exitosa
        setCategories(prevCategories => 
          prevCategories.map(category => ({
            ...category,
            materials: category.materials.map(material => 
              material.id === data.id ? data : material
            )
          }))
        );
    
        setOpen(false);
        setSelectedMaterial(null);
      } catch (error) {
        console.error('Error al actualizar el material:', error);
      }
    };
  
  
  

  return (
    <div>
      {option === 'materiales' && (
        <>
          <MaterialsComponent categories={categories} onEdit={handleEditMaterial} />
          {selectedMaterial && (
            <ModalMaterial
              open={open}
              handleClose={handleCloseModal}
              material={selectedMaterial}
              onSave={handleSaveMaterial}
            />
          )}
        </>
      )}
      {/* {option === 'subdeposito2' && <p>This is Subdepósito 2</p>} */}
    </div>
  );
};

export default StoragePage;
