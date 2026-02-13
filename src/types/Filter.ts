import type { Activity } from "./Activity";
import type { Category } from "./Category";
import type { DayOfWeek } from "./DayOfWeek";
import type { Facility } from "./Facility";
import type { HourOfDay } from "./HourOfDay";
import type { ScheduleSort } from "./Schedule";

export interface FilterOptions {
  initialCategories: Category[];
  initialActivities: Activity[];
  initialFacilities: Facility[];
  categories: Category[];
  activities: Activity[];
  facilities: Facility[];
  daysOfWeek: DayOfWeek[];
  hoursOfDay: HourOfDay[];
}

export interface FilterState {
  selectedCategory: Category | null;
  selectedActivity: Activity | null;
  selectedFacility: Facility | null;
  selectedDayOfWeek: DayOfWeek | null;
  selectedHour: HourOfDay | null;
  searchQuery: string;
  pageNumber: number;
  selectedSort: ScheduleSort;
}
