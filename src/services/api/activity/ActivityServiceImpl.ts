import type { Activity, PageModel } from "@/types";
import type { ApiClient } from "../ApiClient";
import type { ActivityService } from "./ActivityService";

export class ActivityServiceImpl implements ActivityService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }
  async getActivities(): Promise<Activity[]> {
    const allActivities: Activity[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Activity> = await this.getActivityPage({
        page: String(page),
        size: String(pageSize),
      });
      allActivities.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allActivities;
  }

  async getActivitiesByCategory(categoryId: number): Promise<Activity[]> {
    const allActivities: Activity[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Activity> =
        await this.getActivityPageByCategory(categoryId, {
          page: page.toString(),
          size: pageSize.toString(),
        });
      allActivities.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page == totalPages);

    return allActivities;
  }

  async getActivitiesByFacility(facilityId: number): Promise<Activity[]> {
    const allActivities: Activity[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Activity> =
        await this.getActivityPageByFacility(facilityId, {
          page: page.toString(),
          size: pageSize.toString(),
        });
      allActivities.push(...response.content);

      totalPages = response.page.totalPages;
      page += 1;
    } while (page < totalPages);

    return allActivities;
  }

  async getActivityPage(
    params: Record<string, string>
  ): Promise<PageModel<Activity>> {
    return this.client.get<PageModel<Activity>>("/activities", params);
  }

  async getActivityPageByFacility(
    facilityId: number,
    params: Record<string, string>
  ): Promise<PageModel<Activity>> {
    return this.client.get<PageModel<Activity>>(
      `/facilities/${facilityId}/activities`,
      params
    );
  }

  async getActivityPageByCategory(
    categoryId: number,
    params: Record<string, string>
  ): Promise<PageModel<Activity>> {
    return this.client.get<PageModel<Activity>>(
      `/categories/${categoryId}/activities`,
      params
    );
  }

  async getActivityById(id: string): Promise<Activity> {
    return this.client.get<Activity>(`/activities/${id}`);
  }
}
