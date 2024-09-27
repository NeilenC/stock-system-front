import { ActivityColor, ActivityState } from "../../../../enum/activities/activity.enum";
import booking from "../../../../public/gants-states-icons/booking.png";
import canceled from "../../../../public/gants-states-icons/canceled.png";
import confirmed from "../../../../public/gants-states-icons/confirmed.png";
import pendant from "../../../../public/gants-states-icons/pendant.png";
import filed from "../../../../public/gants-states-icons/filed.png";
import repair from "../../../../public/gants-states-icons/repair.png";
import shared from "../../../../public/gants-states-icons/shared.png";
import signprocess from "../../../../public/gants-states-icons/signprocess.png";

export const getStateColor = (state: ActivityState) => {
    switch (state) {
      case ActivityState.RESERVA:
        return ActivityColor.RESERVA;
        case ActivityState.ARMADO:
          return ActivityColor.ARMADO;
          case ActivityState.DESARME:
            return ActivityColor.DESARME;
      case ActivityState.CONFIRMADO:
        return ActivityColor.CONFIRMADO;
      case ActivityState.EN_PROCESO_DE_FIRMA:
        return ActivityColor.EN_PROCESO_DE_FIRMA;
      case ActivityState.OCUPACION_PARCIAL_DEL_DIA:
        return ActivityColor.OCUPACION_PARCIAL_DEL_DIA;
      case ActivityState.DIA_COMPARTIDO:
        return ActivityColor.DIA_COMPARTIDO;
      case ActivityState.PENDIENTE_DE_APROBACION:
        return ActivityColor.PENDIENTE_DE_APROBACION;
      case ActivityState.CANCELADO:
        return ActivityColor.CANCELADO;
      case ActivityState.ARCHIVADO:
        return ActivityColor.ARCHIVADO;
      case ActivityState.OBRAS_REPARACION:
        return ActivityColor.OBRAS_REPARACION;
      default:
        return ActivityColor.NADA;
    }
  };

  // Función para obtener el ícono según el estado
  export const getStateIcon = (state: ActivityState) => {
    switch (state) {
      case ActivityState.RESERVA:
        return booking;
      case ActivityState.EN_PROCESO_DE_FIRMA:
        return signprocess;
      case ActivityState.OCUPACION_PARCIAL_DEL_DIA:
        return pendant;
      case ActivityState.CANCELADO:
        return canceled;
      case ActivityState.ARCHIVADO:
        return filed;
      case ActivityState.CONFIRMADO:
        return confirmed;
      case ActivityState.DIA_COMPARTIDO:
        return shared;
      case ActivityState.OBRAS_REPARACION:
        return repair;
      case ActivityState.PENDIENTE_DE_APROBACION:
        return pendant;
      default:
        return pendant;
    }
  };

