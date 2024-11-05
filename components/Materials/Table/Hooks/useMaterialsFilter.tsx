// import { useState, useEffect, useMemo } from "react";
// import { MaterialProps } from "../../materialsProps";

// const initialFilters = {
//   code: '',
//   category: '',
//   stock: '',
//   color: '',
//   width: '',
//   height: '',
//   weight: '',
//   depth: '',
//   price: '',
//   observations: '',
//   description: '',
// };

// const useMaterialsFilter = (materials: MaterialProps[]) => {
//   const [filteredMaterials, setFilteredMaterials] = useState<MaterialProps[]>(materials);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState(initialFilters);

//   const itemsPerPage = 10;

//   const filteredMaterialsMemo = useMemo(() => {
//     let filtered = materials;

//     if (filters.category) {
//       filtered = filtered.filter((material) =>
//         material.category?.category_name.toLowerCase().includes(filters.category.toLowerCase())
//       );
//     }
//     if (filters.description) {
//       filtered = filtered.filter((material) =>
//         material.description.toLowerCase().includes(filters.description.toLowerCase())
//       );
//     }
//     if (filters.code) {
//       filtered = filtered.filter((material) =>
//         material?.code.toLowerCase().includes(filters.code.toLowerCase())
//       );
//     }
//     if (filters.stock) {
//       filtered = filtered.filter((material) =>
//         String(material.actual_stock).includes(filters.stock)
//       );
//     }
//     if (filters.color) {
//       filtered = filtered.filter((material) =>
//         material?.color.toLowerCase().includes(filters.color.toLowerCase())
//       );
//     }
//     if (filters.width) {
//       filtered = filtered.filter((material) =>
//         material.width && String(material.width).includes(filters.width)
//       );
//     }
//     if (filters.height) {
//       filtered = filtered.filter((material) =>
//         material.height && String(material.height).includes(filters.height)
//       );
//     }
//     if (filters.weight) {
//       filtered = filtered.filter((material) =>
//         material.weight && String(material.weight).includes(String(filters.weight))
//       );
//     }
    
//     if (filters.depth) {
//       filtered = filtered.filter((material) =>
//         material.depth && String(material.depth).includes(filters.depth)
//       );
//     }
//     if (filters.price) {
//       filtered = filtered.filter((material) =>
//         String(material.price).includes(filters.price)
//       );
//     }
//     if (filters.observations) {
//       filtered = filtered.filter((material) =>
//         material.observations.toLowerCase().includes(filters.observations.toLowerCase())
//       );
//     }

//     // Reset page if filtered results don't reach the current page
//     if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
//       setCurrentPage(1);
//     }

//     return filtered;
//   }, [materials, JSON.stringify(filters)]);

//   useEffect(() => {
//     setFilteredMaterials(filteredMaterialsMemo);
//   }, [filteredMaterialsMemo]);

//   const currentMaterials = useMemo(() => {
//     return filteredMaterials.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//   }, [filteredMaterials, currentPage, itemsPerPage]);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= Math.ceil(filteredMaterials.length / itemsPerPage)) {
//       setCurrentPage(page);
//     }
//   };

//   const handleFilter = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//   };

//   const resetFilters = () => {
//     setFilters(initialFilters);
//   };

//   return {
//     currentMaterials,
//     handlePageChange,
//     handleFilter,
//     currentPage,
//     itemsPerPage,
//     totalItems: filteredMaterials.length,
//     resetFilters
//   };
// };

// export default useMaterialsFilter;
