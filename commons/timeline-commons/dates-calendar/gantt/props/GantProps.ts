import { ActivityState } from "../../../../../enum/activities/activity.enum";

export interface GantProps {
  activityId?:number;
    eventName: string;
    state: ActivityState;
    startDate: string;
    endDate: string;
    openingDate?:string;
    closingDate?:string;
    sector: number[];
    isConfirmed?: boolean,
    assemblyDays?: number,
    disassemblyDays?: number
  }