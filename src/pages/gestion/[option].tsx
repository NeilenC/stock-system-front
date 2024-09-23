import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SectorsComponent from "../../../components/sectors/SectorsComponent";
import TimeLineComponent from "../../../components/TimeLine/TimeLineComponent";

const Management = () => {
  const router = useRouter();
  const { option } = router.query;

  console.log("opcion", option)

  return (
    <div>
      {/* Based on 'option', you can render different content */}
      {option === 'sectors' && <SectorsComponent/>}
      {option === 'timeline' && <TimeLineComponent/>}
    </div>
  );
};  

export default Management;
