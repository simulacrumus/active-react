import type { PageModel, Schedule } from "@/types";
import type { ApiClient } from "../ApiClient";
import type { ScheduleService } from "./ScheduleService";

export class ScheduleServiceImpl implements ScheduleService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getSchedules(params: Record<string, string>): Promise<any> {
    return this.client.get("/schedules", params);
  }

  async getSchedulesByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<PageModel<Schedule>> {
    return this.client.get<PageModel<Schedule>>(
      `/facilities/${facilityId}/schedules`,
      params
    );
  }

  async getSchedulesByActivity(
    params: Record<string, string>,
    activityId: number
  ): Promise<PageModel<Schedule>> {
    return this.client.get<PageModel<Schedule>>(
      `/activities/${activityId}/schedules`,
      params
    );
  }

  async getSchedulesByActivityAndByFacility(
    params: Record<string, string>,
    activityId: number,
    facilityId: number
  ): Promise<PageModel<Schedule>> {
    return this.client.get<PageModel<Schedule>>(
      `/facilities/${facilityId}/activities/${activityId}/schedules`,
      params
    );
  }

  async getScheduleById(scheduleId: string): Promise<Schedule> {
    return this.client.get(`/schedules/${scheduleId}`);
  }
}
