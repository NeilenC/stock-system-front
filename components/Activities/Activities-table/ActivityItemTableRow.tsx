import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import IconToImage from "../../../commons/styled-components/IconImages";
import edit from "../../../public/edit.png";
import search from "../../../public/search.png";
import deleteicon from "../../../public/delete.png";
import { useRouter } from "next/router";
import photo from "../../../public/photo.png";
import notphoto from "../../../public/notimage.png";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../themes/theme";
import ModalComponent from "../../../commons/modals/ModalComponent";
import { useActivityStore } from "../../../zustand/activityStore";
import ActivityEditForm from "./components/ActivityEditForm";
import { useActivitiesContext } from "./context/useActivitiesContext";
import ActivityDetails from "./components/ActivityDetails";
import { format, parseISO } from "date-fns";
// interface ActivityTableRowItemProps {
//   activity: {
//     id: string;
//     name: string;
//     description: string;
//     status: string;
//     category: { category_name: string };
//     assignedPerson: string;
//     startDate: string;
//     endDate: string;
//     observations: string;
//     budget: number;
//     image_url: string | null;
//   };
//   openDeleteModal: () => void;
//   onEdit: (id: string) => void;
//   index: number;
// }

const ActivityTableRowItem = ({ activity, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { fetchActivities } = useActivitiesContext();
  const { fetchActivityById, setActivity, updatedActivity } =
    useActivityStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const formattedInitialDate = format(parseISO(activity.initial_date), "dd/MM/yyyy");
  const formattedEndDate = format(parseISO(activity.end_date), "dd/MM/yyyy");
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

  const handleSaveChanges = async () => {
    if (updatedActivity) {
      console.log("Datos de la actividad editada:", updatedActivity);

      const sendUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${selectedId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedActivity),
        }
      );
      if (sendUpdate.ok) {
        await fetchActivities();
      }
      handleCloseModal();
    }
  };

  const handleDeactivateActivity = async () => {

      const sendUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${selectedId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }),
        }
      );
      if (sendUpdate.ok) {
        await fetchActivities();
      handleCloseModal();
    }
  };
  return (
    <Grid
      container
      spacing={1}
      sx={{
        textAlign: "center",
        borderBottom: "1px solid #ccc",
        paddingBlock: 1.2,
        bgcolor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
      }}
    >
      <Grid item xs={2} sm={2}>
        {activity.activity_name}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {activity.state}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {activity.type_activity}
      </Grid>
      <Grid item xs={2} sm={1.1}>
        {activity.cwa_number}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {activity.type_of_contract}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {activity.responsible_name}
      </Grid>
      {/* <Grid item xs={2} sm={1.3}>
        {activity.contact_rural || "N/C"}
      </Grid> */}
      <Grid item xs={2} sm={1.3}>
        {formattedInitialDate}
      </Grid>
      <Grid item xs={2} sm={1.3}>
        {formattedEndDate}
      </Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={1} sm={0.3} sx={{ cursor: "pointer" }}>
        <IconToImage
          icon={deleteicon}
          w={20}
          h={20}
          onClick={() => setOpenDeleteModal(true)}
        />
      </Grid>
      <Grid item xs={1} sm={0.2} sx={{ cursor: "pointer" }}>
        <IconToImage
          icon={search}
          w={20}
          h={20}
          onClick={() => router.push(`/activities/${activity.id}`)}
        />
      </Grid>
      <Grid
        item
        xs={1}
        sm={0.1}
        sx={{ cursor: "pointer", position: "relative" }}
      >
        <IconToImage w={20} h={20} icon={edit} onClick={handleEditClick} />
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
        >
          <ActivityEditForm activityId={selectedId} />
        </ModalComponent>
      )}

      {openDeleteModal && (
        <ModalComponent
          isOpen={openDeleteModal}
          title={`¿ Estas seguro que deseas elimiar esta Actividad ?`}
          onSubmit={handleDeactivateActivity}
          handleClose={() => setOpenDeleteModal(false)}
          textButton="Eliminar"
        >
          <ActivityDetails activity={activity}></ActivityDetails>
        </ModalComponent>
      )}
    </Grid>
  );
};

export default ActivityTableRowItem;
