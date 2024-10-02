// useEvento.ts
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EventProps } from './props/EventProps';

const useEvent = () => {
  const { activityId } = useParams();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get<EventProps>(`${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${activityId}`);
        setEvent(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [activityId]);

  // Mapeo de campos del evento
  const eventFields = event ? [
    { label: 'Nombre de la actividad', value: event.activity_name },
    { label: 'Fecha inicial', value: event.initial_date },
    { label: 'Fecha final', value: event.end_date },
    { label: 'Fecha de apertura', value: event.opening_date },
    { label: 'Fecha de cierre', value: event.closing_date },
    { label: 'Hora de apertura', value: event.opening_time },
    { label: 'Hora de cierre', value: event.closing_time },
    { label: 'Horario de la actividad en el recinto', value: event.activity_schedule_on_property },
    { label: 'Tipo de actividad', value: event.type_activity },
    { label: 'Estado', value: event.state },
    { label: 'Tipo de contrato', value: event.type_of_contract },
    { label: 'Nombre del CWA', value: event.cwa_name },
    { label: 'Número del CWA', value: event.cwa_number },
    { label: 'Cantidad de expositores', value: event.expositors_quantity },
    { label: 'Valor del ticket', value: event.ticket_value },
    { label: 'Horario de la boletería', value: event.schedule_ticketoffice },
    { label: 'Ubicación de la boletería', value: event.ticketOfficeLocation },
    { label: 'Lugar de entrada para armado', value: event.entry_place_assembly },
    { label: 'Fecha de inicio de armado', value: event.initial_date_assembly },
    { label: 'Hora de inicio de armado', value: event.initial_time_assembly },
    { label: 'Lugar de entrada para desarme', value: event.entry_place_dismantling },
    { label: 'Fecha de inicio de desarme', value: event.initial_date_dismantling },
    { label: 'Hora de inicio de desarme', value: event.initial_time_dismantling },
    { label: 'Punto de entrada', value: event.entry_point },
    { label: 'Fecha de actividad en el recinto', value: event.activity_date_on_property },
    { label: 'Notas', value: event.notes },
    { label: 'Teléfono del cliente', value: event.client_phone },
    { label: 'Email del cliente', value: event.client_email },
    { label: 'Nombre del director técnico', value: event.technical_director_name },
    { label: 'Teléfono del director técnico', value: event.technical_director_phone },
    { label: 'Email del director técnico', value: event.technical_director_email },
    { label: 'Nombre del responsable', value: event.responsible_name },
    { label: 'Teléfono del responsable', value: event.responsible_phone },
    { label: 'Email del responsable', value: event.responsible_email },
    { label: 'Nombre del administrador', value: event.administrator_name },
    { label: 'Teléfono del administrador', value: event.administrator_phone },
    { label: 'Email del administrador', value: event.administrator_email },
  ] : [];

  return { event, loading, error, eventFields };
};

export default useEvent;
