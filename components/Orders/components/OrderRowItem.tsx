import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import edit from "../../../public/edit.png";
import deleteicon from "../../../public/delete.png";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useOrderContext } from "../context/useOrderContext";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import ModalComponent from "../../../commons/modals/ModalComponent";
import OrderEditForm from "./OrderEditForm";
import { useOrderStore } from "../../../zustand/orderStore";
import { format, parseISO } from "date-fns";

const OrderRowItem = ({ order, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { fetchOrder } = useOrderContext();
  // const { fetchorderById, setorder, updatedorder } =
  //   use();
  const { setOrders, fetchOrderById, setOrder } = useOrderStore();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(
    null
  );
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // console.log("order", order);

  const formattedcreateAt = format(parseISO(order.createdAt), "dd/MM/yyyy");

  return (
    <Grid
      container
      spacing={1}
      sx={{
        borderBottom: "1px solid #ccc",
        paddingBlock: 1.5,
        bgcolor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
        textAlign: "center",
      }}
    >
      <Grid item xs={12} sm={2} sx={{ mt: 0.7 }}>
        {formattedcreateAt}
      </Grid>
      <Grid item xs={12} sm={2} sx={{ mt: 0.7 }}>
        {order.activity.activity_name}
      </Grid>
      <Grid item xs={12} sm={2}>
        <Box
          sx={{
            borderRadius: "20px",
            p: 1,
            mb: 1,
          }}
        >
          {order.state}
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ mt: 0.7 }}>
        {order.responsible}
      </Grid>
      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={12} sm={0.5} sx={{ cursor: "pointer" }}>
        <ImageToIcon
          icon={deleteicon}
          w={20}
          h={20}
          onClick={() => {
            console.log("order ID seleccionada para eliminar:", order.id);
            setSelectedIdToDelete(order.id);
            setOpenDeleteModal(true);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={1} sx={{ cursor: "pointer", position: "relative" }}>
        <ImageToIcon w={20} h={20} icon={edit} onClick={() => <></>} />

        
        {/* Menú para editar */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => <></>}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ zIndex: 9999 }}
        >
          <MenuItem
            onClick={() => {
              setOrderId(order.id);
              setEditModalOpen(true);
            }}
          >
            Editar
          </MenuItem>
        </Menu>
      </Grid>
      {editModalOpen && (
        <ModalComponent
          isOpen={editModalOpen}
          title="Editar Orden"
          onSubmit={() => <></>}
          handleClose={() => <></>}
          textButton="Editar"
        >
          <OrderEditForm orderId={orderId} />
        </ModalComponent>
      )}
    </Grid>
  );
  
};

export default OrderRowItem;
