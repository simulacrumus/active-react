import type { ApiClient } from "../ApiClient";
import type { CategoryService } from "./CategoryService";
import type { Category, PageModel } from "@/types";

export class CategoryServiceImpl implements CategoryService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getCategories(): Promise<Category[]> {
    const allCategories: Category[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Category> = await this.getCategoryPage({
        page: String(page),
        size: String(pageSize),
      });
      allCategories.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allCategories;
  }

  async getCategoriesByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<Category[]> {
    const allCategories: Category[] = [];
    let page: number = 0;
    let totalPages: number = 1;
    const pageSize = 100;

    do {
      const response: PageModel<Category> =
        await this.getCategoryPageByFacility(
          {
            page: String(page),
            size: String(pageSize),
          },
          facilityId
        );
      allCategories.push(...response.content);

      totalPages =
        response.page.totalPages ||
        Math.ceil(response.page.totalElements / pageSize) ||
        0;
      page += 1;
    } while (page < totalPages);

    return allCategories;
  }

  async getCategoryPage(
    params: Record<string, string>
  ): Promise<PageModel<Category>> {
    return this.client.get<PageModel<Category>>("/categories", params);
  }

  async getCategoryPageByFacility(
    params: Record<string, string>,
    facilityId: number
  ): Promise<PageModel<Category>> {
    return this.client.get<PageModel<Category>>(
      `/facilities/${facilityId}/categories`,
      params
    );
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.client.get<Category>(`/categories/${id}`);
  }
}
