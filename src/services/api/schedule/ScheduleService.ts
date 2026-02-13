import type { PageModel, Schedule } from "@/types";

export interface ScheduleService {
  getSchedules(params: Record<string, string>): Promise<PageModel<Schedule>>;

  getSchedulesByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<PageModel<Schedule>>;

  getSchedulesByActivity(
    params: Record<string, string>,
    activityId: number
  ): Promise<PageModel<Schedule>>;

  getSchedulesByActivityAndByFacility(
    params: Record<string, string>,
    activityId: number,
    facilityId: number
  ): Promise<PageModel<Schedule>>;

  getScheduleById(id: string): Promise<Schedule>;
}
