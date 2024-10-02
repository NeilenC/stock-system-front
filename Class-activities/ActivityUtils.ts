export class ActivityUtils {
    static calculateEventDuration(start: string, end: string): number {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      // Calcula la diferencia en milisegundos y convierte a días
      const durationInMilliseconds = endDateObj.getTime() - startDateObj.getTime();
      return Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24)); 
    }


    // Funcion para obtener los días 
    static getStartDayIndex (eventStartDate: any) {
      const startDay = new Date(eventStartDate).getDate();
      return startDay; 
    };

    static calculateAssemblyAndDisassemblyDays(startDate?: string, openingDate?: string, closingDate?: string, endDate?: string) {
      if (!startDate || !openingDate || !closingDate || !endDate) {
          // Handle undefined values, possibly returning 0 or other default values
          return {
              assemblyDays: 0,
              disassemblyDays: 0
          };
      }
      const assemblyDays = this.calculateEventDuration(startDate, openingDate); 
      const disassemblyDays = this.calculateEventDuration(closingDate, endDate); 
      return {
          assemblyDays,
          disassemblyDays
      };
  }
  
  
  }
  