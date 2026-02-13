import type { Selectable } from "./Selectable";
import type { Activity } from "./Activity";

export interface Category extends Selectable {
  id: number;
  title: string;
  icon: string;
  activities: Activity[];
}
