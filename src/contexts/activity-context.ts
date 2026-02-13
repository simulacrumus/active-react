import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  type Context,
} from "react";
import { categoryService } from "@/services/api";
import type { Activity, Category } from "@/types";

export interface ActivityContextValue {
  selectedCategory: Category | null;
  categories: Category[];
  activities: Activity[];
  isLoadingCategories: boolean;
  handleCategoryChange: (category: Category | null) => void;
  resetFilters: () => void;
  isAnyFilterApplied: () => boolean;
}

export const ActivityContext: Context<ActivityContextValue | null> =
  createContext<ActivityContextValue | null>(null);

interface ActivityProviderProps {
  children: ReactNode;
}

export function ActivityProvider({ children }: ActivityProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);

  const didLoadRef = useRef(false);

  const loadInitialData = useCallback(async (): Promise<void> => {
    setIsLoadingCategories(true);
    try {
      const categoriesList: Category[] = await categoryService.getCategories();
      setCategories(categoriesList);

      const activitiesList = categoriesList.flatMap(
        (category) => category.activities,
      );
      setActivities(activitiesList);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    loadInitialData();
  }, [loadInitialData]);

  const handleCategoryChange = useCallback(
    (category: Category | null): void => {
      setSelectedCategory(category);

      if (category) {
        // Update activities with the selected category's activities
        setActivities(category.activities);
      } else {
        // If no category is provided, show all activities from all categories
        const allActivities = categories.flatMap((cat) => cat.activities);
        setActivities(allActivities);
      }
    },
    [categories],
  );

  const resetFilters = useCallback((): void => {
    setSelectedCategory(null);
    // Reset to all activities
    const allActivities = categories.flatMap((cat) => cat.activities);
    setActivities(allActivities);
  }, [categories]);

  const isAnyFilterApplied = useCallback((): boolean => {
    return selectedCategory !== null;
  }, [selectedCategory]);

  const value: ActivityContextValue = {
    selectedCategory,
    categories,
    activities,
    isLoadingCategories,
    handleCategoryChange,
    resetFilters,
    isAnyFilterApplied,
  };

  return React.createElement(ActivityContext.Provider, { value }, children);
}
