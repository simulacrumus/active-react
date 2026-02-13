import { apiClient } from "./../axios";
import type { ActivityService } from "./ActivityService";
import { ActivityServiceImpl } from "./ActivityServiceImpl";

export const activityService: ActivityService = new ActivityServiceImpl(
  apiClient,
);
