import type { Facility, PageModel } from "@/types";

export interface FacilityService {
  getFacilities(): Promise<Facility[]>;
  getFacilitiesByActivity(activityId: number): Promise<Facility[]>;
  getFacilitiesByCategory(categoryId: number): Promise<Facility[]>;
  getFacilityPage(params: Record<string, string>): Promise<PageModel<Facility>>;
  getFacilityPageByCategory(
    params: Record<string, string>,
    categoryId: number
  ): Promise<PageModel<Facility>>;
  getFacilityPageByActivity(
    params: Record<string, string>,
    activityId: number
  ): Promise<PageModel<Facility>>;
  getFacilityById(id: string): Promise<Facility>;
}
