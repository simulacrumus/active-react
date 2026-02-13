import type { Activity, PageModel } from "@/types";

export interface ActivityService {
  getActivities(): Promise<Activity[]>;
  getActivitiesByCategory(categoryId: number): Promise<Activity[]>;
  getActivitiesByFacility(facilityId: number): Promise<Activity[]>;
  getActivityPage(params: Record<string, string>): Promise<PageModel<Activity>>;
  getActivityPageByFacility(
    facilityId: number,
    params: Record<string, string>
  ): Promise<PageModel<Activity>>;
  getActivityPageByCategory(
    categoryId: number,
    params: Record<string, string>
  ): Promise<PageModel<Activity>>;
  getActivityById(id: string): Promise<Activity>;
}
