import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ActivityState,
  typeOfActivities,
  typeOfContracts,
} from "../commons/activities-commons/DrawerBooking/enums";

export interface Activity {
  id: number;
  activity_name: string;
  type_activity: (typeof typeOfActivities)[number];
  state: ActivityState; // Enum
  client_email: string;
  client_phone: string;
 
  initial_date: string;
  initial_time: string;
  end_date: string;
  end_time: string;
  opening_date: string;
  opening_time: string;
  closing_date: string;
  closing_time: string;
  sector_activities_ids: {
    is_partially_rented: boolean; 
    square_meters_rented: number; 
    name: string;
    sector: { 
    id: number; 
    name: string;
  }}[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ActivityStore {
  activityToUpdate: Activity | null;
  activities: Activity[];
  setActivity: (activity: any | null) => void;
  setActivities: (activities: Activity[]) => void;
  fetchActivityById: (id: number) => Promise<void>;
  fetchAllActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityStore>()(
  devtools((set) => ({
    activityToUpdate: null,
    activities: [],
    setActivity: (activity) => set({ activityToUpdate: activity }),
    setActivities: (activities) => set({ activities }),

    fetchActivityById: async (id: number) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${id}`);
        const data: Activity = await response.json();
    
        // Ajustar formato de sectores
      
        set({ activityToUpdate: { ...data} });
      } catch (error) {
        console.error("Error fetching activity by ID:", error);
      }
    },

    

    // fetchActivityById: async (id: number) => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/${id}`
    //     );
    //     const data: Activity = await response.json();
    //     set({ activityToUpdate: data });
    //   } catch (error) {
    //     console.error("Error fetching activity by ID:", error);
    //   }
    // },
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
