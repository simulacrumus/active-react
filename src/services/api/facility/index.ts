import { apiClient } from "./../axios";
import type { FacilityService } from "./FacilityService";
import { FacilityServiceImpl } from "./FacilityServiceImpl";

export const facilityService: FacilityService = new FacilityServiceImpl(
  apiClient,
);
