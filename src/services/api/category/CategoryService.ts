import type { Category, PageModel } from "@/types";

export interface CategoryService {
  getCategories(): Promise<Category[]>;
  getCategoriesByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<Category[]>;
  getCategoryPage(params: Record<string, string>): Promise<PageModel<Category>>;
  getCategoryPageByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<PageModel<Category>>;
  getCategoryById(id: string): Promise<Category>;
}
