import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SectorsComponent from "../../../components/sectors/SectorsComponent";

const Management = () => {
  const router = useRouter();
  const { option } = router.query;

  console.log("opcion", option)

  return (
    <div>
      <h1>Gestión: {option}</h1>
      {/* Based on 'option', you can render different content */}
      {option === 'sectors' && <SectorsComponent/>}
      {option === 'subgestion2' && <p>This is Subgestión 2</p>}
    </div>
  );
};

export default Management;
