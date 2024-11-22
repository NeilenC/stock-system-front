import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ActivityState,
  typeOfActivities,
  typeOfContracts,
} from "../commons/activities-commons/DrawerBooking/enums";

interface Activity {
  id: number;
  activity_name: string;
  type_activity: (typeof typeOfActivities)[number];
  type_of_contract: (typeof typeOfContracts)[number];
  state: ActivityState; // Enum
  client_email: string;
  client_phone: string;
  responsible_name: string;
  responsible_email: string;
  responsible_phone: string;
  expositors_quantity: number;
  ticket_value: number;
  ticketOfficeLocation: string;
  schedule_ticketoffice: string;
  entry_place_assembly: string;
  entry_place_dismantling: string;
  entry_point: string;
  initial_date: string;
  end_date: string;
  initial_date_assembly: string;
  initial_date_dismantling: string;
  initial_time_assembly: string;
  initial_time_dismantling: string;
  opening_date: string;
  opening_time: string;
  closing_date: string;
  closing_time: string;
  sector_activities_ids: [
    {
      id: number;
    }
  ];
  is_active: boolean;
  cwa_name: string;
  cwa_number: number;
  activity_date_on_property: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityStore {
  updatedActivity: Activity | null;
  activities: Activity[];
  setActivity: (activity: any | null) => void;
  setActivities: (activities: Activity[]) => void;
  fetchActivityById: (id: number) => Promise<void>;
  fetchAllActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityStore>()(
  devtools((set) => ({
    updatedActivity: null,
    activities: [],
    setActivity: (activity) => set({ updatedActivity: activity }),
    setActivities: (activities) => set({ activities }),
    fetchActivityById: async (id: number) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${id}`
        );
        const data: Activity = await response.json();
        set({ updatedActivity: data });
        console.log("DATAAAAAA", data);
      } catch (error) {
        console.error("Error fetching activity by ID:", error);
      }
    },
    fetchAllActivities: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity`
        );
        const data: Activity[] = await response.json();
        set({ activities: data });
      } catch (error) {
        console.error("Error fetching all activities:", error);
      }
    },
  }))
);
