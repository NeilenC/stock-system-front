import React from "react";
import { useRouter } from "next/router";
import MainMaterialsComponent from "../../../components/Materials/Table/MainComponent";
import StockCheck from "../../../components/Materials/stock-check/StockCheck";
import CategoriesComponent from "../../../components/Categories/Table/CategoriesComponent";
import InactiveMaterialsTable from "../../../components/Materials/InactiveMaterials/InactiveMaterialsTable";

const StoragePage = () => {
  const router = useRouter();
  const { option } = router.query;

  return (
    <div>
      {option === "materiales" && (
        <>
          <MainMaterialsComponent />
        </>
      )}
      {option === "materiales-inactivos" && (
        <>
          <InactiveMaterialsTable />
        </>
      )}
      {option === "espacios" && (
        <>
          <StockCheck />
        </>
      )}

      {option === "categorias" && (
        <>
          <CategoriesComponent />
        </>
      )}

{option === "disponiblididad" && (
        <>
          {/* <CategoriesComponent /> */} nada
        </>
      )}
    </div>
  );
};

export default StoragePage;
