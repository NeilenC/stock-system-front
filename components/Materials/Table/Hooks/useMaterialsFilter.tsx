// import { useState, useEffect } from "react";
// import { MaterialProps } from "../../materialsProps";

// const useMaterialsFilter = (materials: MaterialProps[]) => {
//   const [filteredMaterials, setFilteredMaterials] =
//     useState<MaterialProps[]>(materials);

//   const handleFilter = (filters: {
//     code?: string;
//     category?: string;
//     stock?: string;
//     color?: string;
//     width?: string;
//     height?: string;
//     weight?: number;
//     depth?: string;
//     price?: string;
//     observations?: string;
//     description?: string;
//   }) => {
//     let filtered = materials.filter((material) => material.is_active); // Filtra solo materiales activos

//     if (filters.category) {
//       filtered = filtered.filter((material) =>
//         material.category?.category_name
//           .toLowerCase()
//           .includes(filters.category!.toLowerCase())
//       );
//     }

//     if (filters.description) {
//       filtered = filtered.filter((material) =>
//         material.description
//           .toLowerCase()
//           .includes(filters.description!.toLowerCase())
//       );
//     }

//     if (filters.code) {
//       filtered = filtered.filter((material) =>
//         material?.code.toLowerCase().includes(filters.code!.toLowerCase())
//       );
//     }

//     if (filters.color) {
//       filtered = filtered.filter((material) =>
//         material?.color.toLowerCase().includes(filters.color!.toLowerCase())
//       );
//     }

//     if (filters.stock) {
//       filtered = filtered.filter(
//         (material) => material.actual_stock >= parseFloat(filters.stock!)
//       );
//     }

//     if (filters.width) {
//       filtered = filtered.filter(
//         (material) =>
//           material.width && material.width >= parseFloat(filters.width!)
//       );
//     }

//     if (filters.height) {
//       filtered = filtered.filter(
//         (material) =>
//           material.height && material.height >= parseFloat(filters.height!)
//       );
//     }

//     if (filters.weight) {
//       const weightValue = parseFloat(filters.weight.toString());
//       const tolerance = 0.5;
//       filtered = filtered.filter(
//         (material) =>
//           material.weight &&
//           material.weight >= weightValue - tolerance &&
//           material.weight <= weightValue + tolerance
//       );
//     }

//     if (filters.depth) {
//       filtered = filtered.filter(
//         (material) =>
//           material.depth && material.depth >= parseFloat(filters.depth!)
//       );
//     }

//     if (filters.price) {
//       const priceValue = parseFloat(filters.price.toString());
//       const tolerance = 0.5;
//       filtered = filtered.filter(
//         (material) =>
//           material.price &&
//           material.price >= priceValue - tolerance &&
//           material.price <= priceValue + tolerance
//       );
//     }

//     // Aplica los demás filtros de la misma forma...

//     setFilteredMaterials(filtered);
//   };

//   useEffect(() => {
//     // Aplica el filtro `is_active` cuando cambia la lista inicial
//     setFilteredMaterials(materials.filter((material) => material.is_active));
//   }, [materials]);

//   return {
//     filteredMaterials,
//     handleFilter,
//   };
// };

// export default useMaterialsFilter;

// hooks/useMaterialsFilter.ts
import { useState, useEffect } from "react";
import { MaterialProps } from "../../materialsProps";

const useMaterialsFilter = (materials: MaterialProps[], updatedMaterial?: MaterialProps | null) => {
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialProps[]>(materials);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastMaterial = currentPage * itemsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - itemsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilter = (filters: {
    code: string;
    category: string;
    stock: string;
    color: string;
    width: string;
    height: string;
    weight:number;
    depth: string;
    price: string;
    observations: string;
    description: string;
  }) => {
    const {
      code,
      stock,
      category,
      color,
      width,
      weight,
      height,
      depth,
      price,
      observations,
      description,
    } = filters;
    let filtered = materials;

    if (category) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.category?.category_name.toLowerCase().includes(category.toLowerCase())
      );
    }

    

    if (description) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (code) {
      filtered = filtered.filter((material: MaterialProps) =>
        material?.code.toLowerCase().includes(code.toLowerCase())
      );
    }

    if (stock) {
      filtered = filtered.filter(
        (material: MaterialProps) => material?.actual_stock >= parseFloat(stock)
      );
    }

    if (color) {
      filtered = filtered.filter((material: MaterialProps) =>
        material?.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (width) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.width && material.width >= parseFloat(width)
      );
    }

    if (height) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.height && material.height >= parseFloat(height)
      );
    }

    if (weight) {
      const weightValue = parseFloat(weight);
      const tolerance = 0.5; // Puedes ajustar este valor según lo que necesites
      filtered = filtered.filter((material: MaterialProps) => {
        return (
          material.weight&&   material.weight >= (weightValue - tolerance) &&
          material.weight&&    material.weight <= (weightValue + tolerance)
        );
      });
    }
    

    if (depth) {
      filtered = filtered.filter(
        (material: MaterialProps) =>  material.depth && material.depth >= parseFloat(depth)
      );
    }

    if (price) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.price >= parseFloat(price)
      );
    }
    

    if (observations) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.observations.toLowerCase().includes(observations.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };
  return {
    currentMaterials,
    handlePageChange,
    filteredMaterials,
    currentPage,handleFilter,
    itemsPerPage,
  };
};

export default useMaterialsFilter;