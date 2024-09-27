import { Box } from "@mui/material";
import InfiniteScrollCalendar from "../../commons/timeline-commons/dates-calendar/gantt/CalendarComponent";
import SectorsInTimeLine from "../../commons/timeline-commons/SectorsInTimeLine";

const CalendarComponent = () => {
  return (
    <Box sx={{ display: "flex", direction: "row" }}>
    <SectorsInTimeLine />
    <CalendarComponent />
  </Box>
  );
};

export default CalendarComponent;
