import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const StoragePage = () => {
  const router = useRouter();
  const { option } = router.query;

  return (
    <div>
    <h1>Depósito: {option}</h1>
    {option === 'subdeposito1' && <p>This is Subdepósito 1</p>}
    {option === 'subdeposito2' && <p>This is Subdepósito 2</p>}
  </div>
  );
};

export default StoragePage;
