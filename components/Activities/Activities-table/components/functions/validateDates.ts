
export const validateDates = (activity:any) => {
    const { initial_date, opening_date, closing_date, end_date } = activity;
  
    // Convertir todas las fechas a objetos Date válidos
    const dateOrder: Record<string, Date | null> = {
      initialDate: initial_date ? new Date(initial_date) : null,
      openingDate: opening_date ? new Date(opening_date) : null,
      closingDate: closing_date ? new Date(closing_date) : null,
      endDate: end_date ? new Date(end_date) : null,
    };
  
    // Verificar todas las condiciones de orden
    if (
      dateOrder.initialDate &&
      dateOrder.openingDate &&
      dateOrder.initialDate > dateOrder.openingDate
    ) {
      return false;
    }
  
    if (
      dateOrder.openingDate &&
      dateOrder.closingDate &&
      dateOrder.openingDate > dateOrder.closingDate
    ) {
      return false;
    }
  
    if (
      dateOrder.closingDate &&
      dateOrder.endDate &&
      dateOrder.closingDate > dateOrder.endDate
    ) {
      return false;
    }
  
    if (
      dateOrder.initialDate &&
      dateOrder.closingDate &&
      dateOrder.initialDate > dateOrder.closingDate
    ) {
      return false;
    }
  
    if (
      dateOrder.closingDate &&
      dateOrder.openingDate &&
      dateOrder.closingDate < dateOrder.openingDate
    ) {
      return false;
    }
  
    return true;
  };