import { Activity } from "./Activity";
import { Category } from "./Category";
import { Facility } from "./Facility";
import { DayOfWeek } from "./DayOfWeek";
import { HourOfDay } from "./HourOfDay";
import { ScheduleSort } from "./Schedule";

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
