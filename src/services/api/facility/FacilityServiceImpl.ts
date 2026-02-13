import type { Facility, PageModel } from "@/types";
import type { ApiClient } from "../ApiClient";
import type { FacilityService } from "./FacilityService";

export class FacilityServiceImpl implements FacilityService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getFacilities(
    params: Record<string, string> = {}
  ): Promise<Facility[]> {
    const allFacilities: Facility[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Facility> = await this.getFacilityPage({
        ...params,
        page: String(page),
        size: String(pageSize),
      });
      allFacilities.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allFacilities;
  }

  async getFacilitiesByCategory(categoryId: number): Promise<Facility[]> {
    const allFacilities: Facility[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Facility> =
        await this.getFacilityPageByCategory(
          {
            page: String(page),
            size: String(pageSize),
          },
          categoryId
        );
      allFacilities.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allFacilities;
  }

  async getFacilitiesByActivity(activityId: number): Promise<Facility[]> {
    const allFacilities: Facility[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Facility> =
        await this.getFacilityPageByActivity(
          {
            page: String(page),
            size: String(pageSize),
          },
          activityId
        );
      allFacilities.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allFacilities;
  }

  async getFacilityPage(
    params: Record<string, string>
  ): Promise<PageModel<Facility>> {
    return this.client.get<PageModel<Facility>>("/facilities", params);
  }
  async getFacilityPageByCategory(
    params: Record<string, string>,
    categoryId: number
  ): Promise<PageModel<Facility>> {
    return this.client.get<PageModel<Facility>>(
      `/categories/${categoryId}/facilities`,
      params
    );
  }

  async getFacilityPageByActivity(
    params: Record<string, string>,
    activityId: number
  ): Promise<PageModel<Facility>> {
    return this.client.get<PageModel<Facility>>(
      `/activities/${activityId}/facilities`,
      params
    );
  }

  async getFacilityById(id: string): Promise<Facility> {
    return this.client.get<Facility>(`/facilities/${id}`);
  }
}
