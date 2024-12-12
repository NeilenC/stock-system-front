import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import { useOrderFiltersContext } from "../context/OrderFiltersContext";
import FilterField from "../../Materials/Table/components/filters/FilterField";
import CustomButton from "../../../commons/buttons-commons/CustomButton";

const OrderFilters = ({ handleFilter }: { handleFilter: any }) => {
  const { isTablet } = useScreenSize();

  const {
    orderId,
    initialDate,
    endDate,
    material,
    state,
    responsible,
    orderDate,
    activity,
    setOrderId,
    setInitialDate,
    setEndDate,
    setState,
    setmaterial,
    setResponsible,
    setOrderDate,
    setActivity,
    clearFilters,
  } = useOrderFiltersContext();

  const handleFilterChange = (field: string, value: any) => {
    switch (field) {
      case "material":
        setmaterial(value);
        break;
      case "state":
        setState(value);
        break;
      case "orderDate":
        setOrderDate(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "state":
        setState(value);
        break;
      case "activity.activity_name":
        setActivity((prev) => ({ ...prev, activity_name: value }));
        break;
      case "orderId":
        setOrderId(value);
        break;
      case "activity.initial_date":
        setActivity((prev) => ({ ...prev, initial_date: value }));
        break;
      case "activity.end_date":
        setActivity((prev) => ({ ...prev, end_date: value }));
        break;
      default:
        break;
    }

    // Collect current filter values and update
    const filters = {
      orderId,
      activity: {
        activity_name: activity.activity_name || "",
        initial_date: activity.initial_date || "",
        end_date: activity.end_date || "",
      },
      material,
      orderDate: orderDate,
      state,
      responsible,
    };
    handleFilter({ ...filters, [field]: value });
  };
  const clearAllFilters = () => {
    clearFilters();
    handleFilter({
      orderId: "",
      initialDate: "",
      endDate: "",
      material: "",
      state: "",
      responsible: "",
      orderDate: "",
      activity: {
        activity_name: "",
        initial_date: "",
        end_date: "",
      },
    });
  };

  return (
    <Grid
      container
      gap={6}
      sx={{
        paddingInline: 3,
        textAlign: "center",
        paddingBlock: "10px",
        border: "1px solid  #E2E8F0",
      }}
    >
      {/* <FilterField
        value={material}
        onChange={(e) => handleFilterChange("material", e.target.value)}
        placeholder="material"
        size={1.3}
      /> */}

      <FilterField
        value={orderId}
        onChange={(e) => handleFilterChange("orderId", e.target.value)}
        placeholder="id"
        size={isTablet ? 1 : 1}
        maxLength={15}
      />

      <FilterField
        value={orderDate}
        onChange={(e) => handleFilterChange("orderDate", e.target.value)}
        placeholder="Tipo"
        size={isTablet ? 1 : 1}
        maxLength={15}
      />
      <FilterField
        value={activity.activity_name || ""}
        onChange={(e) =>
          handleFilterChange("activity.activity_name", e.target.value)
        }
        placeholder="nombre evento"
        size={1.3}
        maxLength={15}
      />

      <FilterField
        value={activity.initial_date || ""}
        onChange={(e) =>
          handleFilterChange("activity.initial_date", e.target.value)
        }
        placeholder="nombre evento"
        size={1.3}
        maxLength={15}
      />

      <FilterField
        value={activity.end_date || ""}
        onChange={(e) =>
          handleFilterChange("activity.end_date", e.target.value)
        }
        placeholder="nombre evento"
        size={1.3}
        maxLength={15}
      />

      <FilterField
        value={state}
        onChange={(e) => handleFilterChange("state", e.target.value)}
        placeholder="Estado"
        size={1}
        maxLength={15}
      />

      <FilterField
        value={responsible}
        onChange={(e) => handleFilterChange("responsible", e.target.value)}
        placeholder="responsable"
        size={isTablet ? 1 : 1}
        maxLength={15}
      />
      <Grid
        item
        xs={2}
        sm={isTablet ? 4 : 1}
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <CustomButton
          text="Limpiar Filtros"
          onClick={clearAllFilters}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            color: "#5f6368",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            width: isTablet ? "150px" : "300px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default OrderFilters;
