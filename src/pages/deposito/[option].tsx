import React from "react";
import { useRouter } from "next/router";
import MainComponent from "../../../components/Materials/Table/MainComponent";
import StockCheck from "../../../components/Materials/stock-check/StockCheck";

const StoragePage = () => {
  const router = useRouter();
  const { option } = router.query;



  return (
    <div>
      {option === "materiales" && (
        <>
          <MainComponent />
        </>
      )}

{option === "stock" && (
        <>
          <StockCheck />
        </>
      )}
    </div>
  );
};

export default StoragePage;
