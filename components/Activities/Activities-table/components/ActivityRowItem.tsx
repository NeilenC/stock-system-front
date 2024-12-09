import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ImageToIcon from "../../../../commons/styled-components/IconImages";
import edit from "../../../../public/edit.png";
import deleteicon from "../../../../public/delete.png";
import { useRouter } from "next/router";
import ModalComponent from "../../../../commons/modals/ModalComponent";
import { useActivityStore } from "../../../../zustand/activityStore";
import ActivityEditForm from "./ActivityEditForm";
import { useActivitiesContext } from "../context/useActivitiesContext";
import ActivityDetails from "./ActivityDetails";
import { format, parseISO } from "date-fns";
import { ActivityColor } from "../../../../commons/activities-commons/DrawerBooking/enums";
import dayjs from "dayjs";

const ActivityRowItem = ({ activity, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { fetchActivities } = useActivitiesContext();
  const { fetchActivityById, setActivity, activityToUpdate } =
    useActivityStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const getNormalizedState = (state: string): string => {
    return state
      .trim()
      .normalize("NFD") // Descompone caracteres con acento
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .replace(/[^a-zA-Z0-9\s]/g, "") // Elimina caracteres especiales como /
      .toUpperCase()
      .replace(/\s+/g, "_"); // Reemplaza espacios con guiones bajos
  };

  const formattedInitialDate = format(
    parseISO(activity.initial_date),
    "dd/MM/yyyy"
  );

  // Si `initial_time` es una cadena de texto con el formato HH:mm, necesitas convertirlo a un objeto Date o Dayjs
  const formattedInitialTime = dayjs(activity.initial_time, "HH:mm").format(
    "HH:mm"
  );

  const formattedOpeningDate = format(
    parseISO(activity.opening_date),
    "dd/MM/yyyy"
  );
  const formattedOpeningTime = dayjs(activity.opening_time, "HH:mm").format(
    "HH:mm"
  );

  const formattedClosingDate = format(
    parseISO(activity.closing_date),
    "dd/MM/yyyy"
  );
  const formattedClosingTime = dayjs(activity.closing_time, "HH:mm").format(
    "HH:mm"
  );

  const formattedEndDate = format(parseISO(activity.end_date), "dd/MM/yyyy");
  const formattedEndTime = dayjs(activity.end_time, "HH:mm").format("HH:mm");

  useEffect(() => {
    if (selectedId !== null) {
      fetchActivityById(selectedId);
    }
  }, [selectedId, fetchActivityById]);

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setActivity(null);
  };
  // console.log("activity to update ANTES ...", activityToUpdate) 

  const handleSaveChanges = async () => {
    if (activityToUpdate) {

      activityToUpdate.sector_activities_ids = activityToUpdate.sector_activities_ids.map((sectorActivity) => {
        // Si el sector tiene `toggle_partially_rented`
        if (sectorActivity.toggle_partially_rented !== undefined) {
          sectorActivity.is_partially_rented = sectorActivity.toggle_partially_rented;
        } else {
          // Si no tiene `toggle_partially_rented`, ajustar `is_partially_rented` según el caso
          if (sectorActivity.is_partially_rented === false && sectorActivity.toggle_partially_rented === true) {
            sectorActivity.is_partially_rented = true;
          } else if (sectorActivity.is_partially_rented === false && sectorActivity.toggle_partially_rented === false) {
            sectorActivity.is_partially_rented = false;
          }
        }
        return sectorActivity;
      });
  
      try {
        const sendUpdate = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${selectedId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activityToUpdate),
          }
        );

        if (sendUpdate.ok) {
          console.log("Actividad actualizada con éxito");
          await fetchActivities();
          handleCloseModal(); 
        } else {
          console.error(
            "Error al actualizar la actividad:",
            await sendUpdate.text()
          );
        }
      } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
      }
    }
  };

  const handleDeactivateActivity = async (idToDelete: number | null) => {
    if (!idToDelete) {
      console.error("No se encontró un ID válido para eliminar.");
      return;
    }
  console.log("SELECTidToDeleteED ID", idToDelete);
    try {
      const sendUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${idToDelete}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }),
        }
      );
  
      if (sendUpdate.ok) {
        console.log("Actividad desactivada exitosamente");
        await fetchActivities(); 
      } else {
        console.error("Error al desactivar la actividad:", await sendUpdate.text());
      }
    } catch (error) {
      console.error("Error en la solicitud de desactivación:", error);
    }
  };
  


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
      <Grid item xs={2} sm={1.5} sx={{ mt: 0.7 }}>
        {activity.activity_name}
      </Grid>
      <Grid item xs={2} sm={1.5}>
        <Box
          sx={{
            borderRadius: "20px",
            p: 1,
            mb: 1,
            background:
              ActivityColor[
                getNormalizedState(activity.state) as keyof typeof ActivityColor
              ] || "black",
          }}
        >
          {" "}
          {activity.state}
        </Box>
      </Grid>
      <Grid item xs={2} sm={1.3} sx={{ mt: 0.7 }}>
        {activity.type_activity}
      </Grid>

      <Grid item xs={12} sm={1.2}>
        <Tooltip
          title={activity.sector_activities_ids
            .map((sec: any) => sec.sector.name)
            .join(" ,  ")}
          placement="top"
        >
          <div>
            {activity.sector_activities_ids.slice(0, 1).map((sec: any) => (
              <Chip
                key={sec.sector.id}
                label={sec.sector.name}
                sx={{ fontSize: "15px" }}
              />
            ))}
            {activity.sector_activities_ids.length > 1 && (
              <Chip
                label={`+${activity.sector_activities_ids.length - 1} más`}
              />
            )}
          </div>
        </Tooltip>
      </Grid>
      <Grid item xs={2} sm={1.3}>
        {formattedInitialDate}
        <br />
        {formattedInitialTime}
      </Grid>
      <Grid item xs={2} sm={1.5}>
        {formattedOpeningDate}
        <br />
        {formattedOpeningTime}
      </Grid>
      <Grid item xs={2} sm={1.4}>
        {formattedClosingDate}
        <br />
        {formattedClosingTime}
      </Grid>
      <Grid item xs={2} sm={1.5}>
        {formattedEndDate}
        <br />
        {formattedEndTime}
      </Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={1} sm={0.3} sx={{ cursor: "pointer" }}>
        <ImageToIcon
          icon={deleteicon}
          w={20}
          h={20}
          onClick={() => {
            console.log("Activity ID seleccionada para eliminar:", activity.id);
            setSelectedIdToDelete(activity.id);
            setOpenDeleteModal(true);
          }}
        />
      </Grid>
      {/* <Grid item xs={1} sm={0.2} sx={{ cursor: "pointer" }}>
        <ImageToIcon
          icon={search}
          w={20}
          h={20}
          onClick={() => router.push(`/activities/${activity.id}`)}
        />
      </Grid> */}
      <Grid
        item
        xs={1}
        sm={0.1}
        sx={{ cursor: "pointer", position: "relative" }}
      >
        <ImageToIcon w={20} h={20} icon={edit} onClick={handleEditClick} />
        {/* Menú para editar */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ zIndex: 9999 }}
        >
          <MenuItem
            onClick={() => {
              setSelectedId(activity.id);
              setEditModalOpen(true);
              handleMenuClose();
            }}
          >
            Editar
          </MenuItem>
        </Menu>
      </Grid>
      {editModalOpen && (
        <ModalComponent
          isOpen={editModalOpen}
          title="Editar Actividad"
          onSubmit={handleSaveChanges}
          handleClose={handleCloseModal}
          textButton="Editar"
          width="70%"
        >
          
          <ActivityEditForm activityId={selectedId} />
        </ModalComponent>
      )}

      {openDeleteModal && (
        <ModalComponent
          isOpen={openDeleteModal}
          title={`¿ Estas seguro que deseas elimiar esta Actividad ?`}
          onSubmit={() => handleDeactivateActivity(selectedIdToDelete!)}
          handleClose={() => setOpenDeleteModal(false)}
          textButton="Eliminar"
        >
          <ActivityDetails activity={activity}></ActivityDetails>
        </ModalComponent>
      )}
    </Grid>
  );
};

export default ActivityRowItem;
