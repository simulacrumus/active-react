import type { ScheduleActivity } from "./ScheduleActivity";
import type { ScheduleFacility } from "./ScheduleFacility";

export interface Schedule {
  id: number;
  activity: ScheduleActivity;
  facility: ScheduleFacility;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  periodStartDate: string;
  periodEndDate: string;
  updatedAt: string;
}

export type ScheduleSort = "Time" | "Nearby";
