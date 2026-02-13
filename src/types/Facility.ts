import type { Selectable } from "./Selectable";
import type { FacilityBranch } from "./FacilityBranch";

export interface Facility extends Selectable {
  id: number;
  title: string;
  shortTitle: string;
  info: string;
  address: string;
  phone: string;
  email: string;
  url: string;
  longitude: number;
  latitude: number;
  branches: FacilityBranch[];
  classification: string;
  updatedAt: string;
}
