import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MaterialProps } from "../../Materials/materialsProps";
import useSectors from "../../../hooks/useSectors";
import { Activity, useActivityStore } from "../../../zustand/activityStore";
import { IconButton } from "rsuite";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import deleteicon from "../../../public/delete.png";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import useScreenSize from "../../../hooks/useScreenSize";
import add from "../../../public/add.png";
import change from "../../../public/change.png";

interface OrderProps {
  materialId: number;
  quantity: number;
  sectorId: number;
}

const OrderCreateForm = ({
  setSelectedActivity,
  setOrderItems,
  selectedActivity,
  orderItems,
}: {
  setSelectedActivity: any;
  setOrderItems: any;
  selectedActivity: any;
  orderItems: any;
}) => {
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [sectorId, setSectorId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | string>("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isActivityLocked, setIsActivityLocked] = useState(false);
  const { storageSectors } = useSectors();
  const { isTablet , screenSize } = useScreenSize();
  console.log("storageSectors", storageSectors);
  // Carga los pedidos del localStorage al iniciar el componente
  useEffect(() => {
    const storedOrders = localStorage.getItem("orderItems");
    if (storedOrders) {
      setOrderItems(JSON.parse(storedOrders));
    }
  }, [setOrderItems]);

  // Guarda los pedidos en localStorage cada vez que cambian
  useEffect(() => {
    if (orderItems.length > 0) {
      localStorage.setItem("orderItems", JSON.stringify(orderItems));
    }
  }, [orderItems]);

  const handleClearAll = () => {
    setOrderItems([]);
    localStorage.removeItem("orderItems");
  };

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/active`
        );
        const data: Activity[] = await response.json();

        // Filtrar solo las actividades confirmadas
        const confirmedActivities = data.filter(
          (activity) => activity.state === "Confirmado"
        );

        setActivities(confirmedActivities);
      } catch (error) {
        console.error("Error fetching all activities:", error);
      }
    };
    fetchAllActivities();
  }, [selectedActivity]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/materials`
        );
        if (!response.ok) {
          throw new Error("Error fetching materials");
        }
        const data: MaterialProps[] = await response.json();
        const activeMaterials = data.filter(
          (material: MaterialProps) => material.is_active
        );

        setMaterials(activeMaterials);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const [filteredDeposits, setFilteredDeposits] = useState<
    { id: number; name: string; storaged_stock: number }[]
  >([]);

  useEffect(() => {
    const getStoragedMaterials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/distribution-stock/material/${materialId}`
        );
        const storagedMaterials = await response.json();

        // Filtrar los depósitos que contienen el material
        const depositsWithMaterial = storagedMaterials.map((item: any) => {
          const sector = storageSectors.find(
            (sector: any) => sector.id === item.sector_id.id
          );
          return {
            id: sector?.id,
            name: sector?.name,
            storaged_stock: item.storaged_stock,
          };
        });

        // Guardar los resultados filtrados
        setFilteredDeposits(depositsWithMaterial);
      } catch (error) {
        console.error("Error fetching storaged materials:", error);
      }
    };

    if (materialId) {
      getStoragedMaterials();
    }
  }, [materialId, storageSectors]);

  const handleAddItem = () => {
    const selectedSector = filteredDeposits.find(
      (sector) => sector.id === sectorId
    );

    if (Number(quantity) <= 0) {
      setError("Debe agregar una cantidad mayor a 0");
      return;
    }

    if (selectedSector && Number(quantity) > selectedSector.storaged_stock) {
      setError(
        `La cantidad no puede superar el stock disponible: ${selectedSector.storaged_stock}`
      );
      return;
    }

    setError(null);

    if (materialId && sectorId && quantity) {
      setOrderItems((prev: any) => [
        ...prev,
        { materialId, sectorId, quantity: Number(quantity) },
      ]);

      setSectorId(null);
      setQuantity("");
    }
  };

  const handleDeleteItem = (index: any) => {
    setOrderItems((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          height: "500px",
        }}
      >
        {/* Contenedor de Material, Sector y Cantidad */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: isTablet ? 1 : 3,
          }}
        >
          {/* Select para actividades */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <FormControl sx={{ width: isTablet ? 170 : 300 }} size="small">
              <FormLabel sx={{fontSize:'17px'}}>Actividad</FormLabel>
              <Autocomplete
                options={activities}
                getOptionLabel={(option) => option.activity_name}
                value={selectedActivity || null}
                onChange={(event, newValue) => {
                  if (!isActivityLocked) {
                    setSelectedActivity(newValue);
                    setIsActivityLocked(true);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    disabled={isActivityLocked}
                  />
                )}
              />
            </FormControl>
            <Box sx={{ pt: 2.6 }}>
              {isTablet ? (
                <Tooltip title="Cambiar actividad" arrow>
                  <span>
                    <ImageToIcon
                      icon={change}
                      w={36}
                      h={36}
                      onClick={() => setIsActivityLocked(false)}
                      sx={{ alignItems: "center", pt: 0.5 }}
                    />
                  </span>
                </Tooltip>
              ) : (
                <CustomButton
                  text="Cambiar Actividad"
                  onClick={() => setIsActivityLocked(false)}
                  sx={{
                    "&:hover": { bgcolor: "secondary.dark" },
                    borderRadius: 1,
                    width: "200px",
                    paddingInline: "0px !important",
                  }}
                ></CustomButton>
              )}
            </Box>
          </Box>

          {/* Select para materiales */}
          <FormControl sx={{ width: isTablet ? 170 : 300 }} size="small">
            <FormLabel sx={{fontSize:'17px'}}>
              {isTablet ? "Material" : "Seleccione Material"}
            </FormLabel>
            <Autocomplete
              options={materials}
              getOptionLabel={(option) => option.name}
              value={materials.find((mat) => mat.id === materialId) || null}
              onChange={(event, newValue) =>
                setMaterialId(newValue?.id || null)
              }
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>

          {/* Select para sectores */}
          <FormControl sx={{ width: isTablet ? 170 : 300 }} size="small">
            <FormLabel sx={{fontSize:'17px'}}>{isTablet ? "Sector " : "Seleccione Sector"}</FormLabel>
            <Autocomplete
              options={filteredDeposits}
              getOptionLabel={(option) =>
                `${option.name} - ${option.storaged_stock}`
              }
              value={
                filteredDeposits.find((sector) => sector.id === sectorId) ||
                null
              }
              onChange={(event, newValue) => setSectorId(newValue?.id || null)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>

          {/* Contenedor para la cantidad y el botón */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center", // Centra los elementos verticalmente
              justifyContent: "center", // Centra los elementos horizontalmente
            }}
          >
            <FormLabel
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize:'17px'
              }}
            >
              Cantidad
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (inputValue === "") {
                    setQuantity("");
                    setError(null);
                    return;
                  }

                  const inputQuantity = Number(inputValue);
                  const selectedSector = filteredDeposits.find(
                    (sector) => sector.id === sectorId
                  );

                  if (
                    selectedSector &&
                    inputQuantity > selectedSector.storaged_stock
                  ) {
                    setError(
                      `La cantidad no puede superar el stock disponible: ${selectedSector.storaged_stock}`
                    );
                  } else if (inputQuantity <= 0) {
                    setError(`Debe agregar una cantidad mayor a 0`);
                  } else {
                    setError(null); // Limpiar error si la cantidad es válida
                  }

                  setQuantity(inputQuantity);
                }}
                inputProps={{ min: 1 }}
                error={!!error}
                helperText={error}
                sx={{
                  width: isTablet ? 170 : 200,
                  "& .MuiInputBase-root": {
                    height: "40px", // Ajusta el alto aquí
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px", // Ajusta el padding interno
                  },
                }}
              />
            </FormLabel>
            <Box sx={{ pt: 2 }}>
              {isTablet ? (
                <Tooltip title="Agregar" arrow>
                  <span>
                    <ImageToIcon
                      icon={add}
                      w={36}
                      h={36}
                      onClick={handleAddItem}
                      sx={{ alignItems: "center", pt:0.5 }}
                    />
                  </span>
                </Tooltip>
              ) : (
                <CustomButton
                  text="Agregar"
                  onClick={handleAddItem}
                  sx={{
                    color: "#fff",
                    "&:hover": { bgcolor: "secondary.dark" },
                    borderRadius: 1,
                    width: "100px",
                  }}
                />
              )}{" "}
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Lista de materiales */}
        <Box sx={{  overflowY: "auto" }}>
          {orderItems.length > 0 ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ mb: 2,fontSize:'20px' }}>
                  Lista de materiales seleccionados
                </Typography>
                <CustomButton
                  text="Quitar Todos"
                  onClick={handleClearAll}
                  sx={{
                    bgcolor: "error.main",
                    "&:hover": {
                      bgcolor: "error.light",
                    },
                  }}
                ></CustomButton>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ position: "sticky", fontSize:'25px !important' }}>
                    <TableRow>
                      <TableCell>
                        <strong>Material</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Cantidad Seleccionada</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Depósito</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Acciones</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ overflowY: "auto" }}>
                    {orderItems.map((item: OrderProps, index: number) => {
                      const materialName =
                        materials.find((m) => m.id === item.materialId)?.name ||
                        "Desconocido";
                      const sectorName =
                        storageSectors.find((s) => s.id === item.sectorId)
                          ?.name || "No especificado";

                      return (
                        <TableRow key={index} hover sx={{fontSize:'20px'}}>
                          <TableCell>{materialName}</TableCell>
                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell align="center">{sectorName}</TableCell>
                          <TableCell align="center">
                            <ImageToIcon
                              icon={deleteicon}
                              onClick={() => handleDeleteItem(index)}
                              h={20}
                              w={20}
                              sx={{
                                cursor: "pointer",
                                color: "red",
                                "&:hover": { opacity: 0.3 },
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              No se han agregado materiales.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderCreateForm;
