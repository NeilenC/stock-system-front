import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Management = () => {
  const router = useRouter();
  const { option } = router.query;

  console.log("opcion", option)

  return (
    <div>
      <h1>Gestión: {option}</h1>
      {/* Based on 'option', you can render different content */}
      {option === 'subgestion1' && <p>This is Subgestión 1</p>}
      {option === 'subgestion2' && <p>This is Subgestión 2</p>}
    </div>
  );
};

export default Management;
