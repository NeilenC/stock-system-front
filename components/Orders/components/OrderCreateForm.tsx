import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MaterialProps } from "../../Materials/materialsProps";
import useSectors from "../../../hooks/useSectors";
import { Activity, useActivityStore } from "../../../zustand/activityStore";
import { IconButton } from "rsuite";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import deleteicon from "../../../public/delete.png";

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
  // Cargar los pedidos del localStorage al iniciar el componente
  useEffect(() => {
    const storedOrders = localStorage.getItem("orderItems");
    if (storedOrders) {
      setOrderItems(JSON.parse(storedOrders)); // Cargar los pedidos desde localStorage
    }
  }, [setOrderItems]);

  // Guardar los pedidos en localStorage cada vez que cambian
  useEffect(() => {
    if (orderItems.length > 0) {
      localStorage.setItem("orderItems", JSON.stringify(orderItems)); 
    }
  }, [orderItems]);
  const handleClearAll = () => {
    setOrderItems([]);
    localStorage.removeItem("orderItems");
  };
console.log("orderItems", orderItems)
  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/active`
        );
        const data: Activity[] = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching all activities:", error);
      }
    };
    fetchAllActivities();
  }, [selectedActivity]);

  // Esto es lo que enviarías al backend en la solicitud

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
    setOrderItems((prev: any) => prev.filter((_:any, i:any) => i !== index));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 , height: "500px", }}>
        {/* Inputs a la izquierda */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
  
  {/* Contenedor de Actividad con botón */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Select
      value={selectedActivity?.id || ""}
      onChange={(e) => {
        if (!isActivityLocked) {
          const activityId = Number(e.target.value);
          const activity = activities.find((act) => act.id === activityId);
          setSelectedActivity(activity);
          setIsActivityLocked(true); 
        }
      }}
      displayEmpty
      disabled={isActivityLocked} // Deshabilita el campo si está bloqueado
      sx={{ flex: 1 }} // Para que ocupe el espacio disponible
    >

      <MenuItem value="" disabled>
        Seleccione una Actividad
      </MenuItem>
      {activities.map((activity) => (
          <MenuItem key={activity.id} value={activity.id}>
          {activity.activity_name}
        </MenuItem>
      ))}
    </Select>

    <Button
      onClick={() => setIsActivityLocked(false)} // Permite desbloquear manualmente
      variant="outlined"
      size="small"
      
        sx={{ bgcolor: "primary.dark",   p:1.5, width:'150px' }}
    >
      Cambiar Actividad
    </Button>
  </Box>

  {/* Contenedor de Material, Sector y Cantidad */}
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {/* Select para materiales */}
    <Select
      value={materialId || ""}
      onChange={(e) => setMaterialId(Number(e.target.value))}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Seleccione un material
      </MenuItem>
      {materials.map((material, index) => (
        <MenuItem key={index} value={material.id ?? ""}>
          {material.name}
        </MenuItem>
      ))}
    </Select>

    {/* Select para sectores */}
    <Select
      value={sectorId || ""}
      onChange={(e) => setSectorId(Number(e.target.value))}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Seleccione un sector
      </MenuItem>
      {filteredDeposits.map((sector, index) => (
        <MenuItem key={index} value={sector.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>{sector.name}</Typography>
            <Typography>{sector.storaged_stock}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>

    {/* Contenedor para la cantidad con el botón */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        label="Cantidad"
        type="number"
        value={quantity}
        onChange={(e) => {
          const inputValue = e.target.value;

          if (inputValue === "") {
            setQuantity("");
            setError(null); // Limpiar error si el campo está vacío
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
        error={!!error} // Mostrar error si existe
        helperText={error} // Mostrar mensaje de error
        sx={{ flex: 1 }} // Para que ocupe el espacio disponible
      />

      <Button
        variant="outlined"
        onClick={handleAddItem}
        sx={{ bgcolor: "primary.dark" }}
      >
        Agregar
      </Button>
    </Box>
  </Box>
</Box>


        {/* Lista de materiales a la derecha */}
        <Box sx={{ flex: 1, marginLeft: 4, display: 'flex', flexDirection: 'column' }}>
  <Box sx={{ flex: 1, overflowY: "auto" }}>
    {orderItems.length > 0 ? (
      <Box sx={{ flex: 1 }}>
        {orderItems.map((item: OrderProps, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderRadius: 1,
              border: "1px solid #ddd",
              boxShadow: 0.5,
              "&:hover": {
                boxShadow: 2,
                cursor: "pointer",
              },
            }}
          >
            <Typography sx={{ flex: 1 }}>
              Seleccionaste{" "}
              <strong>{materials.find((m) => m.id === item.materialId)?.name}</strong>, en{" "}
              <strong>{storageSectors.find((s) => s.id === item.sectorId)?.name}</strong>, 
              Cantidad: <strong>{item.quantity}</strong>
            </Typography>
            <ImageToIcon
              icon={deleteicon}
              onClick={() => handleDeleteItem(index)}
              h={20}
              w={20}
              sx={{ cursor: "pointer", color: "red", "&:hover": { opacity: 0.3 } }}
            />
          </Box>
        ))}
      </Box>
    ) : (
      <Typography sx={{alignItems:'center'}}>No se han agregado materiales.</Typography>
    )}
  </Box>
  
  {/* Botón fuera del overflow */}
      
        <Box sx={{  pt:2}}>

  <Button
    variant="outlined"
    color="error"
    onClick={handleClearAll}
    fullWidth
    size="small"
    sx={{
        width:1,
        p:1
    }}
    >
    Quitar Todos
  </Button>
      </Box>
</Box>

      </Box>
    </>
  );
};

export default OrderCreateForm;
