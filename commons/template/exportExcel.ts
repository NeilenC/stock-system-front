import * as XLSX from "xlsx";

  // Función para exportar los materiales a Excel
  export const exportToExcel = (currentMaterials: any) => {
    // Define los datos y el encabezado de la tabla
    const worksheetData = currentMaterials.map((material: any) => ({
      Código: material.code,
      Categoría: material.category?.category_name,
      Stock: material.actual_stock,
      Color: material.color,
      Ancho: material.width,
      Alto: material.height,
      Peso: material.weight,
      Profundidad: material.depth,
      Precio: material.price,
      Observaciones: material.observations,
      Descripción: material.description,
    }));

    // Crea un libro y una hoja de trabajo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Agrega la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materiales");

    // Genera el archivo Excel y lo descarga
    XLSX.writeFile(workbook, "inventario.xlsx");
  };