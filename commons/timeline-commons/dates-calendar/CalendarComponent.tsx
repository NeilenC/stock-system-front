import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import theme from '../../../theme';

// Componente que renderiza un solo mes
const MonthComponent = ({ year, month }: { year: number; month: number }) => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <Box sx={{ minWidth: '810px',
    //  bgcolor: theme.palette.background.paper 
     }}> {/* Fijar ancho mínimo */}
      {/* Título del mes */}
      <Box sx={{ textAlign: 'center', backgroundColor: '#e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
          {format(startDate, 'MMMM yyyy', { locale: es })}
        </Typography>
      </Box>

      {/* Días del mes en fila */}
      <Grid container sx={{ borderLeft: '1px solid #E1E6EF', justifyContent: 'center' }}>
        {daysInMonth.map((day, index) => {
          const dayOfWeek = day.getDay(); // 0 = Domingo, 6 = Sábado
          const isSaturday = dayOfWeek === 6;
          const isSunday = dayOfWeek === 0;

          return (
            <Grid item key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingInline: 1,
                  borderRight: '1px solid #E1E6EF',
                  backgroundColor: isSaturday || isSunday ? '#F5F5F5' : '#FFF',
                  boxShadow: '0px 4px 3.9px 0px #00000044',
                  position: 'relative',
                }}
              >
                {/* Inicial del día */}
                <Typography align="center" variant="caption" sx={{ fontSize: '8px' }}>
                  {format(day, 'EEE', { locale: es }).charAt(0).toUpperCase()}
                </Typography>
                {/* Fecha numérica */}
                <Typography align="center" variant="caption" sx={{ fontWeight: 'bold', fontSize: '8px' }}>
                  {format(day, 'dd')}
                </Typography>

                {/* Líneas divisorias verticales */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    borderRight: '1px solid #E1E6EF',
                    height: 'calc(100vh - 30px)',
                    backgroundColor: isSaturday || isSunday ? 'rgba(245, 245, 245, 0.5)' : 'rgba(255, 255, 255, 0.5)',
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
        overflowX: 'auto', // Habilitar scroll horizontal
        flexDirection: 'row', // Asegura que los meses se alineen en fila
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
