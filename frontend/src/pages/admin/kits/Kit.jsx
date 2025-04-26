import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/BreadCrumbs";

const Kit = () => {
  const { kitId } = useParams();

  return (
    <div style={{ marginTop: 20 }}>
      <BreadCrumbs />
      <h1>Kit - {kitId}</h1>
    </div>
  );
};

export default Kit;