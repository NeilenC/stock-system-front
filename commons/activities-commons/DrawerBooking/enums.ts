export enum ActivityState {
    RESERVA = 'Reserva',
    CONFIRMADO = 'Confirmado',
    // ARMADO='Armado',
    // DESARME='Desarme',
    EN_PROCESO_DE_FIRMA = 'En proceso de firma',
    // OCUPACION_PARCIAL_DEL_DIA = 'Ocupación parcial del dia',
    // DIA_COMPARTIDO='Día compartido',
    // PENDIENTE_DE_APROBACION='Pendiente de aprobación',
    // OBRAS_REPARACIONES='Obras / Reparaciones',
    // ARCHIVADO= 'Archivado',
    CANCELADO = 'Cancelado',
  }
 
  export enum ActivityColor {
    CONFIRMADO = '#81FFA5',
    RESERVA = '#86CBFF',
    // PENDIENTE_DE_APROBACION='#FFEB9A',
    // ARMADO='lightgreen',
    // DESARME='lightgreen',
    EN_PROCESO_DE_FIRMA = '#FFB873',
    // OCUPACIÓN_PARCIAL_DEL_DIA ='pink',
    // DIA_COMPARTIDO='#F3A5D0',
    // OBRAS_REPARACIONES='#F3A5A5',
    CANCELADO = '#8A8787',
    // ARCHIVADO='#D0D0D0',
  }

  export const activityStates = Object.values(ActivityState);

export const typeOfContracts = ['Arrendamiento', 'Llave en mano'];

export const typeOfActivities = [
  'Feria',
  'Exposición',
  'Congreso',
  'Feria propia',
  'Evento',
  'Evento especial',
  'Cesión solidaria de espacio',
  'Otro',
];
 
