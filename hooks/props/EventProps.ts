// types.ts
export interface EventProps {
    activity_name: string;
    initial_date: string; // Puedes ajustar el tipo según la estructura real
    end_date: string;
    opening_date: string;
    closing_date: string;
    opening_time: string;
    closing_time: string;
    activity_schedule_on_property: string;
    type_activity: string;
    state: string;
    type_of_contract: string;
    cwa_name: string;
    cwa_number: string;
    expositors_quantity: number;
    ticket_value: number; // Ajusta según si es un número o un string
    schedule_ticketoffice: string;
    ticketOfficeLocation: string;
    entry_place_assembly: string;
    initial_date_assembly: string;
    initial_time_assembly: string;
    entry_place_dismantling: string;
    initial_date_dismantling: string;
    initial_time_dismantling: string;
    entry_point: string;
    activity_date_on_property: string;
    notes: string;
    client_phone: string;
    client_email: string;
    technical_director_name: string;
    technical_director_phone: string;
    technical_director_email: string;
    responsible_name: string;
    responsible_phone: string;
    responsible_email: string;
    administrator_name: string;
    administrator_phone: string;
    administrator_email: string;
  }
  