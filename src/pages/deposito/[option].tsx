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

  const handleSaveMaterial = (updatedMaterial: Material) => {
    // Lógica para actualizar el material aquí
    console.log('Material actualizado:', updatedMaterial);

    // Aquí puedes agregar lógica para guardar el material actualizado en el backend
    setOpen(false);
    setSelectedMaterial(null);
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
