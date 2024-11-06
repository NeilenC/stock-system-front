import { useRouter } from "next/router";
import React from "react";
import SectorsComponent from "../../../components/sectors/SectorsComponent";
import Sectors from "../../../components/sectors/Sectors";
import useSectors from "../../../hooks/useSectors";

const Management = () => {
  const router = useRouter();
  const { option } = router.query;
  const { salas } = useSectors();


  return (
    <div>
      {/* Based on 'option', you can render different content */}
      {option === "sectors" && (
        <SectorsComponent salas={salas} >
          <Sectors />
        </SectorsComponent>
      )}
    </div>
  );
};

export default Management;
