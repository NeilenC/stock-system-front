import { Grid, Button, Box, Typography } from "@mui/material";

const Pagination = ({ page, onPageChange, totalItems, itemsPerPage }: any) => {
  const count = Math.ceil(totalItems / itemsPerPage); // Calcular el número total de páginas
  const currentPage = page > count ? count : page; // Asegúrate de que la página actual no supere el conteo

  // Cálculo del rango de materiales mostrados
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  // Límite para mostrar los números de página
  const displayLimit = 5; // Puedes ajustar este límite
  const halfLimit = Math.floor(displayLimit / 2);
  let start = Math.max(1, currentPage - halfLimit);
  let end = Math.min(count, currentPage + halfLimit);

  if (end - start < displayLimit - 1) {
    if (start === 1) {
      end = Math.min(start + displayLimit - 1, count);
    } else if (end === count) {
      start = Math.max(end - displayLimit + 1, 1);
    }
  }

  return (
    <>
      <Grid container justifyContent="space-between" sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{ justifyContent: "flex-start", alignContent: "center" }}
        >
          Mostrando registros del {startIndex > 0 ? startIndex : 0} al{" "}
          {endIndex} de un total de {totalItems} registros
        </Typography>
        <Grid item display="flex" justifyContent={"center"}>
          <Button
            variant="contained"
            size="small"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            sx={{
              mr: 1,
              maxWidth: "80px",
              height: currentPage === count ? "39px" : "40px",
              "&:hover": {
                color: "white",
              },
            }}
          >
            Anterior
          </Button>

          {/* Números de página */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {start > 1 && (
              <>
                <Button
                  variant="outlined"
                  size="small" // Tamaño pequeño
                  onClick={() => onPageChange(1)}
                  sx={{ mx: 1 }} // Separación horizontal entre botones
                >
                  1
                </Button>
                {start > 2 && <Typography sx={{ mx: 1 }}>...</Typography>}
              </>
            )}

            {Array.from({ length: end - start + 1 }, (_, index) => (
              <Button
                key={start + index}
                variant={
                  currentPage === start + index ? "contained" : "outlined"
                }
                size="small" // Tamaño pequeño
                onClick={() => onPageChange(start + index)}
                sx={{
                  maxWidth: "20px",
                  height: "40px",
                  mx: 1, // Separación horizontal entre botones
                  backgroundColor:
                    currentPage === start + index
                      ? "primary.dark"
                      : "primary.light",
                  color:
                    currentPage === start + index ? "white" : "primary.dark",
                  "&:hover": {
                    backgroundColor:
                      currentPage === start + index
                        ? "primary.dark"
                        : "grey.300",
                  },
                }}
              >
                {start + index}
              </Button>
            ))}

            {end < count && (
              <>
                {end < count - 1 && <Typography sx={{ mx: 1 }}>...</Typography>}
                <Button
                  variant="outlined"
                  size="small" // Tamaño pequeño
                  onClick={() => onPageChange(count)}
                  sx={{ mx: 1 }} // Separación horizontal entre botones
                >
                  {count}
                </Button>
              </>
            )}
          </Box>

          <Button
            variant="contained"
            size="small" // Tamaño pequeño para los botones
            disabled={currentPage === count}
            onClick={() => onPageChange(currentPage + 1)}
            sx={{
              ml: 1,
              maxWidth: "80px",
              height: currentPage === count ? "40px" : "38px",
              "&:hover": {
                color: "white",
              },
            }}
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Pagination;
