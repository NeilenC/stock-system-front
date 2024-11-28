import {
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import OrderFilters from "./components/OrderFilters";
import OrderHeaders from "./components/OrderHeaders";
import theme from "../../themes/theme";
import { useOrderContext } from "./context/useOrderContext";
import { useOrderFiltersContext } from "./context/OrderFiltersContext";
import OrderRowItem from "./components/OrderRowItem";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import order from "../../public/orderlist.png";
import { useEffect, useState } from "react";
import ModalComponent from "../../commons/modals/ModalComponent";
import useSectors from "../../hooks/useSectors";
import { Activity, useActivityStore } from "../../zustand/activityStore";
import { useMaterialStore } from "../../zustand/materialStore";
import { MaterialProps } from "../Materials/materialsProps";
import OrderCreateForm from "./components/OrderCreateForm";

interface OrderProps {
  materialId: number;
  quantity: number;
  sectorId: number;
}

const OrdersComponent = () => {
  const {
    currentOrder,
    currentPage,
    handlePageChange,
    totalItems,
    itemsPerPage,
    updateItemsPerPage,
  } = useOrderContext();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [orderItems, setOrderItems] = useState<OrderProps[]>([]);


  const handleItemsPerPageChange = (event: any) => {
    const value = parseInt(event.target.value, 10); //
    updateItemsPerPage(value);
  };

  
console.log("acaaa", selectedActivity?.id)
  
  const handleSubmit = async () => {
    const createOrderPayload = {
      activity_id: selectedActivity?.id, 
      createdAt: new Date(),
      orders_list: orderItems.map((item) => ({
        material: item.materialId, 
        quantity: item.quantity, 
        sector: item.sectorId, 
      })),
    };
  
  console.log("Createorderplayload", createOrderPayload)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/activity-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createOrderPayload),
      });
  
      if (response.ok) {
        // Maneja la respuesta del backend
        const data = await response.json();
        console.log("Orden creada exitosamente", data);
      } else {
        // Maneja el error si la respuesta no es exitosa
        console.error("Error creando la orden");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor", error);
    }
  };
  

  const mockOrders = [
    {
      id: 1,
      materials: [],
      creationDate: "20/11/2024",
      state: "En Proceso",
      responsible: "Neilen Monlezún",
    },
    {
      id: 2,
      materials: [],
      creationDate: "20/11/2024",
      state: "En Proceso",
      responsible: "Neilen Monlezún",
    },
    {
      id: 3,
      materials: [],
      creationDate: "20/11/2024",
      state: "En Proceso",
      responsible: "Neilen Monlezún",
    },
  ];

  
  return (
    <>
      <SectionComponent icon={order} text={"Pedidos"}>
        {/* Botón para limpiar filtros */}

        <CustomButton
          onClick={() => setOpenModalCreate(true)}
          text={"Crear Nuevo Pedido"}
        />
      </SectionComponent>
      <Box sx={{ p: "  10px 0px 0px  16px", display: "flex" }}>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items por página"
          sx={{ height: "45px" }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant="body1" sx={{ alignContent: "center", pl: 2 }}>
          Registros por página
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBlock: "10px",
          paddingInline: "16px",
        }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <Grid container>
            <OrderHeaders />
            <OrderFilters handleFilter={() => <></>} />
            <Box
              sx={{
                height: "450px",
                overflowX: "auto",
                width: "100%",
                bgcolor: theme.palette.primary.main,
              }}
            >
              {/* <Box sx={{ paddingInline: 1 }}> */}
              {mockOrders.length > 0 ? (
                mockOrders.map((order: any, index: any) => (
                  <OrderRowItem key={order.id} order={order} index={index} />
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    p: 5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  No se encontraron Pedidos
                </Typography>
              )}
            </Box>
            {/* <Pagination
          page={currentPage}
          onPageChange={(newPage: any) => {
           <></>>
          }}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        /> */}
            {/* </Box> */}
          </Grid>
        </Box>
        {openModalCreate && (
          <ModalComponent
            isOpen={openModalCreate}
            title={"Generar un Nuevo Pedido"}
            onSubmit={handleSubmit}
            handleClose={() => setOpenModalCreate(false)}
            width="85%"
            textButton="Crear Orden"
          >
           <OrderCreateForm setOrderItems={setOrderItems} setSelectedActivity={setSelectedActivity}
           selectedActivity={selectedActivity} orderItems={orderItems}></OrderCreateForm>
          </ModalComponent>
        )}
      </Box>
    </>
  );
};

export default OrdersComponent;
