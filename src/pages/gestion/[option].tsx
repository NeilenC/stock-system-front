import { useRouter } from "next/router";
import React from "react";
import SectorsComponent from "../../../components/sectors/SectorsComponent";
import Sectors from "../../../components/sectors/Sectors";
import useSectors from "../../../hooks/useSectors";
import Events from "../../../components/Activities/Activities";
import OrdersComponent from "../../../components/Orders/OrdersComponent";
import InactiveMaterialsTable from "../../../components/Materials/InactiveMaterials/InactiveMaterialsTable";

const Management = () => {
  const router = useRouter();
  const { option } = router.query;
  const { salas, setSalas } = useSectors();

  return (
    <div>
      {/* Based on 'option', you can render different content */}
      {option === "sectors" && (
        <SectorsComponent>
          <Sectors salas={salas} setSalas={setSalas} />
        </SectorsComponent>
      )}
      {option === "eventos" && <Events />}
      {option === "pedidos" && <OrdersComponent />}
      {option === 'materiales-inactivos' && <InactiveMaterialsTable/>}
    </div>
  );
};

export default Management;
