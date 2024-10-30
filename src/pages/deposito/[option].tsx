import React from "react";
import { useRouter } from "next/router";
import MainComponent from "../../../components/Materials/Table/MainComponent";

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
    </div>
  );
};

export default StoragePage;
