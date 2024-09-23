import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from 'date-fns';
import { es } from 'date-fns/locale'; // Si usas locale en español

// Componente que renderiza un solo mes
const MonthComponent = ({ year, month }: { year: number; month: number }) => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <Box sx={{ backgroundColor: '#FBFBFB' }}>
      {/* Título del mes */}
      <Box sx={{ textAlign: "center", backgroundColor: "#e0e0e0" }}>
        <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
          {format(startDate, "MMMM yyyy", { locale: es })}
        </Typography>
      </Box>

      {/* Días del mes en fila */}
      <Grid container sx={{ borderLeft: '1px solid #E1E6EF'}}>
        {daysInMonth.map((day, index) => {
          const dayOfWeek = day.getDay(); // 0 = Domingo, 6 = Sábado
          const isSaturday = dayOfWeek === 6;
          const isSunday = dayOfWeek === 0;

          return (
            <Grid item xs key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: '10px',
                  paddingInline: 1,
                  borderRight: '1px solid #E1E6EF',
                  // Color diferente para sábados y domingos
                  backgroundColor: isSaturday
                    ? "#F5F5F5" // Color para sábado
                    : isSunday
                    ? "#F5F5F5" // Color para domingo
                    : "#FFF", // Color para días de semana
                  boxShadow: '0px 4px 3.9px 0px #00000044',
                  zIndex: 1,
                  position: 'relative', // Para mantener el stacking context y las líneas
                }}
              >
                {/* Inicial del día */}
                <Typography align="center" variant="caption" sx={{ fontSize: '8px', lineHeight: '10px' }}>
                  {format(day, "EEE", { locale: es }).charAt(0).toUpperCase()}
                </Typography>
                {/* Fecha numérica */}
                <Typography align="center" variant="caption" sx={{ fontWeight: "bold", fontSize: '8px' }}>
                  {format(day, "dd")}
                </Typography>

                {/* Líneas divisorias verticales */}
                <Box
  sx={{
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    borderRight: '1px solid #E1E6EF', // Línea divisoria que baja hasta abajo
    height: 'calc(100vh - 30px)', // Ajusta la altura según tu diseño
    backgroundColor: isSaturday
      ? "rgba(245, 245, 245, 0.5)" // Gris claro semi-transparente para sábado
      : isSunday
      ? "rgba(245, 245, 245, 0.5)" // Gris claro semi-transparente para domingo
      : "rgba(255, 255, 255, 0.5)", // Blanco semi-transparente para días de semana
    zIndex: -1, // Asegura que el fondo esté detrás del contenido
  }}
/>


              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Componente principal con funcionalidad de scroll infinito horizontal
const InfiniteScrollCalendar = () => {
  const [months, setMonths] = useState<{ year: number; month: number }[]>([
    { year: 2024, month: 9 }, // Mes inicial: Septiembre 2024
  ]);

  // Manejador de scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (element.scrollWidth - element.scrollLeft <= element.clientWidth + 10) {
      loadMoreMonths();
    }
  };

  // Función para cargar más meses al estado
  const loadMoreMonths = () => {
    setMonths((prevMonths) => {
      const lastMonth = prevMonths[prevMonths.length - 1];
      const nextMonthDate = addMonths(new Date(lastMonth.year, lastMonth.month - 1), 1);
      const nextMonth = { year: nextMonthDate.getFullYear(), month: nextMonthDate.getMonth() + 1 };
      return [...prevMonths, nextMonth];
    });
  };

  return (
    <Box
      onScroll={handleScroll}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        // maxHeight: '80px', // Aumenta la altura del contenedor para más espacio
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
      }}
    >
      {months.map((monthData, index) => (
        <MonthComponent key={index} year={monthData.year} month={monthData.month} />
      ))}
    </Box>
  );
};

export default InfiniteScrollCalendar;
