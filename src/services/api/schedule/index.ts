import { apiClient } from "./../axios";
import { type ScheduleService } from "./ScheduleService";
import { ScheduleServiceImpl } from "./ScheduleServiceImpl";

export const scheduleService: ScheduleService = new ScheduleServiceImpl(
  apiClient,
);
