import { useContext } from "react";
import {
  ScheduleContext,
  type ScheduleContextValue,
} from "../contexts/schedule-context";

export function useSchedules(): ScheduleContextValue {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedules must be used within ScheduleProvider");
  }
  return context;
}
