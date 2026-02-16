import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  type Context,
} from "react";
import {
  activityService,
  facilityService,
  scheduleService,
} from "@/services/api";
import type {
  Activity,
  Facility,
  Schedule,
  DayOfWeek,
  HourOfDay,
  ScheduleSort,
} from "@/types";
import type { PageModel } from "@/types/Page";
import {
  DAYS_OF_WEEK,
  HOURS_OF_DAY,
  SCHEDULE_SORT_OPTIONS,
} from "@/constants/filters";
import { useLocation } from "@/hooks/useLocation";
import { useTranslation } from "react-i18next";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface FilterOptions {
  activities: Activity[];
  facilities: Facility[];
  initialActivities: Activity[];
  initialFacilities: Facility[];
  daysOfWeek: DayOfWeek[];
  hoursOfDay: HourOfDay[];
}

export interface FilterState {
  selectedActivity: Activity | null;
  selectedFacility: Facility | null;
  selectedDayOfWeek: DayOfWeek | null;
  selectedHour: HourOfDay | null;
  searchQuery: string;
}

export interface ScheduleContextValue {
  filters: FilterState;
  filterOptions: FilterOptions;
  sortOptions: ScheduleSort[];
  sort: ScheduleSort;
  error?: string;
  schedules: Schedule[];
  isLoadingOptions: boolean;
  isLoadingSchedules: boolean;
  isLoadingNextPageSchedules: boolean;
  hasMoreSchedules: boolean;
  isFiltersChanged: boolean;
  isSortChanged: boolean;
  applyFilters: () => Promise<void>;
  loadMoreSchedules: () => Promise<void>;
  setSelectedActivity: (activity: Activity | null) => void;
  setSelectedFacility: (facility: Facility | null) => void;
  setSelectedDayOfWeek: (day: DayOfWeek | null) => void;
  setSelectedHour: (hour: HourOfDay | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSort: (sort: ScheduleSort) => void;
  resetFilters: () => void;
  isAnyFilterApplied: () => boolean;
  isAnyTemporaryFilterApplied: () => boolean;
}

interface ScheduleProviderProps {
  children: ReactNode;
}

// ============================================================================
// Constants
// ============================================================================

const INITIAL_FILTERS: FilterState = {
  selectedActivity: null,
  selectedFacility: null,
  selectedDayOfWeek: null,
  selectedHour: null,
  searchQuery: "",
};

const INITIAL_FILTER_OPTIONS: FilterOptions = {
  activities: [],
  facilities: [],
  initialActivities: [],
  initialFacilities: [],
  daysOfWeek: DAYS_OF_WEEK,
  hoursOfDay: HOURS_OF_DAY,
};

// ============================================================================
// Context
// ============================================================================

export const ScheduleContext: Context<ScheduleContextValue | null> =
  createContext<ScheduleContextValue | null>(null);

// ============================================================================
// Helper Functions
// ============================================================================

function areFiltersEqual(a: FilterState, b: FilterState): boolean {
  return (
    a.selectedActivity?.id === b.selectedActivity?.id &&
    a.selectedFacility?.id === b.selectedFacility?.id &&
    a.selectedDayOfWeek === b.selectedDayOfWeek &&
    a.selectedHour === b.selectedHour &&
    a.searchQuery === b.searchQuery
  );
}

function areSortOptionsEqual(a: ScheduleSort, b: ScheduleSort): boolean {
  // Case-insensitive string comparison for sort options
  return a.toLowerCase() === b.toLowerCase();
}

function buildScheduleParams(
  filters: FilterState,
  sort: ScheduleSort,
  location: { latitude: number; longitude: number } | null,
  pageNumber: number,
): Record<string, string> {
  const params: Record<string, string> = { page: pageNumber.toString() };

  if (filters.selectedDayOfWeek) {
    params.day = filters.selectedDayOfWeek.id.toString();
  }
  if (filters.selectedHour) {
    params.time = filters.selectedHour.id.toString();
  }
  if (sort) {
    params.sort = sort.toLowerCase();
  }
  if (sort === "Nearby" && location) {
    params.latitude = location.latitude.toString();
    params.longitude = location.longitude.toString();
  }
  if (filters.searchQuery.trim()) {
    params.q = filters.searchQuery.trim();
  }

  return params;
}

// ============================================================================
// Provider Component
// ============================================================================

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  // State
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [lastAppliedFilters, setLastAppliedFilters] =
    useState<FilterState>(INITIAL_FILTERS);
  const [previousSort, setPreviousSort] = useState<ScheduleSort>("Time");
  const [sort, setSort] = useState<ScheduleSort>("Time");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    INITIAL_FILTER_OPTIONS,
  );
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [isLoadingNextPageSchedules, setIsLoadingNextPageSchedules] =
    useState(false);
  const [hasMoreSchedules, setHasMoreSchedules] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | undefined>();

  // Refs
  const didLoadRef = useRef(false);
  const lastRequestRef = useRef<symbol | null>(null);

  // Hooks
  const locationData = useLocation();
  const { i18n, t } = useTranslation();

  // ============================================================================
  // Initial Data Loading
  // ============================================================================

  const loadInitialFilterOptions = useCallback(async (): Promise<void> => {
    setIsLoadingOptions(true);
    try {
      const [initialActivities, initialFacilities] = await Promise.all([
        activityService.getActivities(),
        facilityService.getFacilities(),
      ]);

      setFilterOptions({
        activities: initialActivities,
        facilities: initialFacilities,
        initialActivities,
        initialFacilities,
        daysOfWeek: DAYS_OF_WEEK,
        hoursOfDay: HOURS_OF_DAY,
      });
    } catch (error) {
      console.error("Error loading filter options:", error);
    } finally {
      setIsLoadingOptions(false);
    }
  }, []);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    loadInitialFilterOptions();
    fetchSchedulesPage(filters, 0, false);
  }, [loadInitialFilterOptions]);

  // ============================================================================
  // Filter Handlers
  // ============================================================================

  const handleActivityChange = useCallback(
    async (activity: Activity | null): Promise<void> => {
      // console.log("handle activity change: ", activity);
      const token = Symbol();
      lastRequestRef.current = token;
      setIsLoadingOptions(true);

      try {
        // Update selected activity immediately
        setFilters((prev) => ({
          ...prev,
          selectedActivity: activity,
        }));

        // Fetch related facilities
        const facilities = activity
          ? await facilityService.getFacilitiesByActivity(activity.id)
          : filterOptions.initialFacilities;

        // Check if this request is still valid
        if (lastRequestRef.current !== token) return;

        // Check if current facility is still valid
        const facilityIds = new Set(facilities.map((f) => f.id));
        const isCurrentFacilityValid =
          filters.selectedFacility &&
          facilityIds.has(filters.selectedFacility.id);

        // Update filter options and clear facility if needed
        setFilterOptions((prev) => ({
          ...prev,
          facilities,
        }));

        if (!isCurrentFacilityValid) {
          setFilters((prev) => ({
            ...prev,
            selectedFacility: null,
          }));
        }
      } catch (error) {
        console.error("Error updating facilities:", error);
      } finally {
        if (lastRequestRef.current === token) {
          setIsLoadingOptions(false);
        }
      }
    },
    [filterOptions.initialFacilities, filters.selectedFacility],
  );

  const handleFacilityChange = useCallback(
    async (facility: Facility | null): Promise<void> => {
      // console.log("handle facility change: ", facility);
      const token = Symbol();
      lastRequestRef.current = token;
      setIsLoadingOptions(true);

      try {
        // Update selected facility immediately
        setFilters((prev) => ({
          ...prev,
          selectedFacility: facility,
        }));

        // Fetch related activities
        const activities = facility
          ? await activityService.getActivitiesByFacility(facility.id)
          : filterOptions.initialActivities;

        // Check if this request is still valid
        if (lastRequestRef.current !== token) return;

        // Check if current activity is still valid
        const activityIds = new Set(activities.map((a) => a.id));
        const isCurrentActivityValid =
          filters.selectedActivity &&
          activityIds.has(filters.selectedActivity.id);

        // Update filter options
        setFilterOptions((prev) => ({
          ...prev,
          activities,
          facilities: isCurrentActivityValid
            ? prev.facilities
            : prev.initialFacilities,
        }));

        // Clear activity if needed
        if (!isCurrentActivityValid) {
          setFilters((prev) => ({
            ...prev,
            selectedActivity: null,
          }));
        }
      } catch (error) {
        console.error("Error updating activities:", error);
      } finally {
        if (lastRequestRef.current === token) {
          setIsLoadingOptions(false);
        }
      }
    },
    [filterOptions.initialActivities, filters.selectedActivity],
  );

  const handleSortChange = useCallback(
    async (newSort: ScheduleSort): Promise<void> => {
      // Handle location permission for "Nearby" sort
      if (newSort === "Nearby" && !locationData.location) {
        if (locationData.permission === "denied") {
          alert(
            "Location access was denied. Please enable location permissions in your browser settings to use nearby sorting.",
          );
          return;
        }

        const success = await locationData.requestLocation();

        if (!success) {
          alert(
            "Unable to get your location. Please enable location permissions in your browser settings to use nearby sorting.",
          );
          return;
        }
      }
      // console.log("new sort: ", newSort);
      setSort(newSort);
    },
    [locationData, sort],
  );

  const setSelectedDayOfWeek = useCallback((day: DayOfWeek | null): void => {
    setFilters((prev) => ({ ...prev, selectedDayOfWeek: day }));
  }, []);

  const setSelectedHour = useCallback((hour: HourOfDay | null): void => {
    setFilters((prev) => ({ ...prev, selectedHour: hour }));
  }, []);

  const setSearchQuery = useCallback((query: string): void => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // ============================================================================
  // Schedule Fetching
  // ============================================================================

  const fetchSchedulesPage = useCallback(
    async (
      filtersToUse: FilterState,
      pageNumber: number = 0,
      append: boolean = false,
    ): Promise<void> => {
      const setLoading = append
        ? setIsLoadingNextPageSchedules
        : setIsLoadingSchedules;

      setLoading(true);

      try {
        const params = buildScheduleParams(
          filtersToUse,
          sort,
          locationData.location,
          pageNumber,
        );

        let page: PageModel<Schedule>;

        // Determine which endpoint to call based on filters
        if (filtersToUse.selectedActivity && filtersToUse.selectedFacility) {
          page = await scheduleService.getSchedulesByActivityAndByFacility(
            params,
            filtersToUse.selectedActivity.id,
            filtersToUse.selectedFacility.id,
          );
        } else if (filtersToUse.selectedFacility) {
          page = await scheduleService.getSchedulesByFacility(
            params,
            filtersToUse.selectedFacility.id,
          );
        } else if (filtersToUse.selectedActivity) {
          page = await scheduleService.getSchedulesByActivity(
            params,
            filtersToUse.selectedActivity.id,
          );
        } else {
          page = await scheduleService.getSchedules(params);
        }

        // Update state
        setHasMoreSchedules(page.page.number + 1 < page.page.totalPages);
        setCurrentPage(pageNumber);

        if (append) {
          setSchedules((prev) => [...prev, ...page.content]);
        } else {
          setSchedules(page.content);
        }
        setError(undefined);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        if (!append) {
          setError(t("error.default"));
          setSchedules([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [sort, locationData.location],
  );

  useEffect(() => {
    if (!didLoadRef.current) return;

    const handleLanguageChange = async () => {
      await loadInitialFilterOptions();
      if (schedules.length > 0) {
        await fetchSchedulesPage(filters, 0, false);
      }
    };

    handleLanguageChange();
  }, [i18n.language]);

  // ============================================================================
  // Public Actions
  // ============================================================================

  const applyFilters = useCallback(async (): Promise<void> => {
    if (areFiltersEqual(filters, lastAppliedFilters) && previousSort === sort) {
      return;
    }

    setLastAppliedFilters(filters);
    setPreviousSort(sort);
    setCurrentPage(0);
    setHasMoreSchedules(false);
    await fetchSchedulesPage(filters, 0, false);
  }, [sort, filters, lastAppliedFilters, previousSort, fetchSchedulesPage]);

  const loadMoreSchedules = useCallback(async (): Promise<void> => {
    if (!hasMoreSchedules || isLoadingNextPageSchedules || isLoadingSchedules) {
      return;
    }
    await fetchSchedulesPage(filters, currentPage + 1, true);
  }, [
    filters,
    currentPage,
    hasMoreSchedules,
    isLoadingNextPageSchedules,
    isLoadingSchedules,
    fetchSchedulesPage,
  ]);

  const resetFilters = useCallback(async (): Promise<void> => {
    setFilters(INITIAL_FILTERS);
    setLastAppliedFilters(INITIAL_FILTERS);
    setPreviousSort(sort);
    setCurrentPage(0);
    setHasMoreSchedules(false);

    setFilterOptions((prev) => ({
      ...prev,
      activities: prev.initialActivities,
      facilities: prev.initialFacilities,
    }));
    await fetchSchedulesPage(INITIAL_FILTERS, 0, false);
  }, [fetchSchedulesPage]);

  const isAnyFilterApplied = useCallback((): boolean => {
    return (
      lastAppliedFilters.selectedActivity !== null ||
      lastAppliedFilters.selectedFacility !== null ||
      lastAppliedFilters.selectedDayOfWeek !== null ||
      lastAppliedFilters.selectedHour !== null ||
      lastAppliedFilters.searchQuery.trim() !== ""
    );
  }, [lastAppliedFilters]);

  const isAnyTemporaryFilterApplied = useCallback((): boolean => {
    return (
      filters.selectedActivity !== lastAppliedFilters.selectedActivity ||
      filters.selectedFacility !== lastAppliedFilters.selectedFacility ||
      filters.selectedDayOfWeek !== lastAppliedFilters.selectedDayOfWeek ||
      filters.selectedHour !== lastAppliedFilters.selectedHour ||
      filters.searchQuery.trim() !== lastAppliedFilters.searchQuery.trim()
    );
  }, [filters, sort]);

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: ScheduleContextValue = {
    filters,
    filterOptions,
    sortOptions: SCHEDULE_SORT_OPTIONS,
    sort,
    error,
    schedules,
    isLoadingOptions,
    isLoadingSchedules,
    isLoadingNextPageSchedules,
    hasMoreSchedules,
    isFiltersChanged: areFiltersEqual(filters, lastAppliedFilters),
    isSortChanged: areSortOptionsEqual(sort, previousSort),
    applyFilters,
    loadMoreSchedules,
    setSelectedActivity: handleActivityChange,
    setSelectedFacility: handleFacilityChange,
    setSelectedDayOfWeek,
    setSelectedHour,
    setSearchQuery,
    setSelectedSort: handleSortChange,
    resetFilters,
    isAnyFilterApplied,
    isAnyTemporaryFilterApplied,
  };

  return React.createElement(ScheduleContext.Provider, { value }, children);
}
