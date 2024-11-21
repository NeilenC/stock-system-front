import { Box, Grid, Typography } from "@mui/material";
import { useActivitiesContext } from "./Activities-table/context/useActivitiesContext";
import ActivityTableHeader from "./Activities-table/components/ActivityHeader";
import ActivityFilters from "./Activities-table/components/ActivityFilter";
import ActivityTableRowItem from "./Activities-table/ActivityItemTableRow";

import Pagination from "../Materials/Table/Pagination";

const TableActivities = () => {
  const {
    currentActivities,
    handlePageChange,
    currentPage,
    itemsPerPage,
    totalItems,
    handleFilter,
    fetchActivities,
  } = useActivitiesContext();


  return (
    <Box sx={{ borderRadius:'20px', border:'1px solid blue'}}>
      <Grid container>
        <ActivityTableHeader />
        {/* Pasar handleFilter como prop a ActivityFilters */}
        <ActivityFilters handleFilter={handleFilter} />
        <Box
          sx={{
            height: "450px",
            overflowX: "auto",
            width: "100%",
            bgcolor: "primary.main",
          }}
        >
          <Box sx={{ paddingInline: 1 }}>
            {currentActivities.length > 0 ? (
              currentActivities.map((activity: any, index: any) => (
                <ActivityTableRowItem
                  key={activity.id}
                  activity={activity}
                  index={index}
                />
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
                No se encontraron actividades
              </Typography>
            )}
          </Box>
          <Pagination
            page={currentPage}
            onPageChange={(newPage: any) => {
              handlePageChange(newPage);
            }}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default TableActivities;
