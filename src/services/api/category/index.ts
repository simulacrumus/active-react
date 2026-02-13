import { apiClient } from "./../axios";
import type { CategoryService } from "./CategoryService";
import { CategoryServiceImpl } from "./CategoryServiceImpl";

export const categoryService: CategoryService = new CategoryServiceImpl(
  apiClient,
);
