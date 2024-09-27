import { ActivityState } from "../../../../../enum/activities/activity.enum";

export interface GantProps {
    eventName: string;
    state: ActivityState;
    startDate: string;
    endDate: string;
    openingDate?:string;
    closingDate?:string;
    sector: string;
    isConfirmed?: boolean,
    assemblyDays?: number,
    disassemblyDays?: number
  }